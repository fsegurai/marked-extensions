---
label: FAQ
description: Frequent questions about choosing packages, the marked peer, sanitizers, server-side rendering, unsafeHtml and deprecated options.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "compatibility", "marked 19", "angular", "ssr" ]
---

# FAQ

## Bundle or individual packages?

Individual packages when you use a few extensions. The bundle when you use many and want one `attachAll(root)` call.
Both expose the same functions; the bundle names each factory `markedExtended<Name>` and has no default export.

## Which Marked version do I need?

`marked ^18` for every 19.0.0-beta.x package. The stable 19.0.0 will require marked 19 once it is released.

## Do I need `@fsegurai/marked-extended-core`?

No. Every package bundles the parts of core it uses. Install core only to build your own runtime or extension on the
same contract.

## Does the HTML work with Angular's sanitizer or DOMPurify?

Yes. The default markup uses only `class`, `aria-*`, `role`, `hidden`, `open` and `tabindex` for state, so strict
sanitizers keep it. See [Sanitizer-Safe Markup](../guides/sanitizer-safe-markup.md).

## Can I render on the server?

Yes. Importing a package or calling its factory never touches `document` or `window`, and ids are content hashes, so
server and client output match. Call the `attachX` runtimes in the browser only.

## When should I use `unsafeHtml: true`?

Only when your HTML is not sanitized and you depend on the 18.0 markup (`id`, `data-*`, inline `style` or `<svg>`).
The runtimes work with both markups.

## Which extensions need a runtime?

| Works fully without JavaScript | Gains behavior with its runtime | Needs its runtime for its main feature |
|--------------------------------|---------------------------------|----------------------------------------|
| alert, tables, typographic | accordion, comments, footnote, timeline, code (line classes), lists (static checkboxes) | embeds (loading), kanban (switching, moves), slide (deck mode), spoiler (reveal), tabs (switching) |

## My 18.x callback options stopped working

They are ignored since 19.0.0-beta.0, with a one-time console warning. Use the runtime options or the events:

| Ignored option | Replacement |
|----------------|-------------|
| embeds `onEmbedLoad`, `onEmbedError` | `marked-extended:embeds:load` / `:error` events, or `attachEmbeds` options |
| footnote `smoothScroll`, `scrollOffset` | `attachFootnotes(root, { smoothScroll, scrollOffset })` |
| kanban `onMove` | `marked-extended:kanban:move` event |
| lists `onCheckboxChange` | `marked-extended:lists:toggle` event |
| slide `injectScript`, `scriptNonce` | `attachSlides(root)` |
| tabs `onBeforeSwitch`, `onAfterSwitch` | `marked-extended:tabs:before-switch` / `:switch` events |

## Next step

- [Troubleshooting](troubleshooting.md)
