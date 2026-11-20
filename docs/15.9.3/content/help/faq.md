---
label: FAQ
description: Frequent questions about the 15.9.3 version scheme, the marked peer, directive syntax, styles and sanitizers.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "compatibility", "marked 15", "sanitizer", "directives" ]
---

# FAQ

## Why do the packages have other version numbers than 15.9.3?

15.9.3 is the monorepo version. Each package is versioned on its own (for example tables 15.2.1). See
[Installation](../getting-started/installation.md) for the full list.

## Which Marked version do I need?

Any version from 13 up to (not including) 16: every package declares `marked >=13 <16`.

## Where is the code preview extension?

It was removed in the 15.9 line; the changelog names accordion as its replacement. See
[Upgrading from 15.1](../guides/upgrading-from-15.1.md).

## Is there a bundle?

No. The bundle package arrived in 17.0.0. Install the individual packages.

## Why `::::name` and not `:::name` as in the READMEs?

The parser (`packages/helper/utils.js`) uses four colons for containers and three for items, plus the short aliases
(`:acc`, `:sp`, `:tb`, `:t`, `:tl`, `:ev`). The `:::tabs` / `::tab` form shown in some package READMEs does not parse.

## Where are the CSS files?

There are none. Accordion, spoiler, tabs and timeline write a `<style>` into each block; alert injects its CSS from
JavaScript. See
[Styling](../guides/styling.md).

## Does the HTML survive a sanitizer?

Partly. Accordion, spoiler, tabs and timeline carry `<style>` elements, tabs need radio inputs and spoilers carry a
`<script>`. Render 15.9.3
output only from trusted Markdown.

## Next step

- [Troubleshooting](troubleshooting.md)
