---
label: Bundle
description: API of @fsegurai/marked-extended-bundle 17.0.0, the first release of the bundle, which re-exports the 13 extension factories and their types.
order: 1
tags: [ "api", "bundle" ]
keywords: [ "re-exports", "named exports", "markedExtendedTabs", "umd" ]
---

# Bundle

`@fsegurai/marked-extended-bundle` is new in 17.0.0. It depends on all 13 extension packages and re-exports their
factories. It has **no default export** and adds no code of its own.

```js
import { Marked } from 'marked';
import { markedExtendedAlert, markedExtendedTabs } from '@fsegurai/marked-extended-bundle';

const marked = new Marked().use(markedExtendedAlert(), markedExtendedTabs());
container.innerHTML = marked.parse(markdown);
```

## Re-exports

| Bundle export | Source package |
|---------------|----------------|
| `markedExtendedAccordion` | accordion default |
| `markedExtendedAlert` | alert default |
| `markedExtendedComments` | comments default |
| `markedExtendedEmbeds` | embeds default |
| `markedExtendedFootnote` | footnote default |
| `markedExtendedKanban` | kanban default |
| `markedExtendedLists` | lists default |
| `markedExtendedSlide` | slide default |
| `markedExtendedSpoiler` | spoiler default |
| `markedExtendedTables` | tables default |
| `markedExtendedTabs` | tabs default |
| `markedExtendedTimeline` | timeline default |
| `markedExtendedTypographic` | typographic default |

The bundle also re-exports the types listed on [Extension Packages](extension-packages.md), with two gaps:

| Gap | Workaround |
|-----|------------|
| Kanban: only `KanbanOptions`, `KanbanToken` and `KanbanMeta` are re-exported | Import `KanbanColumn`, `KanbanTask`, `ViewMode` and `KanbanRendererOptions` from `@fsegurai/marked-extended-kanban`. |
| Lists: `letterToInt` and `romanToInt` are not re-exported | Import them from `@fsegurai/marked-extended-lists`. |

## Styles

The bundle ships no CSS. Import the stylesheets from the individual packages, for example
`@fsegurai/marked-extended-tabs/styles/tabs.css`. See [Styling and Theming](../guides/styling.md).

## UMD

The UMD build (`dist/index.umd.js`, global `markedExtendedBundle`) does not inline the extensions: `marked` and every
`markedExtended<Name>` package global must be loaded first.

## Next step

- [Extension Packages](extension-packages.md)
