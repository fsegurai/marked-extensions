---
label: Embeds
description: Click-to-load embeds for YouTube, Vimeo, CodePen, Spotify, Figma and 15 more providers, with a strict URL allowlist and sandboxed iframes.
order: 5
tags: [ "extensions", "embeds" ]
keywords: [ "youtube", "iframe", "click-to-load", "privacy", "attachEmbeds" ]
---

# Embeds

`@fsegurai/marked-extended-embeds` turns a fenced `embed` block into a click-to-load placeholder plus a fallback link
to the provider. Nothing is requested from the provider until the reader activates the embed and `attachEmbeds`
builds a sandboxed iframe from a per-provider allowlist.

## Quick path

```bash
npm install @fsegurai/marked-extended-embeds marked
```

```js
import { marked } from 'marked';
import markedExtendedEmbeds, { attachEmbeds } from '@fsegurai/marked-extended-embeds';
import '@fsegurai/marked-extended-embeds/styles/embeds.css';

marked.use(markedExtendedEmbeds());
container.innerHTML = marked.parse(markdown);
const dispose = attachEmbeds(container);
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
theme: dark
---
https://codepen.io/username/pen/abc123
```
````

The provider is detected from the URL, or set with `provider`. Supported providers (`EmbedProvider`): `youtube`,
`vimeo`, `twitter`, `codepen`, `codesandbox`, `github-gist`, `spotify`, `soundcloud`, `slideshare`, `figma`, `loom`,
`miro`, `mermaid`, `excalidraw`, `drawio`, `diagrams-net`, `pdf`, `dailymotion`, `tiktok`, `iframe`.

| Key | Description |
|-----|-------------|
| `title` | Accessible title, also the caption fallback. |
| `caption` | Visible caption under the embed. |
| `aspectRatio` (`aspect`, `ratio`) | Any `W:H`, for example `16:9`, `4:3`, `1:1`, `21:9`, `9:16`. Invalid values fall back to `16:9`. |
| `width`, `height` | Number (px) or number with `px`, `%`, `em`, `rem`, `vw`, `vh`, `ch`. |
| `provider` | Explicit provider. |
| `id` | Custom id; otherwise `<prefixId>-<content hash>`, with `-2`, `-3`… for repeats. |
| `class`, `data-*` | Extra classes and custom data values. |
| `autoplay`, `muted`, `loop`, `controls` | Media booleans. |
| `startTime` | Start time for videos, for example `30`. |
| `lazyLoad`, `allowFullscreen`, `privacyMode` | Per-embed overrides. |
| `theme` | `light` or `dark`. |
| `param-*` | Extra player URL parameters. |

Unknown sources and unsafe schemes (`javascript:`, `data:`, `file:`, `blob:`) render an error placeholder. Mermaid
blocks render `<div class="mermaid">` with the diagram code and need no runtime.

## Options

`markedExtendedEmbeds(options?: EmbedOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-embed'` | Base CSS class. |
| `prefixId` | `string` | `'embed'` | Prefix of embed ids. |
| `defaultAspectRatio` | `AspectRatio` | `'16:9'` | `'16:9' \| '4:3' \| '1:1' \| '21:9' \| 'custom'`. |
| `allowFullscreen` | `boolean` | `true` | Allow fullscreen. |
| `lazyLoad` | `boolean` | `true` | `loading="lazy"` on iframes. |
| `privacyMode` | `boolean` | `false` | Privacy variant for every embed (no-cookie / do-not-track). |
| `thumbnails` | `boolean` | `false` | Static YouTube thumbnail in the placeholder. Never in privacy mode. |
| `enableSandbox` | `boolean` | `true` | Sandbox the iframes. |
| `sandboxPermissions` | `string[]` | `['allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-presentation']` | Only `allow-*` keywords are kept. |
| `providers` | `Partial<Record<EmbedProvider, ProviderConfig>>` | `{}` | Per-provider `params`; `domain` and `template` apply with `unsafeHtml` only. |
| `template` | `string \| null` | `null` | Custom template, `unsafeHtml` only. |
| `customizeToken` | `(token: EmbedToken) => void \| null` | `null` | Mutates each embed token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 `<iframe>` markup, loaded without consent. |
| `onEmbedLoad`, `onEmbedError` | callbacks | `null` | **Deprecated and ignored** (one-time warning). Use the runtime events. |

## Rendered HTML

```html
<div class="marked-extended-embed-container mx-embeds mx-embeds-provider-youtube mx-embeds-id-embed-1x2y3z mx-embeds-ratio-16x9 mx-embeds-media-dQw4w9WgXcQ">
  <div class="marked-extended-embed-wrapper">
    <div class="marked-extended-embed-poster mx-embeds-poster" role="button" tabindex="0" aria-label="Load YouTube content: Getting Started">…</div>
  </div>
  <a class="marked-extended-embed-link mx-embeds-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer">Watch on YouTube</a>
  <div class="marked-extended-embed-caption">Getting Started</div>
</div>
```

The stylesheet ships the ratios `16x9`, `4x3`, `1x1`, `21x9`, `9x16` and `3x2`; the runtime applies any other ratio and
explicit sizes.

## Runtime

`attachEmbeds(root, options?)` loads an embed on click, Enter or Space.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoload` | `boolean` | `false` | Load every embed on attach, without consent. |
| `privacy` | `boolean` | `false` | Privacy variant for every embed. |
| `trustedOrigins` | `string[]` | `[]` | Origins the `iframe` and `pdf` providers may load; otherwise they stay links. |
| `timeout` | `number` | `15000` | Milliseconds before an `error` with reason `timeout` (`0` disables). |
| `allow` | `string` | `'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'` | Iframe `allow`. |
| `referrerPolicy` | `string` | `'strict-origin-when-cross-origin'` | Iframe `referrerpolicy`. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |
| `onEmbedLoad`, `onEmbedError` | callbacks | `null` | Deprecated; prefer the events. |

| Event | Detail | Notes |
|-------|--------|-------|
| `marked-extended:embeds:before-load` | `{ id, provider, src }` | Cancelable: `preventDefault()` keeps the placeholder (consent managers). |
| `marked-extended:embeds:load` | `{ id, provider, src }` | Fired on the iframe's real `load`. |
| `marked-extended:embeds:error` | `{ id, provider, reason, src }` | `reason`: `invalid`, `untrusted`, `error`, `timeout`. |

Failed embeds get `mx-embeds-failed` and can be retried with another click. SlideShare is link only.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-embeds/styles/embeds.css` | Structure, placeholder and aspect ratios. |
| `@fsegurai/marked-extended-embeds/styles/embeds-theme.css` | Optional theme. |

## Next step

- [Security and sanitizers](../guides/sanitizer-safe-markup.md)
