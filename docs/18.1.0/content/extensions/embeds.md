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

## Install

```bash
npm install @fsegurai/marked-extended-embeds marked
```

## Usage

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

`markedExtendedEmbeds(options?: EmbedsOptions)` (`EmbedOptions` is a deprecated alias).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-embeds'` | Root class; structural parts follow it. |
| `prefixId` | `string` | `'embed'` | Prefix of embed ids. |
| `defaultAspectRatio` | `AspectRatio` | `'16:9'` | `'16:9' \| '4:3' \| '1:1' \| '21:9' \| 'custom'`. |
| `allowFullscreen` | `boolean` | `true` | Allow fullscreen. |
| `lazyLoad` | `boolean` | `true` | `loading="lazy"` on iframes. |
| `privacyMode` | `boolean` | `false` | Privacy variant for every embed (no-cookie / do-not-track). |
| `thumbnails` | `boolean` | `false` | Static YouTube thumbnail in the placeholder. Never in privacy mode. |
| `sandbox` | `string \| readonly string[] \| false` | per provider | `allow-*` keywords (list or space-separated string), `[]` for the strictest sandbox, `false` for none. Generic `iframe`/`pdf`: `allow-scripts allow-popups allow-presentation`; allowlisted players add `allow-same-origin`, never for a URL on the page's origin. Wins over `enableSandbox` / `sandboxPermissions`. |
| `enableSandbox` | `boolean` | `true` | Sandbox the iframes. Prefer `sandbox: false`. |
| `sandboxPermissions` | `string[]` | per provider | Only `allow-*` keywords are kept. Prefer `sandbox`. |
| `providers` | `Partial<Record<EmbedProvider, ProviderConfig>>` | `{}` | Per-provider `params`; `domain` and `template` apply with `unsafeHtml` only. |
| `template` | `string \| null` | `null` | Custom template, `unsafeHtml` only. |
| `customizeToken` | `(token: EmbedToken) => void \| null` | `null` | Mutates each embed token. |
| `labels` | `Partial<EmbedsLabels>` | `defaultEmbedsLabels` | User-visible strings, shallow-merged and HTML-escaped. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 `<iframe>` markup, loaded without consent. |
| `onEmbedLoad`, `onEmbedError` | callbacks | `null` | **Deprecated and ignored** (one-time warning). Use the runtime events. |

`labels` keys. Sentences join the words around the provider name with a space; set a word to `''` to drop it.

| Key | Default | Used in |
|-----|---------|---------|
| `load`, `content` | `'Load'`, `'content'` | Placeholder name: `Load YouTube content`. |
| `clickToLoad` | `'Click to load content from'` | Placeholder notice. |
| `notEmbeddable` | `'content cannot be embedded here.'` | Notice of a link-only provider. |
| `open`, `watch`, `listen`, `view`, `on` | `'Open'`, `'Watch'`, `'Listen'`, `'View'`, `'on'` | Fallback link: `Watch on YouTube`. |
| `embed` | `'embed'` | Iframe `title` without a title (`YouTube embed`). |
| `loading`, `loadingProvider` | `'Loading embed'`, `'Loading'` | 18.0 loading placeholder. |
| `excalidrawTitle`, `drawioTitle`, `pdfTitle` | `'Excalidraw diagram'`, `'Draw.io diagram'`, `'PDF document'` | 18.0 iframe titles. |
| `errorUnsupported` | `'Unrecognized or unsupported embed source.'` | Error fallback. |
| `errorUnsafeUrl` | `'This embed could not be loaded (unsafe URL).'` | Error fallback. |
| `errorUnrecognizedUrl` | `'This embed could not be loaded (unrecognized URL).'` | Error fallback. |
| `errorFailed` | `'This embed could not be loaded.'` | Error fallback. |
| `providerMermaid`, `providerPdf`, `providerIframe` | `'Mermaid Diagram'`, `'PDF Document'`, `'External Content'` | Names of the generic providers. |

## Rendered HTML

```html
<div class="mx-embeds mx-embeds--media mx-embeds-provider-youtube mx-embeds-id-embed-1x2y3z mx-embeds-ratio-16x9 mx-embeds-media-dQw4w9WgXcQ">
  <div class="mx-embeds-wrapper">
    <div class="mx-embeds-poster" role="button" tabindex="0" aria-label="Load YouTube content: Getting Started">…</div>
  </div>
  <a class="mx-embeds-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer">Watch on YouTube</a>
  <div class="mx-embeds-caption">Getting Started</div>
</div>
```

