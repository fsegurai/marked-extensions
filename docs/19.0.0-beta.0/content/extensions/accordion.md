---
label: Accordion
description: Collapsible sections from fenced accordion blocks, rendered as native details elements with exclusive groups, variants and an optional runtime.
order: 1
tags: [ "extensions", "accordion" ]
keywords: [ "details", "summary", "collapsible", "exclusive group", "attachAccordion" ]
---

# Accordion

`@fsegurai/marked-extended-accordion` turns a fenced `accordion` block into a native `<details>` element. Expanding
and collapsing works without JavaScript; the optional runtime adds exclusive groups, animation variables, `data-*`
restoration and `#id` links.

## Quick path

```bash
npm install @fsegurai/marked-extended-accordion marked
```

```js
import { marked } from 'marked';
import markedExtendedAccordion, { attachAccordion } from '@fsegurai/marked-extended-accordion';
import '@fsegurai/marked-extended-accordion/styles/accordion.css';

marked.use(markedExtendedAccordion());
container.innerHTML = marked.parse(markdown);
const dispose = attachAccordion(container); // optional runtime
```

## Syntax

A fenced block (```` ``` ```` or `~~~`) with the info string `accordion`. Optional front matter sits at the top and
ends with a lone `---` line; everything after it is rendered as Markdown.

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
| `title` | `""` | Header text, parsed as inline Markdown (`<` and `>` are escaped). |
| `expanded` | `false` | Open on load. |
| `level` | `3` | Heading level of the title (1 to 6; other values fall back to 3). |
| `duration` | `animationDuration` option | Animation duration (CSS time). |
| `easing` | `animationEasing` option | Animation timing function. |
| `group` | `""` | Exclusive group: opening one accordion closes the others of the group (runtime). |
| `id` | `""` | Custom id for anchor links; otherwise a content hash is used. |
| `icon` | `""` | Text or emoji shown around the title (escaped). Overrides the variant icon. |
| `iconPosition` | `iconPosition` option | `before` or `after`. |
| `variant` | `""` | `note`, `tip`, `important`, `warning`, `caution`, or a custom variant. |
| `class` | `""` | Extra classes on the container. |
| `data-*` | none | Any `data-*` key is kept as a custom data value. |

## Options

`markedExtendedAccordion(options?: AccordionOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-accordion'` | Base CSS class. |
| `prefixId` | `string` | `'accordion-'` | Prefix of generated ids. |
| `animationDuration` | `string` | `'0.3s'` | Default animation duration. |
| `animationEasing` | `string` | `'ease-in-out'` | Default timing function. |
| `iconPosition` | `'before' \| 'after'` | `'before'` | Default icon position. |
| `variants` | `{ type: string; icon: string }[]` | `[]` | Variants merged over the built-ins. `icon` is trusted markup. |
| `template` | `string \| null` | `null` | Custom HTML template (see placeholders below). |
| `customizeToken` | `(token: AccordionToken) => void \| null` | `null` | Mutates each accordion token in `walkTokens`. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `name`, `style`, `data-*`, inline `<svg>`). |

## Rendered HTML

```html
<details class="marked-extended-accordion marked-extended-accordion-tip mx-accordion-id-… mx-accordion-group-faq" open>
  <summary class="marked-extended-accordion-header">
    <span class="marked-extended-accordion-icon mx-accordion-icon-tip"></span>
    <h3 class="marked-extended-accordion-title">Billing questions</h3>
  </summary>
  <div class="marked-extended-accordion-content">…</div>
</details>
```

| 18.0 / `unsafeHtml` | 19 default |
|---------------------|------------|
| `id="accordion-x1y2z3"` | `mx-accordion-id-accordion-x1y2z3` |
| `name="faq"` | `mx-accordion-group-faq` |
| `style="--…-animation-duration: 0.5s"` | `mx-accordion-duration-0_2e5s`, `mx-accordion-easing-…` (only when not default) |
| `data-section="intro"` | `mx-accordion-dataSection-intro` |
| variant `<svg>` | `<span class="marked-extended-accordion-icon mx-accordion-icon-note">` |

Template placeholders: `{title}`, `{content}`, `{expanded}`, `{expandedAttr}`, `{headingTag}`, `{className}`,
`{variantClass}`, `{extraClasses}`, `{tokenClasses}`, `{icon}`, `{iconBefore}`, `{iconAfter}`. The 18.0 placeholders
`{accordionId}`, `{nameAttr}`, `{dataAttrs}`, `{styleAttr}` and `{animationDuration}` still work, but strict sanitizers
remove what they produce.

## Runtime

`attachAccordion(root, options?)` returns a `Dispose` function.

| Option | Default | Description |
|--------|---------|-------------|
| `className` | `'marked-extended-accordion'` | Must match the extension's `className`. |
| `observe` | `false` | Refresh automatically when the children of `root` change. |

- Applies the `duration`/`easing` CSS variables and restores `data-*` attributes (per element: call
  `attachAccordion.refresh(root)` after a re-render, or use `observe`).
- Closes the other open accordions of the same group inside `root`.
- Opens and scrolls to the accordion targeted by a `#id` link.
- Event: `marked-extended:accordion:toggle` with `detail: { id, open, group }`.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-accordion/styles/accordion.css` | Structural styles and the CSS variant icons. |
| `@fsegurai/marked-extended-accordion/styles/accordion-theme.css` | Optional default theme. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Runtime contract](../guides/runtime-contract.md)
- [Styling and theming](../guides/styling.md)
