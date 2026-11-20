---
label: Slide
description: Slide decks from fenced presentation blocks, with layouts, backgrounds, transitions, themes, overview, speaker notes and a scoped runtime.
order: 10
tags: [ "extensions", "slide" ]
keywords: [ "presentation", "slides", "deck", "speaker notes", "attachSlides", "defaultSlideLabels" ]
---

# Slide

`@fsegurai/marked-extended-slide` renders a fenced `presentation` block as a slide deck. Without the runtime every
slide is shown stacked and readable; `attachSlides` turns it into a deck with controls, keyboard, swipes, autoplay,
overview and fullscreen.

## Quick path

```bash
npm install @fsegurai/marked-extended-slide marked
```

```js
import { marked } from 'marked';
import markedExtendedSlide, { attachSlides } from '@fsegurai/marked-extended-slide';
import '@fsegurai/marked-extended-slide/styles/slide.css';       // required
import '@fsegurai/marked-extended-slide/styles/slide-theme.css'; // optional

marked.use(markedExtendedSlide({ theme: 'dark' }));
container.innerHTML = marked.parse(markdown);
const dispose = attachSlides(container); // attach synchronously to avoid a flash of stacked slides
```

## Syntax

Slides are separated by a lone `---`. The section before the first `---` is the presentation front matter.

````markdown
```presentation
title: Building Modern Web Apps
author: Jane Developer
theme: dark
transition: slide
---
layout: cover
background: "linear-gradient(to right, #667eea 0%, #764ba2 100%)"

# Building Modern Web Apps
---
layout: two-cols
notes: Remember this point

## Agenda
```
````

| Presentation key | Description |
|------------------|-------------|
| `title`, `author`, `date` | Presentation metadata. |
| `theme`, `transition` | Override the extension defaults. |

| Slide key | Description |
|-----------|-------------|
| `layout` | `default`, `cover`, `center`, `two-cols`, `image-right`, `image-left`, `full`, `statement`, `fact`, `quote`, `section`. |
| `background` | Color or gradient (validated: no `url()`, `var()`, quotes or semicolons). |
| `backgroundImage`, `backgroundSize`, `backgroundPosition` | Background image (`http(s)` or relative URLs only), rendered as `<img class="mx-slide-bg">`. |
| `transition` | `slide`, `fade`, `slide-up`, `slide-down`, `zoom`, `none`. |
| `class` | Extra classes. |
| `notes` | Speaker notes. |
| `hideSlideNumber` | Hide the number on this slide. |

`---` outside a `presentation` fence is a normal horizontal rule.

## Options

