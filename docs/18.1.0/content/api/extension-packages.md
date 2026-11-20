---
label: Extension Packages
description: The extension contract and the default export, named exports and TypeScript types of each of the 18 extension packages in 18.1.0.
order: 3
tags: [ "api", "packages" ]
keywords: [ "default export", "named export", "options types", "labels", "constants", "runtime types", "event detail types" ]
---

# Extension Packages

The options, defaults, syntax and events are documented on the [extension pages](../extensions/README.md); this page
lists exactly what each package exports.

## The extension contract

Since 18.1.0 every package follows the same shape:

| Rule | Shape |
|------|-------|
| Factory | `export default function markedExtended<Name>(options: <Name>Options = {}): MarkedExtension`, also exported by name: `import { markedExtended<Name> } from '…'`. `markedExtendedSourceMap` returns a `SourceMapExtension` (a `MarkedExtension` with a read-only `sourceMap`). |
| Options type | Named `<Name>Options` (`TablesOptions`, `CommentsOptions`, `EmbedsOptions`…). Older names stay as `/** @deprecated */` type aliases: `SpanTableOptions`, `CommentOptions`, `EmbedOptions`. |
| Labels | Every user-visible string comes from `labels?: Partial<<Name>Labels>`, shallow-merged over the exported frozen `default<Name>Labels`. Values are plain text, HTML-escaped, never treated as templates. Packages that render no text of their own (accordion, inline, source-map, tables, typographic) have no `labels`. |
| Constants | Exported as frozen, read-only `UPPER_SNAKE` arrays or objects: `ALERT_VARIANTS`, `TABS_VARIANTS`, `KANBAN_VIEWS`, `TABLES_ROWSPAN_MARKER`, `WIKILINKS_SAFE_PROTOCOLS`… |
| Runtime | Packages with interactive behavior export `attachX(root, options?)`, which returns `dispose` (see the [runtime contract](../guides/runtime-contract.md)). |
| Shared types | Every package with a runtime also exports `Dispose`, `RuntimeRoot` and `RuntimeAttachOptions`; published `.d.ts` files never import core. |

```js
import markedExtendedAlert, { ALERT_VARIANTS, defaultAlertLabels } from '@fsegurai/marked-extended-alert';
// or: import { markedExtendedAlert } from '@fsegurai/marked-extended-alert';

marked.use(markedExtendedAlert({ labels: { note: 'Nota', warning: 'Atención' } }));
```

## Exports per package

`*` marks a deprecated export.

