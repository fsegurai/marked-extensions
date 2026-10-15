---
label: Spoiler
description: Hidden content behind a themed overlay from ::::spoiler blocks, revealed on hover or focus with CSS and toggled by an inline script.
order: 9
tags: [ "extensions", "spoiler" ]
keywords: [ "hidden content", "reveal", "overlay", "particles", "inline script" ]
---

# Spoiler

`@fsegurai/marked-extended-spoiler` hides the content of a `::::spoiler` block behind an overlay. Hover and keyboard
focus reveal it with CSS alone. Each spoiler also carries an inline `<script>` that toggles it on click or Enter/Space,
but that script only runs if your page executes inserted scripts (it does not run through `innerHTML`).

## Quick path

```bash
npm install @fsegurai/marked-extended-spoiler marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';
import '@fsegurai/marked-extended-spoiler/styles/spoiler.css';
import '@fsegurai/marked-extended-spoiler/styles/spoiler-theme.css';

marked.use(markedExtendedSpoiler());
container.innerHTML = marked.parse(markdown);
```

## Syntax

```markdown
::::spoiler{title="Major plot twist" subtitle="Click to reveal" theme="danger"}
Hidden **Markdown** content.
::::spoilerend
```

| Element | Start (aliases) | End (aliases) |
|---------|-----------------|---------------|
| Spoiler | `::::spoiler` (`:spoiler`, `:spr`) | `::::spoilerend` (`:spoilerend`, `:sprend`) |

The `{…}` block is required (it may be empty) and uses `name="value"` pairs. Nested spoilers are balanced.

| Property | Default | Description |
|----------|---------|-------------|
| `title` | `''` | Overlay title after a lock emoji (inserted without escaping). |
| `subtitle` | `''` | Overlay subtitle; `Click or hover to reveal` when empty. |
| `theme` | `'default'` | `default`, `dark`, `light`, `danger`, `info`, `warning`, `success`; unknown values use the `default` colors. |

## Options

`markedExtendedSpoiler(options?: SpoilerOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-spoiler'` | Base CSS class. |
| `prefixId` | `string` | `'spoiler-'` | Prefix of the random ids. |
| `template` | `string \| null` | `null` | Custom template. Placeholders: `{spoilerId}`, `{content}`, `{customTitle}`, `{customSubTitle}`, `{className}`, `{themeClass}`, `{themeBackground}`, `{themeTextColor}`, `{themeShadow}`, `{themeShadowHover}`, `{particlesContent}`, `{particleStyles}`. |
| `customizeToken` | `(token: SpoilerToken) => void \| null` | `null` | Mutates each spoiler token. |

There is no `particles` option in 17; particles are always rendered.

## Rendered HTML

```html
<div id="spoiler-k3j2h1g0f" class="marked-extended-spoiler spoiler-theme-danger"
     tabindex="0" role="button" aria-expanded="false" aria-label="Spoiler - click or hover to reveal">
  <div class="marked-extended-spoiler-content">…</div>
  <div class="marked-extended-spoiler-overlay" style="background: …; color: #ffffff; box-shadow: …;">
    <div class="marked-extended-spoiler-overlay-content">
      <span class="spoiler-title">🔒 Major plot twist</span>
      <div class="marked-extended-spoiler-reveal-hint"><svg …></svg><span>Click to reveal</span></div>
    </div>
  </div>
  <div class="marked-extended-spoiler-particles"><div class="particle p1"></div>…</div>
</div>
<script>(function() { const spoiler = document.getElementById('spoiler-k3j2h1g0f'); … })();</script>
```

Ids are random, so output differs between parses. Per-particle CSS is generated only for the `{particleStyles}`
placeholder, which the default template does not use.

## Browser behavior

| Item | Behavior |
|------|----------|
| CSS reveal | `:hover`, `:focus` and `[aria-expanded="true"]` show the content (`spoiler.css`). |
| Injected `<script>` | One inline script per spoiler adds `click` and `keydown` listeners to that element and flips `aria-expanded`. Clicks on `input`, `button`, `a`, `summary` are ignored. |
| Exported functions, events, globals | None. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-spoiler/styles/spoiler.css` | Structure, overlay and hover/focus/expanded reveal. |
| `@fsegurai/marked-extended-spoiler/styles/spoiler-theme.css` | Blur, animations, theme colors and particle styling. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Styling guide](../guides/styling.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
