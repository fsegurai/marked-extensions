---
label: Plain JavaScript
description: Register all 6 extensions of 15.1.2 on the default marked export, as the project demo does, and render into the page.
order: 1
tags: [ "examples", "javascript" ]
keywords: [ "vanilla", "all extensions", "demo setup" ]
---

# Plain JavaScript

```bash
npm install marked@^15 \
  @fsegurai/marked-extended-code-preview @fsegurai/marked-extended-footnote @fsegurai/marked-extended-lists \
  @fsegurai/marked-extended-spoiler @fsegurai/marked-extended-tables @fsegurai/marked-extended-typographic
```

```js
import { marked } from 'marked';
import markedExtendedCodePreview from '@fsegurai/marked-extended-code-preview';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import markedExtendedLists from '@fsegurai/marked-extended-lists';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

marked.use(
  markedExtendedCodePreview({}, marked),
  markedExtendedFootnote(),
  markedExtendedLists(),
  markedExtendedSpoiler({}, marked),
  markedExtendedTables(),
  markedExtendedTypographic(),
);

document.querySelector('#content').innerHTML = marked.parse(markdown);
```

This mirrors the demo setup (`demo/scripts/utils/markdown.ts`), which also registers `marked-highlight` with Prism.

## What runs after rendering

| Extension | Behavior |
|-----------|----------|
| Spoiler | A timer per spoiler adds particles and a `<style>` to `document.head`. The `innerHTML` assignment above runs first, so the elements are found. |
| Code preview | Native `<details>`; add the CSS from the package README. |
| Others | Static HTML. |

## Next step

- [Frameworks](frameworks.md)
