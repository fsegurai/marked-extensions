---
label: Combining Extensions
description: Register the 15.0.0 tables extension next to other Marked extensions such as marked-highlight, as the project demo does.
order: 2
tags: [ "guides", "integration" ]
keywords: [ "marked.use", "marked-highlight", "prism", "registration order" ]
---

# Combining Extensions

The tables extension adds one block tokenizer (`spanTable`) and one renderer. It works next to any other Marked
extension; the only overlap is that it takes over pipe-table syntax from Marked's built-in table.

## Quick path

The 15.0.0 demo (`demo/scripts/utils/markdown.ts`) registers tables with `marked-highlight` and Prism:

```js
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import prismjs from 'prismjs';
import markedExtendedTables from '@fsegurai/marked-extended-tables';

marked.use(
  markedExtendedTables(),
  markedHighlight({
    emptyLangClass: 'language-plaintext',
    langPrefix: 'language-',
    highlight(code, lang) {
      const language = prismjs.languages[lang] ? lang : 'plaintext';
      return prismjs.highlight(code, prismjs.languages[language], language);
    },
  }),
  { gfm: true },
);
```

## Where tables hooks into Marked

| Stage | What it does |
|-------|--------------|
| Block tokenizer `spanTable` | Matches pipe tables, including multi-row headers and spans. |
| Renderer `spanTable` | Writes `<table>` markup; cells are parsed inline with the Marked instance in use. |

## Next step

- [API Reference](../api/README.md)
