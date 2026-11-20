---
label: Styling and Theming
description: Load the structural and theme stylesheets of each package, the mx- class convention, theming with --mx-<pkg>-* custom properties, and dark mode.
order: 3
tags: [ "guides", "styling" ]
keywords: [ "css", "scss", "custom properties", "dark mode", "theme", "mx- prefix", "class names" ]
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
| inline | `styles/inline.css` | none |
| kanban | `styles/kanban.css` | `styles/kanban-theme.css` |
| lists | `styles/lists.css` | `styles/lists-theme.css` |
| slide | `styles/slide.css` | `styles/slide-theme.css` |
| source-map | none | none |
| spoiler | `styles/spoiler.css` | `styles/spoiler-theme.css` |
| tables | `styles/tables.css` | `styles/tables-theme.css` |
| tabs | `styles/tabs.css` | `styles/tabs-theme.css` |
| timeline | `styles/timeline.css` | `styles/timeline-theme.css` |
| toc | `styles/toc.css` | none |
| typographic | none | none |
| wikilinks | `styles/wikilinks.css` | none |

Paths are package subpath exports (`@fsegurai/marked-extended-<name>/styles/…`). Each `.css` has a `.scss` twin under
the same path. On a CDN, the files live under `dist/styles/`.

Where the theme matters more than usual:

- **Spoiler**: particles are sized and positioned only by `spoiler-theme.css`. Without it, set `particles: false`.
- **Slide**: `slide-theme.css` holds the presentation themes selected by the `theme` option.
- **Code**: `code.css` numbers the lines itself with a CSS counter that starts at the fence's `line-numbers=<n>`
  (`--mx-code-line-offset`, set by `attachCode`). Drop your own line counter; with Prism's line-numbers plugin, the
  counter steps aside.

## Class names

Since 19.0.0-beta.1 every package follows one convention:

| Kind | Pattern | Examples |
|------|---------|----------|
| Root | `mx-<pkg>` | `mx-alert`, `mx-tabs`, `mx-tables`, `mx-toc` |
| Part | `mx-<pkg>-<part>` | `mx-alert-title`, `mx-tabs-nav`, `mx-footnote-ref`, `mx-toc-link` |
| Modifier or variant | `mx-<pkg>--<modifier>` | `mx-alert--warning`, `mx-tabs--pills`, `mx-code--highlighted`, `mx-wikilinks--unresolved` |
| State | `mx-is-<state>` | `mx-is-active`, `mx-is-expanded`, `mx-is-targeted`, `mx-is-loading`, `mx-is-dragging` |
| Class token (configuration) | `mx-<pkg>-<key>-<value>` | `mx-tabs-variant-pills`, `mx-code-highlight-1-3_2c5` |
| Custom property | `--mx-<pkg>-<name>` | `--mx-alert-note-color`, `--mx-tabs-border-radius` |

The old `marked-extended-*` classes and the unprefixed ones (`active`, `tabs-pills`, `footnote-ref`, `line`…) were
removed with no aliases. Each extension page lists its classes and custom properties, and the
[migration guide](migration-19.md#from-1900-beta0-to-1900-beta1) maps every old name. Third-party classes are kept:
`language-<lang>`, Prism's `line-numbers`, Shiki's `span.line`, `mermaid` and `octicon`.

A `className` option, where a package has one, replaces the `mx-<pkg>` root, and the parts and modifiers follow it
(`<className>-content`, `<className>--info`).

## Theming with custom properties

Every stylesheet reads its values through `--mx-<pkg>-*` custom properties with fallbacks, so the stylesheets work
without defining any property. The theme stylesheets declare the defaults on `:root` and override them under
`body.dark`. Override the ones you need after the imports:

```css
:root {
  --mx-alert-note-color: #0969da;
  --mx-tabs-border-radius: 8px;
  --mx-inline-mark-background: #fff3a3;
  --mx-toc-indent: 1.25rem;
}

body.dark {
  --mx-alert-note-color: #539bf5;
}
```

Or scope them to one container:

```css
.docs-page {
  --mx-code-line-number-color: #8b949e;
  --mx-wikilinks-unresolved-color: #cf222e;
}
```

| Package | Examples |
|---------|----------|
| accordion | `--mx-accordion-border-color`, `--mx-accordion-header-background-color`, `--mx-accordion-<variant>-color` |
| alert | `--mx-alert-border-width`, `--mx-alert-icon-size`, `--mx-alert-<type>-color` |
| code | `--mx-code-line-highlight`, `--mx-code-line-number-color`, `--mx-code-diff-add`, `--mx-code-tab-active-color` |
| comments | `--mx-comments-block-bg`, `--mx-comments-glyph-size`, `--mx-comments-<type>-color` |
| embeds | `--mx-embeds-radius`, `--mx-embeds-poster-bg`, `--mx-embeds-caption-color` |
| footnote | `--mx-footnote-ref-color`, `--mx-footnote-section-bg`, `--mx-footnote-target-bg`, `--mx-footnote-scroll-offset` |
| inline | `--mx-inline-mark-background`, `--mx-inline-mark-color`, `--mx-inline-ins-color`, `--mx-inline-script-size` |
| kanban | `--mx-kanban-column-bg`, `--mx-kanban-task-bg`, `--mx-kanban-radius-md`, palette colors `--mx-kanban-palette-<name>` |
| lists | `--mx-lists-checkbox-size`, `--mx-lists-checkbox-accent`, `--mx-lists-completed-color` |
| slide | `--mx-slide-bg`, `--mx-slide-accent`, `--mx-slide-control-bg`, `--mx-slide-aspect` |
| spoiler | `--mx-spoiler-overlay-bg`, `--mx-spoiler-content-blur`, `--mx-spoiler-<theme>-background` |
| tables | `--mx-tables-border`, `--mx-tables-header-bg`, `--mx-tables-cell-padding` |
| tabs | `--mx-tabs-border-color`, `--mx-tabs-label-bg`, `--mx-tabs-animation-duration` |
| timeline | `--mx-timeline-line-color`, `--mx-timeline-marker-size`, `--mx-timeline-content-bg` |
| toc | `--mx-toc-background`, `--mx-toc-indent`, `--mx-toc-link-color`, `--mx-toc-title-size` |
| wikilinks | `--mx-wikilinks-color`, `--mx-wikilinks-decoration`, `--mx-wikilinks-unresolved-color` |

The extension pages list every property with its default. Some defaults fall back to host design tokens when they are
defined (`--app-text-primary`, Material `--md-sys-color-*`), so a page that already has them gets matching colors.

## Dark mode

Every theme stylesheet has dark rules under a `body.dark` selector. Toggle the class on `<body>`:

```js
document.body.classList.toggle('dark', prefersDark);
```

`lists-theme.css` also reacts to `[data-theme="dark"]` and `prefers-color-scheme: dark`.

## Styling hooks

Target the structural classes (`.mx-<pkg>`, `.mx-<pkg>-<part>`, `.mx-<pkg>--<modifier>`, `.mx-is-<state>`) and,
where an extension page says so, the class tokens (`.mx-<pkg>-<key>-<value>`). Do not target `id` or `data-*`
attributes: sanitizers remove them, and the default markup no longer has them.

## Next step

- [Combining extensions](combining-extensions.md)
