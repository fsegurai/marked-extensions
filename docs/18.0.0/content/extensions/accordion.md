---
label: Accordion
description: Collapsible sections from fenced accordion blocks, rendered as native details elements with native exclusive groups, variants and front matter.
order: 1
tags: [ "extensions", "accordion" ]
keywords: [ "details", "summary", "collapsible", "exclusive group", "front matter" ]
---

# Accordion

`@fsegurai/marked-extended-accordion` turns a fenced `accordion` block into a native `<details>` element. It needs no
browser JavaScript: expanding, collapsing and exclusive groups (`<details name>`) are handled by the browser.

## Quick path

```bash
npm install @fsegurai/marked-extended-accordion marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';
import '@fsegurai/marked-extended-accordion/styles/accordion.css';

marked.use(markedExtendedAccordion());
const html = marked.parse(markdown);
```

## Syntax

A fenced block (```` ``` ```` or `~~~`, three or more) with the info string `accordion`. Optional front matter sits at
the top and ends with a lone `---` line; everything after it is rendered as Markdown. The closing fence must repeat the
opening fence, so a longer outer fence can contain nested accordions.

`````markdown
```accordion
title: Billing questions
expanded: true
group: faq
variant: tip
---
Any **Markdown** goes here, including other extensions.
```
`````

Front matter is only parsed when the first non-blank line is `key: value` and a lone `---` closes it. Values may be
wrapped in quotes. Unknown keys are ignored.

| Key | Default | Description |
|-----|---------|-------------|
| `title` | `""` | Header text, parsed as inline Markdown (`<` and `>` are escaped first). |
| `expanded` | `false` | Open on load. `true`, `yes` and `1` are truthy. |
| `level` | `3` | Heading level of the title (1 to 6; other values fall back to 3). |
| `duration` | `animationDuration` option | Written to the inline `--{className}-animation-duration` variable. |
| `easing` | `animationEasing` option | Written to the inline `--{className}-transition-timing` variable. |
| `group` | `""` | Emitted as `name="…"`: the browser keeps one accordion of the group open. |
| `id` | `""` | Custom `id`; otherwise `prefixId` plus a deterministic hash of the block source. |
| `icon` | `""` | Text or emoji around the title (escaped). Overrides the variant icon. |
| `iconPosition` | `iconPosition` option | `before` or `after`. |
| `variant` | `""` | `note`, `tip`, `important`, `warning`, `caution`, or a configured variant. |
| `class` | `""` | Extra classes on the `<details>` element. |
| `data-*` | none | Emitted as `data-*` attributes (values escaped). |

## Options

`markedExtendedAccordion(options?: AccordionOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-accordion'` | Base CSS class. |
| `prefixId` | `string` | `'accordion-'` | Prefix of generated ids. |
| `animationDuration` | `string` | `'0.3s'` | Default duration. |
| `animationEasing` | `string` | `'ease-in-out'` | Default timing function. |
| `iconPosition` | `'before' \| 'after'` | `'before'` | Default icon position. |
| `variants` | `{ type: string; icon: string }[]` | `[]` | Merged over the built-in variants. `icon` is trusted markup, inserted as given. |
| `template` | `string \| null` | `null` | Custom HTML template (placeholders below). |
| `customizeToken` | `(token: AccordionToken) => void \| null` | `null` | Mutates each accordion token in `walkTokens`. |

Exported types: `AccordionOptions`, `AccordionToken`, `AccordionMeta`, `AccordionRendererOptions`.

## Rendered HTML

```html
<details id="accordion-1x2y3z" class="marked-extended-accordion marked-extended-accordion-tip" open name="faq"
         style="--marked-extended-accordion-animation-duration: 0.3s; --marked-extended-accordion-transition-timing: ease-in-out;">
  <summary class="marked-extended-accordion-header">
    <span class="marked-extended-accordion-icon" aria-hidden="true"><svg class="octicon octicon-light-bulb mr-2">…</svg></span><h3 class="marked-extended-accordion-title">Billing questions</h3>
  </summary>
  <div class="marked-extended-accordion-content">…</div>
</details>
```

Built-in variant icons are inline `<svg>` elements (octicons). A strict HTML sanitizer may remove the `<svg>`, `style`,
`name` or `data-*` attributes.

Template placeholders: `{accordionId}`, `{title}`, `{content}`, `{expanded}`, `{expandedAttr}`, `{nameAttr}`,
`{dataAttrs}`, `{styleAttr}`, `{animationDuration}`, `{headingTag}`, `{className}`, `{variantClass}`, `{extraClasses}`,
`{icon}`, `{iconBefore}`, `{iconAfter}`. Unknown placeholders are left as written.

## Browser behavior

None. The package exports no runtime functions, injects no `<script>` or `<style>`, and dispatches no events.
Exclusive groups rely on the native `name` attribute of `<details>`; older browsers ignore it and let several
accordions of a group stay open.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-accordion/styles/accordion.css` | Structural styles. |
| `@fsegurai/marked-extended-accordion/styles/accordion-theme.css` | Optional default theme. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Styling and theming](../guides/styling.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
- [Alert](alert.md)
