---
label: Extensions
description: Catalog of the 9 Marked extensions in 15.9.4 with their package version, default export, injected styles and the directive or Markdown syntax each one parses.
order: 2
tags: [ "extensions", "catalog" ]
keywords: [ "packages", "default export", "syntax summary", "directives" ]
breadcrumbTitle: Extensions
---

# Extensions

Every extension is its own npm package, published as `@fsegurai/marked-extended-<name>` with the peer
`marked >=13 <16`. Each package's default export is the extension factory.

Block extensions in 15.9.4 use colon directives: `::::name{prop="value"}` … `::::nameend`, with `:::child{…}` …
`:::childend` for nested items. Every directive also has short aliases (for example `:acc` … `:accend`).

## Catalog

| Extension | Package (version) | Default export | Syntax summary | Browser behavior |
|-----------|-------------------|----------------|----------------|------------------|
| [Accordion](accordion.md) | `@fsegurai/marked-extended-accordion` (15.1.0) | `markedExtendedAccordion` | `::::accordion{title="…"}` … `::::accordionend` | injects styles |
| [Alert](alert.md) | `@fsegurai/marked-extended-alert` (15.1.0) | `markedExtendedAlert` | `> [!NOTE]` blockquote, 5 types | injects styles |
| [Footnote](footnote.md) | `@fsegurai/marked-extended-footnote` (15.2.2) | `markedExtendedFootnote` | `[^id]`, `[^id]: …`, `[footnotes]` | none |
| [Lists](lists.md) | `@fsegurai/marked-extended-lists` (15.2.2) | `markedExtendedLists` | `a.`, `I.`, `i)` markers, `- [ ]` tasks | none |
| [Spoiler](spoiler.md) | `@fsegurai/marked-extended-spoiler` (15.2.0) | `markedExtendedSpoiler` | `::::spoiler{…}` … `::::spoilerend` | injects styles; inline `<script>` and `<style>` per spoiler |
| [Tables](tables.md) | `@fsegurai/marked-extended-tables` (15.3.0) | `markedExtendedTables` | `\|\|` colspan, `^` rowspan, `[Caption]` | none |
| [Tabs](tabs.md) | `@fsegurai/marked-extended-tabs` (15.1.0) | `markedExtendedTabs` | `::::tabs` with `:::tab{label="…"}` … `:::tabend` | injects styles; `<style>` per block |
| [Timeline](timeline.md) | `@fsegurai/marked-extended-timeline` (15.1.0) | `markedExtendedTimeline` | `::::timeline` with `:::event{date="…"}` … `:::eventend` | injects styles |
| [Typographic](typographic.md) | `@fsegurai/marked-extended-typographic` (15.2.2) | `markedExtendedTypographic` | `(c^)`, `(->)`, `(alpha)` shortcodes; optional smart quotes | none |

"Injects styles" means the factory appends one `<style>` element to `document.head` in the browser unless you pass
`injectStyles: false`. [Browser Behavior](../guides/browser-behavior.md) explains each entry of the last column.

## Directive aliases

| Block | Canonical | Aliases |
|-------|-----------|---------|
| Accordion | `::::accordion{…}` … `::::accordionend` | `:acc`, `:accordion` … `:accend`, `:accordionend` |
| Spoiler | `::::spoiler{…}` … `::::spoilerend` | `:sp`, `:spoiler` … `:spend`, `:spoilerend` |
| Tabs container | `::::tabs` … `::::tabsend` | `:tb`, `:tabs` … `:tbend`, `:tabsend` |
| Tab item | `:::tab{…}` … `:::tabend` | `:t`, `:tab` … `:tend`, `:tabend` |
| Timeline container | `::::timeline` … `::::timelineend` | `:tl`, `:timeline` … `:tlend`, `:timelineend` |
| Timeline event | `:::event{…}` … `:::eventend` | `:ev`, `:event` … `:evend`, `:eventend` |

The aliases are defined in `packages/helper/utils.js`. The package READMEs show a different `:::tabs` / `::tab` / `::`
form; the parser does not accept that form.

## What every page covers

1. **Syntax**: the directive or Markdown the extension parses, with every property.
2. **Options**: the factory options, with defaults read from source.
3. **Rendered HTML**: the markup and classes the renderer emits.
4. **Browser behavior**: injected styles and inline scripts.

## Next step

Start with [Installation](../getting-started/installation.md) if you have not installed a package yet.
