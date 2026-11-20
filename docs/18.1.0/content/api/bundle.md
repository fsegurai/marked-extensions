---
label: Bundle
description: API of @fsegurai/marked-extended-bundle, the named re-exports of every extension and the attachAll runtime with its options, handle and error type.
order: 1
tags: [ "api", "bundle" ]
keywords: [ "attachAll", "AttachAllOptions", "AttachAllHandle", "RUNTIME_NAMES", "AggregateError", "attachSourceMap" ]
---

# Bundle

`@fsegurai/marked-extended-bundle` depends on all 18 extension packages and re-exports them. It has **no default
export**.

```js
import { attachAll, markedExtendedTabs, markedExtendedEmbeds } from '@fsegurai/marked-extended-bundle';

const marked = new Marked().use(markedExtendedTabs(), markedExtendedEmbeds());
container.innerHTML = marked.parse(markdown);
const handle = attachAll(container);
```

## Re-exports

Each package's factory is re-exported as `markedExtended<Name>`, next to every named value export of that package
(runtimes, helpers, frozen constants and default labels).

| Bundle export | Source package |
|---------------|----------------|
| `markedExtendedAccordion`, `attachAccordion`, `ACCORDION_VARIANTS`, `ACCORDION_ICON_POSITIONS` | accordion |
| `markedExtendedAlert`, `ALERT_VARIANTS`, `defaultAlertLabels` | alert |
| `markedExtendedCode`, `attachCode`, `wrapLines`, `copyText`, `applyPrismAttributes`, `applyLineNumberStart`, `parseFenceMeta`, `applyMagicComments`, `LINE_CLASSES`, `RANGE_KEYS`, `PRISM_LINE_HIGHLIGHT_MODES`, `defaultCodeLabels` | code |
| `markedExtendedComments`, `attachComments`, `COMMENT_TYPES`, `COMMENT_STATUSES`, `COMMENT_PRIORITIES`, `COMMENT_VISIBILITIES`, `defaultCommentsLabels` | comments |
| `markedExtendedEmbeds`, `attachEmbeds`, `EMBED_PROVIDERS`, `defaultEmbedsLabels` | embeds |
| `markedExtendedFootnote`, `attachFootnotes`, `defaultFootnoteLabels` | footnote |
| `markedExtendedInline`, `INLINE_MARKS`, `INLINE_MARK_DEFINITIONS`, `INLINE_TOKEN_TYPES` | inline |
| `markedExtendedKanban`, `attachKanban`, `applyMove`, `applyMoveToMarkdown`, `enableKanbanDragDrop` (deprecated), `KANBAN_VIEWS`, `KANBAN_PRIORITIES`, `KANBAN_PALETTE`, `defaultKanbanLabels` | kanban |
| `markedExtendedLists`, `attachLists`, `enableListsEditing`, `indentListItem`, `outdentListItem`, `removeListItem`, `getListMarkdown`, `applyListEnter`, `applyListTab`, `detectListPrefix`, `enableSourceListEditing`, `intToLetter`, `intToRoman`, `letterToInt`, `romanToInt`, `LIST_TYPES`, `defaultListsLabels` | lists |
| `markedExtendedSlide`, `attachSlides`, `SLIDE_LAYOUTS`, `SLIDE_TRANSITIONS`, `defaultSlideLabels` | slide |
| `markedExtendedSourceMap`, `attachSourceMap`, `stampSourceLines`, `hardenSourceAttributes`, `sourceLineOffset`, `countNewlines`, `DEFAULT_SOURCE_LINE_ATTRIBUTE`, `DEFAULT_SOURCE_MAP_CLASS_PREFIX`, `SOURCE_MAP_BLOCK_TOKEN` | source-map |
| `markedExtendedSpoiler`, `attachSpoilers`, `SPOILER_THEME_NAMES`, `defaultSpoilerLabels` | spoiler |
| `markedExtendedTables`, `TABLES_ROWSPAN_MARKER` | tables |
| `markedExtendedTabs`, `attachTabs`, `TABS_VARIANTS`, `TABS_ANIMATIONS`, `defaultTabsLabels` | tabs |
| `markedExtendedTimeline`, `attachTimeline`, `defaultTimelineLabels`, `defaultTimelineRuntimeLabels` | timeline |
| `markedExtendedToc`, `TOC_TOKEN`, `DEFAULT_TOC_WRAPPER_TOKEN_TYPES`, `defaultTocLabels` | toc |
| `markedExtendedTypographic`, `typographicTransform`, `TYPOGRAPHIC_SKIP_TAGS` | typographic |
| `markedExtendedWikilinks`, `parseWikilink`, `isSafeWikilinkHref`, `WIKILINKS_TOKEN_TYPE`, `WIKILINKS_SAFE_PROTOCOLS`, `defaultWikilinksLabels` | wikilinks |

The packages' public types are re-exported too (for example `TabsOptions`, `EmbedsRuntimeOptions`,
`KanbanMoveDetail`, `WikilinksResolver`), together with the shared `Dispose`, `RuntimeRoot` and
`RuntimeAttachOptions` aliases.

## attachAll

```ts
function attachAll(root: AttachAllRoot, options?: AttachAllOptions): AttachAllHandle;
```

Attaches every package runtime to `root`, in this order: accordion, comments, footnote, timeline, spoiler, lists,
tabs, embeds, kanban, slide, code. The order is exported as `RUNTIME_NAMES`.

`attachSourceMap` is **not** part of `attachAll`: it reads the per-parse state of the source-map extension instance
(`sourceMap`) and the rendered document (`source`), which only your code has. Attach it next to `attachAll`:

```js
const sourceMap = markedExtendedSourceMap();
const marked = new Marked().use(sourceMap, markedExtendedToc());
container.innerHTML = marked.parse(markdown);

const handle = attachAll(container);
const disposeSourceMap = attachSourceMap(container, { sourceMap: sourceMap.sourceMap, source: () => markdown });
```

```js
const handle = attachAll(container, {
  tabs: { persistSelection: true },
  code: { syncByLabel: true },
  embeds: false, // leave a runtime out
  onError: (error, runtime) => console.warn(runtime, error),
});

handle.refresh(); // after replacing the content
handle.dispose(); // on teardown; a second call does nothing
```

### Types

| Type | Definition |
|------|------------|
| `AttachAllRoot` | `Element \| Document \| DocumentFragment` |
| `AttachAllRuntimeName` | `'accordion' \| 'comments' \| 'footnote' \| 'timeline' \| 'spoiler' \| 'lists' \| 'tabs' \| 'embeds' \| 'kanban' \| 'slide' \| 'code'` |
| `AttachAllOptions` | One optional key per runtime name, typed as that runtime's options or `false`, plus `onError?: (error: unknown, runtime: AttachAllRuntimeName) => void` |
| `AttachAllHandle` | `{ dispose(): void; refresh(): void }` |
| `AttachAllError` | `AggregateError & { handle?: AttachAllHandle; runtimes?: AttachAllRuntimeName[] }` |
| `RUNTIME_NAMES` | `readonly AttachAllRuntimeName[]` |

### Failure isolation

| Situation | Result |
|-----------|--------|
| A runtime throws, no `onError` | The others are still tried; then one `AggregateError` is thrown. On attach it carries `handle` (to dispose what did attach) and `runtimes` (who failed). |
| A runtime throws, `onError` given | `onError(error, name)` is called and nothing is thrown. |
| `onError` itself throws | Its error is collected into the same `AggregateError`. |

The same rules apply to `refresh()` and `dispose()`.

## Next step

- [Core](core.md)
