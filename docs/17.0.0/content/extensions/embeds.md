---
label: Embeds
description: "::::embed blocks that render iframes for YouTube, Vimeo, CodePen, Spotify, Figma and 13 more providers."
order: 4
tags: [ "extensions", "embeds" ]
keywords: [ "youtube", "iframe", "sandbox", "mermaid", "media" ]
---

# Embeds

`@fsegurai/marked-extended-embeds` turns an `::::embed{…}` … `::::embedend` block into a responsive `<iframe>` (or a
Mermaid `<div>`). It needs no browser runtime from this package: the iframe is in the HTML and loads as soon as the page
renders. Its peer range is `marked >=17.0.0`.

## Quick path

```bash
npm install @fsegurai/marked-extended-embeds marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedEmbeds from '@fsegurai/marked-extended-embeds';
import '@fsegurai/marked-extended-embeds/styles/embeds.css';

marked.use(markedExtendedEmbeds());
```

## Syntax

```markdown
::::embed{title="Getting Started" aspectRatio="16:9"}
https://www.youtube.com/watch?v=dQw4w9WgXcQ
::::embedend
```

The body is the URL. Properties go inside the optional `{…}` as `key="value"`, `key='value'` or `key=value`; the
newline must follow `}` directly. The provider is detected from the URL, or set with `provider`. Providers: `youtube`,
`vimeo`, `twitter`, `codepen`, `codesandbox`, `github-gist`, `spotify`, `soundcloud`, `slideshare`, `figma`, `loom`,
`miro`, `mermaid`, `excalidraw`, `drawio`, `diagrams-net`, `pdf`, `iframe` (`mermaid`, `pdf` and `iframe` need an
explicit `provider`). A URL that matches no provider leaves the block unparsed.

| Property | Description |
|----------|-------------|
| `title` | Iframe title and visible caption. |
| `aspectRatio` (`ratio`) | `16:9`, `4:3`, `1:1` or `21:9` (others fall back to `16:9`), applied as `padding-bottom`. |
| `width`, `height` | Inserted into `style` as written; both are needed to replace the ratio. |
| `provider` | Explicit provider (not validated). |
| `id` | Element id; otherwise `<prefixId>-<timestamp>-<counter>`. |
| `className` (`class`) | Replaces the base class for this embed. |
| `autoplay`, `muted`, `loop` | `"true"` adds `autoplay=1`, `mute=1`, `loop=1` to the player URL. |
| `controls` | `"false"` adds `controls=0`. |
| `startTime` (`start`) | Adds `start=<value>`. |
| `lazyLoad`, `allowFullscreen` | `"false"` disables them for this embed. |
| `privacyMode` (`privacy`) | YouTube only: `"true"` switches the host to `www.youtube-nocookie.com`. |
| `param-*` | Extra player URL parameters (generic providers only). |
| `theme` | Parsed into the token (`light` by default) but not used by the default renderer. |

17 does not check URL schemes and does not escape the `src` of `excalidraw`, `drawio` and `pdf` iframes. Generic
providers (including `iframe`) need an absolute URL. Sanitize the output if the Markdown is untrusted.

## Options

`markedExtendedEmbeds(options?: EmbedOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-embed'` | Base CSS class. |
| `prefixId` | `string` | `'embed'` | Prefix of embed ids. |
| `defaultAspectRatio` | `AspectRatio` | `'16:9'` | Declared, but the renderer always falls back to `16:9`. |
| `allowFullscreen` | `boolean` | `true` | `allowfullscreen` on generic iframes. |
| `lazyLoad` | `boolean` | `true` | `loading="lazy"` plus a loading placeholder on generic embeds. |
| `privacyMode` | `boolean` | `false` | Declared, but not applied; use the per-embed `privacyMode` property. |
| `enableSandbox` | `boolean` | `true` | Add a `sandbox` attribute to generic iframes. |
| `sandboxPermissions` | `string[]` | `['allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-presentation']` | Joined into `sandbox`. |
| `providers` | `Partial<Record<EmbedProvider, ProviderConfig>>` | none | Per provider: `params` (added to the URL), `domain` (replaces the iframe host), `template`. |
| `template` | `string \| null` | none | Custom template for generic embeds. |
| `customizeToken` | `(token: EmbedToken) => void \| null` | none | Mutates each embed token. |
| `onEmbedLoad` | `(embedId, provider) => void \| null` | none | Called with `setTimeout(0)` after the HTML is produced, not on the iframe `load` event. |
| `onEmbedError` | `(embedId, provider, error) => void \| null` | none | Declared, but never called in 17. |

Exported types: `EmbedOptions`, `EmbedProvider`, `ProviderConfig`, `AspectRatio`, `EmbedMeta`, `EmbedToken`,
`EmbedRendererOptions`, `ParsedEmbed`.

## Rendered HTML

```html
<div class="marked-extended-embed-container" id="embed-1760000000000-1" data-provider="youtube">
  <div class="marked-extended-embed-wrapper" style="padding-bottom: 56.25%;">
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
| `excalidraw`, `drawio`, `diagrams-net` | Container with `-excalidraw` or `-drawio` and an iframe without `sandbox`. |
| `pdf` | Container with `-pdf` and an iframe at `4:3`, without `sandbox`. |

## Browser behavior

The package exports no runtime functions, injects no `<script>` or `<style>`, and dispatches no events. The browser
requests each provider iframe on page load (or when it scrolls into view with `loading="lazy"`).

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-embeds/styles/embeds.css` | Structure, wrapper and loading placeholder. |
| `@fsegurai/marked-extended-embeds/styles/embeds-theme.css` | Optional theme. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Browser behavior](../guides/browser-behavior.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
- [Footnote](footnote.md)
