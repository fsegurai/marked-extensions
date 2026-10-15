---
label: Slide
description: Slide decks from fenced presentation blocks, with layouts, backgrounds, transitions, themes, autoplay, speaker view and an injected navigation script.
order: 8
tags: [ "extensions", "slide" ]
keywords: [ "presentation", "slides", "deck", "speaker notes", "injectScript" ]
---

# Slide

`@fsegurai/marked-extended-slide` renders a fenced `presentation` block as a slide deck. Navigation needs browser
JavaScript: by default the factory appends a `<script>` to `document.body` that drives the first presentation on the
page and exposes `window.presentation`.

## Quick path

```bash
npm install @fsegurai/marked-extended-slide marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedSlide from '@fsegurai/marked-extended-slide';
import '@fsegurai/marked-extended-slide/styles/slide.css';
import '@fsegurai/marked-extended-slide/styles/slide-theme.css';

marked.use(markedExtendedSlide({ theme: 'dark' }));
container.innerHTML = marked.parse(markdown); // the injected script picks it up
```

## Syntax

Slides are separated by a lone `---`. The section before the first `---` is the presentation front matter. A slide's
own `key: value` lines must be followed by a blank line.

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
| `title`, `author`, `date` | Written to hidden `<meta>` tags. |
| `theme`, `transition`, `transitionDuration`, `aspectRatio` | Override the extension options. |
| `showControls`, `showProgress`, `showSlideNumbers`, `autoplay`, `speakerMode` | `false` turns the feature off; they cannot turn on a feature disabled in options. |
| `autoplayInterval` | Interval in ms. |

| Slide key | Description |
|-----------|-------------|
| `layout` | `default`, `cover`, `center`, `two-cols`, `image-right`, `image-left`, `full`, `statement`, `fact`, `quote`, `section`. |
| `background` | Inline `background:` value (CSS-escaped). |
| `backgroundImage`, `backgroundSize`, `backgroundPosition` | Inline `background-image: url(…)`; size and position default to `cover` and `center`. |
| `transition` | `slide`, `fade`, `slide-up`, `slide-down`, `zoom`, `none`. |
| `class` | Extra classes. |
| `notes` | Speaker notes (`<aside aria-hidden="true">`). |
| `hideSlideNumber` | `true` hides the number on this slide. |

Backtick or tilde fences of 3+ characters work. `---` outside a `presentation` fence is a normal horizontal rule.

## Options

`markedExtendedSlide(options?: SlideOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-slide'` | Base CSS class (the injected script only looks for the default class). |
| `prefixId` | `string` | `'slide-'` | Prefix of the random slide ids. |
| `transition` | `SlideTransition` | `'slide'` | Default transition. |
| `transitionDuration` | `string` | `'0.6s'` | Transition duration. |
| `defaultLayout` | `SlideLayout` | `'default'` | Default layout. |
| `showSlideNumbers` | `boolean` | `true` | Slide numbers. |
| `showControls` | `boolean` | `true` | Navigation buttons. |
| `showProgress` | `boolean` | `true` | Progress bar. |
| `keyboardNavigation` | `boolean` | `true` | Keyboard navigation in the script. |
| `touchNavigation` | `boolean` | `true` | Swipe navigation in the script. |
| `overviewMode` | `boolean` | `true` | Written to `data-overview-mode`. |
| `aspectRatio` | `string` | `'16:9'` | Width to height ratio. |
| `theme` | `string` | `'default'` | Theme name (`data-theme`). |
| `template`, `containerTemplate` | `string \| null` | `null` | Custom slide and container templates. |
| `customizeToken` | `(token: SlideToken) => void \| null` | `null` | Mutates each slide token. |
| `customizePresentation` | `(token: PresentationToken) => void \| null` | `null` | Mutates each presentation token. |
| `injectScript` | `boolean` | `true` | Append the navigation `<script>` to `document.body`. |
| `scriptNonce` | `string` | `''` | CSP `nonce` for that script. |
| `autoplay` | `boolean` | `false` | Auto-advance, looping to the first slide. |
| `autoplayInterval` | `number` | `5000` | Auto-advance interval in ms. |
| `speakerMode` | `boolean` | `false` | Add a speaker-view button. |

Themes styled by `slide-theme.css` (20): `default`, `light`, `dark`, `solarized-light`, `solarized-dark`, `dracula`,
`nord`, `monokai`, `github-light`, `github-dark`, `one-dark`, `gruvbox-light`, `gruvbox-dark`, `material`,
`tokyo-night`, `high-contrast`, `catppuccin-latte`, `catppuccin-mocha`, `cyberpunk`, `professional`.

## Rendered HTML

```html
<div class="marked-extended-slide-presentation" data-theme="dark" data-aspect-ratio="16:9" data-transition="slide"
     data-transition-duration="0.6s" data-keyboard-navigation="true" data-touch-navigation="true"
     data-overview-mode="true" data-autoplay="false" data-autoplay-interval="5000" data-speaker-mode="false">
  <div class="marked-extended-slide-controls">
    <button class="marked-extended-slide-control marked-extended-slide-prev" aria-label="Previous slide"><svg …></svg></button>
    …
  </div>
  <div class="marked-extended-slide-progress"><div class="marked-extended-slide-progress-bar" style="width: 0"></div></div>
  <div class="marked-extended-slide-slides-container">
    <section id="slide-<random>" class="marked-extended-slide-slide marked-extended-slide-layout-cover " data-slide-number="1"
             data-transition="slide" … style="background: …">…</section>
  </div>
  <div class="marked-extended-slide-metadata" style="display: none;"><meta name="presentation-title" content="…">…</div>
</div>
```

Template values are HTML-escaped; slide ids are random, so output differs between parses.

## Browser behavior

| Item | Behavior |
|------|----------|
| Injected `<script id="marked-extended-slide-script">` | Added once to `document.body` (skipped without `window`); later factory calls re-run `window.initPresentation()`. |
| Scope | Only the first `.marked-extended-slide-presentation` in the document. A `MutationObserver` on `document.body` re-inits when one is added. |
| Globals | `window.presentation` (`next`, `prev`, `goto`, `toggleOverview`, `toggleFullscreen`, `toggleKeyboard`, `destroy`, `getCurrentSlide`, `getTotalSlides`), `window.initPresentation`, `window.__presentationState__`, `window.__speakerChannel__`. |
| Keyboard | `document` listener. Active when the deck is hovered/clicked, in fullscreen, or after Ctrl+Shift+K / Alt+K. Right / Page Down / Space next, Left / Page Up previous, Home / End, `O` / Escape overview, `F` fullscreen. |
| URL | `history.replaceState` writes `#<index>`; a `hashchange` listener navigates. |
| Speaker view | With `speakerMode`, a button opens a popup (`window.open`) synced through `BroadcastChannel('slide-speaker')`. |
| Event | `slidechange` on the container with `detail: { currentSlide, totalSlides }`. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-slide/styles/slide.css` | Deck structure, layouts, transitions, overview. |
| `@fsegurai/marked-extended-slide/styles/slide-theme.css` | The 20 themes. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Styling guide](../guides/styling.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
