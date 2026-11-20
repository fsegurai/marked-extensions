---
label: Tables
description: Tables with column spanning (||), row spanning (^), multi-row headers, captions and footers.
order: 6
tags: [ "extensions", "tables" ]
keywords: [ "colspan", "rowspan", "caption", "tfoot", "spanning cells" ]
---

# Tables

`@fsegurai/marked-extended-tables` (15.3.0) extends GFM tables with cell spanning, captions and footers. It is
render-only: it injects no styles and runs no browser code.

## Quick path

```bash
npm install @fsegurai/marked-extended-tables marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedTables from '@fsegurai/marked-extended-tables';

marked.use(markedExtendedTables());
```

## Syntax

```markdown
[Sales Report]
| Category || Metrics ||
| Name | Item | Price | Trend |
|------|------|------:|:-----:|
| Fruits | Apple | $1.00 | up |
| ^ | Orange | $1.50 | flat |
| Spans all four columns ||||
```

| Syntax | Effect |
|--------|--------|
| Extra pipes after a cell (`\|\|`) | The cell spans one more column per extra pipe. |
| A cell ending with `^` (`\| ^ \|`) | The overlapping cell in the row above spans one more row; text before the `^` is appended to it. |
| Several header rows before the separator | Multi-row header. |
| `[Caption]` line directly above the table | Caption. |
| `:---`, `:---:`, `---:` | Left, center, right alignment. |

Cells and captions support inline Markdown. The first header row must span exactly as many columns as the separator
row, otherwise the block is left to Marked's default table tokenizer.

## Options

`markedExtendedTables(options?: SpanTableOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useTheadTbody` | `boolean` | `true` | Wrap header rows in `<thead>` and body rows in `<tbody>`. |
| `useTfoot` | `boolean` | `false` | Render the footer row (or, if none was detected, the last row) in `<tfoot>`. |
| `detectFooter` | `boolean` | `false` | Take the last row out of the body as a footer row. Without `useTfoot` it is rendered as a plain row after the body. |
| `className` | `string \| null` | `null` | Class on the `<table>`. |
| `captionTop` | `boolean` | `true` | Caption before the rows; `false` renders it after the rows. |
| `strictCaptions` | `boolean` | `false` | Require a `[Caption]` line; tables without one are left to the default renderer. |
| `maxColspan` | `number \| null` | `null` | Maximum columns a cell can span. |
| `handleComplexSpans` | `boolean` | `true` | Add `class="complex-span"` to cells that combine row and column spans. |

## Rendered HTML

```html
<table>
<caption>Sales Report</caption>
<thead>
<tr>
<th colspan=2>Category</th>
<th colspan=2>Metrics</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan=2>Fruits</td>
<td>Apple</td>
<td align=right>$1.00</td>
<td align=center>up</td>
</tr>
</tbody>
</table>
```

`colspan`, `rowspan` and `align` values are written unquoted.

## Browser behavior

None. The package exports only the default factory; its declarations add `SpanTableOptions`, `SpanTableToken`,
`TableRow` and `TableCell`.

## Next step

- [Tabs](tabs.md)
