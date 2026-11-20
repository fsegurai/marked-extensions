---
label: Plain JavaScript
description: Register all 13 extensions from the 17.0.0 bundle on one Marked instance and load their CSS.
order: 1
tags: [ "examples", "javascript" ]
keywords: [ "vanilla", "bundle", "all extensions" ]
---

# Plain JavaScript

```bash
npm install marked@^17 @fsegurai/marked-extended-bundle@17.0.0
```

```js
import { Marked } from 'marked';
import {
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

document.querySelector('#content').innerHTML = marked.parse(markdown);
```

There is nothing to call after rendering: 17.0.0 exports no browser helpers.

## What runs without a call

| Extension | Behavior |
|-----------|----------|
| Tabs | Calling `markedExtendedTabs()` in a browser installs a document-level runtime once; switching itself is CSS-only (radio inputs plus a scoped `<style>`). |
| Slide | Calling `markedExtendedSlide()` in a browser appends one navigation `<script>` to `document.body`. It drives the first deck on the page. |
| Kanban | View buttons use inline `onclick` handlers. |
| Lists | With `interactiveCheckboxes`, each checkbox has an inline `onclick`. |
| Spoiler | Each spoiler carries an inline `<script>`, which does not run under `innerHTML`; CSS hover and focus still reveal it. |
| Footnote | With `smoothScroll` (default), each factory call adds one `document` click listener. |

Everything is listed in [Browser Behavior](../guides/browser-behavior.md).

## Without a bundler

Load the UMD build of each package you use. Every global is a namespace with the extension on `default`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@17/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-alert@17.0.0/dist/index.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tabs@17.0.0/dist/index.umd.js"></script>
<script>
  marked.use(markedExtendedAlert.default(), markedExtendedTabs.default());
  document.getElementById('content').innerHTML = marked.parse(document.getElementById('source').textContent);
</script>
```

The bundle's UMD build does not inline the extensions: it expects `marked` and every `markedExtended<Name>` global
to be loaded first.

## Next step

- [Frameworks](frameworks.md)
