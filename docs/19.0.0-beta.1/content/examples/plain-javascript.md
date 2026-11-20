---
label: Plain JavaScript
description: Register all 18 extensions from the bundle on one Marked instance, attach every runtime with attachAll plus attachSourceMap, refresh after re-rendering and dispose.
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
  attachSourceMap,
  markedExtendedAccordion,
  markedExtendedAlert,
  markedExtendedCode,
  markedExtendedComments,
  markedExtendedEmbeds,
  markedExtendedFootnote,
  markedExtendedInline,
  markedExtendedKanban,
  markedExtendedLists,
  markedExtendedSlide,
  markedExtendedSourceMap,
  markedExtendedSpoiler,
  markedExtendedTables,
  markedExtendedTabs,
  markedExtendedTimeline,
  markedExtendedToc,
  markedExtendedTypographic,
  markedExtendedWikilinks,
} from '@fsegurai/marked-extended-bundle';

// Styles: import the CSS of the packages you use, for example:
import '@fsegurai/marked-extended-tabs/styles/tabs.css';
import '@fsegurai/marked-extended-alert/styles/alert.css';

// The source-map extension carries per-parse state that its runtime reads.
const sourceMap = markedExtendedSourceMap();
const pages = new Map([['getting started', '/docs/getting-started']]);

const marked = new Marked().use(
  sourceMap,
  markedExtendedAccordion(),
  markedExtendedAlert(),
  markedExtendedCode(),
  markedExtendedComments(),
  markedExtendedEmbeds(),
  markedExtendedFootnote(),
  markedExtendedInline(),
  markedExtendedKanban(),
  markedExtendedLists({ interactiveCheckboxes: true }),
  markedExtendedSlide(),
  markedExtendedSpoiler(),
  markedExtendedTables(),
  markedExtendedTabs(),
  markedExtendedTimeline(),
  markedExtendedToc(),
  markedExtendedTypographic(),
  markedExtendedWikilinks({
    resolve: (target) => {
      const href = pages.get(target.toLowerCase());
      return href ? { href } : null;
    },
  }),
);

let markdown = '[toc]\n\n# Notes\n\nSee [[Getting Started]] and ==this==.\n';
const container = document.querySelector('#content');
container.innerHTML = marked.parse(markdown);

const handle = attachAll(container, {
  tabs: { persistSelection: true },
  footnote: { scrollOffset: 64 },
  onError: (error, runtime) => console.warn(`[${runtime}]`, error),
});

// attachAll leaves the source map out: it needs this parse's sourceMap and source.
const disposeSourceMap = attachSourceMap(container, { sourceMap: sourceMap.sourceMap, source: () => markdown });

// Listen once for every package's events.
container.addEventListener('marked-extended:tabs:switch', (e) => console.log('tab', e.detail.label));
container.addEventListener('marked-extended:embeds:load', (e) => console.log('embed', e.detail.provider));

// After replacing the content:
function render(next) {
  markdown = next;
  container.innerHTML = marked.parse(next);
  handle.refresh();
  attachSourceMap.refresh(container);
}

// On teardown:
window.addEventListener('pagehide', () => {
  handle.dispose();
  disposeSourceMap();
});
```

## Without a bundler

Load the UMD build of each package you use. Every global is a namespace with the extension on `default`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@18/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-alert@19.0.0-beta.1/dist/index.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tabs@19.0.0-beta.1/dist/index.umd.js"></script>
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
