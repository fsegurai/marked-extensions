---
label: Extension Packages
description: Default export, named functions and declared TypeScript types of each of the 9 extension packages in 15.9.4.
order: 1
tags: [ "api", "packages" ]
keywords: [ "default export", "options types", "token types", "letterToInt" ]
---

# Extension Packages

Each package's default export is its extension factory. Options, defaults, syntax and markup are documented on the
[extension pages](../extensions/README.md).

| Package | Default export | Named functions | Declared types |
|---------|----------------|-----------------|----------------|
| accordion | `markedExtendedAccordion(options?: AccordionOptions): MarkedExtension` | none | `AccordionOptions`, `AccordionToken` |
| alert | `markedExtendedAlert(options?: AlertOptions): MarkedExtension` | none | `AlertOptions` (`AlertVariant` is declared but not exported) |
| footnote | `markedExtendedFootnote(options?: FootnoteEnhancedOptions): MarkedExtension` | none | `FootnoteEnhancedOptions`, `LabelFormatFunction`, `FootnoteRefToken`, `FootnoteDefinitionToken`, `FootnoteSectionToken` |
| lists | `markedExtendedLists(): MarkedExtension` | `letterToInt(letter: string): number`, `romanToInt(roman: string): number` | `ExtendedListToken`, `ExtendedListItemToken`, `ExtendedListOptions` |
| spoiler | `markedExtendedSpoiler(options?: SpoilerOptions): MarkedExtension` | none | `SpoilerOptions`, `SpoilerToken` |
| tables | `markedExtendedTables(options?: SpanTableOptions): MarkedExtension` | none | `SpanTableOptions`, `SpanTableToken`, `TableRow`, `TableCell` |
| tabs | `markedExtendedTabs(options?: TabsOptions): MarkedExtension` | none | `TabsOptions`, `TabsToken` |
| timeline | `markedExtendedTimeline(options?: TimelineOptions): MarkedExtension` | none | `TimelineOptions`, `TimelineToken`, `TimelineEventToken` |
| typographic | `markedExtendedTypographic(options?: TypographicSymbols): MarkedExtension` | none | `TypographicSymbols` |

## Declaration gaps

| Package | Declaration | Source |
|---------|-------------|--------|
| timeline | `@default 'marked-extended-timeline'` / `'timeline-event'` | `'marked-extended-timeline-container'` / `'marked-extended-timeline-event'` |
| typographic | `quotes`, `dashes`, `ellipses`, `outputUnicode` default `true` | all `false` |
| tabs | `persistSelection` | declared and defaulted, never read |
| lists | `ExtendedListOptions` | the factory takes no arguments |

## Next step

- [Browser Behavior](../guides/browser-behavior.md)
