---
label: Extensions
description: Catalog of the 18 Marked extensions with their package, default export, runtime and the Markdown syntax each one parses.
order: 2
tags: [ "extensions", "catalog" ]
keywords: [ "packages", "default export", "syntax summary", "runtimes" ]
breadcrumbTitle: Extensions
---

# Extensions

Every extension is its own npm package, published as `@fsegurai/marked-extended-<name>` 18.1.0 with the peer
`marked ^18`. Each package's default export is the extension factory; the bundle re-exports it as
`markedExtended<Name>`.

## Catalog

| Extension | Package | Default export (bundle name) | Syntax summary | Runtime |
|-----------|---------|------------------------------|----------------|---------|
| [Accordion](accordion.md) | `@fsegurai/marked-extended-accordion` | `markedExtendedAccordion` | ```` ```accordion ```` fence with front matter | `attachAccordion` (optional) |
| [Alert](alert.md) | `@fsegurai/marked-extended-alert` | `markedExtendedAlert` | `> [!NOTE]` blockquote | none |
| [Code](code.md) | `@fsegurai/marked-extended-code` | `markedExtendedCode` | Fence meta (`ts [app.ts] {1,3}`), `[!code ++]`, `::: code-group` | `attachCode` |
| [Comments](comments.md) | `@fsegurai/marked-extended-comments` | `markedExtendedComments` | `:::comment{…}text:::` and ```` ```comments ```` | `attachComments` (optional) |
| [Embeds](embeds.md) | `@fsegurai/marked-extended-embeds` | `markedExtendedEmbeds` | ```` ```embed ```` fence with a URL | `attachEmbeds` (to load) |
| [Footnote](footnote.md) | `@fsegurai/marked-extended-footnote` | `markedExtendedFootnote` | `[^id]`, `^[inline]`, `[^id]: …` | `attachFootnotes` (optional) |
| [Inline](inline.md) | `@fsegurai/marked-extended-inline` | `markedExtendedInline` | `==mark==`; opt-in `++ins++`, `^sup^`, `~sub~` | none |
| [Kanban](kanban.md) | `@fsegurai/marked-extended-kanban` | `markedExtendedKanban` | ```` ```kanban ```` with `## Column {…}` and list cards | `attachKanban` |
| [Lists](lists.md) | `@fsegurai/marked-extended-lists` | `markedExtendedLists` | `a.`, `I.`, `i)` markers, `- [ ]` tasks | `attachLists` (toggles) |
| [Slide](slide.md) | `@fsegurai/marked-extended-slide` | `markedExtendedSlide` | ```` ```presentation ```` with `---` between slides | `attachSlides` |
| [Source map](source-map.md) | `@fsegurai/marked-extended-source-map` | `markedExtendedSourceMap` | No syntax: source lines and heading ids | `attachSourceMap` (not in `attachAll`) |
| [Spoiler](spoiler.md) | `@fsegurai/marked-extended-spoiler` | `markedExtendedSpoiler` | ```` ```spoiler ```` fence | `attachSpoilers` |
| [Tables](tables.md) | `@fsegurai/marked-extended-tables` | `markedExtendedTables` | `\|\|` colspan, `^^` rowspan, `[Caption]` | none |
| [Tabs](tabs.md) | `@fsegurai/marked-extended-tabs` | `markedExtendedTabs` | ```` ```tabs ```` with `label:` per tab, `---` between tabs | `attachTabs` |
| [Timeline](timeline.md) | `@fsegurai/marked-extended-timeline` | `markedExtendedTimeline` | ```` ```timeline ```` with `date:` per event | `attachTimeline` (optional) |
| [Table of contents](toc.md) | `@fsegurai/marked-extended-toc` | `markedExtendedToc` | `[toc]`, `[toc:N]` line | none |
| [Typographic](typographic.md) | `@fsegurai/marked-extended-typographic` | `markedExtendedTypographic` | Smart quotes, `--`, `...`, `(:alpha:)` | none |
| [Wikilinks](wikilinks.md) | `@fsegurai/marked-extended-wikilinks` | `markedExtendedWikilinks` | `[[Page#Heading\|alias]]`, `[[Page#^block]]` | none |

"Optional" means the static HTML already works; the runtime adds behavior such as exclusive groups, scrolling or
restored `data-*` attributes.

The bundle's `attachAll` attaches every runtime except `attachSourceMap`, which needs the per-parse `sourceMap`
state of your extension instance: call it yourself after sanitizing. Two more packages complete the set:

| Package | Purpose |
|---------|---------|
| `@fsegurai/marked-extended-bundle` | Re-exports all 18 extensions, their runtimes and types, plus [`attachAll`](../api/bundle.md). |
| `@fsegurai/marked-extended-core` | Shared helpers (escaping, class tokens, `defineRuntime`, events, heading slugger). See the [core API](../api/core.md). |

## What every page covers

1. **Syntax**: the Markdown the extension parses, with every front-matter key.
2. **Options**: the factory options type with defaults, its `labels` and the exported constants.
3. **Rendered HTML**: the default sanitizer-safe markup and what `unsafeHtml` changes.
4. **Runtime**: the `attachX` options and the `marked-extended:<pkg>:<event>` events.
5. **Styling**: the stylesheets, CSS classes and `--mx-<pkg>-*` custom properties.
6. **Changes in 18.1.0**: the breaking changes of existing packages.

## Shared conventions

| Convention | Form |
|------------|------|
| Factory | `export default function markedExtended<Name>(options?: <Name>Options): MarkedExtension`, also a named export. |
| Labels | `labels?: Partial<<Name>Labels>`, shallow-merged over the frozen `default<Name>Labels`; values are HTML-escaped. |
| Classes | Root `mx-<pkg>`, parts `mx-<pkg>-<part>`, modifiers `mx-<pkg>--<modifier>`, states `mx-is-<state>`. |
| Class tokens | `mx-<pkg>-<key>-<value>`, read by the runtimes. |
| Custom properties | `--mx-<pkg>-<name>`, always read with a fallback. |
| Runtime | `attachX(root, options?)` returns a dispose function; events are `marked-extended:<pkg>:<event>`. |

## Next step

Start with [Installation](../getting-started/installation.md) if you have not installed a package yet.
