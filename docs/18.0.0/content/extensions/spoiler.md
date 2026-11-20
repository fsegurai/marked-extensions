---
label: Spoiler
description: Hidden content behind a themed overlay from fenced spoiler blocks, revealed by click or keyboard through a document-level listener.
order: 9
tags: [ "extensions", "spoiler" ]
keywords: [ "hidden content", "reveal", "overlay", "particles", "initSpoilers" ]
---

# Spoiler

`@fsegurai/marked-extended-spoiler` hides the content of a fenced `spoiler` block behind an overlay. Revealing needs
browser JavaScript: `initSpoilers()` adds document-level click and keydown listeners, and the module also calls it on
import.

## Quick path

```bash
npm install @fsegurai/marked-extended-spoiler marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedSpoiler, { initSpoilers } from '@fsegurai/marked-extended-spoiler';
import '@fsegurai/marked-extended-spoiler/styles/spoiler.css';
import '@fsegurai/marked-extended-spoiler/styles/spoiler-theme.css';

marked.use(markedExtendedSpoiler());
container.innerHTML = marked.parse(markdown);
initSpoilers(); // idempotent; safe even though the module auto-inits
```

## Syntax

``````markdown
```spoiler
title: Major plot twist
subtitle: Click to reveal
theme: danger
data-chapter: 7
---
Hidden **Markdown** content.
```
``````

Backtick or tilde fences of 3+ characters work. Inner fences with an info string (```` ```js ````) are kept inside;
use a longer outer fence to nest a bare ```` ``` ````. Front matter is optional: the first non-blank line must be
`key: value` and a lone `---` ends it.

| Key | Default | Description |
|-----|---------|-------------|
| `title` | `''` | Overlay title after a lock emoji (escaped text). |
| `subtitle` | `''` | Overlay subtitle; `Click to reveal` when empty. |
| `theme` | `'default'` | `default`, `dark`, `light`, `danger`, `info`, `warning`, `success`; unknown values use `default`. |
| `class` | `''` | Extra classes. |
| `id` | `''` | Custom id; otherwise `<prefixId><n>` from a module-level counter. |
| `data-*` | none | Copied as attributes onto the root. |

## Options

`markedExtendedSpoiler(options?: SpoilerOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-spoiler'` | Base CSS class. |
| `prefixId` | `string` | `'spoiler-'` | Prefix of generated ids. |
| `template` | `string \| null` | `null` | Custom template. Placeholders include `{spoilerId}`, `{content}`, `{customTitle}`, `{customSubTitle}`, `{className}`, `{themeClass}`, `{extraClasses}`, `{dataAttrs}`, `{themeBackground}`, `{themeTextColor}`, `{themeShadow}`, `{particlesSection}`, `{particleStyles}`. Keep `data-spoiler` on the root for the listeners. |
| `particles` | `boolean` | `true` | Render 20 particle `<div>`s. |
| `customizeToken` | `(token: SpoilerToken) => void \| null` | `null` | Mutates each spoiler token. |

## Rendered HTML

```html
<div id="spoiler-0" class="marked-extended-spoiler spoiler-theme-danger" data-spoiler data-chapter="7"
     tabindex="0" role="button" aria-expanded="false" aria-label="Spoiler - click to reveal">
  <div class="marked-extended-spoiler-content">…</div>
  <div class="marked-extended-spoiler-overlay" style="background: …; color: #ffffff; box-shadow: …;">
    <div class="marked-extended-spoiler-overlay-content">
      <span class="spoiler-title">🔒 Major plot twist</span>
      <div class="marked-extended-spoiler-reveal-hint"><svg …></svg><span>Click to reveal</span></div>
    </div>
  </div>
  <div class="marked-extended-spoiler-particles"><div class="particle p0"></div>…</div>
</div>
```

`[aria-expanded="true"]` marks the revealed state. Per-particle sizes, positions and keyframes are generated only for
the `{particleStyles}` placeholder; the default template does not emit them.

## Browser behavior

| Item | Behavior |
|------|----------|
| `initSpoilers(): void` | Adds `click` and `keydown` listeners on `document` once (no-op without `document`). |
| `destroySpoilers(): void` | Removes both listeners. |
| Auto-init | On module load, calls `initSpoilers()` immediately or on `DOMContentLoaded`. The package sets `"sideEffects": false`, so call `initSpoilers()` yourself if a bundler drops that. |
| Toggle | Click anywhere in `[data-spoiler]` (except `input`, `button`, `a`, `summary`, `select`, `textarea`), or Enter / Space on the focused root, flips `aria-expanded`. |
| Event | `spoiler:toggle` (bubbles) with `detail: { id, expanded }`. |
| Injected `<script>`/`<style>`, globals | None. Overlay colors are inline `style` attributes. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-spoiler/styles/spoiler.css` | Structure, overlay and reveal state. |
| `@fsegurai/marked-extended-spoiler/styles/spoiler-theme.css` | Blur, animations, theme colors and particle styling. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Styling guide](../guides/styling.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
