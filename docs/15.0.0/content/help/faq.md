---
label: FAQ
description: Frequent questions about the 15.0.0 package contents, the marked peer, the default export and the extensions the changelog lists.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "compatibility", "marked 15", "default export" ]
---

# FAQ

## Which extensions are in 15.0.0?

Only tables. The changelog's 15.0.0 entry also names code preview, footnote, lists and typographic, but those
packages are not in the `v15.0.0` tag; they ship in 15.1.0.

## Which Marked version do I need?

Any version from 13 up to (not including) 16: the package declares `marked >=13 <16`. The package README's
`marked@^12.0.2` is outside that range.

## Named or default import?

Default: `import markedExtendedTables from '@fsegurai/marked-extended-tables'`. The named import shown in the root
README does not exist.

## Does the extension accept options?

No. The declarations describe `SpanTableOptions` (`useTheadTbody`, `useTfoot`), but the factory takes no arguments.

## Are there styles or browser scripts?

No. The output is plain table markup. See [Styling](../guides/styling.md).

## Next step

- [Troubleshooting](troubleshooting.md)
