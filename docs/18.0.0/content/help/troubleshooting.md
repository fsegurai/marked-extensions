---
label: Troubleshooting
description: Fixes for 18.0.0 content that stays as text, tabs that do not switch, spoilers that do not reveal, decks that do not navigate, typographic shortcodes and ignored embed options.
order: 2
tags: [ "help", "troubleshooting" ]
keywords: [ "not working", "sanitizer", "colon syntax", "debugging" ]
---

# Troubleshooting

Find the symptom, apply the fix.

| Symptom | Cause | Fix |
|---------|-------|-----|
| `::::tabs`, `::::spoiler` or another block shows as text | 17.0.0 colon directives are not parsed in 18.0.0 | Rewrite as fenced blocks; see [Upgrading from 17](../guides/upgrading-from-17.md). |
| Tabs do not switch | A sanitizer removed the block's `<style>` or the radio `<input>`s, or `tabs.css` is missing | Render trusted Markdown without stripping them; import `tabs.css`. |
| Spoilers do not reveal on click | The import-time `initSpoilers()` call was tree-shaken (`"sideEffects": false`) | Call `initSpoilers()` after rendering. |
| Spoiler particles have no size or position | Per-particle CSS goes only to the `{particleStyles}` template placeholder, which the default template omits | Pass `particles: false`, or a custom `template` that includes `{particleStyles}`. |
| Timeline events do not collapse or reveal | The helpers are opt-in | Call `initAllTimelineInteractions(container)`; collapse needs the default event class. |
| Slides are stacked or keys do nothing | The factory never ran in the browser, so the script was not appended; or the deck is not the first on the page | Call `markedExtendedSlide()` in the browser; render one deck per page. |
| The slide script is blocked by CSP | The injected `<script>` has no nonce | Pass `scriptNonce`. |
| Kanban view buttons do nothing | Inline `onclick` was removed by a sanitizer or blocked by CSP | Allow the handler, or switch views from your own code. |
| A footnote link scrolls twice | `markedExtendedFootnote()` was called more than once; each call adds a `document` listener | Create the extension once per page. |
| `> [!note]` stays a blockquote | Markers are matched in upper case | Write `> [!NOTE]`. |
| A table caption is ignored | The caption line must touch the table | Put `[Caption]` directly above the header row, with no blank line. |
| `(alpha)` is not converted | 18.0.0 shortcodes use colons | Write `(:alpha:)`. |
| Line breaks appear in another `Marked` instance | `breaks: true` in typographic calls `marked.setOptions` on the global `marked` | Set `breaks` on your own instance instead. |
| Global embeds `privacyMode` or `defaultAspectRatio` has no effect | Both options are declared but not applied | Set `privacyMode` per embed; set `aspectRatio` per embed. |

## Still stuck?

Open an issue at [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues)
with the Markdown, the options and the package versions.
