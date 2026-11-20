---
label: FAQ
description: Frequent questions about the 15.9.6 version scheme, the marked peer, directive syntax, injected styles and sanitizers.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "compatibility", "marked 15", "sanitizer", "directives" ]
---

# FAQ

## Why do the packages have other version numbers than 15.9.6?

15.9.6 is the monorepo version. Each package is versioned on its own (for example tables 15.3.1). See
[Installation](../getting-started/installation.md) for the full list.

## Which Marked version do I need?

Any version from 13 up to (not including) 16: every package declares `marked >=13 <16`.

## Is there a bundle?

No. The bundle package arrived in 17.0.0. Install the individual packages.

## Why `::::name` and not `:::name` as in the READMEs?

The parser (`packages/helper/utils.js`) uses four colons for containers and three for items, plus the short aliases
(`:acc`, `:sp`, `:tb`, `:t`, `:tl`, `:ev`). The `:::tabs` / `::tab` form shown in some package READMEs does not parse.

## Where are the CSS files?

There are none. Accordion, alert, spoiler, tabs and timeline inject their CSS from JavaScript. See
[Styling](../guides/styling.md).

## Does the HTML survive a sanitizer?

Partly. Tabs need a `<style>` element and radio inputs; spoilers carry a `<style>` and a `<script>`. Render 15.9.6
output only from trusted Markdown.

## Next step

- [Troubleshooting](troubleshooting.md)
