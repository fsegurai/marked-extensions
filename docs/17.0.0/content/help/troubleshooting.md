---
label: Troubleshooting
description: Fixes for 17.0.0 directives that stay as text, tabs that do not switch, inert spoiler scripts, decks that do not navigate, embeds that do not parse and ignored options.
order: 2
tags: [ "help", "troubleshooting" ]
keywords: [ "not working", "sanitizer", "directives", "aliases", "debugging" ]
---

# Troubleshooting

Find the symptom, apply the fix.

| Symptom | Cause | Fix |
|---------|-------|-----|
| A ```` ```tabs ```` or ```` ```spoiler ```` fence renders as a code block | Fenced syntax arrived in 18.0.0 | Use the 17.0.0 directives (`::::tabs` … `::::tabsend`) or upgrade. |
| `:acc`, `:sp`, `:tb` or `:tl` stays as text | Short aliases were renamed in 17.0.0 | Use `:acd`, `:spr`, `:tbs`, `:tml` or the long names; see [Upgrading from 15](../guides/upgrading-from-15.md). |
| Tabs do not switch | A sanitizer removed the block's `<style>` or the radio `<input>`s, or `tabs.css` is missing | Render trusted Markdown without stripping them; import `tabs.css`. |
| Tabs `onBeforeSwitch` / `onAfterSwitch` never fire | 17.0.0 accepts them but never calls them | Listen for the `tab-switched` event on the tabs container instead. |
| A spoiler's script does nothing | Scripts inserted with `innerHTML` do not run | Rely on the CSS hover and focus reveal, or upgrade to 18.0.0 for `initSpoilers()`. |
| Slides are stacked or keys do nothing | The factory never ran in the browser, so the script was not appended; or the deck is not the first on the page | Call `markedExtendedSlide()` in the browser; render one deck per page. |
| An embed block stays as text | The newline must follow `}` directly, or the URL matches no provider | Start the URL on the line right after `::::embed{…}`; use a supported provider URL. |
| Kanban view buttons or list checkboxes do nothing | Inline `onclick` was removed by a sanitizer or blocked by CSP | Allow inline handlers for trusted content. |
| `c.`, `v.`, `x.` or `l.` start a Roman list | Roman markers are checked before letters | Use another letter or a numeric list. |
| Comments `visibilityFilter` / `typeFilter` have no effect | Declared but not applied by the renderers | Filter the rendered comments with your own CSS or code. |
| Straight quotes stay straight | Marked escapes quotes before the typographic hook | Write curly quotes directly, or upgrade. |
| A footnote link scrolls twice | `markedExtendedFootnote()` was called more than once; each call adds a `document` listener | Create the extension once per page. |
| `> [!note]` stays a blockquote | Markers are matched in upper case | Write `> [!NOTE]`. |

## Still stuck?

Open an issue at [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues)
with the Markdown, the options and the package versions.
