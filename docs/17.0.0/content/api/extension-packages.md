---
label: Extension Packages
description: Default export, named functions and exported TypeScript types of each of the 13 extension packages in 17.0.0.
order: 2
tags: [ "api", "packages" ]
keywords: [ "default export", "options types", "token types", "letterToInt" ]
---

# Extension Packages

Each package's default export is its extension factory. Options, defaults, syntax and markup are documented on the
[extension pages](../extensions/README.md); this page lists exactly what each package exports at 17.0.0.

| Package | Default export | Named functions | Exported types |
|---------|----------------|-----------------|----------------|
| accordion | `markedExtendedAccordion(options?: AccordionOptions)` | none | `AccordionOptions`, `AccordionToken`, `AccordionMeta`, `AccordionRendererOptions` |
| alert | `markedExtendedAlert(options?: AlertOptions)` | none | `AlertOptions`, `AlertToken`, `AlertMeta`, `AlertVariant`, `AlertRendererOptions` |
| comments | `markedExtendedComments(options?: CommentOptions)` | none | `CommentOptions`, `InlineCommentToken`, `BlockCommentToken`, `CommentMeta`, `CommentType`, `CommentVisibility`, `CommentStatus` |
| embeds | `markedExtendedEmbeds(options?: EmbedOptions)` | none | `AspectRatio`, `EmbedMeta`, `EmbedOptions`, `EmbedProvider`, `EmbedRendererOptions`, `EmbedToken`, `ParsedEmbed`, `ProviderConfig` |
| footnote | `markedExtendedFootnote(options?: FootnoteOptions)` | none | `FootnoteOptions`, `FootnoteRef`, `FootnoteDef`, `FootnoteState`, `FootnoteRefToken`, `FootnoteDefToken`, `FootnoteSectionToken`, `ValidFootnote` |
| kanban | `markedExtendedKanban(options?: KanbanOptions)` | none | `KanbanOptions`, `KanbanToken`, `KanbanColumn`, `KanbanTask`, `ViewMode`, `KanbanMeta`, `KanbanRendererOptions` |
| lists | `markedExtendedLists(options?: ListsOptions): MarkedExtension` | `letterToInt(letter: string): number`, `romanToInt(roman: string): number` | `ListsOptions`, `ExtendedListToken`, `ExtendedListItemToken`, `ListType`, `TaskListMetadata` |
| slide | `markedExtendedSlide(options?: SlideOptions)` | none | `SlideOptions`, `SlideToken`, `PresentationToken`, `SlideMeta`, `PresentationMeta`, `SlideLayout`, `SlideTransition`, `SlideRendererOptions`, `PresentationRendererOptions` |
| spoiler | `markedExtendedSpoiler(options?: SpoilerOptions)` | none | `SpoilerOptions`, `SpoilerTheme`, `SpoilerMeta`, `SpoilerToken`, `SpoilerProps`, `ParticleResult` |
| tables | `markedExtendedTables(options?: SpanTableOptions): MarkedExtension` | none | `SpanTableOptions`, `SpanTableToken`, `TableCell`, `TableRow` |
| tabs | `markedExtendedTabs(options?: TabsOptions): MarkedExtension` | none | `TabsOptions`, `TabsToken`, `AnimationType`, `TabsMeta`, `TabsRendererOptions` |
| timeline | `markedExtendedTimeline(options?: TimelineOptions): MarkedExtension` | none | `TimelineOptions`, `TimelineToken`, `TimelineItem`, `TimelineMeta`, `TimelineRendererOptions` |
| typographic | `markedExtendedTypographic(options?: TypographicOptions): MarkedExtension` | none | `TypographicOptions`, `ProcessingOptions`, `SmartyOptions`, `SymbolMappings` |

Factories without an explicit return type return an object accepted by `marked.use(...)`.

## Added in 18.0.0

For orientation: 18.0.0 added `initSpoilers` / `destroySpoilers` (spoiler), `registerCallbacks` (tabs), the
`initTimeline*` helpers (timeline), `enableKanbanDragDrop` / `applyMove` / `applyMoveToMarkdown` (kanban), and the
list editing helpers plus `intToLetter` / `intToRoman` (lists). None of them exist in 17.0.0.

## Next step

- [Browser Behavior](../guides/browser-behavior.md)
