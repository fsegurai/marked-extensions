---
label: Alert
description: GitHub-style callouts from blockquotes that start with a [!TYPE] marker, detected while lexing, with 11 built-in types, labels, custom variants and CSS icons.
order: 2
tags: [ "extensions", "alert" ]
keywords: [ "callout", "admonition", "blockquote", "gfm alerts" ]
---

# Alert

`@fsegurai/marked-extended-alert` converts a blockquote that starts with `[!TYPE]` into a styled alert. It needs no
browser runtime.

## Install

```bash
npm install @fsegurai/marked-extended-alert marked
```

## Usage

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

The marker is detected by a block tokenizer while lexing, so alerts keep working when another extension wraps the
paragraphs of a blockquote. The marker line, including an inline title, is removed from the body. Blockquotes built
outside the block tokenizer are still converted in `walkTokens`.

## Options

`markedExtendedAlert(options?: AlertOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-alert'` | Root class; it is also the prefix of the part and modifier classes. |
| `variants` | `AlertVariant[]` | `[]` | Variants that override or extend the built-ins. |
| `template` | `string \| null` | `null` | Custom template (`{className}`, `{variant}`, `{titleClassName}`, `{icon}`, `{title}`, `{content}`). |
| `customizeToken` | `(token: AlertToken) => void \| null` | `null` | Mutates each alert token after conversion. |
| `defaultVariant` | `AlertVariant \| null` | `null` | Fallback for unknown markers; the modifier becomes `{className}--{type}`. |
| `icon` | `'class' \| 'svg' \| false` | `'class'` (`'svg'` with `unsafeHtml`) | How built-in icons are emitted. |
| `labels` | `Partial<AlertLabels>` | `defaultAlertLabels` | Variant titles, shallow-merged and HTML-escaped. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (inline `<svg>` icons). |

`labels` keys (from `defaultAlertLabels`); custom variant types may be added as extra keys:

| Key | Default | Key | Default |
|-----|---------|-----|---------|
| `note` | `'Note'` | `success` | `'Success'` |
| `tip` | `'Tip'` | `info` | `'Info'` |
| `important` | `'Important'` | `question` | `'Question'` |
| `warning` | `'Warning'` | `danger` | `'Danger'` |
| `caution` | `'Caution'` | `example` | `'Example'` |
| | | `quote` | `'Quote'` |

A variant's own `title` and an inline title (`> [!NOTE] My title`) win over the label.

`AlertVariant`:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | Yes | Marker keyword, for example `hint` for `[!HINT]`. |
| `icon` | `string` | Yes | Icon markup, inserted as given. |
| `title` | `string` | No | Display title; defaults to the label, then the capitalized type. |
| `titleClassName` | `string` | No | Class of the title element; defaults to `{className}-title`. |

```js
marked.use(markedExtendedAlert({
  variants: [{ type: 'hint', icon: '💡', title: 'Hint' }],
  labels: { note: 'Nota', warning: 'Atención' },
}));
```

## Rendered HTML

```html
<div class="mx-alert mx-alert--note">
  <p class="mx-alert-title">
    <span class="mx-alert-icon mx-alert-icon-note" aria-hidden="true"></span>Note
  </p>
  <div class="mx-alert-content"><p>…</p></div>
</div>
```

## Sanitizer notes

The default markup survives Angular's `SecurityContext.HTML`: built-in icons are empty spans drawn by a CSS mask in
`alert.css`. `unsafeHtml: true` (or `icon: 'svg'`) emits the inline `<svg>` Octicons, which strict sanitizers remove.
`icon: false` drops the icon element. Icons you configure (`variants[].icon`, `defaultVariant.icon`, `{icon=…}`) are
inserted as given, so a custom `<svg>` is still removed by strict sanitizers; prefer text or emoji.

## CSS classes

A custom `className` replaces the `mx-alert` prefix.

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-alert` | `div` | Root of every alert. |
| `mx-alert--<type>` | `div` | Variant modifier. |
| `mx-alert-title` | `p` | Title (default `titleClassName`). |
| `mx-alert-icon` | `span` | Decorative icon wrapper (`aria-hidden`). |
| `mx-alert-icon-<type>` | `span` | Class token of a built-in CSS icon (`icon: 'class'`). |
| `mx-alert-content` | `div` | Content wrapper. |

## CSS custom properties

Every value is read with a fallback, so the stylesheets work without defining any property.

| Property | Default | Used by | Purpose |
|----------|---------|---------|---------|
| `--mx-alert-padding` | `0 1em` | `alert.css` | Container padding. |
| `--mx-alert-margin-bottom` | `16px` | `alert.css` | Space below the alert. |
| `--mx-alert-border-width` | `0.25em` | `alert.css` | Left border width. |
| `--mx-alert-border-color` | `#444c56` | both | Left border color without a variant. |
| `--mx-alert-title-font-weight` | `500` | `alert.css` | Title font weight. |
| `--mx-alert-icon-margin-right` | `0.5rem` | `alert.css` | Space between icon and title. |
| `--mx-alert-icon-size` | `16px` | `alert.css` | Size of the built-in CSS icons. |
| `--mx-alert-icon` | per `mx-alert-icon-<type>` | `alert.css` | Mask image of a built-in icon. |
| `--mx-alert-text-color` | `var(--app-text-primary, #24292e)` | `alert-theme.css` | Body text color (`#d1d5da` under `body.dark`). |
| `--mx-alert-<type>-color` | per type (`note` `#539bf5`, `tip` `#57ab5a`, …) | `alert-theme.css` | Accent of each built-in variant. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-alert/styles/alert.css` | Structure and built-in icons. |
| `@fsegurai/marked-extended-alert/styles/alert-theme.css` | Optional theme (colors on `:root`, overridden under `body.dark`). |

## Runtime

None. Alerts are static HTML.

## Exported constants

| Export | Value |
|--------|-------|
| `ALERT_VARIANTS` | Frozen array of the 11 built-in types, in the order of the table above. |
| `defaultAlertLabels` | Frozen English titles of the built-in types. |

Types: `AlertOptions`, `AlertVariant`, `AlertLabels`, `AlertIconMode`, `AlertVariantType`, `AlertMeta`, `AlertToken`,
`AlertRendererOptions`.

## Changes in 19.0.0-beta.1

- Classes renamed: `marked-extended-alert` → `mx-alert`, `marked-extended-alert-<type>` → `mx-alert--<type>`,
  `-title`/`-icon`/`-content` parts → `mx-alert-title`, `mx-alert-icon`, `mx-alert-content`. `className` defaults to
  `'mx-alert'`.
- Custom properties renamed from `--marked-extended-alert-*` to `--mx-alert-*`.
- The default template uses `{className}--{variant}`; built-in `<svg>` icons no longer carry `octicon` classes.
- The `[!X]` marker is detected while lexing (works inside wrapper tokens).
- New `icon` and `labels` options, `ALERT_VARIANTS` and `defaultAlertLabels` exports.

## Next step

- [Styling and theming](../guides/styling.md)
- [Combining extensions](../guides/combining-extensions.md)
