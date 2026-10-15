---
label: Slide
description: Slide decks from fenced presentation blocks, with layouts, backgrounds, transitions, themes, overview, speaker notes and a scoped runtime.
order: 9
tags: [ "extensions", "slide" ]
keywords: [ "presentation", "slides", "deck", "speaker notes", "attachSlides" ]
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

`markedExtendedSlide(options?: SlideOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-slide'` | Base CSS class. |
| `prefixId` | `string` | `'slide-'` | Slide id prefix in the 18.0 markup. |
| `transition` | `SlideTransition` | `'slide'` | Default transition. |
| `transitionDuration` | `string` | `'0.6s'` | Transition duration. |
| `defaultLayout` | `SlideLayout` | `'default'` | Default layout. |
| `showSlideNumbers` | `boolean` | `true` | Slide numbers. |
| `showControls` | `boolean` | `true` | Navigation controls. |
| `showProgress` | `boolean` | `true` | Progress bar. |
| `keyboardNavigation` | `boolean` | `true` | Keyboard navigation (runtime). |
| `touchNavigation` | `boolean` | `true` | Swipe navigation (runtime). |
| `overviewMode` | `boolean` | `true` | Grid overview. |
| `aspectRatio` | `string` | `'16:9'` | Width to height ratio. |
| `theme` | `string` | `'default'` | Theme name. |
| `autoplay` | `boolean` | `false` | Auto-advance (runtime). |
| `autoplayInterval` | `number` | `5000` | Auto-advance interval in ms. |
| `speakerMode` | `boolean` | `false` | Speaker-notes control that emits `marked-extended:slide:speaker`. |
| `template`, `containerTemplate` | `string \| null` | `null` | Custom slide and container templates. |
| `customizeToken` | `(token: SlideToken) => void \| null` | `null` | Mutates each slide token. |
| `customizePresentation` | `(token: PresentationToken) => void \| null` | `null` | Mutates each presentation token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-*`, `style`, `<button>`, `<svg>`); still needs the runtime. |
| `injectScript`, `scriptNonce` | | `false`, `''` | **Deprecated and ignored** (one-time warning). No script is injected. |

Themes styled by `slide-theme.css` (20, through the `mx-slide-theme-<name>` token): `default`, `light`, `dark`,
`solarized-light`, `solarized-dark`, `dracula`, `nord`, `monokai`, `github-light`, `github-dark`, `one-dark`,
`gruvbox-light`, `gruvbox-dark`, `material`, `tokyo-night`, `high-contrast`, `catppuccin-latte`, `catppuccin-mocha`,
`cyberpunk`, `professional`.

## Rendered HTML

```html
<div class="marked-extended-slide-presentation mx-slide mx-slide-id-slide-k3j2 mx-slide-theme-dark mx-slide-ratio-16x9"
     role="region" aria-roledescription="presentation" aria-label="My Talk" tabindex="0">
  <div class="marked-extended-slide-controls" role="toolbar" aria-label="Slide controls">…</div>
  <div class="marked-extended-slide-progress" role="progressbar" …>…</div>
  <div class="marked-extended-slide-slides-container">
    <section class="marked-extended-slide-slide marked-extended-slide-layout-cover mx-slide-slide-1 mx-slide-transition-slide active"
             role="group" aria-roledescription="slide" aria-label="1 of 3">…</section>
  </div>
</div>
```

Presentation ids are content hashes (`slide-<hash>`, `-2` for repeats). Controls are `span[role=button]` with CSS
icons.

## Runtime

`attachSlides(root, options?)` gives every presentation in `root` its own state.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-slide'` | Must match the extension's `className`. |
| `hash` | `boolean` | `false` | Sync `#<presentation id>-<n>` with the URL (the only listener outside `root`, on `hashchange`). |
| `keyboard` | `boolean` | from the markup | `false` disables keys everywhere. |
| `touch` | `boolean` | from the markup | `false` disables swipes. |
| `autoplay` | `boolean` | from the markup | `false` disables autoplay. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

Keys on a focused presentation: Right / Page Down / Space next, Left / Page Up previous, Home / End, `O` overview,
Escape closes it, `F` fullscreen.

| Event | Detail | Notes |
|-------|--------|-------|
| `marked-extended:slide:change` | `{ id, index, previousIndex, total }` | Cancelable, before the change (was `slidechange`). |
| `marked-extended:slide:overview` | `{ id, open }` | After the overview toggles. |
| `marked-extended:slide:speaker` | `{ id, index, total, notes, nextNotes }` | From the speaker control; open your own view. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-slide/styles/slide.css` | Required: deck structure and the no-JS stacked fallback. |
| `@fsegurai/marked-extended-slide/styles/slide-theme.css` | Optional: the 20 themes. |

## Next step

- [Examples: presentation page](../examples/presentation.md)
