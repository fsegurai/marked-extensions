---
label: Combining Extensions
description: Register all six 15.1.0 extensions together, pass marked to code preview and spoiler, and know which extensions hook the same Marked stages.
order: 3
tags: [ "guides", "integration" ]
keywords: [ "marked.use", "markedInstance", "hooks", "registration order", "nested content" ]
---

# Combining Extensions

All 6 extensions can be registered together. Pass `marked` to code preview and spoiler so the Markdown inside their
fences is rendered with the same extensions.

## Quick path

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
```

This is the registration used by the project demo (`demo/scripts/utils/markdown.ts`).

## Nested content

| Container | Inner content rendered by | Nesting limit |
|-----------|---------------------------|---------------|
| Code preview | `markedInstance(code)` | The block ends at the first line starting with ```` ``` ````; indent inner fences. |
| Spoiler | `markedInstance.parse(code)` | Same fence rule. |

Because `markedInstance` is the object you pass, extensions registered on it after the factory call also apply inside
the block.

## Where each extension hooks into Marked

| Stage | Extensions | What to know |
|-------|------------|--------------|
| Block tokenizer (own syntax) | code preview, footnote (definitions), spoiler, tables (`spanTable`) | Tables takes over pipe-table syntax. |
| Inline tokenizer | footnote (`[^id]`) | |
| Replaces a built-in tokenizer | lists (`list`), typographic (`inlineText`) | |
| Replaces built-in renderers | lists (`list`, `listitem`) | |
| `walkTokens` | code preview (`customizeToken`), footnote (moves the section to the end), spoiler (no effect) | |
| `hooks.postprocess` | typographic | Runs on the final HTML, including the HTML of every other extension. |

## Next step

- [Upgrading from 15.0](upgrading-from-15.0.md)
