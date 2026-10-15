---
label: Styling
description: The plain table markup that the 15.0.0 tables extension emits, its align attributes and how to style spanned cells.
order: 1
tags: [ "guides", "styling" ]
keywords: [ "css", "align attribute", "rowspan", "colspan", "thead" ]
---

# Styling

The 15.0.0 package ships no CSS and emits no classes, styles or scripts. Style the elements directly.

## What to target

| Element | When it appears |
|---------|-----------------|
| `table > thead > tr > th` | Every header row, always. |
| `table > tbody > tr > td` | Body rows, when there are any. |
| `[colspan]`, `[rowspan]` | Spanned cells. |
| `[align=left]`, `[align=center]`, `[align=right]` | Columns with an alignment in the delimiter row. |

```css
table { border-collapse: collapse; }
th, td { border: 1px solid #d0d7de; padding: 6px 12px; }
th[align=center], td[align=center] { text-align: center; }
td[rowspan] { vertical-align: middle; }
```

`align` is a deprecated HTML attribute; most browsers still honor it, but an explicit `text-align` rule is safer.

## Next step

- [Combining extensions](combining-extensions.md)
