---
label: Extension Packages
description: Default export signature, declared TypeScript types and declaration gaps of the single 15.0.0 package, @fsegurai/marked-extended-tables.
order: 1
tags: [ "api", "packages" ]
keywords: [ "default export", "token types", "SpanTableToken" ]
---

# Extension Packages

| Package | Default export (declared) | Declared types |
|---------|---------------------------|----------------|
| tables | `markedExtendedTables(): MarkedExtension` | `SpanTableToken`, `TableRow`, `TableCell` (`SpanTableOptions` is declared but not exported) |

The default export is the only runtime export. Syntax and markup are on the [Tables](../extensions/tables.md) page.

## Declaration gaps

| Declaration | Source |
|-------------|--------|
| Named functions `spanTable(options?)`, `getTableCell(…)`, `splitCells(…)` | Not exported; `getTableCell` and `splitCells` are module-private helpers. |
| `SpanTableOptions` (`useTheadTbody`, `useTfoot`) | The factory takes no arguments. |

## Next step

- [Examples](../examples/README.md)