The stylesheet ships the ratios `16x9`, `4x3`, `1x1`, `21x9`, `9x16` and `3x2`; the runtime applies any other ratio and
explicit sizes.

## Sanitizer notes

The default markup survives Angular's `SecurityContext.HTML`: no `<iframe>`, `id`, `style` or `data-*`. The provider,
media id and player options are class tokens (`mx-embeds-<key>-<value>`), and the fallback link works without
JavaScript. `unsafeHtml: true` emits the 18.0 `<iframe>` with `id`, `style` and `data-provider`, loaded without
consent; `template` and `providers.<name>.domain`/`.template` apply only then.

## CSS classes

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-embeds` | container | Root. |
| `mx-embeds--media` | container | Runtime hook: a sanitizer-safe media embed. |
| `mx-embeds--mermaid`, `mx-embeds--error` | container | Mermaid diagram; error fallback (`role="alert"`). |
| `mx-embeds--<provider>` | container | Provider of an 18.0 diagram/PDF iframe. |
| `mx-embeds-wrapper` | `div` | Box with the aspect ratio. |
| `mx-embeds-poster`, `mx-embeds-poster--static` | `div` | Click-to-load placeholder; placeholder of a link-only provider. |
| `mx-embeds-thumbnail`, `mx-embeds-play` | `img`, `span` | Static thumbnail; play icon. |
| `mx-embeds-consent`, `mx-embeds-title`, `mx-embeds-notice` | `span` | Placeholder title and notice. |
| `mx-embeds-link` | `a` | No-JS link to the provider. |
| `mx-embeds-iframe` | `iframe` | Player (created by `attachEmbeds`, or 18.0 markup). |
| `mx-embeds-caption` | `div` | Caption. |
| `mx-embeds-error-icon`, `mx-embeds-error-text` | `span` | Error fallback content. |
| `mx-embeds-loading`, `mx-embeds-spinner`, `mx-embeds-loading-text` | `div`, `span` | 18.0 loading placeholder. |
| `mx-is-loading`, `mx-is-loaded`, `mx-is-failed` | container | Load state set by `attachEmbeds`. |
| `mx-embeds-ratio-<W>x<H>`, `mx-embeds-provider-*`, `mx-embeds-id-*`, `mx-embeds-media-*` | container | Class tokens. |

## CSS custom properties

| Property | Default |
|----------|---------|
| `--mx-embeds-bg` | `#f5f5f5` |
| `--mx-embeds-radius` | `0.5rem` |
| `--mx-embeds-shadow` | `0 2px 8px rgba(0, 0, 0, 0.1)` |
| `--mx-embeds-caption-bg`, `--mx-embeds-caption-border`, `--mx-embeds-caption-color` | `#fafafa`, `#e0e0e0`, `#666` |
| `--mx-embeds-caption-padding`, `--mx-embeds-caption-size`, `--mx-embeds-caption-text-align` | `0.75rem 1rem`, `0.875rem`, `center` |
| `--mx-embeds-error-bg`, `--mx-embeds-error-border`, `--mx-embeds-error-color` | `#fff4f4`, `#f3c2c2`, `#b3261e` |
| `--mx-embeds-loading-color`, `--mx-embeds-loading-size` | `#666`, `0.875rem` |
| `--mx-embeds-spinner-color`, `--mx-embeds-spinner-track` | `#2196f3`, `#e0e0e0` |
| `--mx-embeds-poster-bg`, `--mx-embeds-poster-color`, `--mx-embeds-play-bg` | `#111`, `#fff`, `rgba(255, 255, 255, 0.15)` |
| `--mx-embeds-provider-video-bg`, `--mx-embeds-provider-white-bg` | `#000`, `#fff` |
| `--mx-embeds-provider-codepen-bg`, `--mx-embeds-provider-codesandbox-bg`, `--mx-embeds-provider-gist-bg` | `#1e1e1e`, `#151515`, `#f6f8fa` |
| `--mx-embeds-provider-spotify-bg`, `--mx-embeds-provider-soundcloud-bg`, `--mx-embeds-provider-pdf-bg` | `#191414`, `#ff5500`, `#525659` |
| `--mx-embeds-provider-mermaid-padding` | `1rem` |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-embeds/styles/embeds.css` | Structure, placeholder and aspect ratios. |
| `@fsegurai/marked-extended-embeds/styles/embeds-theme.css` | Optional theme (`body.dark` switches it). |

## Runtime

`attachEmbeds(root, options?)` loads an embed on click, Enter or Space and returns a `dispose` function. The iframe URL
is rebuilt from a fixed `https` host per provider plus a validated media id; a URL from the Markdown never reaches the
iframe `src`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoload` | `boolean` | `false` | Load every embed on attach, without consent. |
| `privacy` | `boolean` | `false` | Privacy variant for every embed. |
| `trustedOrigins` | `string[]` | `[]` | Origins the `iframe` and `pdf` providers may load; otherwise they stay links. |
| `timeout` | `number` | `15000` | Milliseconds before an `error` with reason `timeout` (`0` disables). |
| `allow` | `string` | `'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'` | Iframe `allow`. |
| `referrerPolicy` | `string` | `'strict-origin-when-cross-origin'` | Iframe `referrerpolicy`. |
| `labels` | `Partial<EmbedsLabels>` | `defaultEmbedsLabels` | Pass the extension's labels so the iframe `title` matches. |
| `sandbox` | `string \| readonly string[] \| false \| null` | `null` | Host `sandbox` for every iframe the runtime creates; wins over the content's class token. |
| `allowedDataAttributes` | `readonly string[]` | `[]` | `data-*` names (case-insensitive) restored from the `data-*` front-matter keys; nothing else is restored. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |
| `onEmbedLoad`, `onEmbedError` | callbacks | `null` | Deprecated; prefer the events. |

