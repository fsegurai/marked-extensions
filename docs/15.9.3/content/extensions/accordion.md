---
label: Accordion
description: Collapsible sections from ::::accordion blocks, rendered as native details elements with a title, heading level, open state and per-block styles.
order: 1
tags: [ "extensions", "accordion" ]
keywords: [ "details", "summary", "collapsible", "acc alias", "customClass" ]
---

# Accordion

`@fsegurai/marked-extended-accordion` (15.0.1) turns an `::::accordion{…}` … `::::accordionend` block into a native
`<details>` element. It is new in the 15.9 line and replaces the 15.1 code preview package. The browser handles
expanding and collapsing; each accordion carries its own `<style>` element.

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
::::accordion{title="Billing questions" expanded="true" level="4" customClass="faq"}
Any **Markdown** goes here, including nested accordions.
::::accordionend
```

| Form | Opening | Closing |
|------|---------|---------|
| Full | `::::accordion{…}` | `::::accordionend` |
| Aliases | `:accordion{…}`, `:acc{…}` | `:accordionend`, `:accend` |

The `{…}` block is required (the parser looks for the closing `}`). Properties are `key="value"` pairs with double
quotes and a non-empty value; nested accordions are balanced by depth. Leave a blank line before the block.

| Property | Default | Description |
|----------|---------|-------------|
| `title` | `""` | Header text, inserted as written (not escaped, not parsed as Markdown). |
| `expanded` | `"false"` | Only `"true"` opens the accordion. |
| `level` | `"3"` | Heading level of the title (`h{level}`). |
| `duration` | `"1s"` | Animation duration used in the block's `<style>`. |
| `customClass` | `""` | Extra class on the `<details>` element. |

## Options

`markedExtendedAccordion(options?: AccordionOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefixId` | `string` | `'accordion-'` | Prefix of generated ids. |
| `animationDuration` | `string` | `'0.3s'` | Fallback duration; in practice the `duration` property default (`"1s"`) always wins. |
| `template` | `string` | `null` | Custom HTML template. |
| `customizeToken` | `(token) => …` | `null` | Called for each accordion token in `walkTokens`. |

`DEFAULT_OPTIONS` also contains a `labelFormat` function that the accordion never uses. There is no `className` or
`injectStyles` option in 15.9.3. Exported types: `AccordionOptions`, `AccordionToken`.

## Rendered HTML

```html
<details id="accordion-k3j9x2m1p" class="accordion-container faq" open>
  <summary class="accordion-header">
    <h4 class="accordion-title">Billing questions</h4>
  </summary>
  <div class="accordion-content">…</div>
</details>
<style>
  #accordion-k3j9x2m1p { border: 1px solid #ddd; … }
  /* header, title, content and image rules, plus the accordion-fade keyframes */
</style>
```

The id is `prefixId` plus a random string, so it changes on every parse. The content is parsed with the global
`marked.parse`. The `{transitionTiming}` placeholder in the style is never replaced, so the browser drops that
`transition` declaration.

Template placeholders: `{accordionId}`, `{headingTag}`, `{title}`, `{content}`, `{expanded}`, `{expandedAttr}`,
`{animationDuration}`, `{className}` (filled with `customClass`).

## Browser behavior

None beyond the `<style>` element in the HTML. No script runs.

## Next step

- [Styling](../guides/styling.md)
- [Alert](alert.md)
