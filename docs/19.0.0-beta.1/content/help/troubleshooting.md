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
| A table caption is ignored | More than one blank line separates it from the table | Put `[Caption]` directly above the header row, or leave exactly one blank line. |
| A cell ending in `^` no longer merges | Since 19.0.0-beta.1 only `^^` merges a cell into the one above | Write the merge cell as `\| ^^ \|`. |
| Typographic converts quotes and dashes you did not ask for | Unset `quotes`, `dashes` and `ellipses` follow `attribute` (all on with the default `'3'`) | Set the groups you do not want to `false` (`dashes: false` keeps `--`). |
| Typographic changes KaTeX or Mermaid output | They are ordinary elements to it | Pass `skipClasses: ['katex', 'mermaid']`. |
| Embeds of `iframe` or `pdf` stay links | Their URL comes from the author | List the origin in `attachEmbeds(root, { trustedOrigins: ['https://…'] })`. |
| An embed shows an error with reason `timeout` | No `load` within `timeout` ms | Raise `timeout`, or click again: failed embeds are retryable. |
| Spoiler particles are invisible | Particles are drawn only by `spoiler-theme.css` | Import it, or set `particles: false`. |
| Kanban views do not switch without JavaScript | Only the initial view is CSS-selected | Attach `attachKanban`; import `kanban.css`. |
| Code-block line highlights are missing | Line wrapping needs the runtime | Call `attachCode(root)`, or `wrapLines(code)` after highlighting. |
| Markers such as `[!code hl]` stay in the code | The fence language is in `passthrough`, or the marker is not inside a comment | Check `passthrough` (default `['mermaid']`) and put the marker in a comment. |
| A console warning names an option as ignored | The option was removed from the extension in 19 | See the replacements in the [FAQ](faq.md#my-18x-callback-options-stopped-working). |
| Styles target `#id` or `[data-*]` and stopped matching | The default markup has no `id` or `data-*` | Target the class tokens (`.mx-<pkg>-<key>-<value>`), or set `unsafeHtml: true`. |
| `.marked-extended-*`, `.active` or `--marked-*` rules stopped matching | 19.0.0-beta.1 renamed every class and custom property to the `mx-` convention, with no aliases | Rename them with the tables in [Migrating to 19](../guides/migration-19.md#from-1900-beta0-to-1900-beta1). |
| A custom `data-*` attribute (accordion, comments, embeds, kanban, spoiler) is missing | Since 19.0.0-beta.1 the runtimes restore only allow-listed names | Pass `allowedDataAttributes: ['data-…']` to the runtime (`attachSpoilers`, `attachComments`, `attachAccordion`, `attachEmbeds`, `attachKanban`). |
| A wiki link renders as plain text with an "Unresolved link" title | `resolve` returned `null`, or an `href` with an unsafe scheme | Return `{ href }` with a relative, `http(s):` or `mailto:` URL. |
| `[toc]` lists no headings, or links that miss | `[toc]` must be on a top-level line of its own; ids come from the slugger | Put it on its own line; give `toc`, `wikilinks` and `source-map` the same slugger if you use a custom one. |
| Prism's line highlight lands on the wrong lines, or `data-line` holds a source line | `attachCode` and another tool both write `data-line` | Pass `prismLineHighlight: 'skip'` (or `'remove'`) to `attachCode`. |
| Code shows two line-number columns | `code.css` numbers lines itself since 19.0.0-beta.1 | Remove your own line counter CSS. |
| Footnote content ignores an extension registered on the global `marked` | Since 19.0.0-beta.1 footnotes render with the `Marked` instance being parsed | Register that extension on the same instance. |

## Still stuck?

Open an issue at [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues)
with the Markdown, the options and the package versions.
