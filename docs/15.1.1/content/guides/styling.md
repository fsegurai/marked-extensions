---
label: Styling
description: The spoiler's injected styles, the classes emitted by the other 15.1.1 extensions, and what you must style yourself.
order: 2
tags: [ "guides", "styling" ]
keywords: [ "css", "class names", "sr-only", "code-preview-card", "spoiler-container" ]
---

# Styling

15.1.1 packages ship no CSS files. Only the spoiler adds styles, from JavaScript in the browser. Everything else is
plain markup for you to style.

## Where the CSS comes from

| Package | Source | Selectors |
|---------|--------|-----------|
| spoiler | One `<style>` per spoiler in `document.head`, scoped to its id, plus inline `style` attributes in the template | `.spoiler-container`, `.spoiler-content`, `.spoiler-overlay`, `.spoiler-particles`, `.particle`, `@keyframes particle-animation` |
| code preview | none (the README contains a stylesheet to copy) | `.code-preview-card`, `.preview-title`, `.preview-content`, `.preview-subtitle` |
| footnote | none | `section.footnotes`, `[data-fnref-ref]`, `[data-fnref-backref]`, `.sr-only` (define it yourself) |
| lists, tables, typographic | none | Plain `ol`, `ul`, `li`, `table`, `th`, `td`. |

The spoiler rules use the element id, so they win over plain class selectors. Override them with more specific
selectors or `!important`. They also use native CSS nesting (`&`), which needs a current browser.

## Customizing

| Need | How |
|------|-----|
| Spoiler speed | `animationDuration` option (default `'2s'`). |
| Different markup | `template` option on code preview and spoiler. A custom spoiler template gets no injected styles. |
| Brackets around footnote numbers | `refMarkers: true`, or CSS on `[data-fnref-ref]::before` / `::after` as the README shows. |
| Hidden footnote heading | Define `.sr-only`. |

## Next step

- [Combining extensions](combining-extensions.md)
