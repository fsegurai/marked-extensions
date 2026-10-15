---
label: Alert
description: GitHub-style callouts from blockquotes that start with a [!TYPE] marker, with 11 built-in types, custom variants and CSS icons.
order: 2
tags: [ "extensions", "alert" ]
keywords: [ "callout", "admonition", "blockquote", "gfm alerts" ]
---

# Alert

`@fsegurai/marked-extended-alert` converts a blockquote that starts with `[!TYPE]` into a styled alert. It needs no
browser runtime.

## Quick path

```bash
npm install @fsegurai/marked-extended-alert marked
```

```js
import { marked } from 'marked';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import '@fsegurai/marked-extended-alert/styles/alert.css'; // draws the icons

marked.use(markedExtendedAlert());
```

## Syntax

```markdown
> [!NOTE]
> Content with **Markdown**, lists, tables or code.

> [!TIP] Read me first
> Text after the marker becomes the title (plain text, escaped).

> [!WARNING] {icon=🎯} Focused warning
> `{icon=…}` overrides the icon for this alert (escaped; use text or emoji).
```

Write the marker in upper case (`[!NOTE]`); it is matched against the upper-cased variant `type`. Built-in types:

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
| `variants` | `AlertVariant[]` | `[]` | Variants that override or extend the built-ins. |
| `template` | `string \| null` | `null` | Custom template (`{className}`, `{variant}`, `{titleClassName}`, `{icon}`, `{title}`, `{content}`). |
| `customizeToken` | `(token: AlertToken) => void \| null` | `null` | Mutates each alert token after conversion. |
| `defaultVariant` | `AlertVariant \| null` | `null` | Fallback for unknown markers; the class becomes `{className}-{type}`. |
| `unsafeHtml` | `boolean` | `false` | Keep the 18.0 inline `<svg>` icons. |

`AlertVariant`:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | Yes | Marker keyword, for example `hint` for `[!HINT]`. |
| `icon` | `string` | Yes | Icon markup, inserted as given. |
| `title` | `string` | No | Display title; defaults to the capitalized type. |
| `titleClassName` | `string` | No | Class of the title element. |

```js
marked.use(markedExtendedAlert({
  variants: [{ type: 'hint', icon: '💡', title: 'Hint' }],
}));
```

## Rendered HTML

```html
<div class="marked-extended-alert marked-extended-alert-note">
  <p class="marked-extended-alert-title">
    <span class="marked-extended-alert-icon mx-alert-icon-note" aria-hidden="true"></span>Note
  </p>
  <div class="marked-extended-alert-content"><p>…</p></div>
</div>
```

Built-in icons are CSS masks drawn by `alert.css`. Icons you configure are inserted as given; strict sanitizers still
remove a custom inline `<svg>`, so prefer text or emoji.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-alert/styles/alert.css` | Structure and built-in icons. |
| `@fsegurai/marked-extended-alert/styles/alert-theme.css` | Optional theme; colors use `--marked-extended-alert-{type}-color`. |

## Next step

- [Styling and theming](../guides/styling.md)
- [Combining extensions](../guides/combining-extensions.md)
