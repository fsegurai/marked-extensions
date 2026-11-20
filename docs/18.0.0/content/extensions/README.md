---
label: Extensions
description: Catalog of the 13 Marked extensions in 18.0.0 with their package, default export, browser behavior and the Markdown syntax each one parses.
order: 2
tags: [ "extensions", "catalog" ]
keywords: [ "packages", "default export", "syntax summary", "browser helpers" ]
breadcrumbTitle: Extensions
---

# Extensions

Every extension is its own npm package, published as `@fsegurai/marked-extended-<name>` 18.0.0 with the peer
`marked ^18` (comments and embeds: `>=17.0.0`). Each package's default export is the extension factory; the bundle
re-exports it as `markedExtended<Name>`.

## Catalog

| Extension | Package | Default export (bundle name) | Syntax summary | Browser behavior |
|-----------|---------|------------------------------|----------------|------------------|
| [Accordion](accordion.md) | `@fsegurai/marked-extended-accordion` | `markedExtendedAccordion` | ```` ```accordion ```` fence, front matter ended by `---` | none (native `<details>`) |
| [Alert](alert.md) | `@fsegurai/marked-extended-alert` | `markedExtendedAlert` | `> [!NOTE]` blockquote, optional title and `{icon=…}` | none |
| [Comments](comments.md) | `@fsegurai/marked-extended-comments` | `markedExtendedComments` | `:::comment{…}text:::` and ```` ```comments ```` | none |
| [Embeds](embeds.md) | `@fsegurai/marked-extended-embeds` | `markedExtendedEmbeds` | ```` ```embed ```` fence with a URL | none (iframes load with the page) |
| [Footnote](footnote.md) | `@fsegurai/marked-extended-footnote` | `markedExtendedFootnote` | `[^id]`, `^[inline]`, `[^id]: …`, `[footnotes]` | smooth-scroll click listener |
| [Kanban](kanban.md) | `@fsegurai/marked-extended-kanban` | `markedExtendedKanban` | ```` ```kanban ```` with `## Column {…}` and list cards | inline view buttons; `enableKanbanDragDrop` |
| [Lists](lists.md) | `@fsegurai/marked-extended-lists` | `markedExtendedLists` | `a.`, `I.`, `i)` markers, `- [ ]` tasks | checkbox listener; `enableListsEditing` |
| [Slide](slide.md) | `@fsegurai/marked-extended-slide` | `markedExtendedSlide` | ```` ```presentation ```` with `---` between slides | injected navigation script |
| [Spoiler](spoiler.md) | `@fsegurai/marked-extended-spoiler` | `markedExtendedSpoiler` | ```` ```spoiler ```` fence | `initSpoilers` |
| [Tables](tables.md) | `@fsegurai/marked-extended-tables` | `markedExtendedTables` | `\|\|` colspan, `^` rowspan, `[Caption]` | none |
| [Tabs](tabs.md) | `@fsegurai/marked-extended-tabs` | `markedExtendedTabs` | ```` ```tabs ```` with `label:` per tab, `---` between tabs | CSS-only switching plus a document runtime |
| [Timeline](timeline.md) | `@fsegurai/marked-extended-timeline` | `markedExtendedTimeline` | ```` ```timeline ```` with `date:` per event | optional `initTimeline*` helpers |
| [Typographic](typographic.md) | `@fsegurai/marked-extended-typographic` | `markedExtendedTypographic` | Smart quotes, `--`, `...`, `(:alpha:)` | none |

[Browser Behavior](../guides/browser-behavior.md) explains each entry of the last column. One more package completes
the set:

| Package | Purpose |
|---------|---------|
| `@fsegurai/marked-extended-bundle` | Re-exports every extension, helper and type. See the [bundle API](../api/bundle.md). |

## What every page covers

1. **Syntax**: the Markdown the extension parses, with every front-matter key or property.
2. **Options**: the factory options type, with defaults read from source.
3. **Rendered HTML**: the markup, classes and attributes the renderer emits.
4. **Browser behavior**: exported helpers, events and anything installed on `document` or `window`.
5. **Styling**: the stylesheets each package exports.

## Next step

Start with [Installation](../getting-started/installation.md) if you have not installed a package yet.
