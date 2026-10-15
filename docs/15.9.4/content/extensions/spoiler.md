---
label: Spoiler
description: Hidden content from ::::spoiler blocks, revealed on hover or focus, with seven color themes, particle effects and configurable CSS placeholders.
order: 5
tags: [ "extensions", "spoiler" ]
keywords: [ "hidden content", "reveal", "themes", "particles", "cssVariables" ]
---

# Spoiler

`@fsegurai/marked-extended-spoiler` (15.2.0) hides Markdown behind an overlay with animated particles. The content is
revealed with CSS on `:hover` and `:focus`.

## Quick path

```bash
npm install @fsegurai/marked-extended-spoiler marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';

marked.use(markedExtendedSpoiler());
```

## Syntax

```markdown
::::spoiler{title="Ending" theme="danger"}
The butler did it.
::::spoilerend
```

| Form | Opening | Closing |
|------|---------|---------|
| Full | `::::spoiler{…}` | `::::spoilerend` |
| Aliases | `:spoiler{…}`, `:sp{…}` | `:spoilerend`, `:spend` |

The `{…}` block is required; nested spoilers are balanced by depth.

| Property | Default | Description |
|----------|---------|-------------|
| `title` | `""` | Overlay text, inserted without escaping. |
| `theme` | `"default"` | `default`, `dark`, `light`, `danger`, `info`, `warning` or `success`. Unknown values fall back to `default`. |

## Options

`markedExtendedSpoiler(options?: SpoilerOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-spoiler'` | Base class of the template. The injected stylesheet always targets `.marked-extended-spoiler`. |
| `prefixId` | `string` | `'spoiler-'` | Prefix of generated ids. |
| `template` | `string` | `null` | Custom HTML template. |
| `customizeToken` | `(token) => void` | `null` | Called for each spoiler token in `walkTokens`. |
| `injectStyles` | `boolean` | `true` | Append the default stylesheet to `document.head`. |
| `cssVariables` | object | see below | Values substituted into the injected stylesheet. |

Default `cssVariables`:

```js
{ '{animationDuration}': '1s', '{padding}': '12px', '{borderRadius}': '6px', '{transitionTiming}': 'ease-out' }
```

The keys are literal placeholders, not CSS custom properties. Passing `cssVariables` replaces the whole object, so
include all four keys. The values apply only to the first injection on a page.

## Rendered HTML

```html
<div id="spoiler-k3j9x2m1p" class="marked-extended-spoiler" tabindex="0" role="button" aria-expanded="false">
  <div class="marked-extended-spoiler-content" style="opacity: 0;">…</div>
  <div class="marked-extended-spoiler-overlay"><span class="spoiler-title">Ending</span></div>
  <div class="marked-extended-spoiler-particles">
    <!-- 15 particle elements, a GPU detector element and an inline <script> -->
  </div>
</div>
<style>/* theme colors, shadows and particle keyframes scoped to #spoiler-k3j9x2m1p */</style>
```

Template placeholders: `{spoilerId}`, `{className}`, `{content}`, `{customTitle}`, `{particlesContent}`,
`{themeShadow}`, `{themeShadowHover}`, `{themeBackground}`, `{themeTextColor}`, `{particleStyles}`. The content is
parsed with the global `marked.parse`.

## Browser behavior

| Item | Behavior |
|------|----------|
| Injected stylesheet | `<style id="marked-extended-spoiler-styles">` once per page (`injectStyles`). |
| Per-spoiler `<style>` | Theme colors and particle animations, scoped to the spoiler id. |
| Inline `<script>` | Detects GPU support, mobile user agents and `prefers-reduced-motion`; adds `no-gpu-acceleration` to `<html>` when particles should be static. It does not run when the HTML is inserted with `innerHTML`. |
| Reveal | Pure CSS `:hover` / `:focus`. |

## Next step

- [Tables](tables.md)
