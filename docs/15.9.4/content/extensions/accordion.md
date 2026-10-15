---
label: Accordion
description: Collapsible sections from ::::accordion blocks, rendered as native details elements with a title, heading level and open state.
order: 1
tags: [ "extensions", "accordion" ]
keywords: [ "details", "summary", "collapsible", "acc alias" ]
---

# Accordion

`@fsegurai/marked-extended-accordion` (15.1.0) turns an `::::accordion{…}` … `::::accordionend` block into a native
`<details>` element. The browser handles expanding and collapsing; the factory injects a stylesheet.

## Quick path

```bash
npm install @fsegurai/marked-extended-accordion marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';

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
| Aliases | `:accordion{…}`, `:acc{…}` | `:accordionend`, `:accend` |

The `{…}` block is required (the parser looks for the closing `}`). Properties are `key="value"` pairs with double
quotes and a non-empty value; nested accordions are balanced by depth. The block must start at the beginning of a
Markdown block, so leave a blank line before it.

| Property | Default | Description |
|----------|---------|-------------|
| `title` | `""` | Header text, inserted as written (not escaped, not parsed as Markdown). |
| `expanded` | `"false"` | Only `"true"` opens the accordion. |
| `level` | `"3"` | Heading level of the title (`h{level}`). |
| `duration` | `"1s"` | Fills the `{animationDuration}` template placeholder. |

## Options

`markedExtendedAccordion(options?: AccordionOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-accordion'` | Base CSS class of the template. The injected stylesheet always targets `.marked-extended-accordion`. |
| `prefixId` | `string` | `'accordion-'` | Prefix of generated ids. |
| `animationDuration` | `string` | `'0.3s'` | Fallback duration; in practice the `duration` property default (`"1s"`) always wins. |
| `template` | `string` | `null` | Custom HTML template. |
| `customizeToken` | `(token) => …` | `null` | Called for each accordion token in `walkTokens`. |
| `injectStyles` | `boolean` | `true` | Append the default stylesheet to `document.head`. |

Exported types: `AccordionOptions`, `AccordionToken`.

## Rendered HTML

```html
<details id="accordion-k3j9x2m1p" class="marked-extended-accordion" open>
  <summary class="marked-extended-accordion-header">
    <h4 class="marked-extended-accordion-title">Billing questions</h4>
  </summary>
  <div class="marked-extended-accordion-content">…</div>
</details>
```

The id is `prefixId` plus a random string, so it changes on every parse. The content is parsed with the global
`marked.parse`.

Template placeholders: `{accordionId}`, `{headingTag}`, `{title}`, `{content}`, `{expanded}`, `{expandedAttr}`,
`{animationDuration}`, `{className}`.

## Browser behavior

With `injectStyles: true`, the first factory call in a browser appends `<style id="marked-extended-accordion-styles">`
and sets `window['marked-extended-accordion-styles'] = true`. No script runs. The injected CSS contains literal
`{animationDuration}` and `{transitionTiming}` placeholders that are never replaced, so the browser drops those two
declarations.

## Next step

- [Styling](../guides/styling.md)
- [Alert](alert.md)
