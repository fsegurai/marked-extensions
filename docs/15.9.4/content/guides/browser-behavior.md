---
label: Browser Behavior
description: Which 15.9.4 extensions inject a stylesheet, emit inline style or script elements, or touch window, and what that means for SSR, sanitizers and innerHTML.
order: 1
tags: [ "guides", "browser" ]
keywords: [ "injected styles", "inline script", "window globals", "side effects", "ssr" ]
---

# Browser Behavior

15.9.4 exports no runtime helpers and adds no event listeners. Browser-side effects come from two places: factories
that inject a stylesheet, and rendered HTML that carries `<style>` or `<script>` elements.

## Quick path

| You render with | Works | Does not work |
|-----------------|-------|---------------|
| `container.innerHTML = marked.parse(md)` | every extension, including tab switching and spoiler reveal | the inline `<script>` of each spoiler (browsers do not run scripts inserted with `innerHTML`) |
| A sanitizer (DOMPurify, Angular `[innerHTML]`) | footnote, lists, tables, typographic, alert, accordion, timeline | tabs (needs `<style>` and `<input>`), spoiler theme and particle `<style>` |

## Per extension

| Extension | What runs | Globals |
|-----------|-----------|---------|
| accordion, alert, timeline | Factory appends one `<style>` to `document.head` (`injectStyles`). The HTML is static. | `window['marked-extended-<name>-styles'] = true` |
| tabs | Same injected stylesheet, plus one `<style>` inside each tabs block for CSS-only switching. | `window['marked-extended-tabs-styles']` |
| spoiler | Injected stylesheet, a `<style>` and an inline `<script>` inside each spoiler. The script only decides whether particles animate (adds `no-gpu-acceleration` to `<html>`). Reveal is CSS `:hover` / `:focus`. | `window['marked-extended-spoiler-styles']` |
| footnote, lists, tables | Nothing. | none |
| typographic | Nothing in the browser; it overrides Marked's `inlineText` tokenizer so inline text is not escaped. | none |

## Known limits

| Limit | Effect |
|-------|--------|
| Styles are injected once per page | Options that change the injected CSS (spoiler `cssVariables`) only apply to the first factory call. |
| Injected CSS uses fixed class names | A custom `className` on accordion, spoiler or tabs leaves the element unstyled unless you add your own CSS. |
| Inner content uses the global `marked` | Accordion, spoiler, tabs, timeline and footnote call `marked.parse` from the `marked` package, not your instance. |
| Content Security Policy | Injected and inline `<style>` need `'unsafe-inline'` (or hashes) in `style-src`; the spoiler script needs it in `script-src`. |

## Server-side rendering

`ensureStyles` returns early when `window` is undefined, so imports and `marked.parse` run on the server. The injected
stylesheets are then missing in the browser unless the factories also run there, or you provide the CSS yourself.

## Next step

- [Styling](styling.md)
