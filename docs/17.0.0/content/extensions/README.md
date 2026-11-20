---
label: Extensions
description: Catalog of the 13 Marked extensions in 17.0.0 with their package, default export, browser behavior and the directive or Markdown syntax each one parses.
order: 2
tags: [ "extensions", "catalog" ]
keywords: [ "packages", "default export", "syntax summary", "directives" ]
breadcrumbTitle: Extensions
---

# Extensions

Every extension is its own npm package, published as `@fsegurai/marked-extended-<name>` 17.0.0 with the peer
`marked ^17` (comments and embeds: `>=17.0.0`). Each package's default export is the extension factory; the bundle
re-exports it as `markedExtended<Name>`.

Block extensions in 17.0.0 use colon directives: `::::name{prop="value"}` … `::::nameend`, with `:::child{…}` …
`:::childend` for nested items. Fenced code block syntax arrived in 18.0.0.

## Catalog

| Extension | Package | Default export (bundle name) | Syntax summary | Browser behavior |
|-----------|---------|------------------------------|----------------|------------------|
| [Accordion](accordion.md) | `@fsegurai/marked-extended-accordion` | `markedExtendedAccordion` | `::::accordion{title="…"}` … `::::accordionend` | none |
| [Alert](alert.md) | `@fsegurai/marked-extended-alert` | `markedExtendedAlert` | `> [!NOTE]` blockquote, 5 types | none |
| [Comments](comments.md) | `@fsegurai/marked-extended-comments` | `markedExtendedComments` | `:::comment{…}text:::` and `::::comment{…}` … `::::commentend` | none |
| [Embeds](embeds.md) | `@fsegurai/marked-extended-embeds` | `markedExtendedEmbeds` | `::::embed{…}` URL `::::embedend` | none |
| [Footnote](footnote.md) | `@fsegurai/marked-extended-footnote` | `markedExtendedFootnote` | `[^id]`, `[^id]: …`, `[footnotes]` | smooth-scroll click listener |
| [Kanban](kanban.md) | `@fsegurai/marked-extended-kanban` | `markedExtendedKanban` | `::::kanban{view="…"}` with `:::column{label="…"}` lists | inline view buttons |
| [Lists](lists.md) | `@fsegurai/marked-extended-lists` | `markedExtendedLists` | `a.`, `I.`, `i)` markers, `- [ ]` tasks | inline checkbox `onclick` |
| [Slide](slide.md) | `@fsegurai/marked-extended-slide` | `markedExtendedSlide` | `::::presentation{…}` with `::::slide{…}` … `::::slideend` | injected navigation script |
| [Spoiler](spoiler.md) | `@fsegurai/marked-extended-spoiler` | `markedExtendedSpoiler` | `::::spoiler{…}` … `::::spoilerend` | inline `<script>` per spoiler; CSS hover reveal |
| [Tables](tables.md) | `@fsegurai/marked-extended-tables` | `markedExtendedTables` | `\|\|` colspan, `^` rowspan, `[Caption]` | none |
| [Tabs](tabs.md) | `@fsegurai/marked-extended-tabs` | `markedExtendedTabs` | `::::tabs` with `:::tab{label="…"}` … `:::tabend` | CSS-only switching plus a document runtime |
| [Timeline](timeline.md) | `@fsegurai/marked-extended-timeline` | `markedExtendedTimeline` | `::::timeline` with `:::event{date="…"}` … `:::eventend` | none |
| [Typographic](typographic.md) | `@fsegurai/marked-extended-typographic` | `markedExtendedTypographic` | Dashes, `...`, `(alpha)` shortcodes | none |

[Browser Behavior](../guides/browser-behavior.md) explains each entry of the last column. One more package completes
the set:

| Package | Purpose |
|---------|---------|
| `@fsegurai/marked-extended-bundle` | Re-exports every extension factory and type. See the [bundle API](../api/bundle.md). |

## What every page covers

1. **Syntax**: the directive or Markdown the extension parses, with every property and alias.
2. **Options**: the factory options type, with defaults read from source.
3. **Rendered HTML**: the markup, classes and attributes the renderer emits.
4. **Browser behavior**: inline scripts, handlers and globals.
5. **Styling**: the stylesheets each package exports.

## Next step

Start with [Installation](../getting-started/installation.md) if you have not installed a package yet.
