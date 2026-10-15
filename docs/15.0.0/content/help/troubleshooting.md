---
label: Troubleshooting
description: Fixes for 15.0.0 tables that do not span, row spans that do not merge, tables rendered as paragraphs and failed imports.
order: 2
tags: [ "help", "troubleshooting" ]
keywords: [ "not working", "colspan", "rowspan", "import error", "debugging" ]
---

# Troubleshooting

Find the symptom, apply the fix.

| Symptom | Cause | Fix |
|---------|-------|-----|
| A cell does not span columns | Empty cells (`\| a \|   \|   \|`) are separate cells | Put the pipes together: `\| a \|\|\|`. |
| `^` stays in the text and nothing merges | The `^` is not directly before the pipe | Write `^\|`, not `^ \|`. |
| `^\|` is in place but nothing merges | No cell in the row above starts in the same column with the same span | Align the start column and span of both cells. |
| The table renders as a paragraph | The first header row's column count differs from the delimiter row | Give the delimiter row one cell per column of the first header row. |
| `SyntaxError: … does not provide an export named 'markedExtendedTables'` | Named import from the README | Use the default import. |
| Extra cells disappear | Rows longer than the header are cut | Add columns to the header. |

## Still stuck?

Open an issue at [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues)
with the Markdown and the package versions.
