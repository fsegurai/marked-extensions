---
label: Spoiler
description: Hidden content behind a themed overlay from fenced spoiler blocks, revealed by click or keyboard, with optional CSS particle effects.
order: 10
tags: [ "extensions", "spoiler" ]
keywords: [ "hidden content", "reveal", "overlay", "particles", "attachSpoilers" ]
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
| `data-*` | none | Custom data values. |

## Options

`markedExtendedSpoiler(options?: SpoilerOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-spoiler'` | Base CSS class. |
| `prefixId` | `string` | `'spoiler-'` | Prefix of generated ids. |
| `template` | `string \| null` | `null` | Custom template. Put `{tokenClasses}` in the root `class` so the runtime finds it. |
| `particles` | `boolean` | `true` | Particle effect (drawn only by `spoiler-theme.css`). |
| `customizeToken` | `(token: SpoilerToken) => void \| null` | `null` | Mutates each spoiler token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-spoiler`, `data-*`, inline `style`, `<svg>`). |

## Rendered HTML

```html
<div class="marked-extended-spoiler spoiler-theme-danger mx-spoiler-id-spoiler-1x2y3z"
     tabindex="0" role="button" aria-expanded="false" aria-label="Spoiler - click to reveal">
  <div class="marked-extended-spoiler-content">…</div>
  <div class="marked-extended-spoiler-overlay">…<span class="marked-extended-spoiler-reveal-icon" aria-hidden="true"></span>…</div>
  <div class="marked-extended-spoiler-particles" aria-hidden="true"><div class="particle p0"></div>…</div>
</div>
```

`[aria-expanded="true"]` marks the revealed state.

## Runtime

`attachSpoilers(root, options?)` takes only the shared `observe` option.

- Delegated click and keydown on `root`; clicks on links, buttons and form controls inside a spoiler are ignored.
- Restores `data-*` attributes from class tokens (per element: `attachSpoilers.refresh(root)` or `observe`).
- Event: `marked-extended:spoiler:toggle` with `detail: { id, expanded }` (was `spoiler:toggle`).
- `initSpoilers` and `destroySpoilers` were removed in 19.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-spoiler/styles/spoiler.css` | Structure, overlay and reveal icon. |
| `@fsegurai/marked-extended-spoiler/styles/spoiler-theme.css` | Themes and particle positions. Without it particles stay invisible; set `particles: false` if you skip it. |

## Next step

- [Styling and theming](../guides/styling.md)
