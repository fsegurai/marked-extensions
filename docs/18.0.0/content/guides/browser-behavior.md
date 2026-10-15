---
label: Browser Behavior
description: Which 18.0.0 extensions run code in the browser, what they attach at import or factory time, which helpers you call, and what that means for SSR, sanitizers and frameworks.
order: 1
tags: [ "guides", "browser" ]
keywords: [ "initSpoilers", "registerCallbacks", "initAllTimelineInteractions", "enableKanbanDragDrop", "side effects", "ssr" ]
---

# Browser Behavior

18.0.0 has no shared runtime contract. Six extensions are static HTML; the others either install document-level
behavior on their own or export helpers you call after inserting the HTML.

## Quick path

```js
import { initSpoilers } from '@fsegurai/marked-extended-spoiler';
import { initAllTimelineInteractions } from '@fsegurai/marked-extended-timeline';

container.innerHTML = marked.parse(markdown);
initSpoilers();                          // idempotent
initAllTimelineInteractions(container);  // collapse, reveal, anchors
```

## Per extension

| Extension | Happens on its own | You call | Globals and events |
|-----------|--------------------|----------|--------------------|
| accordion, alert, comments, embeds, tables | nothing | nothing | none |
| typographic | `breaks: true` calls `marked.setOptions({ breaks: true })` on the global `marked` | nothing | none |
| footnote | With `smoothScroll` (default `true`), every factory call adds a `document` click listener that scrolls, calls `history.pushState` and focuses the target | nothing | none |
| tabs | Calling the factory in a browser installs a runtime once: `document` `change`/`keydown`/`focusin` listeners and a `MutationObserver` on `document.body`. Each block's HTML has a scoped `<style>`; switching is CSS-only through radio inputs. Selection can persist in `localStorage` | `registerCallbacks(ref, { onBeforeSwitch, onAfterSwitch })` if you need callbacks outside the factory options | `window.__markedExtendedTabsRuntimeReady__`, `window.initMarkedExtendedTabs`; `tab-switched` event |
| spoiler | Importing the module in a browser calls `initSpoilers()` (document click and keydown delegation) | `initSpoilers()` / `destroySpoilers()`; call `initSpoilers()` yourself because `"sideEffects": false` lets bundlers drop the import-time call | `spoiler:toggle` event with `{ id, expanded }` |
| timeline | nothing | `initTimelineCollapse`, `initTimelineReveal`, `initTimelineAnchors`, `initTimelineAnchorsClicks`, or `initAllTimelineInteractions(container?)`, and the matching `destroy*` | `timeline:collapse` event; the anchors helper adds a `hashchange` listener that is never removed |
| kanban | View buttons carry inline `onclick` handlers; each board has a `<script type="application/json">` with its views | `enableKanbanDragDrop(root, options?)` returns a cleanup function | `kanban:move` event; `applyMoveToMarkdown(source, detail)` writes a move back to Markdown |
| lists | With `interactiveCheckboxes`, one delegated `document` change listener | `enableListsEditing(root, options?)`, `enableSourceListEditing(textarea)` return cleanup functions | `window.markedListsCallback`, `window.__markedListsListenerSetup` |
| slide | With `injectScript: true` (default), the factory appends `<script id="marked-extended-slide-script">` to `document.body` once; `scriptNonce` sets its CSP nonce | nothing | `window.presentation`, `window.initPresentation`, `window.__presentationState__`, `window.__speakerChannel__`; `slidechange` event |

Event names are plain (`spoiler:toggle`, `kanban:move`…), not the `marked-extended:<pkg>:<event>` names of 19.0.0.
Details and option names are on each [extension page](../extensions/README.md).

## Known limits

| Limit | Effect |
|-------|--------|
| Slide script drives one deck | Only the first `.marked-extended-slide-presentation` on the page is navigated. |
| Timeline collapse class | `initTimelineCollapse` finds events only with the default `marked-extended-timeline-event` class. |
| `<script>` in `innerHTML` | Browsers do not run scripts inserted with `innerHTML`; the slide script is appended with DOM APIs, so it runs, but only when the factory is called in the browser. |
| Footnote listeners accumulate | Each `markedExtendedFootnote()` call adds another `document` listener; create the extension once. |

## Server-side rendering and sanitizers

- The browser code in tabs, slide, footnote, lists, spoiler, kanban and timeline checks `typeof window` /
  `typeof document` first, so imports and `marked.parse` run on the server. The browser behavior is then simply
  missing: call the `init*` / `enable*` helpers in the browser, and note that the slide script and tabs runtime are
  installed only when the factory runs in a browser.
- The markup uses `id`, `data-*`, inline `style`, inline `<svg>`, radio inputs, inline `onclick`, `<style>` and
  JSON `<script>` elements. Strict sanitizers remove some of them and break tabs, kanban views and spoiler colors.
  Render 18.0.0 output only from trusted Markdown, or allow those attributes and elements explicitly.

## Next step

- [Styling and theming](styling.md)
