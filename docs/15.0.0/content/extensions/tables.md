---
label: Tables
description: Pipe tables with column spanning (||), row spanning (^) and multi-row headers through a spanTable block extension that takes no options.
order: 1
tags: [ "extensions", "tables" ]
keywords: [ "colspan", "rowspan", "multi-row header", "spanning cells", "spanTable" ]
---

# Tables

`@fsegurai/marked-extended-tables` (15.0.0) adds a `spanTable` block extension that takes over pipe-table syntax and
adds cell spanning and multi-row headers. It is render-only: it injects no styles and runs no browser code.

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
| Name     | Q1   | Q2   |
| Region   | Sales      ||
|:---------|:----:|-----:|
| North    | 10   | 12   |
| Spans two cells || 30 |
| Tall     | 1    | 2    |
|         ^| 3    | 4    |
```

| Feature | Syntax | Rule |
|---------|--------|------|
| Column span | Extra pipes after a cell: `\| Sales \|\|` | One extra column per extra pipe. |
| Row span | `^` as the last character before the closing pipe: `\| ^\|` | Merges the cell into the cell above with the same start column and span; its text is appended to that cell. |
| Multi-row header | Several rows before the delimiter row | Every header row renders as `<th>` cells in `<thead>`. |
| Alignment | `:---`, `:---:`, `---:` | Rendered as an `align` attribute. |
| Escaped pipe | `\|` inside a cell | Rendered as a literal `\|`. |

The column count comes from the first header row and must equal the number of delimiter cells; otherwise the block is
not a span table. Rows with fewer cells are padded with empty cells, rows with more are cut.

## Options

`markedExtendedTables()` takes no arguments. `index.d.ts` declares a `SpanTableOptions` interface (`useTheadTbody`,
`useTfoot`) and the named functions `spanTable`, `getTableCell` and `splitCells`; the source neither accepts options
nor exports those functions.

## Rendered HTML

```html
<table><thead><tr><th align=left>Name</th>
<th align=center>Q1</th>
<th align=right>Q2</th>
</tr><tr><th align=left>Region</th>
<th colspan=2 align=center>Sales</th>
</tr></thead><tbody><tr><td align=left>North</td>
…
<tr><td rowspan=2 align=left>Tall </td>
…
</tbody></table>
```

- `<thead>` is always present; `<tbody>` only when there are body rows. There is no `<caption>` or `<tfoot>`.
- Attribute values are not quoted (`colspan=2`, `align=left`).
- Cell content is parsed inline with the Marked instance in use.

## README differences

The root README of 15.0.0 imports `{ markedExtendedTables }` as a named export; the package only has a default
export. Its sample table (`| This cell spans 3 columns |     |     |`) has empty cells, not extra pipes, so it renders
three cells instead of the `colspan="3"` shown. The package README describes the package as "a theme for CodeMirror 6
editor" and installs `marked@^12.0.2`, while the peer is `marked >=13 <16`.

## Browser behavior

None.

## Next step

- [Styling](../guides/styling.md)
