---
label: Styling
description: The per-block style elements of 15.9.3 accordion, spoiler, tabs and timeline, the alert stylesheet, and the classes to target with your own CSS.
order: 2
tags: [ "guides", "styling" ]
keywords: [ "css", "inline styles", "class names", "themes", "customClass" ]
---

# Styling

15.9.3 packages ship no CSS files. Four extensions write their CSS into the HTML of every block; alert injects one
stylesheet from JavaScript.

## Where the CSS comes from

| Package | Source | Selectors |
|---------|--------|-----------|
| accordion | `<style>` after each `<details>`, scoped to its id | `.accordion-container`, `.accordion-header`, `.accordion-title`, `.accordion-content` |
| spoiler | `<style>` after each spoiler, scoped to its id | `.spoiler-container`, `.spoiler-content`, `.spoiler-overlay`, `.spoiler-particles`, `.particle`, `.no-gpu-acceleration` |
| tabs | `<style>` after each tab group, scoped to its id | `.marked-extended-tabs-container`, `-input`, `-nav`, `-label`, `-icon`, `-content`, `-content-pane` |
| timeline | `<style>` after each timeline, scoped to its id | `.marked-extended-timeline-container`, `-event`, `-date`, `-content`, `.active` |
| alert | `<style id="marked-extended-alert-styles">` in `document.head` (`injectStyles`, default `true`) | `.markdown-alert`, `-title`, `-note` … `-caution` |
| footnote, lists, tables, typographic | none | Style the emitted elements yourself (footnote needs a `.sr-only` rule). |

The scoped rules use the element id, so they win over plain class selectors. Override them with more specific
selectors or `!important`.

## Customizing

| Need | How |
|------|-----|
| Extra classes | `customClass` property on accordion and timeline events; `customClass` option on tabs (prefix it with a space). |
| Spoiler colors | `theme` property: `default`, `dark`, `light`, `danger`, `info`, `warning`, `success`. |
| Spoiler and accordion speed | `duration` property per block. |
| Selected tab color | Define `--marked-extended-tabs-selected-background` and `--md-sys-color-primary`. |
| Different markup | `template` option on accordion and spoiler. |
| No alert stylesheet | `injectStyles: false` on the alert factory. |

The per-block CSS uses native CSS nesting (`&`), which needs a current browser.

## Next step

- [Combining extensions](combining-extensions.md)