| Package | Factory options | Named values | Exported types |
|---------|-----------------|--------------|----------------|
| accordion | `AccordionOptions` | `attachAccordion`, `ACCORDION_VARIANTS`, `ACCORDION_ICON_POSITIONS` | `AccordionOptions`, `AccordionMeta`, `AccordionToken`, `AccordionVariant`, `IconPosition`, `AccordionRendererOptions`, `AccordionRuntime`, `AccordionRuntimeOptions`, `AccordionToggleDetail` |
| alert | `AlertOptions` | `ALERT_VARIANTS`, `defaultAlertLabels` | `AlertOptions`, `AlertLabels`, `AlertIconMode`, `AlertVariant`, `AlertVariantType`, `AlertMeta`, `AlertToken`, `AlertRendererOptions` |
| code | `CodeOptions` | `attachCode`, `wrapLines`, `copyText`, `applyPrismAttributes`, `applyLineNumberStart`, `parseFenceMeta`, `applyMagicComments`, `LINE_CLASSES`, `RANGE_KEYS`, `PRISM_LINE_HIGHLIGHT_MODES`, `defaultCodeLabels` | `CodeOptions`, `CodeLabels`, `CodeMeta`, `CodeToken`, `CodeGroupItem`, `CodeGroupToken`, `CodeGroupSwitchDetail`, `CodeRuntime`, `CodeRuntimeOptions`, `CopyTextOptions`, `PrismLineHighlightMode`, `FenceMeta`, `LineRange`, `LineRanges`, `RangeKey`, `MagicCommentOptions`, `MagicCommentResult` |
| comments | `CommentsOptions` | `attachComments`, `COMMENT_TYPES`, `COMMENT_STATUSES`, `COMMENT_PRIORITIES`, `COMMENT_VISIBILITIES`, `defaultCommentsLabels` | `CommentsOptions`, `CommentOptions`*, `CommentsLabels`, `CommentMeta`, `CommentType`, `CommentVisibility`, `CommentStatus`, `CommentPriority`, `InlineCommentToken`, `BlockCommentToken`, `CommentsRuntime`, `CommentsRuntimeOptions`, `CommentsNavigateDetail` |
| embeds | `EmbedsOptions` | `attachEmbeds`, `EMBED_PROVIDERS`, `defaultEmbedsLabels` | `EmbedsOptions`, `EmbedOptions`*, `EmbedsLabels`, `EmbedProvider`, `AspectRatio`, `ProviderConfig`, `EmbedMeta`, `EmbedToken`, `EmbedRendererOptions`, `ParsedEmbed`, `EmbedsRuntime`, `EmbedsRuntimeOptions`, `EmbedsLoadDetail`, `EmbedsErrorDetail`, `EmbedsErrorReason` |
| footnote | `FootnoteOptions` | `attachFootnotes`, `defaultFootnoteLabels` | `FootnoteOptions`, `FootnoteLabels`, `FootnoteRef`, `FootnoteDef`, `FootnoteState`, `FootnoteRefToken`, `FootnoteDefToken`, `FootnoteSectionToken`, `ValidFootnote`, `FootnoteRuntime`, `FootnoteRuntimeOptions`, `FootnoteNavigateDetail` |
| inline | `InlineOptions` | `INLINE_MARKS`, `INLINE_MARK_DEFINITIONS`, `INLINE_TOKEN_TYPES` | `InlineOptions`, `InlineMarkName`, `InlineMarkOptions`, `InlineMarkToken`, `InlineMarkDefinition` |
| kanban | `KanbanOptions` | `attachKanban`, `applyMove`, `applyMoveToMarkdown`, `enableKanbanDragDrop`*, `KANBAN_VIEWS`, `KANBAN_PRIORITIES`, `KANBAN_PALETTE`, `defaultKanbanLabels` | `KanbanOptions`, `KanbanLabels`, `KanbanMeta`, `KanbanToken`, `KanbanColumn`, `KanbanTask`, `ViewMode`, `KanbanRendererOptions`, `KanbanRuntime`, `KanbanRuntimeOptions`, `KanbanMoveDetail`, `KanbanViewDetail`, `KanbanCollapseDetail`, `KanbanDragDropOptions`* |
| lists | `ListsOptions` | `attachLists`, `enableListsEditing`, `indentListItem`, `outdentListItem`, `removeListItem`, `getListMarkdown`, `enableSourceListEditing`, `applyListEnter`, `applyListTab`, `detectListPrefix`, `intToLetter`, `letterToInt`, `intToRoman`, `romanToInt`, `LIST_TYPES`, `defaultListsLabels` | `ListsOptions`, `ListsLabels`, `ListType`, `ExtendedListToken`, `ExtendedListItemToken`, `TaskListMetadata`, `ListsRuntime`, `ListsRuntimeOptions`, `ListsToggleDetail`, `ListsEditingOptions`, `ListEditDetail`, `ListPrefix` |
| slide | `SlideOptions` | `attachSlides`, `SLIDE_LAYOUTS`, `SLIDE_TRANSITIONS`, `defaultSlideLabels` | `SlideOptions`, `SlideLabels`, `SlideLayout`, `SlideTransition`, `SlideMeta`, `SlideToken`, `PresentationMeta`, `PresentationToken`, `SlideRendererOptions`, `PresentationRendererOptions`, `SlideRuntime`, `SlideRuntimeOptions`, `SlideChangeDetail`, `SlideOverviewDetail`, `SlideSpeakerDetail` |
| source-map | `SourceMapOptions` (returns `SourceMapExtension`) | `attachSourceMap`, `stampSourceLines`, `hardenSourceAttributes`, `sourceLineOffset`, `countNewlines`, `DEFAULT_SOURCE_LINE_ATTRIBUTE`, `DEFAULT_SOURCE_MAP_CLASS_PREFIX`, `SOURCE_MAP_BLOCK_TOKEN` | `SourceMapOptions`, `SourceMapExtension`, `SourceMap`, `SourceMapRender`, `SourceBlock`, `SourceHeading`, `HeadingSlugger`, `SourceMapRuntime`, `SourceMapRuntimeOptions`, `SourceMapStampDetail`, `HardenSourceOptions` |
| spoiler | `SpoilerOptions` | `attachSpoilers`, `SPOILER_THEME_NAMES`, `defaultSpoilerLabels` | `SpoilerOptions`, `SpoilerLabels`, `SpoilerMeta`, `SpoilerToken`, `SpoilerProps`, `SpoilerTheme`, `SpoilerThemeName`, `ParticleResult`, `SpoilerRuntime`, `SpoilerRuntimeOptions`, `SpoilerToggleDetail` |
| tables | `TablesOptions` | `TABLES_ROWSPAN_MARKER` | `TablesOptions`, `SpanTableOptions`*, `SpanTableToken`, `TableCell`, `TableRow` |
| tabs | `TabsOptions` | `attachTabs`, `TABS_VARIANTS`, `TABS_ANIMATIONS`, `defaultTabsLabels` | `TabsOptions`, `TabsLabels`, `TabsMeta`, `TabsToken`, `TabItem`, `AnimationType`, `TabsVariant`, `TabsRendererOptions`, `TabSwitchEvent`, `TabsRuntime`, `TabsRuntimeOptions`, `TabsStorage`, `TabsSwitchDetail` |
| timeline | `TimelineOptions` | `attachTimeline`, `defaultTimelineLabels`, `defaultTimelineRuntimeLabels` | `TimelineOptions`, `TimelineLabels`, `TimelineRuntimeLabels`, `TimelineMeta`, `TimelineToken`, `TimelineItem`, `TimelineRendererOptions`, `DateFormatContext`, `TimelineRuntime`, `TimelineRuntimeOptions`, `TimelineCollapseDetail`, `TimelineAnchorDetail` |
| toc | `TocOptions` | `TOC_TOKEN`, `DEFAULT_TOC_WRAPPER_TOKEN_TYPES`, `defaultTocLabels` | `TocOptions`, `TocLabels`, `TocHeading`, `TocToken`, `HeadingSlugger` |
| typographic | `TypographicOptions` | `typographicTransform`, `TYPOGRAPHIC_SKIP_TAGS` | `TypographicOptions`, `ProcessingOptions`, `SmartyOptions`, `SymbolMappings` |
| wikilinks | `WikilinksOptions` | `parseWikilink`, `isSafeWikilinkHref`, `WIKILINKS_TOKEN_TYPE`, `WIKILINKS_SAFE_PROTOCOLS`, `defaultWikilinksLabels` | `WikilinksOptions`, `WikilinksLabels`, `WikilinksResolver`, `WikilinkTarget`, `WikilinkParts`, `WikilinkToken` |

Every factory is also the package's default export and is named `markedExtended<Name>` (for example
`markedExtendedSourceMap` for `@fsegurai/marked-extended-source-map`).

## Removed in 18.1.0

| Package | Removed export | Since |
|---------|----------------|-------|
| spoiler | `initSpoilers`, `destroySpoilers` | 18.1.0 |
| tabs | `registerCallbacks` | 18.1.0 |
| timeline | `initTimelineCollapse`, `initTimelineReveal`, `initTimelineAnchors`, `initTimelineAnchorsClicks`, `initAllTimelineInteractions` and the matching `destroy*` functions | 18.1.0 |
| footnote | `smoothScroll`, `scrollOffset` in `FootnoteOptions` (runtime options of `attachFootnotes`) | 18.1.0 |
| slide | `injectScript`, `scriptNonce` in `SlideOptions` | 18.1.0 |
| tables | `handleComplexSpans` in `TablesOptions`; `TableCell.complexRowSpan`, `TableCell.relatedCell` | 18.1.0 |

## Next step

- [Migrating to 18.1](../guides/migration-18.1.md)
