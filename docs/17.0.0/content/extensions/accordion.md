---
label: Accordion
description: Collapsible sections from ::::accordion blocks, rendered as native details elements with a title, heading level and open state.
order: 1
tags: [ "extensions", "accordion" ]
keywords: [ "details", "summary", "collapsible", "acd alias" ]
---

# Accordion

`@fsegurai/marked-extended-accordion` turns an `::::accordion{…}` … `::::accordionend` block into a native `<details>`
element. It needs no browser JavaScript: the browser handles expanding and collapsing.

## Quick path

```bash
npm install @fsegurai/marked-extended-accordion marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';
import '@fsegurai/marked-extended-accordion/styles/accordion.css';

marked.use(markedExtendedAccordion());
const html = marked.parse(markdown);
```

## Syntax

```markdown
::::accordion{title="Billing questions" expanded="true" level="4"}
Any **Markdown** goes here, including nested accordions.
::::accordionend
```

| Form | Opening | Closing |
|------|---------|---------|
| Full | `::::accordion{…}` | `::::accordionend` |
| Aliases | `:accordion{…}`, `:acd{…}` | `:accordionend`, `:acdend` |

The `{…}` block is required (the parser looks for the closing `}`). Properties are `key="value"` pairs with double
quotes; nested accordions are balanced by depth.

| Property | Default | Description |
|----------|---------|-------------|
| `title` | `""` | Header text, inserted as written (not escaped, not parsed as Markdown). |
| `expanded` | `"false"` | Only `"true"` opens the accordion. |
| `level` | `"3"` | Heading level of the title (`h{level}`). |
| `duration` | `"1s"` | Fills the `{animationDuration}` template placeholder. |

Because `duration` has its own default of `"1s"`, the `animationDuration` option is never used by the tokenizer. The
default template does not use the duration at all; it only matters in a custom `template`.

## Options

`markedExtendedAccordion(options?: AccordionOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-accordion'` | Base CSS class. |
| `prefixId` | `string` | `'accordion-'` | Prefix of generated ids. |
| `animationDuration` | `string` | `'0.3s'` | Declared default duration (overridden by the `duration` property default, see above). |
| `template` | `string \| null` | `null` | Custom HTML template. |
| `customizeToken` | `(token: AccordionToken) => void \| null` | `null` | Mutates each accordion token in `walkTokens`. |

Exported types: `AccordionOptions`, `AccordionToken`, `AccordionMeta`, `AccordionRendererOptions`.

## Rendered HTML

```html
<details id="accordion-k3j9x2m1p" class="marked-extended-accordion" open>
  <summary class="marked-extended-accordion-header">
    <h4 class="marked-extended-accordion-title">Billing questions</h4>
  </summary>
  <div class="marked-extended-accordion-content">…</div>
</details>
```

The id is `prefixId` plus a random string (`Math.random()`), so it changes on every parse.

Template placeholders: `{accordionId}`, `{headingTag}`, `{title}`, `{content}`, `{expanded}`, `{expandedAttr}`,
`{animationDuration}`, `{className}`.

## Browser behavior

None. The package exports no runtime functions, injects no `<script>` or `<style>`, and dispatches no events.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-accordion/styles/accordion.css` | Structural styles. |
| `@fsegurai/marked-extended-accordion/styles/accordion-theme.css` | Optional default theme. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Styling and theming](../guides/styling.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
- [Alert](alert.md)
