---
label: Extension Packages
description: Default export, named functions and exported TypeScript types of each of the 13 extension packages in 18.0.0.
order: 2
tags: [ "api", "packages" ]
keywords: [ "default export", "options types", "helper functions", "token types" ]
---

# Extension Packages

Each package's default export is its extension factory. Options, defaults, syntax and markup are documented on the
[extension pages](../extensions/README.md); this page lists exactly what each package exports at 18.0.0.

| Package | Default export | Named functions | Exported types |
|---------|----------------|-----------------|----------------|
| accordion | `markedExtendedAccordion(options?: AccordionOptions)` | none | `AccordionOptions`, `AccordionMeta`, `AccordionToken`, `AccordionRendererOptions` |
| alert | `markedExtendedAlert(options?: AlertOptions)` | none | `AlertOptions`, `AlertVariant`, `AlertMeta`, `AlertToken`, `AlertRendererOptions` |
| comments | `markedExtendedComments(options?: CommentOptions)` | none | `CommentOptions`, `CommentMeta`, `CommentType`, `CommentVisibility`, `CommentStatus`, `CommentPriority`, `InlineCommentToken`, `BlockCommentToken` |
| embeds | `markedExtendedEmbeds(options?: EmbedOptions)` | none | `EmbedOptions`, `EmbedProvider`, `AspectRatio`, `ProviderConfig`, `EmbedMeta`, `EmbedToken`, `EmbedRendererOptions`, `ParsedEmbed` |
| footnote | `markedExtendedFootnote(options?: FootnoteOptions): MarkedExtension` | none | `FootnoteOptions`, `FootnoteRef`, `FootnoteDef`, `FootnoteState`, `FootnoteRefToken`, `FootnoteDefToken`, `FootnoteSectionToken`, `ValidFootnote` |
| kanban | `markedExtendedKanban(options?: KanbanOptions)` | `enableKanbanDragDrop`, `applyMove`, `applyMoveToMarkdown` | `KanbanOptions`, `KanbanMeta`, `KanbanToken`, `KanbanColumn`, `KanbanTask`, `ViewMode`, `KanbanRendererOptions`, `KanbanDragDropOptions`, `KanbanMoveDetail` |
| lists | `markedExtendedLists(options?: ListsOptions): MarkedExtension` | `enableListsEditing`, `indentListItem`, `outdentListItem`, `removeListItem`, `getListMarkdown`, `enableSourceListEditing`, `applyListEnter`, `applyListTab`, `detectListPrefix`, `intToLetter`, `letterToInt`, `intToRoman`, `romanToInt` | `ListsOptions`, `ListType`, `ExtendedListToken`, `ExtendedListItemToken`, `TaskListMetadata`, `ListsEditingOptions`, `ListEditDetail`, `ListPrefix` |
| slide | `markedExtendedSlide(options?: SlideOptions)` | none | `SlideOptions`, `SlideLayout`, `SlideTransition`, `SlideMeta`, `SlideToken`, `PresentationMeta`, `PresentationToken`, `SlideRendererOptions`, `PresentationRendererOptions` |
| spoiler | `markedExtendedSpoiler(options?: SpoilerOptions)` | `initSpoilers`, `destroySpoilers` | `SpoilerOptions`, `SpoilerMeta`, `SpoilerToken`, `SpoilerProps`, `SpoilerTheme`, `ParticleResult` |
| tables | `markedExtendedTables(options?: SpanTableOptions): MarkedExtension` | none | `SpanTableOptions`, `SpanTableToken`, `TableCell`, `TableRow` |
| tabs | `markedExtendedTabs(options?: TabsOptions): MarkedExtension` | `registerCallbacks` | `TabsOptions`, `TabsMeta`, `TabsToken`, `AnimationType`, `TabsVariant`, `TabsRendererOptions` |
| timeline | `markedExtendedTimeline(options?: TimelineOptions): MarkedExtension` | `initTimelineCollapse`, `destroyTimelineCollapse`, `initTimelineReveal`, `destroyTimelineReveal`, `initTimelineAnchors`, `initTimelineAnchorsClicks`, `destroyTimelineAnchorsClicks`, `initAllTimelineInteractions`, `destroyAllTimelineInteractions` | `TimelineOptions`, `TimelineMeta`, `TimelineToken`, `TimelineItem`, `TimelineRendererOptions` |
| typographic | `markedExtendedTypographic(options?: TypographicOptions): MarkedExtension` | none | `TypographicOptions`, `ProcessingOptions`, `SmartyOptions`, `SymbolMappings` |

Factories without an explicit return type return an object accepted by `marked.use(...)`.

## Helper signatures

| Function | Signature |
|----------|-----------|
| `initSpoilers` / `destroySpoilers` | `() => void` |
| `registerCallbacks` | `(ref: string, callbacks: { onBeforeSwitch: ((event) => boolean) \| null; onAfterSwitch: ((event) => void) \| null }) => void` (the callbacks type is not exported) |
| `initTimelineCollapse` / `destroyTimelineCollapse` | `(target?: Document \| HTMLElement) => void`, default `document` |
| `initTimelineReveal`, `initTimelineAnchorsClicks`, `initAllTimelineInteractions` | `(container?: HTMLElement) => void` |
| `initTimelineAnchors`, `destroyTimelineReveal`, `destroyTimelineAnchorsClicks`, `destroyAllTimelineInteractions` | `() => void` |
| `enableKanbanDragDrop` | `(root: HTMLElement, options?: KanbanDragDropOptions) => () => void` |
| `applyMove` | `(taskEl: HTMLElement, targetList: HTMLElement, beforeEl: HTMLElement \| null, options?: KanbanDragDropOptions) => KanbanMoveDetail \| null` |
| `applyMoveToMarkdown` | `(source: string, detail: KanbanMoveDetail) => string` |
| `enableListsEditing` | `(root: HTMLElement, options?: ListsEditingOptions) => () => void` |
| `indentListItem` / `outdentListItem` / `removeListItem` | `(li: HTMLLIElement) => void` |
| `getListMarkdown` | `(element: HTMLElement) => string` |
| `enableSourceListEditing` | `(textarea: HTMLTextAreaElement) => () => void` |
| `applyListEnter` | `(text: string, cursorPos: number) => { text: string; cursorPos: number }` |
| `applyListTab` | `(text: string, selectionStart: number, selectionEnd: number, shiftKey: boolean) => { text; selectionStart; selectionEnd }` |
| `detectListPrefix` | `(line: string) => ListPrefix \| null` |
| `intToLetter` / `intToRoman` | `(n: number) => string` |
| `letterToInt` / `romanToInt` | `(value: string) => number` |

## Next step

- [Browser Behavior](../guides/browser-behavior.md)
