---
label: Troubleshooting
description: Fixes for missing icons, inert tabs or embeds, stacked slides, unconverted alerts, tables syntax, typographic surprises and runtimes that stop after a re-render.
order: 2
tags: [ "help", "troubleshooting" ]
keywords: [ "not working", "icons missing", "re-render", "sanitizer", "debugging" ]
---

# Troubleshooting

Find the symptom, apply the fix.

| Symptom | Cause | Fix |
|---------|-------|-----|
| Alert, accordion or comment icons are missing | Icons are CSS masks since 19 | Import the package's structural CSS (`alert.css`, `accordion.css`, `comments.css`). |
| Tabs do not switch, embeds do not load, spoilers do not reveal | No runtime attached | Call `attachTabs` / `attachEmbeds` / `attachSpoilers` (or `attachAll`) after inserting the HTML. |
| Every slide is shown stacked | The slide runtime has not run | Call `attachSlides(root)` right after inserting the HTML, and import `slide.css`. |
| Behavior works once, then breaks after a re-render | Per-element setup was not re-applied | Call `attachX.refresh(root)` / `handle.refresh()` after replacing the content, or attach with `{ observe: true }`. |
| Calling `attachX` again does nothing | Runtimes are idempotent per root | Keep the first `dispose`; call `refresh` instead of attaching again. |
| `> [!note]` stays a blockquote | Markers are matched in upper case | Write `> [!NOTE]`. For unknown types, set `defaultVariant`. |
| A table caption is ignored | The caption line must touch the table | Put `[Caption]` directly above the header row, with no blank line. |
| `^^` leaves a stray `^` in a merged cell | A cell ending in `^` merges into the cell above; the rest of its text is appended | Write the merge cell as `\| ^ \|`. |
| Typographic converts quotes and dashes with all booleans `false` | The default `attribute: '3'` enables them | Pass `attribute: 0` and enable the features you want with the booleans. |
| Line breaks appear in another `Marked` instance | `breaks: true` in typographic calls `marked.setOptions` on the global `marked` | Set `breaks` on your own instance instead. |
| Embeds of `iframe` or `pdf` stay links | Their URL comes from the author | List the origin in `attachEmbeds(root, { trustedOrigins: ['https://…'] })`. |
| An embed shows an error with reason `timeout` | No `load` within `timeout` ms | Raise `timeout`, or click again: failed embeds are retryable. |
| Spoiler particles are invisible | Particles are drawn only by `spoiler-theme.css` | Import it, or set `particles: false`. |
| Kanban views do not switch without JavaScript | Only the initial view is CSS-selected | Attach `attachKanban`; import `kanban.css`. |
| Code-block line highlights are missing | Line wrapping needs the runtime | Call `attachCode(root)`, or `wrapLines(code)` after highlighting. |
| Markers such as `[!code hl]` stay in the code | The fence language is in `passthrough`, or the marker is not inside a comment | Check `passthrough` (default `['mermaid']`) and put the marker in a comment. |
| A console warning names an option as ignored | The option was removed from the extension in 19 | See the replacements in the [FAQ](faq.md#my-18x-callback-options-stopped-working). |
| Styles target `#id` or `[data-*]` and stopped matching | The default markup has no `id` or `data-*` | Target the class tokens (`.mx-<pkg>-<key>-<value>`), or set `unsafeHtml: true`. |

## Still stuck?

Open an issue at [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues)
with the Markdown, the options and the package versions.
