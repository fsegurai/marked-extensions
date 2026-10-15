---
label: Tables
description: Tables with column spanning (||), row spanning (^), multi-row headers, captions, footers and a responsive wrapper.
order: 11
tags: [ "extensions", "tables" ]
keywords: [ "colspan", "rowspan", "caption", "tfoot", "spanning cells" ]
---

# Tables

`@fsegurai/marked-extended-tables` extends GFM tables with cell spanning, captions and footers. It needs no browser
runtime.

## Quick path

```bash
npm install @fsegurai/marked-extended-tables marked
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
| Empty cell after `\|` (`\|\|`) | The previous cell spans one more column. |
| A cell ending with `^` (`\| ^ \|`) | The cell above spans one more row; any text before the `^` is appended to it. |
| Several header rows before the separator | Multi-row header. |
| `[Caption]` line directly above the table (no blank line) | Caption. |
| `:---`, `:---:`, `---:` | Left, center, right alignment. |

Cells support inline Markdown.

## Options

`markedExtendedTables(options?: SpanTableOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useTheadTbody` | `boolean` | `true` | Wrap rows in `<thead>` and `<tbody>`. |
| `useTfoot` | `boolean` | `false` | Render the last row in `<tfoot>`. |
| `detectFooter` | `boolean` | `false` | Detect and mark the last row as a footer. |
| `className` | `string \| null` | `null` | Class on the `<table>`. |
| `captionTop` | `boolean` | `true` | Caption above the table; `false` adds `mx-tables-caption-bottom`. |
| `strictCaptions` | `boolean` | `false` | Enforce strict caption syntax. |
| `maxColspan` | `number \| null` | `null` | Maximum columns a cell can span. |
| `handleComplexSpans` | `boolean` | `true` | Enhanced handling of combined row and column spans. |
| `responsiveWrapper` | `boolean` | `false` | Wrap the table in `div.marked-extended-table-wrapper`. |
| `unsafeHtml` | `boolean` | `false` | Use the 18.0 `data-caption-bottom` attribute instead of the class. |

## Rendered HTML

```html
<div class="marked-extended-table-wrapper">
  <table class="mx-tables-caption-bottom">
    <caption>…</caption>
    <thead><tr><th scope="col" colspan="2">Category</th>…</tr></thead>
    <tbody><tr><td rowspan="2">Fruits</td>…</tr></tbody>
  </table>
</div>
```

`colspan`, `rowspan`, `scope` and `align` survive sanitizers. Only the bottom-caption hook changed in 19: CSS that
targets `[data-caption-bottom]` must target `.mx-tables-caption-bottom`.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-tables/styles/tables.css` | Structure. |
| `@fsegurai/marked-extended-tables/styles/tables-theme.css` | Optional theme; styles both caption hooks. |

## Next step

- [Combining extensions](../guides/combining-extensions.md)
