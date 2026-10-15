---
label: Plain JavaScript
description: Register all 13 extensions from the 18.0.0 bundle on one Marked instance, load their CSS and start the spoiler, timeline and kanban helpers.
order: 1
tags: [ "examples", "javascript" ]
keywords: [ "vanilla", "bundle", "all extensions", "initSpoilers" ]
---

# Plain JavaScript

```bash
npm install marked@^18 @fsegurai/marked-extended-bundle@18.0.0
```

```js
import { Marked } from 'marked';
import {
  enableKanbanDragDrop,
  initAllTimelineInteractions,
  initSpoilers,
  markedExtendedAccordion,
  markedExtendedAlert,
  markedExtendedComments,
  markedExtendedEmbeds,
  markedExtendedFootnote,
  markedExtendedKanban,
  markedExtendedLists,
  markedExtendedSlide,
  markedExtendedSpoiler,
  markedExtendedTables,
  markedExtendedTabs,
  markedExtendedTimeline,
  markedExtendedTypographic,
} from '@fsegurai/marked-extended-bundle';

// Styles: import the CSS of the packages you use, for example:
import '@fsegurai/marked-extended-tabs/styles/tabs.css';
import '@fsegurai/marked-extended-alert/styles/alert.css';

const marked = new Marked().use(
  markedExtendedAccordion(),
  markedExtendedAlert(),
  markedExtendedComments(),
  markedExtendedEmbeds(),
  markedExtendedFootnote(),
  markedExtendedKanban(),
  markedExtendedLists(),
  markedExtendedSlide(),
  markedExtendedSpoiler(),
  markedExtendedTables(),
  markedExtendedTabs(),
  markedExtendedTimeline(),
  markedExtendedTypographic(),
);

const container = document.querySelector('#content');
container.innerHTML = marked.parse(markdown);

// Spoiler reveal: idempotent; call it even though the module tries to run it on import.
initSpoilers();

// Timeline collapse, reveal and anchors are opt-in.
initAllTimelineInteractions(container);

// Kanban drag and drop is opt-in; keep the cleanup function.
const disableDragDrop = enableKanbanDragDrop(container);
```

## What runs without a call

| Extension | Behavior |
|-----------|----------|
| Tabs | Calling `markedExtendedTabs()` in a browser installs a document-level runtime once; switching itself is CSS-only (radio inputs plus a scoped `<style>`). |
| Spoiler | Importing the package in a browser calls `initSpoilers()` (document click and keydown delegation). The package declares `"sideEffects": false`, so a bundler may drop that call: call `initSpoilers()` yourself. |
| Slide | Calling `markedExtendedSlide()` in a browser appends one navigation `<script>` to `document.body` (`injectScript: true` by default; `scriptNonce` for CSP). It drives the first deck on the page. |
| Kanban | View buttons use inline `onclick` handlers. |
| Footnote | With `smoothScroll` (default), each factory call adds one `document` click listener. |
| Lists | With `interactiveCheckboxes`, a delegated `document` change listener and `window.markedListsCallback`. |

Everything is listed in [Browser Behavior](../guides/browser-behavior.md).

## Without a bundler

Load the UMD build of each package you use. Every global is a namespace with the extension on `default`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@18/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-alert@18.0.0/dist/index.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tabs@18.0.0/dist/index.umd.js"></script>
<script>
  marked.use(markedExtendedAlert.default(), markedExtendedTabs.default());
  document.getElementById('content').innerHTML = marked.parse(document.getElementById('source').textContent);
</script>
```

The bundle's UMD build does not inline the extensions: it expects `marked` and every `markedExtended<Name>` global
to be loaded first. With script tags, the per-package builds are simpler.

## Next step

- [Frameworks](frameworks.md)
