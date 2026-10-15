---
label: Sanitizer-Safe Markup
description: What the default 19 markup contains, how class tokens carry configuration, and when to opt into the 18.0 markup with unsafeHtml.
order: 2
tags: [ "guides", "security" ]
keywords: [ "sanitizer", "angular", "dompurify", "class tokens", "unsafeHtml", "xss" ]
---

# Sanitizer-Safe Markup

By default, every package emits HTML that strict sanitizers keep unchanged, such as Angular's
`SecurityContext.HTML`. You can bind it with `[innerHTML]` or `v-html` without `bypassSecurityTrustHtml`.

## What the default markup uses

| Kept by sanitizers (used) | Removed by sanitizers (not used by default) |
|---------------------------|---------------------------------------------|
| `class`, `aria-*`, `role`, `hidden`, `open`, `tabindex` | `id`, `for`, `name`, `style`, `data-*`, `on*` |
| `<details>`, `<summary>`, `<span>`, `<div>`, `<section>`, `<figure>`, `<img>` (slide backgrounds) | `<input>`, `<button>`, `<svg>`, `<iframe>`, `<form>`, `<script>`, `<style>` |

Icons are drawn with CSS masks, so load each package's stylesheet.

## Class tokens

Configuration that used to live in `id`, `style` or `data-*` is carried by class tokens:

```text
mx-<pkg>-<key>-<value>
```

- `pkg` and `key` have no hyphens, so the first three hyphens always split a token.
- The value keeps `[A-Za-z0-9-]`; every other UTF-8 byte is written as `_xx` (`,` is `_2c`, `.` is `_2e`, `_` is `_5f`).
- Runtimes read the tokens back and, where needed, restore the original attributes in the browser.

| 18.0 attribute | 19 class token |
|----------------|----------------|
| `id="faq"` on an accordion | `mx-accordion-id-faq` |
| `data-section="intro"` | `mx-accordion-dataSection-intro` |
| `style="--…-duration: 0.5s"` | `mx-accordion-duration-0_2e5s` |
| code highlight `{1-3,5}` | `mx-code-highlight-1-3_2c5` |

Read tokens yourself with core's `parseClassTokens(className, pkg)`. See the [core API](../api/core.md).

## Ids are content hashes

Ids come from a hash of the block's source (`tabs-<hash>`, `slide-<hash>`), with `-2`, `-3`… for identical blocks in
one parse. The same Markdown renders the same ids on the server and in the browser, and two `Marked` instances never
collide.

## Opting out: `unsafeHtml`

Pass `unsafeHtml: true` to restore the 18.0 markup when your HTML is **not** sanitized:

```js
marked.use(markedExtendedTabs({ unsafeHtml: true }));
```

| Package | `unsafeHtml` available | Notes |
|---------|------------------------|-------|
| accordion, alert, comments, embeds, footnote, kanban, lists, slide, spoiler, tables, tabs, timeline | yes | The runtimes work on both markups. |
| code | no | Its output was safe from the start. |
| typographic | no | It only replaces characters. |

Behavior that 18.0 implemented with inline handlers or injected scripts (kanban `onclick`, slide `<script>`) is gone in
both modes; it always needs the runtime.

## Security notes

- Embeds never take the iframe URL from Markdown: the runtime rebuilds it from a per-provider allowlist. The generic
  `iframe` and `pdf` providers load only from `trustedOrigins`.
- Slide backgrounds accept only `http(s)` and relative image URLs; colors and gradients are validated before use.
- Front-matter text (titles, icons, labels) is escaped. Options typed as markup (accordion `variants[].icon`, alert
  `variants[].icon`, templates) are inserted as given: never fill them from untrusted input.

## Next step

- [Styling and theming](styling.md)
