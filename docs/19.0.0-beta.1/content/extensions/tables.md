---
label: Tables
description: Tables with column spanning (||), row spanning (^^), multi-row headers, captions, footers and a responsive wrapper.
order: 13
tags: [ "extensions", "tables" ]
keywords: [ "colspan", "rowspan", "caption", "tfoot", "spanning cells", "TABLES_ROWSPAN_MARKER" ]
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
| ^^ | Orange | $1.50 | flat |
| Spans all four columns ||||
```

| Syntax | Effect |
|--------|--------|
| Empty cell after `\|` (`\|\|`) | The previous cell spans one more column. |
| A cell ending with `^^` (`\| ^^ \|`) | The cell above spans one more row. The marker is removed; text before it is appended to that cell. |
| A single trailing `^` (`\| 2^ \|`) | Ordinary text. |
| Several header rows before the separator | Multi-row header. |
| `[Caption]` line above the table, optionally followed by one blank line | Caption. |
| `:---`, `:---:`, `---:` | Left, center, right alignment. |

A `^^` with no cell above it, or a multi-column `^^` cell under a cell of a different width, stays literal text.
Cells support inline Markdown.

## Options

`markedExtendedTables(options?: TablesOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useTheadTbody` | `boolean` | `true` | Wrap rows in `<thead>` and `<tbody>`. |
| `useTfoot` | `boolean` | `false` | Render the last row in `<tfoot>`. |
| `detectFooter` | `boolean` | `false` | Detect and mark the last row as a footer. |
| `className` | `string \| null` | `null` | Extra class on the `<table>`, after `mx-tables`. |
| `captionTop` | `boolean` | `true` | Caption above the table; `false` emits it after the rows and adds `mx-tables-caption-bottom`. |
| `strictCaptions` | `boolean` | `false` | Only match tables that have a `[Caption]` line. |
| `maxColspan` | `number \| null` | `null` | Maximum columns a cell can span. |
| `responsiveWrapper` | `boolean` | `false` | Wrap the table in `div.mx-tables-wrapper`. |
| `unsafeHtml` | `boolean` | `false` | Use the 18.0 `data-caption-bottom` attribute instead of the class. |

`SpanTableOptions` stays as a deprecated alias of `TablesOptions`. The extension has no user-visible strings, so it
has no `labels` option.

### Exported constants

| Constant | Value |
|----------|-------|
| `TABLES_ROWSPAN_MARKER` | `'^^'` |

## Rendered HTML

```html
<div class="mx-tables-wrapper">
  <table class="mx-tables mx-tables-caption-bottom">
    <thead><tr><th scope="col" colspan="2">Category</th>…</tr></thead>
    <tbody><tr><td rowspan="2">Fruits</td>…</tr></tbody>
    <caption>…</caption>
  </table>
</div>
```

### Sanitizer notes

`colspan`, `rowspan`, `scope` and `align` survive Angular's `SecurityContext.HTML`, so the default markup is kept
unchanged. `unsafeHtml: true` only swaps the `mx-tables-caption-bottom` class for the `data-caption-bottom`
attribute, which a sanitizer strips. Tables need no browser runtime.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-tables/styles/tables.css` | Structure, wrapper and `caption-side: bottom`. |
| `@fsegurai/marked-extended-tables/styles/tables-theme.css` | Optional theme; overrides colors under the host's `body.dark`. |

The stylesheets only style tables with the `mx-tables` class; other tables on the page are left alone.

### CSS classes

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-tables` | `<table>` | Root class of every rendered table. |
| `mx-tables-wrapper` | `<div>` | Horizontal-scroll wrapper (`responsiveWrapper: true`). |
| `mx-tables-caption-bottom` | `<table>` | Class token: caption below the table (`captionTop: false`). |

### CSS custom properties

| Property | Default (dark) |
|----------|----------------|
| `--mx-tables-margin` | `1.5rem 0` |
| `--mx-tables-caption-padding` | `0.5rem 0.75rem` (`0.75rem 1rem` in the theme) |
| `--mx-tables-cell-padding` | `0.5rem 0.75rem` (`0.75rem 1rem` in the theme) |
| `--mx-tables-font-size` | `0.9375rem` |
| `--mx-tables-radius` | `8px` |
| `--mx-tables-bg` | `#ffffff` (`#1e1e1e`) |
| `--mx-tables-text` | `#495057` (`#e0e0e0`) |
| `--mx-tables-caption-bg` | `#f8f9fa` (`#2a2a2a`) |
| `--mx-tables-caption-color` | `#333333` (`#e0e0e0`) |
| `--mx-tables-header-bg` | `#f1f3f5` (`#2a2a2a`) |
| `--mx-tables-header-color` | `#212529` (`#e0e0e0`) |
| `--mx-tables-footer-bg` | `#f8f9fa` (`#2a2a2a`) |
| `--mx-tables-footer-color` | `#495057` (`#e0e0e0`) |
| `--mx-tables-border` | `#dee2e6` (`#3a3a3a`) |
| `--mx-tables-border-soft` | `#e9ecef` (`#3a3a3a`) |
| `--mx-tables-stripe-bg` | `#f8f9fa` (`#2a2a2a`) |
| `--mx-tables-hover-bg` | `#e9ecef` (`#3a3a3a`) |
| `--mx-tables-span-bg` | `#f1f3f5` (`#2a2a2a`) |
| `--mx-tables-code-bg` | `rgba(0, 0, 0, 0.05)` (`rgba(255, 255, 255, 0.1)`) |
| `--mx-tables-shadow` | `0 1px 3px rgba(0, 0, 0, 0.05)` |
| `--mx-tables-scrollbar-track` | `#f1f1f1` (`#333333`) |
| `--mx-tables-scrollbar-thumb` | `#888888` (`#666666`) |
| `--mx-tables-scrollbar-thumb-hover` | `#555555` (`#444444`) |

## Changes in 19.0.0-beta.1

- **Breaking:** `^^` is the only row-span marker and it is removed completely. A single trailing `^` no longer merges;
  replace `| ^ |` cells with `| ^^ |`.
- **Breaking:** `handleComplexSpans` is removed (with `TableCell.complexRowSpan` and `TableCell.relatedCell`). A cell
  it could not merge renders as a plain literal cell.
- A `[Caption]` followed by a blank line now renders a `<caption>`.
- `SpanTableOptions` is renamed `TablesOptions` (deprecated alias kept); the factory is also the named export
  `markedExtendedTables`.
- Every table gets the `mx-tables` class and the stylesheets no longer target bare `table` elements.
  `marked-extended-table-wrapper` → `mx-tables-wrapper`, `.table-responsive` is removed,
  `--marked-extended-table-*` → `--mx-tables-*`.

## Next step

- [Combining extensions](../guides/combining-extensions.md)
