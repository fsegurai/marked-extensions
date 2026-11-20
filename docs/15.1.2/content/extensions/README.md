---
label: Extensions
description: Catalog of the 6 Marked extensions in 15.1.2 with their package version, default export, browser behavior and the Markdown syntax each one parses.
order: 2
tags: [ "extensions", "catalog" ]
keywords: [ "packages", "default export", "syntax summary", "fenced blocks" ]
breadcrumbTitle: Extensions
---

# Extensions

Every extension is its own npm package, published as `@fsegurai/marked-extended-<name>` with the peer
`marked >=13 <16`. Each package's default export is the extension factory.

Block extensions in 15.1.2 use fenced blocks: ```` ```preview ```` for code preview and ```` ```spoiler ```` for the
spoiler. There are no colon directives in this release.

## Catalog

| Extension | Package (version) | Default export | Syntax summary | Browser behavior |
|-----------|-------------------|----------------|----------------|------------------|
| [Code Preview](code-preview.md) | `@fsegurai/marked-extended-code-preview` (15.1.0) | `markedExtendedCodePreview` | ```` ```preview title="…" subTitle="…" ```` fence | none |
| [Footnote](footnote.md) | `@fsegurai/marked-extended-footnote` (15.1.0) | `markedExtendedFootnote` | `[^id]`, `[^id]: …` | none |
| [Lists](lists.md) | `@fsegurai/marked-extended-lists` (15.1.0) | `markedExtendedLists` | `a.`, `I.`, `i)` markers, `- [ ]` tasks | none |
| [Spoiler](spoiler.md) | `@fsegurai/marked-extended-spoiler` (15.0.0) | `markedExtendedSpoiler` | ```` ```spoiler title="…" ```` fence | DOM particles and one `<style>` in `document.head` per spoiler |
| [Tables](tables.md) | `@fsegurai/marked-extended-tables` (15.1.0) | `markedExtendedTables` | `\|\|` colspan, `^` rowspan, multi-row headers | none |
| [Typographic](typographic.md) | `@fsegurai/marked-extended-typographic` (15.1.0) | `markedExtendedTypographic` | `(c^)`, `(alpha)` shortcodes, SmartyPants dashes | none |

The default export names in this table are the UMD globals from each package's Rollup config. In ESM you can import
the default export under any name. [Browser Behavior](../guides/browser-behavior.md) explains the last column.

## The `markedInstance` argument

Code preview and spoiler take a second factory argument and use it to render their content:

| Extension | Call made | Pass | Without it |
|-----------|-----------|------|------------|
| Code preview | `markedInstance(code)` | the `marked` function | content inserted as raw text |
| Spoiler | `markedInstance.parse(code)` | `marked` or a `new Marked()` instance | content inserted as raw text |

Footnote, lists and tables render nested content through the Marked instance that is parsing (`this.parser`).

## What every page covers

1. **Syntax**: the Markdown the extension parses.
2. **Options**: the factory arguments, with defaults read from source.
3. **Rendered HTML**: the markup and classes the renderer emits.
4. **Browser behavior**: DOM work and styles.

## Next step

Start with [Installation](../getting-started/installation.md) if you have not installed a package yet.
