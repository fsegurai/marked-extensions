---
label: Alert
description: GitHub-style callouts from blockquotes that start with a [!TYPE] marker, with 5 built-in types and custom variants.
order: 2
tags: [ "extensions", "alert" ]
keywords: [ "callout", "admonition", "blockquote", "gfm alerts" ]
---

# Alert

`@fsegurai/marked-extended-alert` converts a blockquote that starts with `[!TYPE]` into a styled alert. It needs no
browser JavaScript.

## Quick path

```bash
npm install @fsegurai/marked-extended-alert marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import '@fsegurai/marked-extended-alert/styles/alert.css';

marked.use(markedExtendedAlert());
```

## Syntax

```markdown
> [!NOTE]
> Content with **Markdown**, lists, tables or code.
```

Write the marker in upper case: it is matched against the upper-cased variant `type`. The title always comes from the
variant (`title`, or the capitalized type); 17 has no inline title and no per-alert icon override.

| Type | Marker |
|------|--------|
| note | `[!NOTE]` |
| tip | `[!TIP]` |
| important | `[!IMPORTANT]` |
| warning | `[!WARNING]` |
| caution | `[!CAUTION]` |

There are no aliases and no fallback: an unknown marker stays a plain blockquote.

## Options

`markedExtendedAlert(options?: AlertOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-alert'` | Base CSS class. |
| `variants` | `AlertVariant[]` | `[]` | Variants that override (same `type`) or extend the built-ins. |

There is no `template`, `customizeToken` or `defaultVariant` option in 17.

`AlertVariant`:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | Yes | Marker keyword, for example `hint` for `[!HINT]`. |
| `icon` | `string` | Yes | Icon markup, inserted as given (trusted). |
| `title` | `string` | No | Display title; defaults to the capitalized type. |
| `titleClassName` | `string` | No | Class of the title element; defaults to `{className}-title`. |

```js
marked.use(markedExtendedAlert({
  variants: [{ type: 'hint', icon: '💡', title: 'Hint' }],
}));
```

Exported types: `AlertOptions`, `AlertVariant`, `AlertToken`, `AlertMeta`, `AlertRendererOptions`.

## Rendered HTML

```html
<div class="marked-extended-alert marked-extended-alert-note">
  <p class="marked-extended-alert-title"><svg class="octicon octicon-info mr-2" …>…</svg>Note</p>
  <div class="marked-extended-alert-content"><p>…</p></div>
</div>
```

Each built-in type ships an inline `<svg>` octicon, inserted directly into the title without a wrapper element. A
strict HTML sanitizer may remove the `<svg>`.

## Browser behavior

None. The package exports no runtime functions, injects no `<script>` or `<style>`, and dispatches no events.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-alert/styles/alert.css` | Structural styles. |
| `@fsegurai/marked-extended-alert/styles/alert-theme.css` | Optional theme with per-type colors. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Styling and theming](../guides/styling.md)
- [Combining extensions](../guides/combining-extensions.md)
- [Comments](comments.md)
