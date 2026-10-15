---
label: Extension Packages
description: Default export, named functions and exported TypeScript types of each of the 14 extension packages in 19.0.0-beta.0.
order: 3
tags: [ "api", "packages" ]
keywords: [ "default export", "options types", "runtime types", "event detail types" ]
---

# Extension Packages

Each package's default export is its extension factory. The options, defaults, syntax and events are documented on the
[extension pages](../extensions/README.md); this page lists exactly what each package exports.

Every package with a runtime also exports `Dispose`, `RuntimeRoot` and `RuntimeAttachOptions`.

| Package | Default export | Named functions | Exported types |
|---------|----------------|-----------------|----------------|
| accordion | `markedExtendedAccordion(options?: AccordionOptions)` | `attachAccordion` | `AccordionOptions`, `AccordionMeta`, `AccordionToken`, `AccordionRendererOptions`, `AccordionRuntime`, `AccordionRuntimeOptions`, `AccordionToggleDetail` |
| alert | `markedExtendedAlert(options?: AlertOptions)` | none | `AlertOptions`, `AlertVariant`, `AlertMeta`, `AlertToken`, `AlertRendererOptions` |
| code | `markedExtendedCode(options?: CodeOptions): MarkedExtension` | `attachCode`, `applyPrismAttributes`, `wrapLines`, `parseFenceMeta`, `applyMagicComments` | `CodeOptions`, `CodeMeta`, `CodeToken`, `CodeGroupItem`, `CodeGroupToken`, `CodeGroupSwitchDetail`, `CodeRuntime`, `CodeRuntimeOptions`, `FenceMeta`, `LineRange`, `LineRanges`, `RangeKey`, `MagicCommentOptions`, `MagicCommentResult` |
| comments | `markedExtendedComments(options?: CommentOptions)` | `attachComments` | `CommentOptions`, `CommentMeta`, `CommentType`, `CommentVisibility`, `CommentStatus`, `CommentPriority`, `InlineCommentToken`, `BlockCommentToken`, `CommentsRuntime`, `CommentsRuntimeOptions`, `CommentsNavigateDetail` |
| embeds | `markedExtendedEmbeds(options?: EmbedOptions)` | `attachEmbeds` | `EmbedOptions`, `EmbedProvider`, `AspectRatio`, `ProviderConfig`, `EmbedMeta`, `EmbedToken`, `EmbedRendererOptions`, `ParsedEmbed`, `EmbedsRuntime`, `EmbedsRuntimeOptions`, `EmbedsLoadDetail`, `EmbedsErrorDetail`, `EmbedsErrorReason` |
| footnote | `markedExtendedFootnote(options?: FootnoteOptions): MarkedExtension` | `attachFootnotes` | `FootnoteOptions`, `FootnoteRef`, `FootnoteDef`, `FootnoteState`, `FootnoteRefToken`, `FootnoteDefToken`, `FootnoteSectionToken`, `ValidFootnote`, `FootnoteRuntime`, `FootnoteRuntimeOptions`, `FootnoteNavigateDetail` |
| kanban | `markedExtendedKanban(options?: KanbanOptions): MarkedExtension` | `attachKanban`, `applyMove`, `applyMoveToMarkdown`, `enableKanbanDragDrop` (deprecated) | `KanbanOptions`, `KanbanMeta`, `KanbanToken`, `KanbanColumn`, `KanbanTask`, `ViewMode`, `KanbanRendererOptions`, `KanbanRuntime`, `KanbanRuntimeOptions`, `KanbanMoveDetail`, `KanbanViewDetail`, `KanbanCollapseDetail`, `KanbanDragDropOptions` |
| lists | `markedExtendedLists(options?: ListsOptions): MarkedExtension` | `attachLists`, `enableListsEditing`, `indentListItem`, `outdentListItem`, `removeListItem`, `getListMarkdown`, `enableSourceListEditing`, `applyListEnter`, `applyListTab`, `detectListPrefix`, `intToLetter`, `letterToInt`, `intToRoman`, `romanToInt` | `ListsOptions`, `ListType`, `ExtendedListToken`, `ExtendedListItemToken`, `TaskListMetadata`, `ListsRuntime`, `ListsRuntimeOptions`, `ListsToggleDetail`, `ListsEditingOptions`, `ListEditDetail`, `ListPrefix` |
| slide | `markedExtendedSlide(options?: SlideOptions): MarkedExtension` | `attachSlides` | `SlideOptions`, `SlideLayout`, `SlideTransition`, `SlideMeta`, `SlideToken`, `PresentationMeta`, `PresentationToken`, `SlideRendererOptions`, `PresentationRendererOptions`, `SlideRuntime`, `SlideRuntimeOptions`, `SlideChangeDetail`, `SlideOverviewDetail`, `SlideSpeakerDetail` |
| spoiler | `markedExtendedSpoiler(options?: SpoilerOptions)` | `attachSpoilers` | `SpoilerOptions`, `SpoilerMeta`, `SpoilerToken`, `SpoilerProps`, `SpoilerTheme`, `ParticleResult`, `SpoilerRuntime`, `SpoilerRuntimeOptions`, `SpoilerToggleDetail` |
| tables | `markedExtendedTables(options?: SpanTableOptions): MarkedExtension` | none | `SpanTableOptions`, `SpanTableToken`, `TableCell`, `TableRow` |
| tabs | `markedExtendedTabs(options?: TabsOptions): MarkedExtension` | `attachTabs` | `TabsOptions`, `TabsMeta`, `TabsToken`, `TabItem`, `AnimationType`, `TabsVariant`, `TabsRendererOptions`, `TabSwitchEvent`, `TabsRuntime`, `TabsRuntimeOptions`, `TabsStorage`, `TabsSwitchDetail` |
| timeline | `markedExtendedTimeline(options?: TimelineOptions): MarkedExtension` | `attachTimeline` | `TimelineOptions`, `TimelineMeta`, `TimelineToken`, `TimelineItem`, `TimelineRendererOptions`, `TimelineRuntime`, `TimelineRuntimeOptions`, `TimelineCollapseDetail`, `TimelineAnchorDetail` |
| typographic | `markedExtendedTypographic(options?: TypographicOptions): MarkedExtension` | none | `TypographicOptions`, `ProcessingOptions`, `SmartyOptions`, `SymbolMappings` |

Factories without an explicit return type return an object accepted by `marked.use(...)`.

## Removed in 19

| Package | Removed export |
|---------|----------------|
| spoiler | `initSpoilers`, `destroySpoilers` |
| tabs | `registerCallbacks` |
| timeline | `initTimelineCollapse`, `initTimelineReveal`, `initTimelineAnchors`, `initTimelineAnchorsClicks`, `initAllTimelineInteractions` and the matching `destroy*` functions |

## Next step

- [Migrating to 19](../guides/migration-19.md)
