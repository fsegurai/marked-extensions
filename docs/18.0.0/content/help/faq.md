---
label: FAQ
description: Frequent questions about choosing packages, the marked 18 peer, sanitizers, server-side rendering and browser helpers in 18.0.0.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "compatibility", "marked 18", "ssr", "sanitizer" ]
---

# FAQ

## Bundle or individual packages?

Individual packages when you use a few extensions. The bundle when you use many and want one import. Both expose the
same functions; the bundle names each factory `markedExtended<Name>` and has no default export.

## Which Marked version do I need?

`marked ^18` for every 18.0.0 package. Comments and embeds declare `>=17.0.0`, so they also install next to marked 17,
but the other packages do not.

## Does the HTML survive a sanitizer?

Not completely. 18.0.0 markup relies on `id`, `data-*` attributes, inline `style`, inline `<svg>`, and for tabs a
`<style>` element and radio inputs; kanban adds inline `onclick` handlers and a JSON `<script>`. Strict
sanitizers (DOMPurify defaults, Angular's `[innerHTML]`) strip some of these. Render 18.0.0 output only where you trust the Markdown, or allow those
attributes and elements explicitly. Sanitizer-safe markup arrives in 19.0.0.

## Can I render on the server?

Yes. Browser access in every package checks `typeof window` / `typeof document` first, so imports and
`marked.parse` run in Node.js. Call the `init*` and `enable*` helpers in the browser only, and note that the tabs
runtime and the slide script are installed only when the factory runs in a browser. See
[Browser Behavior](../guides/browser-behavior.md).

## Which extensions run code in the browser?

| Static HTML only | HTML with inline behavior | Needs a helper call |
|------------------|---------------------------|---------------------|
| accordion, alert, comments, embeds, tables, typographic | tabs (CSS-only radios plus a runtime), slide (injected script), kanban views, footnote scrolling | spoiler (`initSpoilers`), timeline (`initTimeline*`), lists editing (`enableListsEditing`), kanban drag and drop (`enableKanbanDragDrop`) |

The [Browser Behavior](../guides/browser-behavior.md) guide lists what each one does.

## My 17.0.0 content no longer renders

Accordion, comments, embeds, kanban, slide, spoiler, tabs and timeline moved from `::::name` directives to fenced
code blocks. See [Upgrading from 17](../guides/upgrading-from-17.md).

## Next step

- [Troubleshooting](troubleshooting.md)
