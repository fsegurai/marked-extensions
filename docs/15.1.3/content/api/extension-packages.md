---
label: Extension Packages
description: Default export signature, runtime named exports and declared TypeScript types of each of the 6 extension packages in 15.1.3, with the gaps between declarations and source.
order: 1
tags: [ "api", "packages" ]
keywords: [ "default export", "options types", "token types", "declaration gaps" ]
---

# Extension Packages

Each package's default export is its extension factory, and it is the only runtime export in 15.1.3. Options,
defaults, syntax and markup are documented on the [extension pages](../extensions/README.md).

| Package | Default export (declared) | Declared types |
|---------|---------------------------|----------------|
| code preview | `markedExtendedCodePreview(options?: CodePreviewOptions, markedInstance?: typeof marked): MarkedExtension` | `CodePreviewOptions` |
| footnote | `markedExtendedFootnote(options?: Options): MarkedExtension` | `Options`, `Footnote`, `FootnoteRef`, `Footnotes`, `LexerTokens` |
| lists | `markedExtendedLists(): MarkedExtension` | `ExtendedListToken`, `ExtendedListItemToken`, `ExtendedListOptions` |
| spoiler | `markedExtendedSpoiler(options?: SpoilerOptions, markedInstance?: typeof marked): MarkedExtension` | `SpoilerOptions` |
| tables | `markedExtendedTables(): MarkedExtension` | `SpanTableToken`, `TableRow`, `TableCell` (`SpanTableOptions` is declared but not exported) |
| typographic | `markedExtendedTypographic(attr?: string \| number): MarkedExtension` | none |

## Declaration gaps

| Package | Declaration | Source |
|---------|-------------|--------|
| lists | Named functions `letterToInt`, `romanToInt` | Not exported. |
| tables | Named functions `spanTable`, `getTableCell`, `splitCells` | Not exported. |
| typographic | Constant `typographicSymbols` | Not exported. |
| code preview | `customizeToken?: (token: Token) => void` | Called with the title string; the return value replaces the title. |
| spoiler | `customizeToken?: (token: Token) => void` | Never called (type check against `spoilerEffect`). |
| code preview | `markedInstance?: typeof marked` | Called as a function, so only the callable `marked` export works. |

## Next step

- [Browser Behavior](../guides/browser-behavior.md)
