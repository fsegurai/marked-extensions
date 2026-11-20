---
label: Alert
description: GitHub-style callouts from blockquotes that start with a [!TYPE] marker, with 11 built-in types, inline titles, icon overrides and custom variants.
order: 2
tags: [ "extensions", "alert" ]
keywords: [ "callout", "admonition", "blockquote", "gfm alerts" ]
---

# Alert

`@fsegurai/marked-extended-alert` converts a blockquote that starts with `[!TYPE]` into a styled alert. It needs no
browser JavaScript.

## Quick path

```bash
npm install @fsegurai/marked-extended-alert marked@^18
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

> [!TIP] Read me first
> Text after the marker becomes the title (plain text, escaped).

> [!WARNING] {icon=🎯} Focused warning
> `{icon=…}` (or `{icon: …}`) overrides the icon for this alert (escaped; use text or emoji).
```

Write the marker in upper case: it is matched against the upper-cased variant `type`. Built-in types:

| Type | Marker | Type | Marker |
|------|--------|------|--------|
| note | `[!NOTE]` | success | `[!SUCCESS]` |
| tip | `[!TIP]` | info | `[!INFO]` |
| important | `[!IMPORTANT]` | question | `[!QUESTION]` |
| warning | `[!WARNING]` | danger | `[!DANGER]` |
| caution | `[!CAUTION]` | example | `[!EXAMPLE]` |
| | | quote | `[!QUOTE]` |

There are no aliases. An unknown marker stays a plain blockquote unless `defaultVariant` is set.

## Options

`markedExtendedAlert(options?: AlertOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-alert'` | Base CSS class. |
| `variants` | `AlertVariant[]` | `[]` | Variants that override (same `type`) or extend the built-ins. |
| `template` | `string \| null` | `null` | Custom template (`{className}`, `{variant}`, `{titleClassName}`, `{icon}`, `{title}`, `{content}`). |
| `customizeToken` | `(token: AlertToken) => void \| null` | `null` | Mutates each token after it became an alert. |
| `defaultVariant` | `AlertVariant \| null` | `null` | Fallback for unknown `[!TYPE]` markers; the class becomes `{className}-{type}`. |

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
  <p class="marked-extended-alert-title"><span class="marked-extended-alert-icon" aria-hidden="true"><svg class="octicon octicon-info mr-2" …>…</svg></span>Note</p>
  <div class="marked-extended-alert-content"><p>…</p></div>
</div>
```

Each built-in type ships an inline `<svg>` octicon in the HTML. The icon is always wrapped in an `aria-hidden` span.
A strict HTML sanitizer may remove the `<svg>`; configure a text or emoji `icon` if you sanitize.

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
