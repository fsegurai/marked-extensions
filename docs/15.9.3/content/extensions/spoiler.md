---
label: Spoiler
description: Hidden content from ::::spoiler blocks, revealed on hover or focus, with seven color themes, particle effects and per-spoiler styles.
order: 5
tags: [ "extensions", "spoiler" ]
keywords: [ "hidden content", "reveal", "themes", "particles", "sp alias" ]
---

# Spoiler

`@fsegurai/marked-extended-spoiler` (15.1.1) hides Markdown behind an overlay with animated particles. The content is
revealed with CSS on `:hover` and `:focus`. In 15.9.3 the spoiler uses the `::::spoiler` directive instead of the
15.1 fenced block.

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
::::spoiler{title="Ending" theme="danger" duration="0.5s"}
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
| `duration` | `"1s"` | Transition duration in the spoiler's `<style>`. |

## Options

`markedExtendedSpoiler(options?: SpoilerOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefixId` | `string` | `'spoiler-'` | Prefix of generated ids. |
| `animationDuration` | `string` | `'1s'` | Fallback duration; the `duration` property default (`"1s"`) always wins. |
| `template` | `string` | `null` | Custom HTML template. |
| `customizeToken` | `(token) => void` | `null` | Called for each spoiler token in `walkTokens`. |

`index.d.ts` also declares `cssVariables` (`overlayBg`, `textColor`, `borderRadius`, …) and documents an
`animationDuration` default of `'0.5s'`; the source never reads `cssVariables` and defaults to `'1s'`. Border radius
(`6px`), timing (`ease-out`) and padding (`12px`) are fixed in the renderer.

## Rendered HTML

```html
<div id="spoiler-k3j9x2m1p" class="spoiler-container" tabindex="0" role="button" aria-expanded="false">
  <div class="spoiler-content" style="opacity: 0;">…</div>
  <div class="spoiler-overlay"><span class="spoiler-title">Ending</span></div>
  <div class="spoiler-particles">
    <!-- 15 particle elements, a GPU detector element and an inline <script> -->
  </div>
</div>
<style>/* all spoiler CSS: layout, theme colors, hover reveal and particle keyframes, scoped to the id */</style>
```

The content is parsed with the global `marked.parse`.

## Browser behavior

| Item | Behavior |
|------|----------|
| Per-spoiler `<style>` | All spoiler CSS, scoped to the spoiler id. There is no shared stylesheet. |
| Inline `<script>` | Detects GPU support, mobile user agents and `prefers-reduced-motion`; adds `no-gpu-acceleration` to `<html>` when particles should be static. It does not run when the HTML is inserted with `innerHTML`. |
| Reveal | Pure CSS `:hover` / `:focus`. |

## Next step

- [Tables](tables.md)
