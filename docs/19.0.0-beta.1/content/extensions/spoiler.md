---
label: Spoiler
description: Hidden content behind a themed overlay from fenced spoiler blocks, revealed by click or keyboard, with optional CSS particle effects.
order: 12
tags: [ "extensions", "spoiler" ]
keywords: [ "hidden content", "reveal", "overlay", "particles", "attachSpoilers", "allowedDataAttributes" ]
---

# Spoiler

`@fsegurai/marked-extended-spoiler` hides the content of a fenced `spoiler` block behind an overlay. A click or
Enter/Space reveals it once `attachSpoilers` is attached; hover never reveals content.

## Quick path

```bash
npm install @fsegurai/marked-extended-spoiler marked
```

```js
import { marked } from 'marked';
import markedExtendedSpoiler, { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
import '@fsegurai/marked-extended-spoiler/styles/spoiler.css';
import '@fsegurai/marked-extended-spoiler/styles/spoiler-theme.css'; // themes and particles

marked.use(markedExtendedSpoiler());
container.innerHTML = marked.parse(markdown);
const dispose = attachSpoilers(container);
```

## Syntax

``````markdown
```spoiler
title: Major plot twist
subtitle: Click to reveal
theme: danger
---
Hidden **Markdown** content.
```
``````

Backtick or tilde fences work; use a longer fence to nest code blocks. Front matter is optional.

| Key | Default | Description |
|-----|---------|-------------|
| `title` | `''` | Overlay title (escaped text, not Markdown). |
| `subtitle` | `''` | Overlay subtitle. |
| `theme` | `'default'` | `default`, `dark`, `light`, `danger`, `info`, `warning`, `success`. |
| `class` | `''` | Extra classes. |
| `id` | `''` | Custom id; otherwise `<prefixId><hash>`, with `-2`, `-3`… for repeats. |
| `data-*` | none | Custom data values, carried as class tokens and restored by `attachSpoilers` only when allowed. |

## Options

`markedExtendedSpoiler(options?: SpoilerOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-spoiler'` | Root class; parts and modifiers follow it (`<className>-content`, `<className>--info`). |
| `prefixId` | `string` | `'spoiler-'` | Prefix of generated ids. |
| `template` | `string \| null` | `null` | Custom template. Put `{tokenClasses}` in the root `class` so the runtime finds it. |
| `particles` | `boolean` | `true` | Particle effect (drawn only by `spoiler-theme.css`). |
| `labels` | `Partial<SpoilerLabels>` | `defaultSpoilerLabels` | User-visible strings, see below. |
| `customizeToken` | `(token: SpoilerToken) => void \| null` | `null` | Mutates each spoiler token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-spoiler`, `data-*`, inline `style`, `<svg>`). |

### Labels

Labels are shallow-merged over the frozen `defaultSpoilerLabels`. Values are plain text: HTML-escaped, never templates.

| Key | Default | Used for |
|-----|---------|----------|
| `ariaLabel` | `'Spoiler - click to reveal'` | `aria-label` of the spoiler (`{ariaLabel}` in templates). |
| `revealHint` | `'Click to reveal'` | Hint under the title when there is no `subtitle`. |
| `titlePrefix` | `'🔒'` | Before the overlay title; `''` disables it. |

```js
marked.use(markedExtendedSpoiler({ labels: { revealHint: 'Pulsa para mostrar', titlePrefix: '' } }));
```

### Exported constants

| Constant | Value |
|----------|-------|
| `SPOILER_THEME_NAMES` | `['default', 'dark', 'light', 'danger', 'info', 'warning', 'success']` (frozen); type `SpoilerThemeName`. |
| `defaultSpoilerLabels` | The default labels (frozen). |

## Rendered HTML

```html
<div class="mx-spoiler mx-spoiler--danger mx-spoiler-id-spoiler-1x2y3z"
     tabindex="0" role="button" aria-expanded="false" aria-label="Spoiler - click to reveal">
  <div class="mx-spoiler-content">…</div>
  <div class="mx-spoiler-overlay">
    <div class="mx-spoiler-overlay-content">
      <span class="mx-spoiler-title">🔒 Major plot twist</span>
      <div class="mx-spoiler-reveal-hint"><span class="mx-spoiler-reveal-icon" aria-hidden="true"></span><span>Click to reveal</span></div>
    </div>
  </div>
  <div class="mx-spoiler-particles" aria-hidden="true"><div class="mx-spoiler-particle mx-spoiler-particle-0"></div>…</div>
