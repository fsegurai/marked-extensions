---
label: Alert
description: GitHub-style alerts from > [!NOTE] blockquotes with five built-in variants, custom variants and an injected stylesheet.
order: 2
tags: [ "extensions", "alert" ]
keywords: [ "gfm alerts", "callout", "admonition", "variants" ]
---

# Alert

`@fsegurai/marked-extended-alert` (15.1.0) turns blockquotes that start with `[!TYPE]` into alert boxes. It works in
`walkTokens`, so ordinary blockquotes are untouched.

## Quick path

```bash
npm install @fsegurai/marked-extended-alert marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';

marked.use(markedExtendedAlert());
```

## Syntax

```markdown
> [!NOTE]
> Useful information that users should know.

> [!WARNING] Text on the marker line works too.
```

| Marker | Variant |
|--------|---------|
| `[!NOTE]` | `note` |
| `[!TIP]` | `tip` |
| `[!IMPORTANT]` | `important` |
| `[!WARNING]` | `warning` |
| `[!CAUTION]` | `caution` |

Markers are matched in upper case (`[!note]` stays a blockquote). The title defaults to the variant type with an
upper-case first letter (`Note`).

## Options

`markedExtendedAlert(options?: AlertOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-alert'` | Base class. |
| `variants` | `AlertVariant[]` | `[]` | Extra variants, or overrides of a built-in one by `type`. |
| `injectStyles` | `boolean` | `true` | Append the default stylesheet to `document.head`. |

A variant is `{ type, icon?, title?, titleClassName? }`. The declared `cssClass` field is not read by the source.

```js
marked.use(markedExtendedAlert({
  variants: [{ type: 'danger', icon: '<i class="icon-danger"></i>', title: 'Danger zone' }],
}));
```

## Rendered HTML

```html
<div class="marked-extended-alert marked-extended-alert-note">
  <p class="marked-extended-alert-title"><svg class="octicon octicon-info mr-2" …></svg>Note</p>
  <div class="marked-extended-alert-content"><p>Useful information that users should know.</p></div>
</div>
```

Icons are GitHub Octicons SVG strings. The title and icon are inserted without escaping.

## Browser behavior

With `injectStyles: true`, the first factory call in a browser appends `<style id="marked-extended-alert-styles">`
with the border and color of each variant and a `.mr-2` helper. Nothing else runs.

## Next step

- [Footnote](footnote.md)
