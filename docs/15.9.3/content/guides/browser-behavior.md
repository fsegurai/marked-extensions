---
label: Browser Behavior
description: Which 15.9.3 extensions emit style or script elements in their HTML, which one injects a stylesheet, and what that means for SSR, sanitizers and innerHTML.
order: 1
tags: [ "guides", "browser" ]
keywords: [ "inline styles", "inline script", "window globals", "side effects", "ssr" ]
---

# Browser Behavior

15.9.3 exports no runtime helpers and adds no event listeners. Browser-side effects come from rendered HTML that carries
`<style>` or `<script>` elements, and from the alert factory, which injects one stylesheet.

## Quick path

| You render with | Works | Does not work |
|-----------------|-------|---------------|
| `container.innerHTML = marked.parse(md)` | every extension, including tab switching and spoiler reveal | the inline `<script>` of each spoiler (browsers do not run scripts inserted with `innerHTML`) |
| A sanitizer (DOMPurify, Angular `[innerHTML]`) | footnote, lists, tables, typographic, alert | the styles of accordion, spoiler, tabs and timeline; tab switching (needs `<style>` and `<input>`) |

## Per extension

| Extension | What runs | Globals |
|-----------|-----------|---------|
| accordion, timeline | Nothing; each block's HTML is followed by a scoped `<style>`. | none |
| tabs | Nothing; a scoped `<style>` after each block drives CSS-only switching. | none |
| spoiler | A `<style>` and an inline `<script>` in each spoiler. The script only decides whether particles animate (adds `no-gpu-acceleration` to `<html>`). Reveal is CSS `:hover` / `:focus`. | none |
| alert | Factory appends `<style id="marked-extended-alert-styles">` to `document.head` once (`injectStyles`). | `window.__alertStylesAdded` |
| footnote, lists, tables | Nothing. | none |
| typographic | Nothing in the browser; it overrides Marked's `inlineText` tokenizer so inline text is not escaped. | none |

## Known limits

| Limit | Effect |
|-------|--------|
| CSS repeated per block | A page with many accordions, spoilers, tabs or timelines carries one `<style>` per block. |
| Inner content uses the global `marked` | Accordion, spoiler, tabs, timeline and footnote call `marked.parse` from the `marked` package, not your instance. |
| Content Security Policy | Inline `<style>` needs `'unsafe-inline'` (or hashes) in `style-src`; the spoiler script needs it in `script-src`. |

## Server-side rendering

Rendering on the server works and keeps the per-block styles, because they are part of the HTML. Only the alert
stylesheet is missing unless the alert factory also runs in the browser.

## Next step

- [Styling](styling.md)
