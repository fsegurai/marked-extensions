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

## Install

```bash
npm install @fsegurai/marked-extended-accordion marked
```

## Usage

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
| `className` | `string` | `'mx-accordion'` | Root class; parts and modifiers follow it. |
| `prefixId` | `string` | `'accordion-'` | Prefix of generated ids. |
| `animationDuration` | `string` | `'0.3s'` | Default animation duration. |
| `animationEasing` | `string` | `'ease-in-out'` | Default timing function. |
| `iconPosition` | `'before' \| 'after'` | `'before'` | Default icon position. |
| `variants` | `{ type: string; icon: string }[]` | `[]` | Variants merged over the built-ins. `icon` is trusted markup. |
| `template` | `string \| null` | `null` | Custom HTML template (see placeholders below). |
| `customizeToken` | `(token: AccordionToken) => void \| null` | `null` | Mutates each accordion token in `walkTokens`. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `name`, `style`, `data-*`, inline `<svg>`). |

The accordion renders no fixed text of its own, so it has no `labels` option.

## Rendered HTML

```html
<details class="mx-accordion mx-accordion--tip mx-accordion-id-… mx-accordion-group-faq" open>
  <summary class="mx-accordion-header">
    <span class="mx-accordion-icon mx-accordion-icon-tip"></span>
    <h3 class="mx-accordion-title">Billing questions</h3>
  </summary>
  <div class="mx-accordion-content">…</div>
</details>
```

Template placeholders: `{title}`, `{content}`, `{expanded}`, `{expandedAttr}`, `{headingTag}`, `{className}`,
`{variantClass}`, `{extraClasses}`, `{tokenClasses}`, `{icon}`, `{iconBefore}`, `{iconAfter}`. The 18.0 placeholders
`{accordionId}`, `{nameAttr}`, `{dataAttrs}`, `{styleAttr}` and `{animationDuration}` still work, but strict sanitizers
remove what they produce.

## Sanitizer notes

The default markup survives Angular's `SecurityContext.HTML`: the id, group, duration, easing and `data-*` values are
class tokens that the runtime applies, and built-in icons are CSS masks. `unsafeHtml: true` emits the 18.0 markup.

| `unsafeHtml: true` (18.0) | Default |
|---------------------------|---------|
| `id="accordion-x1y2z3"` | `mx-accordion-id-accordion-x1y2z3` |
| `name="faq"` | `mx-accordion-group-faq` |
| `style="--mx-accordion-animation-duration: 0.5s"` | `mx-accordion-duration-0_2e5s`, `mx-accordion-easing-…` (only when not default) |
| `data-section="intro"` | `mx-accordion-dataSection-intro` |
| variant `<svg class="octicon …">` | `<span class="mx-accordion-icon mx-accordion-icon-note">` |

## CSS classes

A custom `className` replaces the `mx-accordion` prefix.

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-accordion` | `details` | Root of one accordion. |
| `mx-accordion--<variant>` | `details` | Variant modifier (`note`, `tip`, `important`, `warning`, `caution`, custom). |
| `mx-accordion-header` | `summary` | Clickable header. |
| `mx-accordion-title` | `h1`…`h6` | Title. |
| `mx-accordion-icon` | `span` | Icon (explicit `icon` or variant icon). |
| `mx-accordion-icon-<variant>` | `span` | Class token of a built-in CSS icon. |
| `mx-accordion-content` | `div` | Body. |
| `mx-accordion-id-*`, `-group-*`, `-duration-*`, `-easing-*`, `-data*-*` | `details` | Class tokens read by the runtime. |

## CSS custom properties

| Property | Default | Used for |
|----------|---------|----------|
| `--mx-accordion-animation-duration` | `0.3s` | Open animation duration (set per block by the runtime). |
| `--mx-accordion-transition-timing` | `ease-in-out` | Content transition timing (set per block by the runtime). |
| `--mx-accordion-animation-easing` | `ease` | Open animation easing. |
| `--mx-accordion-fade-distance` | `-10px` | Vertical offset of the open animation. |
| `--mx-accordion-icon-gap`, `--mx-accordion-icon-size` | `0.5rem`, `16px` | Icon spacing and size. |
| `--mx-accordion-icon` | per variant | Mask image of a built-in icon. |
| `--mx-accordion-border-color`, `--mx-accordion-border-width` | `#ddd`, `1px` | Border (theme). |
| `--mx-accordion-background-color` | `#ffffff` | Background (theme). |
| `--mx-accordion-header-background-color`, `--mx-accordion-header-hover-background-color` | `#f5f5f5`, `#e8e8e8` | Header backgrounds (theme). |
| `--mx-accordion-hover-duration` | `0.2s` | Header hover transition (theme). |
| `--mx-accordion-text-color`, `--mx-accordion-content-color` | `#333`, `#24292e` | Header and body text (theme). |
| `--mx-accordion-radius`, `--mx-accordion-margin` | `4px`, `1rem 0` | Shape (theme). |
| `--mx-accordion-header-padding`, `--mx-accordion-content-padding` | `0.75rem 1rem`, `1rem` | Padding (theme). |
| `--mx-accordion-accent-width` | `4px` | Left accent of a variant (theme). |
| `--mx-accordion-<variant>-color` | GitHub alert palette | Accent and icon color of a variant (theme). |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-accordion/styles/accordion.css` | Structural styles and the CSS variant icons. |
| `@fsegurai/marked-extended-accordion/styles/accordion-theme.css` | Optional default theme (`body.light` / `body.dark`). |

SCSS sources are exported under the same paths with `.scss`.

## Runtime

`attachAccordion(root, options?)` returns a `dispose` function.

| Option | Default | Description |
|--------|---------|-------------|
| `className` | `'mx-accordion'` | Must match the extension's `className` (names the CSS variables). |
| `allowedDataAttributes` | `[]` | `data-*` names (case-insensitive) restored from the `data-*` front-matter keys; nothing else is restored. |
| `observe` | `false` | Refresh automatically when the children of `root` change. |

- Applies the `duration`/`easing` CSS variables and restores the `data-*` attributes listed in
  `allowedDataAttributes`, ignoring forged class tokens for other names (per element: call
  `attachAccordion.refresh(root)` after a re-render, or use `observe`).
- Closes the other open accordions of the same group inside `root`.
- Opens and scrolls to the accordion targeted by a `#id` link.
- Event: `marked-extended:accordion:toggle` with `detail: { id, open, group }`.

## Exported constants

| Export | Value |
|--------|-------|
| `ACCORDION_VARIANTS` | `['note', 'tip', 'important', 'warning', 'caution']` |
| `ACCORDION_ICON_POSITIONS` | `['before', 'after']` |

Both are frozen. The factory is also a named export, `markedExtendedAccordion`.

## Changes in 18.1.0

- Classes renamed: `marked-extended-accordion` → `mx-accordion`, `marked-extended-accordion-<variant>` →
  `mx-accordion--<variant>`, other parts → `mx-accordion-<part>`. `className` defaults to `'mx-accordion'`
  (extension and runtime).
- Custom properties renamed from `--marked-extended-accordion-*` to `--mx-accordion-*`.
- New `ACCORDION_VARIANTS` and `ACCORDION_ICON_POSITIONS` exports.
- **Breaking:** `attachAccordion` restores custom `data-*` attributes only when listed in the new
  `allowedDataAttributes` option (default `[]`): pass `allowedDataAttributes: ['data-section']` to keep them.

## Next step

- [Runtime contract](../guides/runtime-contract.md)
- [Styling and theming](../guides/styling.md)
