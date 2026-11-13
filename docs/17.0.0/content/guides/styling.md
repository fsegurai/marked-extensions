---
label: Styling and Theming
description: Load the structural and theme stylesheets of each 17.0.0 package, override their CSS custom properties, and support dark mode.
order: 2
tags: [ "guides", "styling" ]
keywords: [ "css", "scss", "custom properties", "dark mode", "theme" ]
---

# Styling and Theming

Importing a package never adds CSS to the page: load the stylesheets yourself. Each package ships a **structural**
stylesheet and an optional **theme** stylesheet.

One exception lives in the rendered HTML: every tabs block carries its own `<style>` element with the CSS-only
switching and animation rules, scoped to that block's `id`. Sanitizers that strip `<style>` break tab switching.

## Quick path

```js
import '@fsegurai/marked-extended-tabs/styles/tabs.css';       // structure
import '@fsegurai/marked-extended-tabs/styles/tabs-theme.css'; // theme: optional
```

## Stylesheets per package

| Package | Structure | Theme |
|---------|-----------|-------|
| accordion | `styles/accordion.css` | `styles/accordion-theme.css` |
| alert | `styles/alert.css` | `styles/alert-theme.css` |
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

**Slide themes**: the presentation themes selected by the slide `theme` option (`default`, `dark`, `dracula`,
`github-light`, `github-dark`, `catppuccin-latte`, `catppuccin-mocha`, `gruvbox-light`, `gruvbox-dark`, `cyberpunk`
and more) are defined in `slide-theme.css` as `[data-theme="…"]` rules.

## Overriding

Theme stylesheets define CSS custom properties. Override them after the import:

```css
:root {
  --marked-extended-alert-note-color: #0969da;
  --marked-extended-tabs-border-radius: 8px;
}
```

| Package | Variable prefix |
|---------|-----------------|
| accordion | `--marked-extended-accordion-*` |
| alert | `--marked-extended-alert-*`, including `--marked-extended-alert-<type>-color` |
| tabs | `--marked-extended-tabs-*` |
| tables | `--marked-extended-table-*` |
| timeline | `--marked-extended-timeline-*` |
| comments | `--marked-comments-*` |
| embeds | `--marked-embeds-*` |
| footnote | `--marked-footnote-*` |
| lists | `--marked-lists-*` |
| kanban | `--kanban-*` |
| spoiler | `--spoiler-*` |
| slide | `--slide-*` |

Open the theme file in `node_modules` for the complete list.

## Dark mode

Every theme stylesheet has dark rules under a `body.dark` selector. Toggle the class on `<body>`:

```js
document.body.classList.toggle('dark', prefersDark);
```

`lists-theme.css` also reacts to `[data-theme="dark"]` and `prefers-color-scheme: dark`; `slide-theme.css` also
reacts to `[data-theme="dark"]`.

## Styling hooks

Target the base classes (`.marked-extended-<name>…` and each package's own class names) and the `data-*` attributes
the renderers emit. Each [extension page](../extensions/README.md) shows its markup.

## Next step

- [Combining extensions](combining-extensions.md)
