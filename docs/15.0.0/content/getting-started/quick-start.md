---
label: Quick Start
description: Render a table with a two-row header, column spans and row spans using the 15.0.0 tables extension.
order: 2
tags: [ "getting-started", "quick-start" ]
keywords: [ "first page", "marked.use", "colspan", "rowspan" ]
---

# Quick Start

This page renders one table that uses every feature of the 15.0.0 extension.

## 1. Install

```bash
npm install marked@^15 @fsegurai/marked-extended-tables
```

## 2. Register and render

```js
import { marked } from 'marked';
import markedExtendedTables from '@fsegurai/marked-extended-tables';

marked.use(markedExtendedTables());

const source = [
  '| Name   | Q1 | Q2 |',
  '| Region | Sales  ||',
  '|--------|----|----|',
  '| North  | 10 | 12 |',
  '| Tall   | 1  | 2  |',
  '|       ^| 3  | 4  |',
].join('\n');

document.querySelector('#content').innerHTML = marked.parse(source);
```

| Markdown | Result |
|----------|--------|
| Two rows above the delimiter row | Two header rows in `<thead>` |
| `Sales  \|\|` | `<th colspan=2>` |
| `^\|` at the end of a cell | That cell merges into the one above (`rowspan=2`) |

## Checklist

- [ ] `marked` 13, 14 or 15 is installed next to the extension.
- [ ] The import uses the default export.
- [ ] Row-span markers sit directly before the pipe (`^|`, not `^ |`).

## Next step

- Read the full syntax on the [Tables](../extensions/tables.md) page.
