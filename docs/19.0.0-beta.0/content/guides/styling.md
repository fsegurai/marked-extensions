---
label: Styling and Theming
description: Load the structural and theme stylesheets of each package, override their CSS custom properties, and support dark mode.
order: 3
tags: [ "guides", "styling" ]
keywords: [ "css", "scss", "custom properties", "dark mode", "theme" ]
---

# Styling and Theming

No package injects CSS. Each one ships a **structural** stylesheet, which the default markup needs (CSS icons, tab
animations, kanban views, the slide fallback), and an optional **theme** stylesheet.

## Quick path

```js
import '@fsegurai/marked-extended-tabs/styles/tabs.css';       // structure: load it
import '@fsegurai/marked-extended-tabs/styles/tabs-theme.css'; // theme: optional
```

## Stylesheets per package

| Package | Structure | Theme |
|---------|-----------|-------|
| accordion | `styles/accordion.css` | `styles/accordion-theme.css` |
| alert | `styles/alert.css` | `styles/alert-theme.css` |
| code | `styles/code.css` | none |
| comments | `styles/comments.css` | `styles/comments-theme.css` |
| embeds | `styles/embeds.css` | `styles/embeds-theme.css` |
| footnote | `styles/footnote.css` | `styles/footnote-theme.css` |
| kanban | `styles/kanban.css` | `styles/kanban-theme.css` |
| lists | `styles/lists.css` | `styles/lists-theme.css` |
| slide | `styles/slide.css` | `styles/slide-theme.css` |
| spoiler | `styles/spoiler.css` | `styles/spoiler-theme.css` |
| tables | `styles/tables.css` | `styles/tables-theme.css` |
| tabs | `styles/tabs.css` | `styles/tabs-theme.css` |
| timeline | `styles/timeline.css` | `styles/timeline-theme.css` |
| typographic | none | none |

Paths are package subpath exports (`@fsegurai/marked-extended-<name>/styles/…`). Each `.css` has a `.scss` twin under
the same path. On a CDN, the files live under `dist/styles/`.

Where the theme matters more than usual:

- **Spoiler**: particles are sized and positioned only by `spoiler-theme.css`. Without it, set `particles: false`.
- **Slide**: `slide-theme.css` holds the presentation themes selected by the `theme` option.

## Overriding

Theme stylesheets define CSS custom properties on the extension's classes. Override them after the import:

```css
:root {
  --marked-extended-alert-note-color: #0969da;
  --marked-extended-tabs-border-radius: 8px;
}
```

| Package | Variable prefix (examples) |
|---------|----------------------------|
| accordion | `--marked-extended-accordion-*` |
| alert | `--marked-extended-alert-*`, including `--marked-extended-alert-<type>-color` |
| tabs | `--marked-extended-tabs-*` |
| tables | `--marked-extended-table-*` |
| timeline | `--marked-extended-timeline-*` |
| comments | `--marked-comments-*` |
| embeds | `--marked-embeds-*` |
| footnote | `--marked-footnote-*` |
| lists | `--marked-lists-*` |
| kanban | `--kanban-*`, palette colors `--kanban-palette-<name>` |
| spoiler | `--spoiler-*` |
| slide | `--slide-*`, `--control-*` |

Open the theme file in `node_modules` for the complete list.

## Dark mode

Every theme stylesheet has dark rules under a `body.dark` selector. Toggle the class on `<body>`:

```js
document.body.classList.toggle('dark', prefersDark);
```

`lists-theme.css` also reacts to `[data-theme="dark"]` and `prefers-color-scheme: dark`.

## Styling hooks

Target the base classes (`.marked-extended-<name>…`) and the class tokens (`.mx-<pkg>-<key>-<value>`). Do not target
`id` or `data-*` attributes: sanitizers remove them, and the default markup no longer has them. Each extension page
lists its classes.

## Next step

- [Combining extensions](combining-extensions.md)
