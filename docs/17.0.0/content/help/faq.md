---
label: FAQ
description: Frequent questions about choosing packages, the marked 17 peer, directive syntax, sanitizers and browser behavior in 17.0.0.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "compatibility", "marked 17", "sanitizer", "directives" ]
---

# FAQ

## Bundle or individual packages?

Individual packages when you use a few extensions. The bundle (new in 17.0.0) when you use many and want one import.
The bundle names each factory `markedExtended<Name>` and has no default export.

## Which Marked version do I need?

`marked ^17` for every 17.0.0 package. Comments and embeds declare `>=17.0.0`.

## Why `::::name` and not fenced code blocks?

17.0.0 block extensions use colon directives: `::::name{prop="value"}` … `::::nameend`. Fenced code block syntax
arrived in 18.0.0.

## Does the HTML survive a sanitizer?

Not completely. The markup relies on `id`, `data-*` attributes, inline `style`, inline `onclick` (kanban, lists),
inline `<script>` (spoiler) and, for tabs, a `<style>` element and radio inputs. Strict sanitizers remove some of
these. Render 17.0.0 output only from trusted Markdown.

## Which extensions run code in the browser?

| Static HTML only | HTML with inline behavior | Installed by the factory |
|------------------|---------------------------|--------------------------|
| accordion, alert, comments, embeds, tables, timeline, typographic | kanban, lists, spoiler | tabs runtime, slide script, footnote scroll listener |

[Browser Behavior](../guides/browser-behavior.md) lists what each one does.

## Next step

- [Troubleshooting](troubleshooting.md)
