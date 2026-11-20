---
label: Alert
description: GitHub-style alerts from > [!NOTE] blockquotes with five built-in variants, custom variants and an injected stylesheet.
order: 2
tags: [ "extensions", "alert" ]
keywords: [ "gfm alerts", "callout", "admonition", "variants" ]
---

# Alert

`@fsegurai/marked-extended-alert` (15.0.1) turns blockquotes that start with `[!TYPE]` into alert boxes. It works in
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
| `className` | `string` | `'markdown-alert'` | Base class (renamed to `marked-extended-alert` in 15.9.4). |
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
<div class="markdown-alert markdown-alert-note">
  <p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" …></svg>Note</p>
  <div class="markdown-alert-content"><p>Useful information that users should know.</p></div>
</div>
```

Icons are GitHub Octicons SVG strings. The title and icon are inserted without escaping.

## Browser behavior

With `injectStyles: true`, the first factory call in a browser appends `<style id="marked-extended-alert-styles">` and
sets `window.__alertStylesAdded`. The stylesheet targets `.markdown-alert` and its variant classes, so it does not match
a custom `className`. Nothing else runs.

## Next step

- [Footnote](footnote.md)
