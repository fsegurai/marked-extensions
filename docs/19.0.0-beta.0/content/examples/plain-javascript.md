---
label: Plain JavaScript
description: Register all 14 extensions from the bundle on one Marked instance, attach every runtime with attachAll, refresh after re-rendering and dispose.
order: 1
tags: [ "examples", "javascript" ]
keywords: [ "vanilla", "bundle", "attachAll", "all extensions" ]
---

# Plain JavaScript

```bash
npm install marked@^18 @fsegurai/marked-extended-bundle
```

```js
import { Marked } from 'marked';
import {
  attachAll,
  markedExtendedAccordion,
  markedExtendedAlert,
  markedExtendedCode,
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
  markedExtendedCode(),
  markedExtendedComments(),
  markedExtendedEmbeds(),
  markedExtendedFootnote(),
  markedExtendedKanban(),
  markedExtendedLists({ interactiveCheckboxes: true }),
  markedExtendedSlide(),
  markedExtendedSpoiler(),
  markedExtendedTables(),
  markedExtendedTabs(),
  markedExtendedTimeline(),
  markedExtendedTypographic(),
);

const container = document.querySelector('#content');
container.innerHTML = marked.parse(markdown);

const handle = attachAll(container, {
  tabs: { persistSelection: true },
  footnote: { scrollOffset: 64 },
  onError: (error, runtime) => console.warn(`[${runtime}]`, error),
});

// Listen once for every package's events.
container.addEventListener('marked-extended:tabs:switch', (e) => console.log('tab', e.detail.label));
container.addEventListener('marked-extended:embeds:load', (e) => console.log('embed', e.detail.provider));

// After replacing the content:
function render(next) {
  container.innerHTML = marked.parse(next);
  handle.refresh();
}

// On teardown:
window.addEventListener('pagehide', () => handle.dispose());
```

## Without a bundler

Load the UMD build of each package you use. Every global is a namespace with the extension on `default`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@18/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-alert@19.0.0-beta.0/dist/index.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tabs@19.0.0-beta.0/dist/index.umd.js"></script>
<script>
  marked.use(markedExtendedAlert.default(), markedExtendedTabs.default());
  const root = document.getElementById('content');
  root.innerHTML = marked.parse(document.getElementById('source').textContent);
  const dispose = markedExtendedTabs.attachTabs(root);
</script>
```

The bundle's UMD build does not inline the extensions: it expects `marked` and every `markedExtended<Name>` global
to be loaded first. With script tags, the per-package builds are simpler.

## Next step

- [Frameworks](frameworks.md)