</div>
```

`[aria-expanded="true"]` marks the revealed state.

### Sanitizer notes

The default markup has no `id`, `data-*`, inline `style` or `<svg>`: the theme is a class, the icon is CSS and the
id and `data-*` values are class tokens. Angular's `SecurityContext.HTML` keeps it unchanged. `unsafeHtml: true`
emits `id`, `data-spoiler`, `data-*`, an inline `style` overlay and an `<svg>` icon; a sanitizer strips them.

## Runtime

`attachSpoilers(root, options?)` returns a dispose function. It is idempotent per root and works on both markups.

- Delegated click and keydown (Enter/Space) on `root`; clicks on links, buttons and form controls inside a spoiler
  are ignored.
- Restores `data-*` attributes from `mx-spoiler-data*` class tokens only for the names in `allowedDataAttributes`
  (per element: `attachSpoilers.refresh(root)` or `observe`).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowedDataAttributes` | `readonly string[]` | `[]` | `data-*` names (case-insensitive) restored from class tokens. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

A class token is only a class name, so Markdown content can write one by hand. Restoring every token would let
content forge attributes other scripts trust (`data-line`, `data-full-src`). Tokens for names you did not allow are
ignored.

```js
attachSpoilers(container, { allowedDataAttributes: ['data-release', 'data-type'] });
```

| Event | Detail | Notes |
|-------|--------|-------|
| `marked-extended:spoiler:toggle` | `{ id, expanded }` | After each toggle. `id` is the `id` key or the content hash. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-spoiler/styles/spoiler.css` | Structure, overlay and reveal icon. |
| `@fsegurai/marked-extended-spoiler/styles/spoiler-theme.css` | Themes and particle positions. Without it particles stay invisible; set `particles: false` if you skip it. Reads the host's `body.dark`. |

### CSS classes

| Class | Purpose |
|-------|---------|
| `mx-spoiler` | Root (`[aria-expanded="true"]` when revealed). |
| `mx-spoiler--<theme>` | Theme modifier: `default`, `dark`, `light`, `danger`, `info`, `warning`, `success`. |
| `mx-spoiler-content` | Content wrapper. |
| `mx-spoiler-overlay`, `mx-spoiler-overlay-content` | Overlay and its text. |
| `mx-spoiler-title` | Overlay title. |
| `mx-spoiler-reveal-hint`, `mx-spoiler-reveal-icon` | Hint and CSS eye icon. |
| `mx-spoiler-particles` | Particle container. |
| `mx-spoiler-particle`, `mx-spoiler-particle-<n>` | One particle and its position (0 to 19). |
| `mx-spoiler-id-<id>`, `mx-spoiler-data<Name>-<value>` | Class tokens: runtime hook, id and `data-*`. |

### CSS custom properties

All are optional and have fallbacks.

| Area | Properties |
|------|------------|
| Layout | `--mx-spoiler-min-height`, `--mx-spoiler-margin`, `--mx-spoiler-margin-mobile`, `--mx-spoiler-padding`, `--mx-spoiler-padding-mobile`, `--mx-spoiler-border-radius`, `--mx-spoiler-focus-color` |
| Motion | `--mx-spoiler-animation-duration`, `--mx-spoiler-transition-timing` |
| Content | `--mx-spoiler-content-blur`, `--mx-spoiler-content-grayscale`, `--mx-spoiler-content-contrast`, `--mx-spoiler-content-saturate`, `--mx-spoiler-content-scale` |
| Overlay | `--mx-spoiler-surface-bg`, `--mx-spoiler-overlay-bg`, `--mx-spoiler-overlay-color`, `--mx-spoiler-overlay-blur`, `--mx-spoiler-overlay-blur-hover`, `--mx-spoiler-overlay-noise-opacity` |
| Text | `--mx-spoiler-title-size`, `--mx-spoiler-title-letter-spacing`, `--mx-spoiler-hint-size` |
| Particles | `--mx-spoiler-particle-color`, `--mx-spoiler-particle-opacity` |
| Themes | `--mx-spoiler-<theme>-background`, `--mx-spoiler-<theme>-color` for each theme |

## Changes in 19.0.0-beta.1

- `attachSpoilers` restores front-matter `data-*` values only for names in `allowedDataAttributes` (none by default).
  Forged class tokens are ignored.
- New `labels` option and exported `defaultSpoilerLabels` and `SPOILER_THEME_NAMES`.
- Classes move to the `mx-` convention: `marked-extended-spoiler-*` → `mx-spoiler-*`, `spoiler-title` →
  `mx-spoiler-title`, `spoiler-theme-<theme>` → `mx-spoiler--<theme>`, `particle p<n>` →
  `mx-spoiler-particle mx-spoiler-particle-<n>`, `--spoiler-*` → `--mx-spoiler-*`. `className` defaults to
  `'mx-spoiler'`.

## Next step

- [Styling and theming](../guides/styling.md)
- [Sanitizer-safe markup](../guides/sanitizer-safe-markup.md)