`markedExtendedSlide(options?: SlideOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-slide'` | Base CSS class; structural classes derive from it. |
| `prefixId` | `string` | `'slide-'` | Slide id prefix in the `unsafeHtml` markup. |
| `transition` | `SlideTransition` | `'slide'` | Default transition. |
| `transitionDuration` | `string` | `'0.6s'` | Transition duration (CSS time, at most 60 s). |
| `defaultLayout` | `SlideLayout` | `'default'` | Default layout. |
| `showSlideNumbers` | `boolean` | `true` | Slide numbers. |
| `showControls` | `boolean` | `true` | Navigation controls. |
| `showProgress` | `boolean` | `true` | Progress bar. |
| `keyboardNavigation` | `boolean` | `true` | Keyboard navigation (runtime). |
| `touchNavigation` | `boolean` | `true` | Swipe navigation (runtime). |
| `overviewMode` | `boolean` | `true` | Grid overview and its control. |
| `aspectRatio` | `string` | `'16:9'` | Width to height ratio. |
| `theme` | `string` | `'default'` | Theme name. |
| `autoplay` | `boolean` | `false` | Auto-advance (runtime). |
| `autoplayInterval` | `number` | `5000` | Auto-advance interval in ms (at least 500), only with `autoplay`. |
| `speakerMode` | `boolean` | `false` | Speaker-notes control that emits `marked-extended:slide:speaker`. |
| `labels` | `Partial<SlideLabels>` | `defaultSlideLabels` | Accessible names, see below. |
| `template`, `containerTemplate` | `string \| null` | `null` | Custom slide and container templates. |
| `customizeToken` | `(token: SlideToken) => void \| null` | `null` | Mutates each slide token. |
| `customizePresentation` | `(token: PresentationToken) => void \| null` | `null` | Mutates each presentation token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-*`, `style`, `<button>`, `<svg>`); still needs the runtime. |

Themes styled by `slide-theme.css` (20, through the `mx-slide-theme-<name>` token): `default`, `light`, `dark`,
`solarized-light`, `solarized-dark`, `dracula`, `nord`, `monokai`, `github-light`, `github-dark`, `one-dark`,
`gruvbox-light`, `gruvbox-dark`, `material`, `tokyo-night`, `high-contrast`, `catppuccin-latte`, `catppuccin-mocha`,
`cyberpunk`, `professional`.

### Labels

Labels are shallow-merged over the frozen `defaultSlideLabels`. Values are plain text: HTML-escaped, never templates.
A label set to `''` drops its word.

| Key | Default | Used in |
|-----|---------|---------|
| `presentation` | `'Presentation'` | Presentation name without a `title`. |
| `controls` | `'Slide controls'` | Controls toolbar. |
| `previous`, `next` | `'Previous slide'`, `'Next slide'` | Navigation controls. |
| `overview`, `fullscreen` | `'Toggle overview'`, `'Toggle fullscreen'` | Controls. |
| `speaker` | `'Speaker notes'` | Speaker control (`speakerMode`). |
| `progress` | `'Slide progress'` | Progress bar. |
| `slide`, `of` | `'Slide'`, `'of'` | Slide number (`Slide 2 of 5`) and slide name (`2 of 5`). |

### Exported constants

| Constant | Value |
|----------|-------|
| `SLIDE_LAYOUTS` | The 11 layouts listed under Syntax (frozen). |
| `SLIDE_TRANSITIONS` | `['slide', 'fade', 'slide-up', 'slide-down', 'zoom', 'none']` (frozen). |
| `defaultSlideLabels` | The default labels (frozen). |

## Rendered HTML

```html
<div class="mx-slide-presentation mx-slide mx-slide-id-slide-k3j2 mx-slide-theme-dark mx-slide-ratio-16x9"
     role="region" aria-roledescription="presentation" aria-label="My Talk" tabindex="0">
  <div class="mx-slide-controls" role="toolbar" aria-label="Slide controls">…</div>
  <div class="mx-slide-progress" role="progressbar" …>…</div>
  <div class="mx-slide-slides-container">
    <section class="mx-slide-slide mx-slide-slide--cover mx-slide-slide-1 mx-slide-transition-slide mx-is-active"
             role="group" aria-roledescription="slide" aria-label="1 of 3">…</section>
  </div>
</div>
```

Presentation ids are content hashes (`slide-<hash>`, `-2` for repeats). Controls are `span[role=button]` with CSS
icons.

### Sanitizer notes

The default markup has no `id`, `style`, `data-*`, `on*`, `<button>`, `<svg>`, `<style>` or `<script>`, so Angular's
`SecurityContext.HTML` keeps it unchanged. Front-matter values become encoded class tokens; background images are
emitted only for `http(s)` and relative URLs, and colors are validated at render time and again by the runtime.
`unsafeHtml: true` adds inline styles, `id`s and `data-*`; use it only with trusted, unsanitized content.

## Runtime

`attachSlides(root, options?)` returns a dispose function and gives every presentation in `root` its own state. It
is idempotent per root; `attachSlides.refresh(root)` prepares replaced content.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-slide'` | Must match the extension's `className`. |
| `hash` | `boolean` | `false` | Sync `#<presentation id>-<n>` with the URL (the only listener outside `root`, on `hashchange`). |
| `keyboard` | `boolean` | from the markup | `false` disables keys everywhere. |
| `touch` | `boolean` | from the markup | `false` disables swipes. |
| `autoplay` | `boolean` | from the markup | `false` disables autoplay. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

Keys on a focused presentation: Right / Page Down / Space next, Left / Page Up previous, Home / End, `O` overview,
Escape closes it, `F` fullscreen.

