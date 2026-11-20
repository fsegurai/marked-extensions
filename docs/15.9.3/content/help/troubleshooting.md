---
label: Troubleshooting
description: Fixes for 15.9.3 directives that stay as text, nested syntax that is ignored, tabs that do not switch, ignored options and inert typographic options.
order: 2
tags: [ "help", "troubleshooting" ]
keywords: [ "not working", "sanitizer", "directives", "aliases", "debugging" ]
---

# Troubleshooting

Find the symptom, apply the fix.

| Symptom | Cause | Fix |
|---------|-------|-----|
| `:::tabs` or `::tab` stays as text | That form, shown in some READMEs, is not parsed | Use `::::tabs` … `::::tabsend` with `:::tab{…}` … `:::tabend`. |
| `::::accordion` or `::::spoiler` stays as text | The `{…}` block is missing | Write `::::accordion{title="…"}`, even with no properties: `::::accordion{}`. |
| A directive is swallowed by the paragraph above | The block starts in the middle of a paragraph | Leave a blank line before the directive. |
| Alerts, tabs or footnotes inside an accordion are not rendered | Inner content is parsed with the global `marked`, but the extensions were registered on a `new Marked()` instance | Register with `marked.use(...)` on the default export. |
| A tabs block inside another tabs block breaks | Tabs and timeline containers do not balance nested blocks | Do not nest tabs in tabs or timelines in timelines. |
| Tabs `customClass` merges with the default class | The tabs renderer appends it without a space | Pass the value with a leading space: `customClass: ' my-tabs'`. |
| `::::tabs{customClass="…"}` stays as text | The container must be followed directly by a line break | Use the `customClass` option instead. |
| A ```` ```spoiler ```` or ```` ```preview ```` fence renders as code | The 15.1 fenced syntax was replaced | Use `::::spoiler{…}`; code preview was removed. |
| Tabs do not switch | A sanitizer removed the block's `<style>` or the radio `<input>`s | Render trusted Markdown without stripping them. |
| Spoiler `cssVariables` change nothing | Declared in the types but never read in 15.9.3 | Use the `duration` and `theme` properties, or override the CSS. |
| Custom CSS loses against the extension styles | Per-block styles are scoped to the element id | Use more specific selectors or `!important`. |
| `persistSelection` does nothing | The option is never read | Not supported in 15.9.3. |
| Quotes stay straight with defaults | `quotes`, `dashes` and `ellipses` default to `false` in source | Pass `quotes: true` (and the others) explicitly. |
| `> [!note]` stays a blockquote | Markers are matched in upper case | Write `> [!NOTE]`. |
| `c.`, `v.`, `x.`, `l.` or `i.` start a Roman list | Roman markers are checked before letters | Use another letter or a numeric list. |

## Still stuck?

Open an issue at [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues)
with the Markdown, the options and the package versions.
