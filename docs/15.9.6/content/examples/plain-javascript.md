---
label: Plain JavaScript
description: Register all 9 extensions of 15.9.6 on the default marked export, as the project demo does.
order: 1
tags: [ "examples", "javascript" ]
keywords: [ "vanilla", "all extensions", "demo setup" ]
---

# Plain JavaScript

```bash
npm install marked@^15 \
  @fsegurai/marked-extended-accordion @fsegurai/marked-extended-alert @fsegurai/marked-extended-footnote \
  @fsegurai/marked-extended-lists @fsegurai/marked-extended-spoiler @fsegurai/marked-extended-tables \
  @fsegurai/marked-extended-tabs @fsegurai/marked-extended-timeline @fsegurai/marked-extended-typographic
```

```js
import { marked } from 'marked';
import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import markedExtendedLists from '@fsegurai/marked-extended-lists';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import markedExtendedTimeline from '@fsegurai/marked-extended-timeline';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

marked.use(
  markedExtendedAccordion(),
  markedExtendedAlert(),
  markedExtendedFootnote({ refMarkers: true }),
  markedExtendedLists(),
  markedExtendedSpoiler(),
  markedExtendedTables(),
  markedExtendedTabs(),
  markedExtendedTimeline(),
  markedExtendedTypographic(),
);

document.querySelector('#content').innerHTML = marked.parse(markdown);
```

This mirrors the demo setup (`demo/scripts/utils/markdown.ts`). The factories inject the accordion, alert, spoiler,
tabs and timeline stylesheets on their first call; there is nothing to call after rendering.

## What runs without a call

| Extension | Behavior |
|-----------|----------|
| Tabs | Switching is CSS-only (radio inputs plus a scoped `<style>` in each block). |
| Spoiler | Each spoiler carries an inline `<script>`, which does not run under `innerHTML`; particles then keep animating and reveal still works through CSS. |
| Others | Static HTML. |

## Next step

- [Frameworks](frameworks.md)
