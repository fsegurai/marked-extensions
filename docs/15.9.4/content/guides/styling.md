---
label: Styling
description: The stylesheets that 15.9.4 extensions inject at runtime, how to disable them with injectStyles, and which classes to target with your own CSS.
order: 2
tags: [ "guides", "styling" ]
keywords: [ "css", "injectStyles", "class names", "themes", "cssVariables" ]
---

# Styling

15.9.4 packages ship no CSS files. Five extensions carry their default CSS as a JavaScript string and append it to
`document.head` the first time the factory runs in a browser.

## Quick path

```js
// Keep the defaults
marked.use(markedExtendedTabs());

// Or bring your own CSS
marked.use(markedExtendedTabs({ injectStyles: false }));
```

## Injected stylesheets

| Package | `<style>` id | Main selectors |
|---------|--------------|----------------|
| accordion | `marked-extended-accordion-styles` | `.marked-extended-accordion`, `-header`, `-title`, `-content` |
| alert | `marked-extended-alert-styles` | `.marked-extended-alert`, `-title`, `-note` … `-caution`, `.mr-2` |
| spoiler | `marked-extended-spoiler-styles` | `.marked-extended-spoiler`, `-content`, `-overlay`, `-particles`, `.particle`, `.no-gpu-acceleration` |
| tabs | `marked-extended-tabs-styles` | `.marked-extended-tabs-container`, `-input`, `-nav`, `-label`, `-icon`, `-content`, `-content-pane` |
| timeline | `marked-extended-timeline-styles` | `.marked-extended-timeline-container`, `-event`, `-date`, `-content`, `.active` |
| footnote, lists, tables, typographic | none | Style the emitted elements yourself (footnote needs a `.sr-only` rule). |

The injected CSS uses native CSS nesting (`&`), which needs a current browser.

## Customizing

| Need | How |
|------|-----|
| Different colors or spacing | Override the selectors above in a stylesheet loaded after the injected one, or set `injectStyles: false` and write your own. |
| Spoiler timing, padding, radius | `cssVariables` on the spoiler factory (literal placeholders such as `'{padding}'`). |
| Spoiler colors | `theme` property per block: `default`, `dark`, `light`, `danger`, `info`, `warning`, `success`. |
| Selected tab color | Define `--marked-extended-tabs-selected-background` and `--md-sys-color-primary`, which each block's `<style>` reads. |
| Different markup | `template` option on accordion, spoiler, tabs and timeline. |

There is no dark-mode stylesheet; the demo styles dark mode in its own CSS.

## Next step

- [Combining extensions](combining-extensions.md)
