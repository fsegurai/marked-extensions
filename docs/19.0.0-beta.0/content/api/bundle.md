---
label: Bundle
description: API of @fsegurai/marked-extended-bundle, the named re-exports of every extension and the attachAll runtime with its options, handle and error type.
order: 1
tags: [ "api", "bundle" ]
keywords: [ "attachAll", "AttachAllOptions", "AttachAllHandle", "RUNTIME_NAMES", "AggregateError" ]
---

# Bundle

`@fsegurai/marked-extended-bundle` depends on all 14 extension packages and re-exports them. It has **no default
export**.

```js
import { attachAll, markedExtendedTabs, markedExtendedEmbeds } from '@fsegurai/marked-extended-bundle';

const marked = new Marked().use(markedExtendedTabs(), markedExtendedEmbeds());
container.innerHTML = marked.parse(markdown);
const handle = attachAll(container);
```

## Re-exports

| Bundle export | Source package export |
|---------------|-----------------------|
| `markedExtendedAccordion`, `attachAccordion` | accordion default, `attachAccordion` |
| `markedExtendedAlert` | alert default |
| `markedExtendedCode`, `attachCode`, `wrapLines`, `applyPrismAttributes`, `parseFenceMeta`, `applyMagicComments` | code |
| `markedExtendedComments`, `attachComments` | comments |
| `markedExtendedEmbeds`, `attachEmbeds` | embeds |
| `markedExtendedFootnote`, `attachFootnotes` | footnote |
| `markedExtendedKanban`, `attachKanban`, `applyMove`, `applyMoveToMarkdown`, `enableKanbanDragDrop` | kanban |
| `markedExtendedLists`, `attachLists`, `enableListsEditing`, `indentListItem`, `outdentListItem`, `removeListItem`, `getListMarkdown`, `applyListEnter`, `applyListTab`, `detectListPrefix`, `enableSourceListEditing`, `intToLetter`, `intToRoman`, `letterToInt`, `romanToInt` | lists |
| `markedExtendedSlide`, `attachSlides` | slide |
| `markedExtendedSpoiler`, `attachSpoilers` | spoiler |
| `markedExtendedTables` | tables default |
| `markedExtendedTabs`, `attachTabs` | tabs |
| `markedExtendedTimeline`, `attachTimeline` | timeline |
| `markedExtendedTypographic` | typographic default |

The packages' public types are re-exported too (for example `TabsOptions`, `EmbedsRuntimeOptions`,
`KanbanMoveDetail`). The shared `Dispose`, `RuntimeRoot` and `RuntimeAttachOptions` aliases are not.

## attachAll

```ts
function attachAll(root: AttachAllRoot, options?: AttachAllOptions): AttachAllHandle;
```

Attaches every package runtime to `root`, in this order: accordion, comments, footnote, timeline, spoiler, lists,
tabs, embeds, kanban, slide, code. The order is exported as `RUNTIME_NAMES`.

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
