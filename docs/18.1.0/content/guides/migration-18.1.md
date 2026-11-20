---
label: Migrating to 18.1
description: Every breaking change from 18.0.x to 18.1.0, a minor release with breaking changes, with the runtime contract, framework examples, per-package notes and class renames.
order: 6
tags: [ "guides", "migration" ]
keywords: [ "upgrade", "breaking changes", "18.0.x", "18.1.0", "unsafeHtml", "attachAll", "mx- classes" ]
---

# Migrating from 18.0.x to 18.1.0

> **⚠️ 18.1.0 is a minor version that contains breaking changes.**
>
> - **`^18` ranges pick it up automatically.** A dependency written as `^18.0.0` installs 18.1.0 on the next
>   install or lockfile refresh. Pin `~18.0.0` (or exactly `18.0.0`) to stay on the 18.0 behavior until you have
>   followed this guide.
> - **The peer stays `marked ^18`.**

This guide covers every breaking change of `@fsegurai/marked-extended-*` 18.1.0 (every package, including the new
`code`, `core`, `inline`, `source-map`, `toc` and `wikilinks` packages). The examples show the 18.1.0 markup. The full
list is in the [CHANGELOG](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md).

`comments` and `embeds` declared `marked >=17.0.0` in 18.0 and now require `^18`, like every other package.

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
- [Classes, extension contract and behavior changes](#classes-extension-contract-and-behavior-changes)
  - [Class names and custom properties](#class-names-and-custom-properties)
  - [Extension contract](#extension-contract)
  - [Behavior changes per package](#behavior-changes-per-package)
  - [Class renames per package](#class-renames-per-package)
  - [Classes for blocks your host rendered itself](#classes-for-blocks-your-host-rendered-itself)
  - [New options](#new-options)
- [Checklist](#checklist)

## What changed and why

In 18.0, several packages produced markup that strict HTML sanitizers remove, such as Angular's
`SecurityContext.HTML`. They also ran browser code on their own:

- **Removed by sanitizers:** `id`, `for`, `name`, `style`, `data-*`, `on*` attributes, and the `input`, `button`,
  `svg`, `iframe`, `form`, `script` and `style` elements. Tabs stopped working entirely after sanitizing, and slide,
  kanban, embeds and lists were partly broken.
- **Page-wide side effects:** listeners on `document`, observers on `body`, `window.*` globals, an injected
  `<script>`, inline `onclick` handlers, and initialisation at import time.

In 18.1.0, every package follows one contract:

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
- **Runtime.** `attachAccordion(root, { allowedDataAttributes? })` handles exclusive groups, the animation CSS
  variables, restoration of the allow-listed `data-*` attributes and `#id` links.
- **Events.** New: `marked-extended:accordion:toggle`.

```html
<!-- 18.0 -->
<details id="faq" class="marked-extended-accordion" name="billing" data-topic="plans" style="…">
<!-- 18.1.0 -->
<details class="mx-accordion mx-accordion-id-faq mx-accordion-group-billing mx-accordion-dataTopic-plans">
```

### Alert

- **Markup.** Built-in icons are CSS mask icons (`<span class="mx-alert-icon mx-alert-icon-<type>">`) instead of
  inline `<svg>` (the `icon: 'class'` default; `icon: 'svg'` keeps the inline `<svg>`). Custom icons are unchanged.
- **Runtime.** None.
- **CSS.** Load `alert.css` to draw the icons. The default alert is tighter: `--mx-alert-padding` is `0.5em 1em`
  (18.0: `--marked-extended-alert-padding: 0 1em`), the title has
  `margin: 0 0 var(--mx-alert-title-margin-bottom, 0.5rem)`, and the first and last blocks of `.mx-alert-content` have
  no outer margin, so page prose margins no longer open a gap above the body. Set `--mx-alert-padding` and
  `--mx-alert-title-margin-bottom` to restore your spacing.

```html
<!-- 18.0 -->
<svg class="marked-extended-alert-icon" viewBox="0 0 16 16">…</svg>
<!-- 18.1.0 -->
<span class="mx-alert-icon mx-alert-icon-note"></span>
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

Load `code.css` for line highlighting and group tabs. `attachCode` writes Prism's `data-line` by default; pass
`prismLineHighlight: 'skip'` or `'remove'` when your page uses `data-line` for something else.

### Comments

- **Markup.** `id`, `data-comment-*`, `data-reply-to` and custom `data-*` become `mx-comments-*` class tokens. Type
  icons are CSS icons (`<span class="mx-comments-glyph mx-comments-icon-<type>">`). The default inline and block templates
  changed.
- **Runtime.** `attachComments(root, { allowedDataAttributes? })` restores the comment metadata (`data-comment-*`,
  `data-reply-to`), restores custom `data-*` only for allow-listed names, and handles reply-link navigation.
- **Events.** New: `marked-extended:comments:navigate`.
- **Options.** `onVisibilityChange` and `onStatusChange` are still parse-time callbacks.

### Core (new)

`@fsegurai/marked-extended-core` holds the shared helpers: `hashId`, `escapeHtml`, class tokens, `defineRuntime`,
the event helpers and the heading slugger (`slugifyHeading`, `createSlugger`, `isSafeHeadingId`,
`DEFAULT_RESERVED_HEADING_IDS`). The other packages bundle it into their builds, so you only install it to build your own
extensions on the same contract.

### Embeds

- **Markup.** The default output has no `<iframe>`, `id`, `style` or `data-*`. Each embed is a click-to-load
  placeholder (`div.mx-embeds` with `role="button"`) plus a fallback link to the provider page that works without
  JavaScript. Nothing is requested from the provider until the reader activates the embed.
- **Runtime.** `attachEmbeds(root, { autoload?, privacy?, trustedOrigins?, timeout?, allowedDataAttributes? })`
  creates a sandboxed iframe and restores the allow-listed `data-*` attributes. The player URL is rebuilt from a per-provider allowlist, never taken from the Markdown. The generic
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
// 18.1.0
marked.use(markedExtendedEmbeds());
container.addEventListener('marked-extended:embeds:load', (e) => track(e.target));
attachEmbeds(container);
```

#### Stricter iframe sandbox

In 18.0 every iframe got `allow-scripts allow-same-origin allow-popups allow-presentation`. In 18.1.0 the generic
`iframe` and `pdf` embeds no longer get `allow-same-origin`: their default `sandbox` is
`allow-scripts allow-popups allow-presentation`. The allowlisted third-party players (YouTube, Vimeo, CodePen,
Figma…) keep `allow-scripts allow-same-origin allow-popups allow-presentation`, and `attachEmbeds` never gives
`allow-same-origin` to a URL on the page's own origin.

A framed page that needs its own origin (storage, cookies) can get it back with the new `sandbox` option:

```js
// For every embed of this extension (carried in an mx-embeds-sandbox-* class token)
marked.use(markedExtendedEmbeds({ sandbox: 'allow-scripts allow-same-origin allow-popups' }));
// Or from the host, which wins over the class token
attachEmbeds(container, { sandbox: ['allow-scripts', 'allow-same-origin'] });
```

`sandbox` takes `allow-*` keywords as a list or a space-separated string, `[]` for the strictest sandbox, or `false`
for no `sandbox` attribute. It replaces `enableSandbox` and `sandboxPermissions`, which still work; `sandbox` wins
when both are set.

### Footnote

- **Markup.** There are no `id` targets and no `data-fnref-*`, `data-footnotes` or `data-footnote-preview`
  attributes. Targets carry `mx-footnote-id-<id>`, references get the `mx-footnote-ref` class, and definitions get
  `tabindex="-1"`. The section and the references are named with `aria-label` instead of `aria-labelledby`.
- **Runtime.** `attachFootnotes(root, { smoothScroll?, scrollOffset?, updateHash? })` handles anchor navigation,
  scrolling with an offset, and hover previews.
- **Removed.** The `document` click listener that `setupSmoothScroll` added when the extension was created.
  `history.pushState` is only called with `updateHash: true`.
- **Events.** New: `marked-extended:footnote:navigate`.
- **Removed options.** The `smoothScroll` and `scrollOffset` extension options are removed from `FootnoteOptions`;
  passing them still prints a one-time warning. Pass them to
  `attachFootnotes`.
- **CSS.** `.mx-is-targeted` stands in for `:target`. The stylesheet covers both markups.

### Kanban

- **Markup.** There are no inline `onclick` handlers, no `<script type="application/json">` view store, and no
  `<button>`, `id`, `style`, `data-*` or `draggable`. Every view is in the markup, and the `mx-kanban-view-<view>`
  class selects one with CSS, so the initial view works without JavaScript. Columns, cards and priorities carry
  `mx-kanban-*` tokens. The default template gains a `{tokenClasses}` placeholder.
- **Runtime.** `attachKanban(root, { dragAndDrop?, keyboard?, allowedDataAttributes? })` handles view switching,
  drag and drop, and Alt+Arrow keyboard moves. It also applies non-palette colors and restores the allow-listed
  board `data-*` attributes.
- **Events.** `attachKanban` dispatches only `marked-extended:kanban:move`, which is cancelable and is dispatched
  before the card moves; listen for it instead of `kanban:move`. `applyMove` and the deprecated `enableKanbanDragDrop`
  dispatch it too and, for compatibility, still dispatch the legacy `kanban:move` after the move. New:
  `marked-extended:kanban:view` and `marked-extended:kanban:collapse`.
- **Removed globals.** `window.updateMarkdownFromKanbanMove`.
- **Deprecated.** `enableKanbanDragDrop` is a deprecated entry point that prints a one-time warning. It runs
  `attachKanban` and also dispatches the legacy `kanban:move`. The `onMove` extension option is ignored.
- **Other.** Card text is rendered with the caller's `Marked` instance. Board ids hash the fence, and repeated
  boards get `-2`, `-3`… `unsafeHtml` keeps the 18.0 markup without its `onclick` handlers.
- **CSS.** Palette colors are shipped as CSS (`--mx-kanban-palette-<name>`).

### Lists

- **Markup.** Task checkboxes are `<span class="mx-lists-task …" role="checkbox" aria-checked>`, not
  `<label for><input type="checkbox" id></label>`. Interactive ones carry `tabindex="0"` and the tokens
  `mx-lists-line-…`, `mx-lists-offset-…` and `mx-lists-raw-…`. Unordered task lists get `class="mx-lists-task-list"`
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
// 18.1.0
marked.use(markedExtendedLists({ interactiveCheckboxes: true }));
container.addEventListener('marked-extended:lists:toggle', (e) => save(e.detail));
attachLists(container);
```

#### Blank lines and bullet characters

List boundaries and looseness now follow Marked, so the HTML of some documents changes. Review stored or exported HTML
and the CSS that targets list paragraphs.

| Markdown | 18.0.x | 18.1.0 (as Marked) |
|----------|--------|--------------------|
| `a. one\nb. two\n\nAfter` | `After` joined the last item (`<li>twoAfter</li>`) | `After` is a paragraph after the list |
| `1. one\n\n   more\n2. two` | `<li>onemore</li>` | A loose list: `<li><p>one</p><p>more</p></li>` |
| `- a\n* b` | One list | Two lists: a different bullet character (`-`, `*`, `+`) starts a new list |

A blank line followed by a line that is not indented into the item ends the list; a blank line between items, or
between two blocks of one item, makes the list loose (its items hold paragraphs).

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
- **Removed options.** `injectScript` and `scriptNonce` are removed from `SlideOptions`; passing them still prints a
  one-time warning.

```js
// 18.0: the script ran by itself
document.addEventListener('slidechange', (e) => log(e.detail.currentSlide));
// 18.1.0
container.addEventListener('marked-extended:slide:change', (e) => log(e.detail.index));
attachSlides(container);
```

### Spoiler

- **Markup.** There is no `id`, `data-spoiler`, `data-*`, inline `style` or `<svg>`. The id and `data-*` values
  become `mx-spoiler-*` tokens. Particles are positioned by `spoiler-theme.css`, not by `Math.random`. Ids are content
  hashes.
- **Runtime.** `attachSpoilers(root, { allowedDataAttributes? })` handles click and Enter/Space reveal, and restores
  custom `data-*` front-matter values only for allow-listed names.
- **Removed.** Initialisation at import time, with its `document` listeners. `initSpoilers` and `destroySpoilers`
  are gone.
- **Events.** `spoiler:toggle` → `marked-extended:spoiler:toggle`, with the detail `{ id, expanded }`.
- **CSS.** The theme overlay and reveal icon come from `spoiler.css`, and the particles from `spoiler-theme.css`.

```js
// 18.0
import { initSpoilers } from '@fsegurai/marked-extended-spoiler';
initSpoilers();
// 18.1.0
import { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
const dispose = attachSpoilers(container);
```

### Tables

- **Markup.** A bottom caption adds the class `mx-tables-caption-bottom` instead of `data-caption-bottom`. The
  table has the class `mx-tables`, and only `^^` merges a cell.
- **Runtime.** None.
- **CSS.** Selectors that target `[data-caption-bottom]` need `.mx-tables-caption-bottom`. The stylesheets no longer
  style bare `table` elements, only `.mx-tables`.

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
// 18.1.0
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
// 18.1.0
const dispose = attachTimeline(container);
```

### Typographic

No markup changes: its output was already sanitizer-safe. 18.1.0 changes how `breaks` and the boolean flags work
(see [below](#behavior-changes-per-package)) and how backtick quotes are configured.

Backtick quotes (` ``text'' ` → `“text”`) are their own group with a new `backticks` option, and `quotes` only
converts straight `"` and `'`:

- `quotes: false` turns off straight quotes only: add `backticks: false` to turn off backtick quotes too.
- `quotes: true` does not turn backtick quotes on: add `backticks: true` (or the attribute letter `b`).
- Unset, `attribute` decides, as before. The closing `''` is now converted to `”` (18.0.x rendered `’’`).

The unused `ProcessingOptions.backticks?: number` type field was removed.

### Bundle

- Re-exports every runtime and the new `attachAll`. `initSpoilers`, `destroySpoilers`, `registerCallbacks` and the
  timeline `init*`/`destroy*` functions are no longer exported.
- Adds `markedExtendedCode` and its helpers (`attachCode`, `wrapLines`, `applyPrismAttributes`, `parseFenceMeta`,
  `applyMagicComments`).
- Re-exports `inline`, `source-map`, `toc` and `wikilinks` and every package's constants and
  default labels. `attachAll` does not attach `attachSourceMap`, which needs the extension's per-parse `sourceMap`.

## Classes, extension contract and behavior changes

The "Before" columns describe 18.0.x.

### Class names and custom properties

Every package now uses one CSS convention. The old `marked-extended-*` classes and the unprefixed ones (`active`,
`tabs-pills`, `footnote-backref`, `spoiler-title`…) were removed **with no aliases**.

| Kind | Pattern | Example |
|------|---------|---------|
| Root | `mx-<pkg>` | `mx-tabs` |
| Part | `mx-<pkg>-<part>` | `mx-tabs-nav` |
| Modifier or variant | `mx-<pkg>--<modifier>` | `mx-tabs--pills` |
| State | `mx-is-<state>` | `mx-is-active` |
| Class token (unchanged) | `mx-<pkg>-<key>-<value>` | `mx-tabs-variant-pills` |
| Custom property | `--mx-<pkg>-<name>` | `--mx-tabs-border-radius` |

Update your stylesheets, `querySelector` calls and tests with the [tables below](#class-renames-per-package). The
`className` options keep working: they replace the `mx-<pkg>` root, and the parts and modifiers follow it. See
[Styling and theming](styling.md) for the custom properties.

### Extension contract

| Change | Before | After (18.1.0) |
|--------|--------|----------------|
| Factory export | Default export only (in most packages) | Default **and** named export `markedExtended<Name>`, returning `MarkedExtension` |
| Options type names | `CommentOptions`, `EmbedOptions`, `SpanTableOptions` | `CommentsOptions`, `EmbedsOptions`, `TablesOptions` (the old names stay as deprecated aliases) |
| User-visible strings | Hard-coded English, some options per string | `labels?: Partial<<Name>Labels>` (or a function returning it) over the exported frozen `default<Name>Labels`; HTML-escaped, never templates |
| Constants | Not exported | Frozen `UPPER_SNAKE` exports (`ALERT_VARIANTS`, `TABS_VARIANTS`, `KANBAN_VIEWS`, `SLIDE_LAYOUTS`…) |

`@fsegurai/marked-extended-core` is new (see [Core](#core-new)); `@fsegurai/marked-extended-core/internal` is not public
API.

`labels` also takes a function `() => Partial<Labels>`, so an app that switches language, or whose translations load
after the extension is created, needs no rebuild:

```js
marked.use(markedExtendedAlert({ labels: () => ({ note: t('alert.note') }) }));
```

Alert, kanban, slide and comments call it at each parse. The other packages with `labels` call it once, when the
extension is created.

```ts
// 18.0.x
import markedExtendedTables, { type SpanTableOptions } from '@fsegurai/marked-extended-tables';
// 18.1.0
import { markedExtendedTables, type TablesOptions } from '@fsegurai/marked-extended-tables';
```

### Behavior changes per package

Only the breaking or visible changes are listed; new options are in each extension page. `code` is a new package,
so it has no entries here.

| Package | Before | After (18.1.0) | What to do |
|---------|--------|----------------|------------|
| accordion | `data-*` front-matter values written as attributes | Carried as `mx-accordion-data*` class tokens; `attachAccordion` restores only the names in `allowedDataAttributes` (default `[]`), and forged tokens are ignored | `attachAccordion(root, { allowedDataAttributes: ['data-section'] })`. |
| alert | `[!TYPE]` detected after lexing, in `walkTokens` only | Detected while the blockquote is tokenized, so alerts work inside wrapper tokens (such as the source map); `walkTokens` still converts the rest | Nothing. The default template uses `{className}--{variant}`; custom templates that build `{className}-{variant}` need the double hyphen. |
| comments | Custom `data-*` front-matter values written as attributes | Carried as `mx-comments-data*` class tokens; `attachComments` restores the comment metadata and only the names in `allowedDataAttributes` (default `[]`) | List the custom `data-*` names you need: `attachComments(root, { allowedDataAttributes: ['data-ticket'] })`. |
| comments | Date-only metadata shifted a day west of UTC | Date-only values keep their calendar date in every time zone; `locale` and `timeZone` options | Set `locale` (and `timeZone`) when server and browser must agree. |
| embeds | `EmbedOptions` | `EmbedsOptions` (alias kept); `labels` | Rename the type. |
| embeds | `data-*` front-matter values written as attributes | Carried as `mx-embeds-data*` class tokens; `attachEmbeds` restores only the names in `allowedDataAttributes` (default `[]`), and forged tokens are ignored | `attachEmbeds(root, { allowedDataAttributes: ['data-track'] })`. |
| footnote | `smoothScroll` and `scrollOffset` extension options, applied by a `document` click listener | Removed from `FootnoteOptions`; a one-time warning remains | Pass them to `attachFootnotes(root, { smoothScroll, scrollOffset })`. |
| footnote | Footnote content rendered with the global `marked` | Rendered with the `Marked` instance being parsed | Register the extensions footnote content needs on that instance. |
| footnote | `description` option named the section | `labels.heading` (`description` is deprecated) | Use `labels: { heading: '…' }`. |
| kanban | Priority chips used `marked-extended-kanban-priority-<level>` | Chips use `mx-kanban-task-priority--<level>`, distinct from the card's tokens | Rename selectors. |
| kanban | Board `data-*` front-matter values written as attributes | Carried as `mx-kanban-data*` class tokens; `attachKanban` restores only the names in `allowedDataAttributes` (default `[]`), and forged tokens are ignored | `attachKanban(root, { allowedDataAttributes: ['data-board-id'] })`. |
| lists | `tasksOnly` did not exist | `tasksOnly: true` keeps Marked's lists and only renders the task checkboxes | Optional. |
| slide | `injectScript` and `scriptNonce` controlled the injected presentation script | Removed from `SlideOptions`; a one-time warning remains | Delete them. |
| spoiler | Custom `data-*` front-matter values written as attributes | Carried as `mx-spoiler-data*` class tokens; `attachSpoilers` restores only the names in `allowedDataAttributes` (default `[]`), and forged tokens are ignored | `attachSpoilers(root, { allowedDataAttributes: ['data-release'] })`. |
| tables | A cell ending in `^` or `^^` merged into the cell above, and `^^` left a stray ` ^` | Only `^^` merges, and the marker is removed completely; a single trailing `^` is text | Replace `\| ^ \|` row-span cells with `\| ^^ \|`. |
| tables | `handleComplexSpans` option; `TableCell.complexRowSpan`, `TableCell.relatedCell` | Removed; an unmergeable cell renders as a plain cell | Delete the option. |
| tables | `[Caption]`, a blank line, then the table: no caption | Renders a `<caption>` (one blank line at most) | Check pages that relied on the caption line staying a paragraph. |
| timeline | An event without `date` got the text `Event N`, which was then parsed as a date and could render as one | It renders `Event N` as text (`labels.untitledEvent`), never parsed | Override the label if needed. |
| timeline | An event with only front matter (`date: "2024-01-15"` and no body) rendered `Event N` and its front matter as text | It renders the date and an empty body | Nothing. |
| timeline | Date-only values (`2001-01`) shifted west of UTC | They keep their calendar date; `locale` and `timeZone` options | Set `locale` (and `timeZone`) when server and browser must agree. |
| typographic | `breaks: true` called `marked.setOptions` on the global `marked` | Applies only to the instance the extension is used on | Nothing, unless you relied on the global side effect. |
| typographic | `quotes`, `dashes` and `ellipses` were ignored unless `attribute` was `'0'` | Unset follows `attribute`; `true`/`false` force a group on or off. New `skipClasses` and `typographicTransform(html, options)` | Set `false` for the groups you do not want. |

New packages: `inline`, `source-map`, `toc` and `wikilinks`. See the
[release notes](../release-notes/18.1.0.md#new-packages).

### Class renames per package

Code, inline, source-map, toc and wikilinks are new and use the convention from the start; typographic emits no
classes.

#### Accordion

| Before | After |
|--------|-------|
| `marked-extended-accordion` | `mx-accordion` |
| `marked-extended-accordion-<variant>` | `mx-accordion--<variant>` |
| `marked-extended-accordion-header`, `-title`, `-icon`, `-content` | `mx-accordion-header`, `-title`, `-icon`, `-content` |
| `--marked-extended-accordion-*` | `--mx-accordion-*` |

#### Alert

| Before | After |
|--------|-------|
| `marked-extended-alert` | `mx-alert` |
| `marked-extended-alert-<type>` | `mx-alert--<type>` |
| `marked-extended-alert-title`, `-icon`, `-content` | `mx-alert-title`, `-icon`, `-content` |
| `octicon octicon-<name> mr-2` on built-in `<svg>` icons | removed (the `<svg>` carries no class) |
| `--marked-extended-alert-<name>` | `--mx-alert-<name>` |
| `{className}-{variant}` in the default template | `{className}--{variant}` |

#### Comments

| Before | After |
|--------|-------|
| `marked-extended-comment` (default `className`) | `mx-comments` |
| `marked-extended-comment-inline`, `-block` | `mx-comments--inline`, `mx-comments--block` |
| `marked-extended-comment-type-<type>`, `-status-<status>`, `-visibility-<v>`, `-priority-<p>` | `mx-comments--type-<type>`, `--status-<status>`, `--visibility-<v>`, `--priority-<p>` |
| `marked-extended-comment-reply` | `mx-comments--reply` |
| `marked-extended-comment-type-label` | `mx-comments-label` |
| other `marked-extended-comment-<part>` (`-content`, `-indicator`, `-header`, `-icon`, `-body`, `-metadata`, `-author`, `-date`, `-tags`, `-priority`, `-reply-link`, `-replies`) | `mx-comments-<part>` |
| `comment-content`, `comment-replies` | `mx-comments-main`, `mx-comments-thread` |
| `comment-icon` | `mx-comments-glyph` |
| `hidden` | `mx-is-hidden` |
| `--marked-comments-*` | `--mx-comments-*` |
| `--comment-accent` | `--mx-comments-accent` |

#### Embeds

| Before | After |
|--------|-------|
| `marked-extended-embed-container` | `mx-embeds` (+ `mx-embeds--media` when safe) |
| `marked-extended-embed-mermaid` | `mx-embeds--mermaid` |
| `marked-extended-embed-error` (container) | `mx-embeds--error` |
| `marked-extended-embed-<provider>` | `mx-embeds--<provider>` |
| `marked-extended-embed-iframe` | `mx-embeds-iframe` |
| `marked-extended-embed-<part>` (other parts) | `mx-embeds-<part>` |
| `--marked-embeds-*` | `--mx-embeds-*` |

#### Footnote

| Before | After |
|--------|-------|
| `footnotes` (section) | `mx-footnote` |
| `sr-only` (section heading) | `mx-footnote-heading` |
| `a[data-fnref-ref]` (reference, no class) | `mx-footnote-ref` |
| `footnote-backref` | `mx-footnote-backref` |
| `:target` (definition) | `mx-is-targeted` (set by `attachFootnotes`) |
| `--marked-footnote-<name>` | `--mx-footnote-<name>` |
| keyframes `footnote-fade-in`, `footnote-target-fade` | `mx-footnote-fade-in`, `mx-footnote-target-fade` |

#### Kanban

| Before | After |
|--------|-------|
| `marked-extended-kanban` | `mx-kanban` |
| `marked-extended-kanban-<part>` | `mx-kanban-<part>` |
| `marked-extended-kanban-column-over-limit` | `mx-kanban-column--over-limit` |
| `marked-extended-kanban-priority-<level>` (chip) | `mx-kanban-task-priority--<level>` |
| `active` | `mx-is-active` |
| `marked-extended-kanban-dragging` | `mx-is-dragging` |
| `marked-extended-kanban-drop-target` | `mx-is-drop-target` |
| `--kanban-*` (including the inline `--kanban-color`) | `--mx-kanban-*` |

#### Lists

| Before | After |
|--------|-------|
| `ul[data-task-list]` (attribute) | `mx-lists-task-list` |
| `--marked-lists-*` | `--mx-lists-*` |

#### Slide

| Before | After |
|--------|-------|
| `marked-extended-slide-<part>` | `mx-slide-<part>` |
| `marked-extended-slide-layout-<layout>` | `mx-slide-slide--<layout>` |
| `active`, `previous` (and `prev`), `next` | `mx-is-active`, `mx-is-previous`, `mx-is-next` |
| `overview-mode` (and `overview`) | `mx-is-overview` |
| `marked-extended-slide-keyboard-toggle`, `-speaker-toggle`, `keyboard-disabled-indicator` | removed with the injected script that created them |
| `--slide-*`, `--control-bg`, `--control-hover` | `--mx-slide-*` (`--mx-slide-control-bg`, `--mx-slide-control-hover`) |

#### Spoiler

| Before | After |
|--------|-------|
| `marked-extended-spoiler` (and every `marked-extended-spoiler-*` part) | `mx-spoiler` (`mx-spoiler-*`) |
| `spoiler-title` | `mx-spoiler-title` |
| `spoiler-theme-<theme>` | `mx-spoiler--<theme>` |
| `particle p<n>` | `mx-spoiler-particle mx-spoiler-particle-<n>` |
| `--spoiler-*` | `--mx-spoiler-*` |

#### Tables

| Before | After |
|--------|-------|
| bare `<table>` (no class) | `<table class="mx-tables">` |
| `marked-extended-table-wrapper` | `mx-tables-wrapper` |
| `.table-responsive` (stylesheet selector only) | removed: use `mx-tables-wrapper` |
| global `table …` selectors in the stylesheets | scoped to `.mx-tables …` |
| `table[data-caption-bottom]` (attribute) | `mx-tables-caption-bottom` |
| `--marked-extended-table-<name>` | `--mx-tables-<name>` |

#### Tabs

| Before | After |
|--------|-------|
| `marked-extended-tabs-container` | `mx-tabs` |
| `tabs-compact`, `tabs-vertical`, `tabs-pills` | `mx-tabs--compact`, `mx-tabs--vertical`, `mx-tabs--pills` |
| `marked-extended-tabs-nav`, `-label`, `-icon`, `-content`, `-content-pane`, `-input` | `mx-tabs-nav`, `-label`, `-icon`, `-content`, `-content-pane`, `-input` |
| `tab-label` | `mx-tabs-label-text` |
| `error-message` | `mx-tabs-error` |
| `active` | `mx-is-active` |
| `--marked-extended-tabs-*` | `--mx-tabs-*` |

The `localStorage` key of `persistSelection` changed too; see [Tabs](#tabs).

#### Timeline

| Before | After |
|--------|-------|
| `marked-extended-timeline-container` | `mx-timeline` |
| `marked-extended-timeline-event`, `-date`, `-subtitle`, `-content` | `mx-timeline-event`, `-date`, `-subtitle`, `-content` |
| `timeline-group-header`, `timeline-event-icon`, `timeline-anchor` | `mx-timeline-group-header`, `mx-timeline-event-icon`, `mx-timeline-anchor` |
| `timeline-collapse-btn`, `-icon`, `-content` | `mx-timeline-collapse-btn`, `-icon`, `-content` |
| `timeline-milestone`, `timeline-collapsible`, `timeline-has-range` | `mx-timeline--milestone`, `mx-timeline--collapsible`, `mx-timeline--has-range` |
| `timeline-centered`, `timeline-compact`, `timeline-colorful` | `mx-timeline--centered`, `mx-timeline--compact`, `mx-timeline--colorful` |
| `active`, `expanded` | `mx-is-active`, `mx-is-expanded` |
| `timeline-anchor-highlight`, `timeline-anchor-copied` | `mx-is-highlighted`, `mx-is-copied` |
| `error-message` | `mx-timeline-error` |
| `--marked-extended-timeline-*` | `--mx-timeline-*` |

### Classes for blocks your host rendered itself

Hosts that rendered a table of contents, task checkboxes, inline marks or wiki links themselves on 18.0, and move to
the `toc`, `inline` or `wikilinks` packages or the `lists` task boxes, get these classes. Update stored or exported
pages and their CSS:

| Block | 18.0.x (host markup or `lists` 18.0) | 18.1.0 |
|-------|---------------------------------------|--------|
| Table of contents | Your own `nav` / list classes | `nav.mx-toc` (`aria-label`), `p.mx-toc-title`, `ul.mx-toc-list`, `li.mx-toc-item.mx-toc-level-<n>`, `a.mx-toc-link` |
| Task checkbox | `<label><input type="checkbox" id disabled data-task-checkbox>` (+ `checkboxClass`) | `<span class="mx-lists-task" role="checkbox" aria-checked>` (+ `checkboxClass`); read-only boxes carry `aria-disabled="true"`, `interactiveCheckboxes: 'attached'` boxes `mx-lists-task--attached` |
| Task list | `<ul data-task-list>` | `<ul class="mx-lists-task-list">` |
| Highlight, insert, superscript, subscript | Your own `mark` / `ins` / `sup` / `sub` classes | `mx-inline-mark`, `mx-inline-ins`, `mx-inline-sup`, `mx-inline-sub` |
| Wiki links | Your own link classes | `mx-wikilinks-link`, `mx-wikilinks--unresolved` |

### New options

Additive; nothing to change unless you want them.

- **Lists:** `tasksOnly`, `interactiveCheckboxes: 'attached'` (boxes read-only until `attachLists` runs),
  `lineOffset` (task lines counted from the document start); a toggle keeps a host-set `aria-label`.
- **Embeds:** `sandbox` (see [Stricter iframe sandbox](#stricter-iframe-sandbox)), `thumbnails`.
- **Footnote:** `footnoteTokenClass(id)` returns the class of the element whose 18.0 `id` was `id`.
- **Typographic:** `backticks`, `skipClasses` and the `typographicTransform(html, options)` export.
- **Timeline and comments:** `locale` and `timeZone`.
- **Themes:** the accordion, alert, comments, embeds, footnote, kanban, lists, slide (unnamed theme), spoiler,
  tables, tabs and timeline themes derive their colors from optional `--mx-*` base tokens
  (`--mx-text`, `--mx-border`, `--mx-accent`…); with none set, every default is unchanged. See the core README,
  *Design tokens (base set)*.

## Checklist

1. Upgrade every `@fsegurai/marked-extended-*` package to 18.1.0 together, and keep `marked ^18`. Until you are done,
   pin `~18.0.0` to stay on 18.0.
2. Call `attachAll(root)` (or the `attachX` you need) after inserting the HTML, call `refresh()` after replacing it,
   and call `dispose()` on teardown. Attach `attachSourceMap` yourself if you use the source map.
3. Replace removed globals and `init*` calls with the runtimes.
4. Listen for the `marked-extended:<pkg>:<event>` events instead of the old event names and callbacks.
5. Move removed or deprecated extension options (`onEmbedLoad`, `onCheckboxChange`, `onBeforeSwitch`, `smoothScroll`,
   `scrollOffset`…) to the runtime options or the events; delete `injectScript`, `scriptNonce` and
   `handleComplexSpans`.
6. Load each package's CSS: icons, tabs animations and kanban views now depend on it.
7. Rename every `marked-extended-*`, unprefixed state class and old custom property to the `mx-` names
   ([tables](#class-renames-per-package)), including the classes of blocks your host rendered itself
   ([TOC, task boxes, inline marks, wiki links](#classes-for-blocks-your-host-rendered-itself)).
8. Update custom CSS that targets `id`s or `data-*` attributes so it targets the class tokens instead, or set
   `unsafeHtml: true` to keep the 18.0 markup; list the `data-*` names the accordion, comments, embeds, kanban and
   spoiler runtimes may restore in `allowedDataAttributes`.
9. Replace `| ^ |` table row spans with `| ^^ |`, and use the new option type names (`TablesOptions`,
   `CommentsOptions`, `EmbedsOptions`).
10. Review stored HTML for the [list](#blank-lines-and-bullet-characters) changes, add `backticks: false` where you
    set `quotes: false`, pass `sandbox` if a generic `iframe`/`pdf` embed needs `allow-same-origin`, and check the
    [alert spacing](#alert).