| Event | Detail | Notes |
|-------|--------|-------|
| `marked-extended:embeds:before-load` | `{ id, provider, src }` | Cancelable: `preventDefault()` keeps the placeholder (consent managers). |
| `marked-extended:embeds:load` | `{ id, provider, src }` | Fired on the iframe's real `load`. |
| `marked-extended:embeds:error` | `{ id, provider, reason, src }` | `reason`: `invalid`, `untrusted`, `error`, `timeout`. |

Failed embeds get `mx-is-failed` and can be retried with another click. SlideShare is link only.

## Exported constants

| Export | Value |
|--------|-------|
| `EMBED_PROVIDERS` | Frozen array of every `EmbedProvider` name. |
| `defaultEmbedsLabels` | Frozen English labels (see the `labels` table). |

## Changes in 18.1.0

- `EmbedOptions` renamed `EmbedsOptions` (the old name is a deprecated alias).
- Classes renamed: `marked-extended-embed-container` → `mx-embeds` (+ `mx-embeds--media`), `-mermaid`/`-error`/
  `-<provider>` → `mx-embeds--<modifier>`, `-iframe` → `mx-embeds-iframe`, other parts → `mx-embeds-<part>`; runtime
  states are `mx-is-loading`, `mx-is-loaded` and `mx-is-failed`. `className` defaults to `'mx-embeds'`.
- Custom properties renamed from `--marked-embeds-*` to `--mx-embeds-*`.
- New `labels` option (extension and runtime), `defaultEmbedsLabels` and `EMBED_PROVIDERS`.
- **Breaking:** `attachEmbeds` restores custom `data-*` attributes only when listed in the new
  `allowedDataAttributes` option (default `[]`).
- **Breaking:** stricter default iframe sandbox (18.0 gave every iframe `allow-same-origin`). Generic `iframe` and
  `pdf` embeds get `allow-scripts allow-popups allow-presentation` (no `allow-same-origin`); known third-party players
  keep `allow-same-origin`, and `attachEmbeds` never gives it to a URL on the page's own origin.
- New `sandbox` option on the extension (carried in an `mx-embeds-sandbox-*` class token) and on `attachEmbeds`
  (wins over the token). `enableSandbox` and `sandboxPermissions` still work.
- Nothing is framed before the reader clicks the placeholder (or presses Enter or Space); `autoload: true` opts out.
- `embeds-theme` derives its colors and radius from the `--mx-*` base tokens when they are set on `:root`.

## Next step

- [Security and sanitizers](../guides/sanitizer-safe-markup.md)
