---
label: Upgrading from 17
description: Move content and code from marked-extensions 17.0.0 to 18.0.0, the switch from colon directives to fenced blocks, the marked 18 peer and the new typographic shortcodes.
order: 5
tags: [ "guides", "upgrade" ]
keywords: [ "17.0.0", "fenced syntax", "breaking changes", "marked 18", "directives" ]
---

# Upgrading from 17

Upgrade every package to 18.0.0 together with `marked@^18`, then rewrite the colon-directive blocks as fenced code
blocks. The factories, option names and bundle exports keep working; most extensions only gained options.

## Quick path

1. `npm install marked@^18 @fsegurai/marked-extended-<name>@18.0.0` for every package you use.
2. Rewrite every `::::name{…}` … `::::nameend` block as a ```` ```name ```` fence (table below).
3. Replace typographic shortcodes `(name)` with `(:name:)`.
4. Re-check custom CSS against the new markup on each [extension page](../extensions/README.md).

## Syntax changes

The 18.0.0 changelog names timeline, spoiler, tabs and slide; the 17 and 18 sources show that accordion, comments
(block form), embeds and kanban moved to fences too.

| Extension | 17.0.0 | 18.0.0 |
|-----------|--------|--------|
| Accordion | `::::accordion{title="…" expanded="true"}` … `::::accordionend` | ```` ```accordion ```` with `title: …`, `expanded: true`, then `---`, then content |
| Comments (block) | `::::comment{author="…"}` … `::::commentend` | ```` ```comments ```` with `author: …`, then `---`, then content |
| Comments (inline) | `:::comment{…}text:::` | unchanged |
| Embeds | `::::embed{title="…"}` URL `::::embedend` | ```` ```embed ```` with `title: …`, then `---`, then the URL |
| Kanban | `::::kanban{view="…"}` with `:::column{label="…" color="…"}` … `:::columnend` | ```` ```kanban ```` with `## Label {color: …}` headings over list cards |
| Slide | `::::presentation{…}` with `::::slide{…}` … `::::slideend` | ```` ```presentation ```` with front matter, slides separated by `---` |
| Spoiler | `::::spoiler{title="…"}` … `::::spoilerend` | ```` ```spoiler ```` with `title: …`, then `---`, then content |
| Tabs | `::::tabs` with `:::tab{label="…"}` … `:::tabend` | ```` ```tabs ```` with `label: …` per tab and `---` between tabs |
| Timeline | `::::timeline` with `:::event{date="…"}` … `:::eventend` | ```` ```timeline ```` with `date: …` per event and `---` between events |
| Typographic | `(alpha)`, `(euro)` | `(:alpha:)`, `(:euro:)` |

Before and after, tabs:

````markdown
::::tabs
:::tab{label="npm"}
`npm install marked`
:::tabend
::::tabsend
````

````markdown
```tabs
label: npm

`npm install marked`
```
````

## Behavior changes

| Extension | Change |
|-----------|--------|
| Spoiler | Hover-to-reveal and the per-spoiler inline `<script>` are gone; reveal is click or keyboard through `initSpoilers()`, which fires `spoiler:toggle`. |
| Tabs | `onBeforeSwitch` / `onAfterSwitch` are now called; `registerCallbacks` is new. |
| Slide | Autoplay, speaker view, more layouts and a `scriptNonce` option for the injected script. |
| Lists | Checkboxes use a delegated listener instead of inline `onclick`; editing helpers are new. |
| Kanban | Drag and drop through `enableKanbanDragDrop`; WIP limits, collapsed columns and card metadata. |
| Footnote | Inline footnotes, contiguous numbering, slugified ids; undefined references no longer take a number. |
| Tables | Attributes are quoted, `<th>` gets `scope="col"`, optional responsive wrapper. |
| Alert | 11 variant types instead of 5; inline titles and `{icon=…}`. |
| Embeds | Dailymotion and TikTok providers; URL scheme checks and an error placeholder. |
| All renderers | Dynamic attribute values are escaped. |

## Checklist

- [ ] Every `@fsegurai/marked-extended-*` package is on 18.0.0 and `marked` is on 18.
- [ ] No `::::name` or `:::name` block directives remain (inline `:::comment{…}…:::` stays).
- [ ] Typographic shortcodes use the `(:name:)` form.
- [ ] Spoilers reveal on click; `initSpoilers()` is called if your bundler drops side-effect imports.
- [ ] Custom CSS still matches the new markup.

## Next step

- [What's new in 18.0.0](../help/whats-new.md)
