---
label: Bundle
description: API of @fsegurai/marked-extended-bundle 18.0.0, the named re-exports of the 13 extensions with their browser helpers and types.
order: 1
tags: [ "api", "bundle" ]
keywords: [ "re-exports", "named exports", "markedExtendedTabs", "umd" ]
---

# Bundle

`@fsegurai/marked-extended-bundle` 18.0.0 depends on all 13 extension packages (pinned to `18.0.0`) and re-exports
them. It has **no default export** and adds no code of its own.

```js
import { Marked } from 'marked';
import { markedExtendedTabs, markedExtendedSpoiler, initSpoilers } from '@fsegurai/marked-extended-bundle';

const marked = new Marked().use(markedExtendedTabs(), markedExtendedSpoiler());
container.innerHTML = marked.parse(markdown);
initSpoilers();
```

## Re-exports

| Bundle export | Source package export |
|---------------|-----------------------|
| `markedExtendedAccordion` | accordion default |
| `markedExtendedAlert` | alert default |
| `markedExtendedComments` | comments default |
| `markedExtendedEmbeds` | embeds default |
| `markedExtendedFootnote` | footnote default |
| `markedExtendedKanban`, `applyMove`, `applyMoveToMarkdown`, `enableKanbanDragDrop` | kanban |
| `markedExtendedLists`, `enableListsEditing`, `indentListItem`, `outdentListItem`, `removeListItem`, `getListMarkdown`, `applyListEnter`, `applyListTab`, `detectListPrefix`, `enableSourceListEditing`, `intToLetter`, `intToRoman`, `letterToInt`, `romanToInt` | lists |
| `markedExtendedSlide` | slide default |
| `markedExtendedSpoiler`, `initSpoilers`, `destroySpoilers` | spoiler |
| `markedExtendedTables` | tables default |
| `markedExtendedTabs`, `registerCallbacks` | tabs |
| `markedExtendedTimeline`, `initTimelineCollapse`, `destroyTimelineCollapse`, `initTimelineReveal`, `destroyTimelineReveal`, `initTimelineAnchors`, `initTimelineAnchorsClicks`, `destroyTimelineAnchorsClicks`, `initAllTimelineInteractions`, `destroyAllTimelineInteractions` | timeline |
| `markedExtendedTypographic` | typographic default |

Every type each package exports is re-exported too (for example `TabsOptions`, `KanbanMoveDetail`,
`ListsEditingOptions`). The full list per package is on [Extension Packages](extension-packages.md).

## Styles

The bundle ships no CSS. Import the stylesheets from the individual packages it depends on, for example
`@fsegurai/marked-extended-tabs/styles/tabs.css`. Under strict package managers (pnpm), add those packages as direct
dependencies. See [Styling and Theming](../guides/styling.md).

## UMD

The UMD build (`dist/index.umd.js`, global `markedExtendedBundle`) does not inline the extensions: `marked` and every
`markedExtended<Name>` package global must be loaded first.

## Next step

- [Extension Packages](extension-packages.md)