| Event | Detail | Notes |
|-------|--------|-------|
| `marked-extended:slide:change` | `{ id, index, previousIndex, total }` | Cancelable, before the change. |
| `marked-extended:slide:overview` | `{ id, open }` | After the overview toggles. |
| `marked-extended:slide:speaker` | `{ id, index, total, notes, nextNotes }` | From the speaker control; open your own view. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-slide/styles/slide.css` | Required: deck structure and the no-JS stacked fallback. |
| `@fsegurai/marked-extended-slide/styles/slide-theme.css` | Optional: the 20 themes (reads the host's `body.light` / `body.dark`). |

### CSS classes

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-slide`, `mx-slide-presentation` | presentation | Root. |
| `mx-slide-slides-container` | `<div>` | Slides wrapper. |
| `mx-slide-slide`, `mx-slide-slide--<layout>` | `<section>` | Slide and its layout modifier. |
| `mx-slide-slide-content` | `<div>` | Slide body. |
| `mx-slide-slide-bg`, `mx-slide-bg` | `<img>` | Background image. |
| `mx-slide-slide-number`, `-slide-current`, `-slide-separator`, `-slide-total` | `<div>`, `<span>` | Slide number. |
| `mx-slide-notes` | `<aside hidden>` | Speaker notes. |
| `mx-slide-controls`, `mx-slide-control` | toolbar, control | Controls. |
| `mx-slide-prev`, `-next`, `-overview`, `-fullscreen`, `-speaker` | control | Control kind. |
| `mx-slide-progress`, `mx-slide-progress-bar` | `<div>` | Progress bar. |
| `mx-slide-metadata`, `mx-slide-meta-<key>`, `mx-slide-meta-total` | `<div hidden>`, `<span>` | Presentation metadata. |
| `mx-is-ready`, `mx-is-overview` | presentation | Deck mode and open overview (set by `attachSlides`). |
| `mx-is-active`, `mx-is-previous`, `mx-is-next` | slide | Current, earlier and later slides. |
| `mx-slide-theme-<name>`, `-transition-<name>`, `-ratio-<W>x<H>`, `-fit-<value>` | various | Styled class tokens. |
| `mx-slide-id-*`, `-slide-*`, `-bg-*`, `-pos-*`, `-duration-*`, `-keyboard-*`, `-touch-*`, `-overview-*`, `-autoplay-*`, `-interval-*`, `-speaker-*` | various | Class tokens read by `attachSlides`. |

### CSS custom properties

| Property | Default |
|----------|---------|
| `--mx-slide-accent` | `#0066cc` |
| `--mx-slide-aspect` | `auto` (set per presentation by the runtime) |
| `--mx-slide-bg` | `#ffffff` |
| `--mx-slide-border` | `rgba(0, 0, 0, 0.1)` |
| `--mx-slide-code-bg` | `rgba(0, 0, 0, 0.05)` |
| `--mx-slide-code-text` | `var(--mx-slide-text)` |
| `--mx-slide-control-bg` | `rgba(0, 0, 0, 0.6)` |
| `--mx-slide-control-color` | `white` |
| `--mx-slide-control-hover` | `rgba(0, 0, 0, 0.8)` |
| `--mx-slide-duration` | `0.6s` (set per presentation by the runtime) |
| `--mx-slide-font-family` | system UI font stack |
| `--mx-slide-heading` | `var(--mx-slide-text)` |
| `--mx-slide-icon` | per control (CSS mask image) |
| `--mx-slide-image-radius` | `8px` |
| `--mx-slide-image-shadow` | `0 4px 12px rgba(0, 0, 0, 0.2)` |
| `--mx-slide-link` | `var(--mx-slide-accent)` |
| `--mx-slide-on-accent` | `white` |
| `--mx-slide-presentation-bg` | `#1a1a1a` |
| `--mx-slide-progress-track` | `rgba(0, 0, 0, 0.3)` |
| `--mx-slide-shadow` | `0 8px 32px rgba(0, 0, 0, 0.3)` |
| `--mx-slide-text` | `#000` |

Each `mx-slide-theme-<name>` sets the color properties.

## Changes in 19.0.0-beta.1

- `injectScript` and `scriptNonce` are removed from `SlideOptions`. Passing them from JavaScript prints a one-time
  warning and changes nothing.
- Classes move to the `mx-` convention: `marked-extended-slide-<part>` → `mx-slide-<part>`,
  `marked-extended-slide-layout-<layout>` → `mx-slide-slide--<layout>`, `mx-slide-ready` → `mx-is-ready`,
  `active`/`previous`/`next` → `mx-is-active`/`mx-is-previous`/`mx-is-next`, `overview-mode` → `mx-is-overview`,
  `--slide-*` → `--mx-slide-*`. `className` defaults to `'mx-slide'`.
- New `labels` option and exported `defaultSlideLabels`, `SLIDE_LAYOUTS`, `SLIDE_TRANSITIONS`.

## Next step

- [Examples: presentation page](../examples/presentation.md)
