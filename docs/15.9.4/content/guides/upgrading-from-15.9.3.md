---
label: Upgrading from 15.9.3
description: Move from the 15.9.3 packages to 15.9.4, renamed classes and options, removed customClass properties and the switch from inline styles to injected stylesheets.
order: 5
tags: [ "guides", "upgrade" ]
keywords: [ "15.9.3", "customClass", "injectStyles", "class names", "breaking changes" ]
---

# Upgrading from 15.9.3

The directive syntax and aliases did not change. What changed between the 15.9.3 source (`aab1cc7`) and 15.9.4
(`9c59b47`) is markup, class names, options and where the CSS comes from.

## Quick path

1. Upgrade every `@fsegurai/marked-extended-*` package together.
2. Replace the options and directive properties listed below.
3. Update custom CSS that targeted the old class names.

## Styles moved out of the HTML

In 15.9.3, accordion, spoiler, tabs and timeline wrote their full CSS into a `<style>` element inside every rendered
block. From 15.9.4, the shared CSS is injected once into `document.head` by the factory (`injectStyles`, default
`true`); only tabs and spoiler still emit a small per-block `<style>`.

## Changes per package

| Package | 15.9.3 | 15.9.4 and later |
|---------|--------|------------------|
| accordion | Classes `accordion-container`, `accordion-header`, `accordion-title`, `accordion-content`; `customClass` directive property | Classes `marked-extended-accordion`, `-header`, `-title`, `-content`; `className` option; `customClass` removed; new `injectStyles` |
| alert | Default `className` `'markdown-alert'` | Default `className` `'marked-extended-alert'` |
| spoiler | Classes `spoiler-container`, `spoiler-content`, `spoiler-overlay`, `spoiler-particles`; `animationDuration` option and `duration` property | Classes `marked-extended-spoiler`, `-content`, `-overlay`, `-particles`; `className`, `injectStyles` and `cssVariables` options; `animationDuration` and `duration` removed |
| tables | `tableClass` option | `className` option |
| tabs | Options `tabsClass`, `storageKey`, `customClass` | `className`, `template`, `customizeToken`, `injectStyles`; `tabsClass`, `storageKey`, `customClass` removed |
| timeline | Outer `<div class="{timelineClass}">` wrapping a `.marked-extended-timeline-container`; `customClass` event property | One container `<div>` with `timelineClass`; `template` and `injectStyles` options; `customClass` removed |
| footnote, lists, typographic | — | No behavior change. |

## Checklist

- [ ] No `customClass="…"` remains in accordion or timeline directives.
- [ ] `tableClass`, `tabsClass`, `storageKey` and spoiler `animationDuration` are replaced or removed.
- [ ] Custom CSS targets the `marked-extended-*` class names.
- [ ] Pages render in a browser, where the injected styles are added; on the server, provide CSS yourself.

## Next step

- [What's new in 15.9.4](../help/whats-new.md)
