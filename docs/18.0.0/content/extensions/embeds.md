---
label: Embeds
description: Fenced embed blocks that render sandboxed iframes for YouTube, Vimeo, CodePen, Spotify, Figma and 15 more providers, with URL scheme checks.
order: 4
tags: [ "extensions", "embeds" ]
keywords: [ "youtube", "iframe", "sandbox", "mermaid", "media" ]
---

# Embeds

`@fsegurai/marked-extended-embeds` turns a fenced `embed` block into a responsive `<iframe>` (or a Mermaid `<div>`).
It needs no browser runtime from this package: the iframe is in the HTML and loads as soon as the page renders. Its
peer range is `marked >=17.0.0`.

## Quick path

```bash
npm install @fsegurai/marked-extended-embeds marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedEmbeds from '@fsegurai/marked-extended-embeds';
import '@fsegurai/marked-extended-embeds/styles/embeds.css';

marked.use(markedExtendedEmbeds());
```

## Syntax

````markdown
```embed
title: Getting Started
aspectRatio: 16:9
---
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

```embed
provider: codepen
param-default-tab: result
---
https://codepen.io/username/pen/abc123
```
````

The body is the URL. Front matter is optional and ends with a lone `---`. The provider is detected from the URL, or
set with `provider`. Providers: `youtube`, `vimeo`, `twitter`, `codepen`, `codesandbox`, `github-gist`, `spotify`,
`soundcloud`, `slideshare`, `figma`, `loom`, `miro`, `mermaid`, `excalidraw`, `drawio`, `diagrams-net`, `pdf`,
`dailymotion`, `tiktok`, `iframe`. `mermaid`, `pdf` and `iframe` have no URL pattern and need an explicit `provider`.

| Key | Description |
|-----|-------------|
| `title` | Accessible iframe title; also the caption fallback. |
| `caption` | Visible caption under the embed. |
| `aspectRatio` (`aspect`, `ratio`) | Any `W:H` of positive integers. Invalid values fall back to `16:9`. |
| `width`, `height` | Number (px) or number with `px`, `%`, `em`, `rem`, `vw`, `vh`, `ch`. Both are needed to replace the ratio. |
| `provider` | Explicit provider; an unknown value renders the error placeholder. |
| `id` | Custom id; otherwise `<prefixId>-<content hash>`. |
| `class`, `data-*` | Extra container classes and `data-*` attributes (escaped). |
| `autoplay`, `muted`, `loop` | Add `autoplay=1`, `mute=1`, `loop=1` to the player URL. |
| `controls` | `false` adds `controls=0`. |
| `startTime` (`start`) | Adds `start=<value>`. |
| `lazyLoad`, `allowFullscreen` | Per-embed overrides of the options. |
| `privacyMode` (`privacy`) | YouTube only: switches the host to `www.youtube-nocookie.com`. |
| `param-*` | Extra player URL parameters (generic providers only). |
| `theme` | Parsed into the token (`light` by default) but not used by the default renderer. |

URLs with a scheme other than `http` or `https` (for example `javascript:` or `data:`) and unrecognized sources render
an error placeholder. An empty body falls through to a normal code block.

## Options

`markedExtendedEmbeds(options?: EmbedOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-embed'` | Base CSS class. |
| `prefixId` | `string` | `'embed'` | Prefix of embed ids. |
| `defaultAspectRatio` | `AspectRatio` | `'16:9'` | Declared, but the renderer always falls back to `16:9`. |
| `allowFullscreen` | `boolean` | `true` | `allowfullscreen` on iframes. |
| `lazyLoad` | `boolean` | `true` | `loading="lazy"` plus a loading placeholder on generic embeds. |
| `privacyMode` | `boolean` | `false` | Declared, but not applied; use the per-embed `privacyMode` key. |
| `enableSandbox` | `boolean` | `true` | Add a `sandbox` attribute. |
| `sandboxPermissions` | `string[]` | `['allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-presentation']` | Joined into `sandbox`. |
| `providers` | `Partial<Record<EmbedProvider, ProviderConfig>>` | none | Per provider: `params` (added to the URL), `domain` (replaces the iframe host), `template`. |
| `template` | `string \| null` | none | Custom template for generic embeds. |
| `customizeToken` | `(token: EmbedToken) => void \| null` | none | Mutates each embed token. |
| `onEmbedLoad` | `(embedId, provider) => void \| null` | none | Called with `setTimeout(0)` after the HTML is produced, not on the iframe `load` event. |
| `onEmbedError` | `(embedId, provider, error) => void \| null` | none | Called when rendering fails or the URL is unsafe at render time. |

Exported types: `EmbedOptions`, `EmbedProvider`, `ProviderConfig`, `AspectRatio`, `EmbedMeta`, `EmbedToken`,
`EmbedRendererOptions`, `ParsedEmbed`.

## Rendered HTML

```html
<div class="marked-extended-embed-container" id="embed-1x2y3z" data-provider="youtube">
  <div class="marked-extended-embed-wrapper" style="aspect-ratio: 16 / 9;">
    <div class="marked-extended-embed-loading" aria-label="Loading embed">…Loading YouTube...</div>
    <iframe class="marked-extended-embed-iframe" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Getting Started"
            frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
            loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <div class="marked-extended-embed-caption">Getting Started</div>
</div>
```

| Provider | Output |
|----------|--------|
| `mermaid` | `<div class="mermaid">` with the escaped diagram code; you load Mermaid yourself to draw it. |
| `excalidraw`, `drawio`, `diagrams-net`, `pdf` | Container with modifier class (`-excalidraw`, `-drawio`, `-pdf`) and an iframe; `pdf` defaults to `4:3`. |
| error | `<div class="marked-extended-embed-container marked-extended-embed-error" role="alert">` with a message. |

## Browser behavior

The package exports no runtime functions, injects no `<script>` or `<style>`, and dispatches no events. The browser
requests each provider iframe on page load (or when it scrolls into view with `loading="lazy"`); there is no
click-to-load consent step.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-embeds/styles/embeds.css` | Structure, wrapper and loading placeholder. |
| `@fsegurai/marked-extended-embeds/styles/embeds-theme.css` | Optional theme. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Browser behavior](../guides/browser-behavior.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
- [Footnote](footnote.md)
