---
label: Tables
description: Tables with column spanning (||), row spanning (^), multi-row headers, captions and footers.
order: 10
tags: [ "extensions", "tables" ]
keywords: [ "colspan", "rowspan", "caption", "tfoot", "spanning cells" ]
---

# Tables

`@fsegurai/marked-extended-tables` extends GFM tables with cell spanning, captions and footers. It is render-only: it
needs no browser runtime and injects no scripts or styles.

## Quick path

```bash
npm install @fsegurai/marked-extended-tables marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import '@fsegurai/marked-extended-tables/styles/tables.css';

marked.use(markedExtendedTables());
```

## Syntax

```markdown
[Sales Report Q4 2025]
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
| `[Caption]` line directly above the table (no blank line) | Caption. |
| `:---`, `:---:`, `---:` | Left, center, right alignment. |

Cells and captions support inline Markdown. The first header row must span exactly as many columns as the separator
row, otherwise the block is not treated as a spanning table.

## Options

`markedExtendedTables(options?: SpanTableOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useTheadTbody` | `boolean` | `true` | Wrap header rows in `<thead>` and body rows in `<tbody>`. |
| `useTfoot` | `boolean` | `false` | Render the footer row (or, if none was detected, the last row) in `<tfoot>`. |
| `detectFooter` | `boolean` | `false` | Take the last row out of the body as a footer row. Without `useTfoot` it is rendered as a plain row after the body. |
| `className` | `string \| null` | `null` | Class on the `<table>`. |
| `captionTop` | `boolean` | `true` | Caption before the rows; `false` renders it after the rows (no extra attribute). |
| `strictCaptions` | `boolean` | `false` | Require a `[Caption]` line; tables without one are left to the default renderer. |
| `maxColspan` | `number \| null` | `null` | Maximum columns a cell can span. |
| `handleComplexSpans` | `boolean` | `true` | Add `class="complex-span"` to cells that combine row and column spans. |

There is no `responsiveWrapper` option in 17; wrap the output yourself if you need horizontal scrolling.

## Rendered HTML

```html
<table>
<caption>Sales Report Q4 2025</caption>
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

In 17, `colspan`, `rowspan` and `align` values are written unquoted, and `<th>` cells have no `scope` attribute.

## Runtime

None. The package exports only the default `markedExtendedTables` factory and the types `SpanTableOptions`,
`SpanTableToken`, `TableCell` and `TableRow`.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-tables/styles/tables.css` | Structure. |
| `@fsegurai/marked-extended-tables/styles/tables-theme.css` | Optional theme. |

SCSS sources are exported at the same paths with `.scss`. The 17 stylesheets already contain rules for
`.marked-extended-table-wrapper` and `table[data-caption-bottom]`, but the 17 renderer never emits either hook.
See [Styling](../guides/styling.md).

## Next step

- [Combining extensions](../guides/combining-extensions.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
