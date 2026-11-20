---
label: Sanitizer-Safe Markup
description: What the default 19 markup contains, how class tokens carry configuration, and when to opt into the 18.0 markup with unsafeHtml.
order: 2
tags: [ "guides", "security" ]
keywords: [ "sanitizer", "angular", "dompurify", "class tokens", "unsafeHtml", "xss" ]
---

# Sanitizer-Safe Markup

By default, every package emits HTML that strict sanitizers keep unchanged, such as Angular's
`SecurityContext.HTML`. You can bind it with `[innerHTML]` or `v-html` without `bypassSecurityTrustHtml`. Every
extension package checks this in its conformance spec, which runs the default output through an Angular
`SecurityContext.HTML` sanitizer and expects it unchanged; the 19.0.0-beta.1 packages (`inline`, `source-map`, `toc`,
`wikilinks`) follow the same rule.

## What the default markup uses

| Kept by sanitizers (used) | Removed by sanitizers (not used by default) |
|---------------------------|---------------------------------------------|
| `class`, `aria-*`, `role`, `hidden`, `open`, `tabindex` | `id`, `for`, `name`, `style`, `data-*`, `on*` |
| `<details>`, `<summary>`, `<span>`, `<div>`, `<section>`, `<figure>`, `<nav>` (toc), `<mark>`/`<ins>`/`<sup>`/`<sub>` (inline), `<a href>` (wikilinks, safe URLs only), `<img>` (slide backgrounds) | `<input>`, `<button>`, `<svg>`, `<iframe>`, `<form>`, `<script>`, `<style>` |

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
| inline, source-map, toc, wikilinks | no | Added in 19.0.0-beta.1 with safe output only. |
| typographic | no | It only replaces characters. |

Behavior that 18.0 implemented with inline handlers or injected scripts (kanban `onclick`, slide `<script>`) is gone in
both modes; it always needs the runtime.

## Restoring `data-*` after sanitizing

Some runtimes put `data-*` attributes back in the browser, after the sanitizer ran. Since 19.0.0-beta.1 they never
trust a class token blindly: a class token is only a class name, so Markdown content can write one by hand
(`<span class="mx-spoiler-id-x mx-spoiler-dataLine-9">`), and restoring every token would let content forge attributes
that other scripts trust, such as `data-line` or `data-full-src`.

| Runtime | Restored without configuration | Custom `data-*` front-matter values |
|---------|--------------------------------|-------------------------------------|
| `attachAccordion` | nothing (the CSS variables only) | Only the names in `allowedDataAttributes`; forged tokens for other names are ignored. |
| `attachEmbeds` | nothing (custom ratio and size only) | Only the names in `allowedDataAttributes`; forged tokens for other names are ignored. |
| `attachKanban` | nothing (the view, columns and cards are read from class tokens) | Only the names in `allowedDataAttributes`; forged tokens for other names are ignored. |
| `attachSpoilers` | nothing | Only the names in `allowedDataAttributes` (case-insensitive); forged tokens for other names are ignored. |
| `attachComments` | the comment metadata (`data-comment-*`, `data-reply-to`) | Only the names in `allowedDataAttributes`; forged tokens for other names are ignored. |

```js
attachSpoilers(container, { allowedDataAttributes: ['data-release'] });
attachComments(container, { allowedDataAttributes: ['data-ticket'] });
attachAccordion(container, { allowedDataAttributes: ['data-section'] });
```

All default to `[]`. Attributes an element already has are never overwritten.

## Wiki links

`@fsegurai/marked-extended-wikilinks` never builds a URL from the Markdown on its own: your `resolve(target, heading,
block)` callback returns `{ href, title? }`, or `null` for an unresolved link.

- The `href` must be relative or use a scheme in `WIKILINKS_SAFE_PROTOCOLS` (`http:`, `https:`, `mailto:`). Any other
  scheme (`javascript:`, `data:`, …) renders the link as unresolved. Whitespace and control characters are ignored
  while reading the scheme, as browsers do (`java\nscript:` is refused). `isSafeWikilinkHref(href)` is exported.
- The label, `href` and `title` are HTML-escaped; the heading fragment is URI-encoded.
- An unresolved link is a `<span class="mx-wikilinks--unresolved">` (the `unresolvedClass` option) with the
  `labels.unresolved` title, never an `<a>`.
- Inside a Markdown link's text, `[[…]]` is left as text, so links never nest.

## Code blocks and Prism's `data-line`

`attachCode` translates the class tokens of each code block into Prism's attributes, including `data-line` for the
line-highlight plugin. Pages often use `data-line` for something else, such as the source line of each block for
scroll sync (`attachSourceMap` writes it by default). The `prismLineHighlight` runtime option resolves the clash:

| Value | Effect |
|-------|--------|
| `'set'` (default) | Write `data-line` and `data-line-offset` from the class tokens. |
| `'skip'` | Never write them. `code.css` still marks the lines from the classes the runtime adds; line numbers stay. |
| `'remove'` | As `'skip'`, and also remove them when another tool already set them on the block, before `highlight` runs. |

```js
attachCode(container, { prismLineHighlight: 'skip' });
```

## Heading ids and source lines

`attachSourceMap` sets heading `id`s and the `data-line` attribute **after** sanitizing, in the browser. Heading ids
are core slugs checked by `isSafeHeadingId`: names of `Object.prototype` and the `reservedIds`
(`DEFAULT_RESERVED_HEADING_IDS`: `katex`, `joypixels`, `mermaid`, `prism`) are refused, because an element `id`
becomes a property of `window` (DOM clobbering). With `harden: true` (default) the runtime also removes, for sanitizers that keep
`id` or `data-*`, unsafe heading ids and line attributes whose value is not a positive integer, so authored HTML cannot
forge them. The `attribute` option must be a `data-*` name.

## Security notes

- Embeds never take the iframe URL from Markdown: the runtime rebuilds it from a per-provider allowlist. The generic
  `iframe` and `pdf` providers load only from `trustedOrigins`.
- Slide backgrounds accept only `http(s)` and relative image URLs; colors and gradients are validated before use.
- Front-matter text (titles, icons, labels) is escaped. Options typed as markup (accordion `variants[].icon`, alert
  `variants[].icon`, templates) are inserted as given: never fill them from untrusted input.

## Next step

- [Styling and theming](styling.md)
