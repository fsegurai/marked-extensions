---
label: FAQ
description: Frequent questions about the 15.1.2 version scheme, the marked peer, the markedInstance argument, fenced syntax and styles.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "compatibility", "marked 15", "markedInstance", "fenced blocks" ]
---

# FAQ

## Why do the packages have other version numbers than 15.1.2?

15.1.2 is the monorepo version. Each package is versioned on its own: spoiler is 15.0.0 and the other five are
15.1.0. See [Installation](../getting-started/installation.md).

## Which Marked version do I need?

Any version from 13 up to (not including) 16: every package declares `marked >=13 <16`.

## Why is the content of my spoiler or code preview not rendered?

Both factories render their content only with the second argument: `markedExtendedSpoiler({}, marked)` and
`markedExtendedCodePreview({}, marked)`. Code preview calls it as a function, so pass the `marked` export, not a
`new Marked()` instance.

## Are there colon directives such as `::::spoiler`?

No. 15.1.2 uses fenced blocks: ```` ```preview ```` and ```` ```spoiler ````. Directives arrived in the 15.9 line.

## Is there a bundle?

No. Install the individual packages.

## Where are the CSS files?

There are none. The spoiler creates its styles in the browser; code preview, footnote and the others need your own
CSS. See [Styling](../guides/styling.md).

## Does the HTML survive a sanitizer?

Mostly. Code preview, footnote, lists and tables emit ordinary elements. The spoiler template relies on inline `style`
attributes, and code preview and spoiler titles are inserted without escaping. Render only trusted Markdown.

## Next step

- [Troubleshooting](troubleshooting.md)
