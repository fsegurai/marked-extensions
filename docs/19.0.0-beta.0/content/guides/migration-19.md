---
label: Migrating to 19
description: Every breaking change from 18.x to 19.0.0-beta.0, the runtime contract with React, Vue and Angular examples, and per-package migration notes.
order: 6
tags: [ "guides", "migration" ]
keywords: [ "upgrade", "breaking changes", "18.x", "unsafeHtml", "attachAll" ]
---

# Migrating from 18.x to 19.0.0-beta

This guide covers the breaking changes of `@fsegurai/marked-extended-*` 19.0.0-beta.0 (every package, including the
new `code` and `core` packages). The full list is in the [CHANGELOG](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md).

> **Beta.** 19.0.0-beta.0 ships the safe-by-default runtime contract ahead of marked 19. Until the stable 19.0.0, the
> peer dependency stays `marked ^18` for every package (`comments` and `embeds` declared `marked >=17.0.0` in 18.0
> and now require `^18` too). The stable 19.0.0 will move the peer to marked 19 once marked 19 is released.

### Table of contents

- [What changed and why](#what-changed-and-why)
- [The runtime contract](#the-runtime-contract)
  - [Plain JavaScript](#plain-javascript)
  - [React](#react)
  - [Vue](#vue)
  - [Angular](#angular)
  - [Keeping the 18.0 markup: `unsafeHtml`](#keeping-the-180-markup-unsafehtml)
- [Per-package changes](#per-package-changes)
  - [Accordion](#accordion)
  - [Alert](#alert)
  - [Code (new)](#code-new)
  - [Comments](#comments)
  - [Core (new)](#core-new)
  - [Embeds](#embeds)
  - [Footnote](#footnote)
  - [Kanban](#kanban)
  - [Lists](#lists)
  - [Slide](#slide)
  - [Spoiler](#spoiler)
  - [Tables](#tables)
  - [Tabs](#tabs)
  - [Timeline](#timeline)
  - [Typographic](#typographic)
  - [Bundle](#bundle)
- [Checklist](#checklist)

## What changed and why

In 18.0, several packages produced markup that strict HTML sanitizers remove, such as Angular's
`SecurityContext.HTML`. They also ran browser code on their own:

- **Removed by sanitizers:** `id`, `for`, `name`, `style`, `data-*`, `on*` attributes, and the `input`, `button`,
  `svg`, `iframe`, `form`, `script` and `style` elements. Tabs stopped working entirely after sanitizing, and slide,
  kanban, embeds and lists were partly broken.
- **Page-wide side effects:** listeners on `document`, observers on `body`, `window.*` globals, an injected
  `<script>`, inline `onclick` handlers, and initialisation at import time.

In 19, every package follows one contract:

- **Sanitizer-safe markup by default.** State lives in `class`, `aria-*`, `role`, `hidden`, `open` and `tabindex`.
  Configuration is carried in class tokens of the form `mx-<pkg>-<key>-<value>`. Icons are drawn with CSS instead of
  inline `<svg>`, and ids are content hashes.
- **Explicit, scoped runtimes.** Interactive behaviour comes from `attachX(root, options?)`, which returns a
  `dispose` function. Nothing touches the DOM at import time or when the extension is created, so every package is
  safe to import during SSR.
- **Namespaced events.** Runtimes dispatch bubbling `CustomEvent`s named `marked-extended:<pkg>:<event>`.

## The runtime contract

```ts
const dispose = attachX(root, options?); // attach after the HTML is in the DOM
attachX.refresh(root);                   // after replacing the root's content (or pass { observe: true })
dispose();                               // on teardown
```

- **Idempotent per root.** Attaching twice to the same root is a no-op: the second call returns a no-op `dispose`.
- **Scoped.** Listeners are delegated on `root` only. There are no `document` or `body` observers and no `window`
  globals. Two roots with the same content never interfere with each other.
- **Re-render safe.** Delegated behaviour, such as clicks and keys, keeps working when the content changes. Per-element
  setup is applied again by `attachX.refresh(root)`, or automatically with `attachX(root, { observe: true })`. The
  `observe` option adds a `MutationObserver` on the root only, and `dispose` disconnects it.
- **SSR-safe.** Importing a package, or calling its extension factory, never touches `document` or `window`.

The bundle's `attachAll(root, options?)` attaches every runtime at once. It returns a single
`{ dispose(), refresh() }` handle. Options are passed to each runtime (`{ tabs: {…}, code: {…} }`), and `false`
leaves a runtime out.

### Plain JavaScript

```js
import { Marked } from 'marked';
import { attachAll, markedExtendedTabs, markedExtendedAlert } from '@fsegurai/marked-extended-bundle';

const marked = new Marked().use(markedExtendedTabs(), markedExtendedAlert());
const container = document.querySelector('#content');

container.innerHTML = marked.parse(markdown);
const handle = attachAll(container);

// After replacing the content:
container.innerHTML = marked.parse(nextMarkdown);
handle.refresh();

// On teardown:
handle.dispose();
```

### React

```tsx
import { useEffect, useRef } from 'react';
import { attachAll } from '@fsegurai/marked-extended-bundle';

export function Markdown({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = attachAll(ref.current!);
    return () => handle.dispose();
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### Vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
import { attachAll, type AttachAllHandle } from '@fsegurai/marked-extended-bundle';

const props = defineProps<{ html: string }>();
const root = ref<HTMLElement>();
let handle: AttachAllHandle | undefined;

onMounted(() => (handle = attachAll(root.value!)));
watch(() => props.html, async () => {
  await nextTick();
  handle?.refresh();
});
onBeforeUnmount(() => handle?.dispose());
</script>

<template>
  <div ref="root" v-html="html" />
</template>
```

### Angular

The default markup survives Angular's sanitizer, so `[innerHTML]` works without `bypassSecurityTrustHtml`. Attach
the runtimes after rendering, and dispose of them when the component is destroyed:

```ts
import { afterNextRender, Component, DestroyRef, ElementRef, inject, input, effect } from '@angular/core';
import { attachAll, type AttachAllHandle } from '@fsegurai/marked-extended-bundle';

@Component({
  selector: 'app-markdown',
  template: `<div [innerHTML]="html()"></div>`,
})
export class MarkdownComponent {
  readonly html = input.required<string>();
  private readonly host = inject(ElementRef<HTMLElement>);
  private handle?: AttachAllHandle;

  constructor() {
    afterNextRender(() => (this.handle = attachAll(this.host.nativeElement)));
    effect(() => {
      this.html();
      queueMicrotask(() => this.handle?.refresh());
    });
    inject(DestroyRef).onDestroy(() => this.handle?.dispose());
  }
}
```

`attachAll` is browser-only by nature, but it is safe to import on the server, and `afterNextRender` never runs
there. A `withMarkedExtended` adapter for ngx-markdown is planned. It will attach and dispose the runtimes for you.

### Keeping the 18.0 markup: `unsafeHtml`

Every package whose markup changed has an `unsafeHtml: true` option. It restores the 18.0 markup for pages that do
not sanitize. The runtimes work on both markups. Behaviour that the 18.0 markup implemented with inline handlers or
injected scripts still needs the runtime, because those handlers and scripts are gone in both modes.

```js
marked.use(markedExtendedTabs({ unsafeHtml: true }));
```

## Per-package changes

Each section lists the markup change, the runtime to call, removed globals, renamed events, deprecated options, and
CSS changes. Packages that have no runtime only need the markup and CSS notes.

### Accordion

- **Markup.** `id`, `name` (exclusive groups), `style` (duration and easing) and `data-*` become class tokens:
  `mx-accordion-id-…`, `mx-accordion-group-…`, `mx-accordion-duration-…`, `mx-accordion-easing-…` and
  `mx-accordion-data<Key>-…`. Variant icons are drawn with CSS. The default template changed.
- **Runtime.** `attachAccordion(root)` handles exclusive groups, the animation CSS variables, `data-*` restoration
  and `#id` links.
- **Events.** New: `marked-extended:accordion:toggle`.

```html
<!-- 18.0 -->
<details id="faq" class="marked-extended-accordion" name="billing" data-topic="plans" style="…">
<!-- 19 -->
<details class="marked-extended-accordion mx-accordion-id-faq mx-accordion-group-billing mx-accordion-dataTopic-plans">
```

### Alert

- **Markup.** Built-in icons are CSS mask icons (`<span class="marked-extended-alert-icon mx-alert-icon-<type>">`)
  instead of inline `<svg>`. Custom icons are unchanged.
- **Runtime.** None.
- **CSS.** Load `alert.css` to draw the icons.

```html
<!-- 18.0 -->
<svg class="marked-extended-alert-icon" viewBox="0 0 16 16">…</svg>
<!-- 19 -->
<span class="marked-extended-alert-icon mx-alert-icon-note"></span>
```

### Code (new)

`@fsegurai/marked-extended-code` adds VitePress-style code blocks: fence titles, line numbers, line highlights,
diff, focus and warning/error/info markers (`{1,4-6}`, `ins={…}`, `// [!code ++]`), and `::: code-group` tabs. Its
output is sanitizer-safe from the start, so it has no `unsafeHtml` option.

```js
import markedExtendedCode, { attachCode } from '@fsegurai/marked-extended-code';

marked.use(markedExtendedCode());
const dispose = attachCode(container, { highlight: (code) => Prism.highlightElement(code) });
```

Load `code.css` for line highlighting and group tabs.

### Comments

- **Markup.** `id`, `data-comment-*`, `data-reply-to` and custom `data-*` become `mx-comments-*` class tokens. Type
  icons are CSS icons (`<span class="comment-icon mx-comments-icon-<type>">`). The default inline and block templates
  changed.
- **Runtime.** `attachComments(root)` restores the `data-*` attributes and handles reply-link navigation.
- **Events.** New: `marked-extended:comments:navigate`.
- **Options.** `onVisibilityChange` and `onStatusChange` are still parse-time callbacks.

### Core (new)

`@fsegurai/marked-extended-core` holds the shared helpers: `hashId`, `escapeHtml`, class tokens, `defineRuntime` and
the event helpers. The other packages bundle it into their builds, so you only install it to build your own
extensions on the same contract.

### Embeds

- **Markup.** The default output has no `<iframe>`, `id`, `style` or `data-*`. Each embed is a click-to-load
  placeholder (`div.mx-embeds` with `role="button"`) plus a fallback link to the provider page that works without
  JavaScript. Nothing is requested from the provider until the reader activates the embed.
- **Runtime.** `attachEmbeds(root, { autoload?, privacy?, trustedOrigins?, timeout? })` creates a sandboxed
  iframe. The player URL is rebuilt from a per-provider allowlist, never taken from the Markdown. The generic
  `iframe`/`pdf` providers load only from `trustedOrigins`.
- **Events.** New: `marked-extended:embeds:before-load` (cancelable), `marked-extended:embeds:load` (fired on the real
  `load` event) and `marked-extended:embeds:error`.
- **Deprecated options.** The `onEmbedLoad` and `onEmbedError` extension options are ignored, and a one-time warning
  says so. Pass them to `attachEmbeds`, or listen for the events.
- **Ids.** Ids ignore trailing blank lines. Identical blocks in one parse get `-2`, `-3`…
- **New option.** `thumbnails: true` shows a static YouTube thumbnail. It is off by default and never used in
  privacy mode.
- **CSS.** Aspect ratios are CSS classes (`.mx-embeds-ratio-16x9` and so on).

```js
// 18.0
marked.use(markedExtendedEmbeds({ onEmbedLoad: (el) => track(el) }));
// 19
marked.use(markedExtendedEmbeds());
container.addEventListener('marked-extended:embeds:load', (e) => track(e.target));
attachEmbeds(container);
```

### Footnote

- **Markup.** There are no `id` targets and no `data-fnref-*`, `data-footnotes` or `data-footnote-preview`
  attributes. Targets carry `mx-footnote-id-<id>`, references get the `footnote-ref` class, and definitions get
  `tabindex="-1"`. The section and the references are named with `aria-label` instead of `aria-labelledby`.
- **Runtime.** `attachFootnotes(root, { smoothScroll?, scrollOffset?, updateHash? })` handles anchor navigation,
  scrolling with an offset, and hover previews.
- **Removed.** The `document` click listener that `setupSmoothScroll` added when the extension was created.
  `history.pushState` is only called with `updateHash: true`.
- **Events.** New: `marked-extended:footnote:navigate`.
- **Deprecated options.** The `smoothScroll` and `scrollOffset` extension options are ignored, and a one-time
  warning says so. Pass them to `attachFootnotes`.
- **CSS.** `.footnote-targeted` stands in for `:target`. The stylesheet covers both markups.

### Kanban

- **Markup.** There are no inline `onclick` handlers, no `<script type="application/json">` view store, and no
  `<button>`, `id`, `style`, `data-*` or `draggable`. Every view is in the markup, and the `mx-kanban-view-<view>`
  class selects one with CSS, so the initial view works without JavaScript. Columns, cards and priorities carry
  `mx-kanban-*` tokens. The default template gains a `{tokenClasses}` placeholder.
- **Runtime.** `attachKanban(root, { dragAndDrop?, keyboard? })` handles view switching, drag and drop, and
  Alt+Arrow keyboard moves. It also applies non-palette colors.
- **Events.** `attachKanban` dispatches only `marked-extended:kanban:move`, which is cancelable and is dispatched
  before the card moves; listen for it instead of `kanban:move`. `applyMove` and the deprecated `enableKanbanDragDrop`
  dispatch it too and, for compatibility, still dispatch the legacy `kanban:move` after the move. New:
  `marked-extended:kanban:view` and `marked-extended:kanban:collapse`.
- **Removed globals.** `window.updateMarkdownFromKanbanMove`.
- **Deprecated.** `enableKanbanDragDrop` is a deprecated entry point that prints a one-time warning. It runs
  `attachKanban` and also dispatches the legacy `kanban:move`. The `onMove` extension option is ignored.
- **Other.** Card text is rendered with the caller's `Marked` instance. Board ids hash the fence, and repeated
  boards get `-2`, `-3`… `unsafeHtml` keeps the 18.0 markup without its `onclick` handlers.
- **CSS.** Palette colors are shipped as CSS (`--kanban-palette-<name>`).

### Lists

- **Markup.** Task checkboxes are `<span class="mx-lists-task …" role="checkbox" aria-checked>`, not
  `<label for><input type="checkbox" id></label>`. Interactive ones carry `tabindex="0"` and the tokens
  `mx-lists-line-…`, `mx-lists-offset-…` and `mx-lists-raw-…`. Unordered task lists get `class="mx-lists-taskList"`
  instead of `data-task-list`.
- **Runtime.** `attachLists(root, { editing? })` handles click, Space and Enter on the checkboxes. With
  `editing: true` it also enables list editing.
- **Events.** New: `marked-extended:lists:toggle` (cancelable), with the detail `{ checked, line, offset, raw, text }`.
- **Removed globals.** `window.markedListsCallback`, `window.__markedListsListenerSetup`, and the global `document`
  `change` listener.
- **Deprecated options.** `onCheckboxChange` is ignored, and a one-time warning says so.
- **CSS.** The stylesheet draws the checkbox (`.mx-lists-task`).

```js
// 18.0
marked.use(markedExtendedLists({ interactiveCheckboxes: true, onCheckboxChange: (d) => save(d) }));
// 19
marked.use(markedExtendedLists({ interactiveCheckboxes: true }));
container.addEventListener('marked-extended:lists:toggle', (e) => save(e.detail));
attachLists(container);
```

### Slide

- **Markup.** Configuration is carried in `mx-slide-*` class tokens. Controls are `span[role=button]` elements with
  CSS icons. Background images are `<img class="mx-slide-bg">`, and only `http(s)` and relative URLs are accepted.
  Colors and gradients become a validated token. There is no `id`, `style`, `data-*`, `<button>`, `<svg>`, `<meta>`
  or `<style>`. Without the runtime, every slide is shown stacked. Ids are content hashes instead of `Math.random`.
- **Runtime.** `attachSlides(root, { hash? })` gives every presentation in the root its own state, with controls,
  keyboard, swipes, autoplay, overview and fullscreen. The keyboard only responds when the presentation has focus.
- **Removed.** The injected `<script>`, `window.presentation`, `window.__presentationState__`,
  `window.initPresentation`, `window.__speakerChannel__`, the global `keydown`/`hashchange` listeners, the speaker
  popup, and every `console.log`.
- **Events.** `slidechange` → `marked-extended:slide:change`. The new event is cancelable, and its detail is
  `{ id, index, previousIndex, total }`. New: `marked-extended:slide:overview` and `marked-extended:slide:speaker`.
  The speaker popup is replaced by the `marked-extended:slide:speaker` event.
- **Deprecated options.** `injectScript` and `scriptNonce` are ignored, and a one-time warning says so.

```js
// 18.0: the script ran by itself
document.addEventListener('slidechange', (e) => log(e.detail.currentSlide));
// 19
container.addEventListener('marked-extended:slide:change', (e) => log(e.detail.index));
attachSlides(container);
```

### Spoiler

- **Markup.** There is no `id`, `data-spoiler`, `data-*`, inline `style` or `<svg>`. The id and `data-*` values
  become `mx-spoiler-*` tokens. Particles are positioned by `spoiler-theme.css`, not by `Math.random`. Ids are content
  hashes.
- **Runtime.** `attachSpoilers(root)` handles click and Enter/Space reveal.
- **Removed.** Initialisation at import time, with its `document` listeners. `initSpoilers` and `destroySpoilers`
  are gone.
- **Events.** `spoiler:toggle` → `marked-extended:spoiler:toggle`, with the detail `{ id, expanded }`.
- **CSS.** The theme overlay and reveal icon come from `spoiler.css`, and the particles from `spoiler-theme.css`.

```js
// 18.0
import { initSpoilers } from '@fsegurai/marked-extended-spoiler';
initSpoilers();
// 19
import { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
const dispose = attachSpoilers(container);
```

### Tables

- **Markup.** A bottom caption adds the class `mx-tables-caption-bottom` instead of `data-caption-bottom`.
- **Runtime.** None.
- **CSS.** Selectors that target `[data-caption-bottom]` need `.mx-tables-caption-bottom`.

### Tabs

- **Markup.** Radio `<input>`s, `<label for>` tabs, the generated `<style>` block, `id`s and `data-tabs-*` are
  replaced by a WAI-ARIA tablist: `div.mx-tabs`, `role="tablist"`, `<span role="tab">` tabs, and
  `<div role="tabpanel">` panels with `hidden` on the inactive ones. Animations are shipped CSS
  (`.mx-tabs-animation-fade|slide`). Ids are content hashes instead of `tabs-container-N`.
- **Runtime.** `attachTabs(root, { persistSelection?, storageKey?, storage? })` handles click, arrow keys, Home/End and
  Enter/Space, sets the ids and ARIA links, and persists the selection. Without the runtime, tabs render statically
  with the first one selected.
- **Removed.** `window.initMarkedExtendedTabs`, `window.__markedExtendedTabsRuntimeReady__`, the `document` listeners
  and the `body` observer. `registerCallbacks` is gone.
- **Events.** `tab-switched` → `marked-extended:tabs:switch`. New: `marked-extended:tabs:before-switch`, which is
  cancelable.
- **Deprecated options.** The `onBeforeSwitch` and `onAfterSwitch` extension options are ignored. `attachTabs`
  accepts them, also deprecated.
- **Storage key.** `marked-extended-tabs-active-tabs-container-N` → `marked-extended-tabs:[<storageKey>:]<tabs id>`.

```js
// 18.0
marked.use(markedExtendedTabs({ onAfterSwitch: (e) => log(e) }));
// 19
marked.use(markedExtendedTabs());
container.addEventListener('marked-extended:tabs:switch', (e) => log(e.detail));
attachTabs(container);
```

### Timeline

- **Markup.** Container and event ids become class tokens (`mx-timeline-id-…`), `data-group-index` becomes
  `mx-timeline-groupIndex-…`, and the collapse `<button>` becomes `<span role="button" tabindex="0">`. Container ids
  are content hashes, not a module counter.
- **Runtime.** `attachTimeline(root, { updateHash?, copyAnchorLinks?, followInitialHash? })` handles collapse,
  anchors, the initial hash, and the reveal animation.
- **Removed.** `initTimelineCollapse`, `initTimelineReveal`, `initTimelineAnchors`, `initTimelineAnchorsClicks`,
  `initAllTimelineInteractions`, and the matching `destroy*` functions.
- **Events.** `timeline:collapse` → `marked-extended:timeline:collapse`. New: `marked-extended:timeline:anchor`.

```js
// 18.0
initAllTimelineInteractions();
// 19
const dispose = attachTimeline(container);
```

### Typographic

No changes: its output was already sanitizer-safe.

### Bundle

- Re-exports every runtime and the new `attachAll`. `initSpoilers`, `destroySpoilers`, `registerCallbacks` and the
  timeline `init*`/`destroy*` functions are no longer exported.
- Adds `markedExtendedCode` and its helpers (`attachCode`, `wrapLines`, `applyPrismAttributes`, `parseFenceMeta`,
  `applyMagicComments`).

## Checklist

1. Upgrade every `@fsegurai/marked-extended-*` package to 19.0.0-beta.0 together, and keep `marked ^18`.
2. Call `attachAll(root)` (or the `attachX` you need) after inserting the HTML, call `refresh()` after replacing it,
   and call `dispose()` on teardown.
3. Replace removed globals and `init*` calls with the runtimes.
4. Listen for the `marked-extended:<pkg>:<event>` events instead of the old event names and callbacks.
5. Move deprecated extension options (`onEmbedLoad`, `onCheckboxChange`, `onBeforeSwitch`, `smoothScroll`…) to the
   runtime options or the events.
6. Load each package's CSS: icons, tabs animations and kanban views now depend on it.
7. Update custom CSS that targets `id`s or `data-*` attributes so it targets the class tokens instead, or set
   `unsafeHtml: true` to keep the 18.0 markup.
