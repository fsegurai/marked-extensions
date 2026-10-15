---
label: What's New in 18.0.0
description: Release notes for @fsegurai/marked-extensions 18.0.0, the move to fenced code blocks, the marked 18 peer and what changes when upgrading from 17.0.0.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "18.0.0", "breaking changes", "fenced syntax", "marked 18" ]
---

# What's New in 18.0.0

Released 2026-09-18. Eight block extensions moved to standard fenced code blocks, every package now targets `marked` 18,
and most extensions gained new options and browser helpers.

## Breaking changes

| Area | 17.0.0 | 18.0.0 |
|------|--------|--------|
| Block syntax | `::::name{…}` … `::::nameend` colon directives | Standard fenced code blocks for timeline, spoiler, tabs and slide (```` ```presentation ````), and, per the source, also accordion, comments (block), embeds and kanban |
| Typographic shortcodes | `(alpha)` | `(:alpha:)` |
| `marked` peer | `^17` | `^18` (comments and embeds keep `>=17.0.0`) |
| Engines (contributors) | Node.js `>=22`, npm `>=10`, Bun `>=1.3.0` | Node.js `>=24`, npm `>=11`, Bun `>=1.4.0` |

Content written with the old colon syntax **must** be rewritten. The changelog names only the first four
extensions; the 17 and 18 sources show the other four changed too. See
[Upgrading from 17](../guides/upgrading-from-17.md).

## New per extension

| Extension | What changed |
|-----------|--------------|
| [Timeline](../extensions/timeline.md) | Fenced syntax, milestone mode, auto-group by year, collapsible events, subtitles, deep-linkable anchors, reveal animations, `initTimeline*` helpers. |
| [Spoiler](../extensions/spoiler.md) | Fenced syntax, hover-to-reveal removed, `initSpoilers` / `destroySpoilers`, `spoiler:toggle` event. |
| [Tabs](../extensions/tabs.md) | Fenced syntax with `---` separators, `registerCallbacks` for switch callbacks. |
| [Slide](../extensions/slide.md) | Fenced syntax, autoplay, speaker view, more layouts, CSP nonce for the injected script. |
| [Lists](../extensions/lists.md) | List serialization and runtime editing helpers, `updateMarkdownFromCheckbox` hook, touch-friendly checkboxes. |
| [Footnote](../extensions/footnote.md) | Inline footnotes, contiguous numbering, undefined-reference handling, safe ids, hover previews. |
| [Tables](../extensions/tables.md) | Responsive wrapper, `scope="col"` on header cells, consistently quoted attributes. |
| [Typographic](../extensions/typographic.md) | 220+ symbol mappings, `breaks` and `fractions` options. |
| [Kanban](../extensions/kanban.md) | Native HTML5 drag and drop (`enableKanbanDragDrop`), Markdown write-back (`applyMoveToMarkdown`). |
| [Embeds](../extensions/embeds.md) | Dailymotion and TikTok providers, error fallback styles, better aspect ratios. |
| [Comments](../extensions/comments.md) | SVG icons instead of emoji. |
| All renderers | Dynamic attribute values are HTML-escaped to prevent XSS. |

## Upgrade checklist

- [ ] Install `marked@^18` and upgrade every `@fsegurai/marked-extended-*` package to 18.0.0 together.
- [ ] Rewrite every `::::name` block directive to the fenced syntax.
- [ ] Rewrite typographic shortcodes from `(name)` to `(:name:)`.
- [ ] Replace any spoiler hover-to-reveal styling; spoilers now reveal on click.

## Tooling (contributors)

- ESLint replaced by Biome; Husky pre-commit and pre-push hooks added.
- TypeScript declarations generated with `vite-plugin-dts`.
- Full dependency list in the
  [18.0.0 changelog entry](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md).
