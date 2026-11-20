---
label: Slide
description: Slide decks from ::::presentation blocks with ::::slide children, with layouts, backgrounds, transitions, themes and an injected navigation script.
order: 8
tags: [ "extensions", "slide" ]
keywords: [ "presentation", "slides", "deck", "speaker notes", "injectScript" ]
---

# Slide

`@fsegurai/marked-extended-slide` renders a `::::presentation` block with `::::slide` children as a slide deck.
Navigation needs browser JavaScript: by default the factory appends a `<script>` to `document.body` that drives the
first presentation on the page and exposes `window.presentation`.

## Quick path

```bash
npm install @fsegurai/marked-extended-slide marked@^17
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

```markdown
::::presentation{title="My Presentation" theme="dark"}

::::slide{layout="cover"}
# Welcome
::::slideend

::::slide{layout="two-cols" notes="Remember this point"}
## Agenda
::::slideend

::::slide{layout="cover" background="linear-gradient(to right, #667eea 0%, #764ba2 100%)"}
# Thank You!
::::slideend

::::presentationend
```

Properties use `key="value"`, `key='value'` or `key=value` inside `{…}`.

| Presentation key | Description |
|------------------|-------------|
| `title`, `author`, `date` | Written to hidden `<meta>` tags. |
| `theme`, `transition`, `transitionDuration`, `aspectRatio` | Override the extension options. |
| `showControls`, `showProgress`, `showSlideNumbers` | `false` turns the feature off. |

| Slide key | Description |
|-----------|-------------|
| `layout` | `default`, `cover`, `center`, `two-cols`, `image-right`, `image-left`, `full`, `statement`, `fact`, `quote`, `section`. |
| `background` | Inline `background:` value (not escaped). |
| `backgroundImage`, `backgroundSize`, `backgroundPosition` | Inline `background-image: url(…)`; size and position default to `cover` and `center`. |
| `transition` | `slide`, `fade`, `slide-up`, `slide-down`, `zoom`, `none`. |
| `class` | Extra classes. |
| `notes` | Speaker notes (`<aside aria-hidden="true">`). |
| `hideSlideNumber` | `true` hides the number on this slide. |

## Options

`markedExtendedSlide(options?: SlideOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-slide'` | Base CSS class (the injected script only looks for the default class). |
| `prefixId` | `string` | `'slide-'` | Prefix of the random slide ids. |
| `transition` | `SlideTransition` | `'slide'` | Default transition. |
| `transitionDuration` | `string` | `'0.6s'` | Transition duration (token metadata only). |
| `defaultLayout` | `SlideLayout` | `'default'` | Default layout. |
| `showSlideNumbers` | `boolean` | `true` | Slide numbers. |
| `showControls` | `boolean` | `true` | Navigation buttons. |
| `showProgress` | `boolean` | `true` | Progress bar. |
| `keyboardNavigation`, `touchNavigation`, `overviewMode` | `boolean` | `true` | Declared, but the 17 script sets up keyboard and touch regardless. |
| `aspectRatio` | `string` | `'16:9'` | Width to height ratio. |
| `theme` | `string` | `'default'` | Theme name (`data-theme`). |
| `template`, `containerTemplate` | `string \| null` | `null` | Custom slide and container templates. |
| `customizeToken` | `(token: SlideToken) => void \| null` | `null` | Mutates each slide token. |
| `customizePresentation` | `(token: PresentationToken) => void \| null` | `null` | Mutates each presentation token. |
| `injectScript` | `boolean` | `true` | Append the navigation `<script>` to `document.body`. |

Themes styled by `slide-theme.css` (20): `default`, `light`, `dark`, `solarized-light`, `solarized-dark`, `dracula`,
`nord`, `monokai`, `github-light`, `github-dark`, `one-dark`, `gruvbox-light`, `gruvbox-dark`, `material`,
`tokyo-night`, `high-contrast`, `catppuccin-latte`, `catppuccin-mocha`, `cyberpunk`, `professional`.

## Rendered HTML

```html
<div class="marked-extended-slide-presentation" data-theme="dark" data-aspect-ratio="16:9" data-transition="slide">
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

Template values are inserted without HTML escaping. Slide ids are random, so output differs between parses.

## Browser behavior

| Item | Behavior |
|------|----------|
| Injected `<script id="marked-extended-slide-script">` | Added once to `document.body` (skipped without `window`, no nonce support); later factory calls re-run `window.initPresentation()`. |
| Scope | Only the first `.marked-extended-slide-presentation` in the document. A `MutationObserver` on `document.body` re-inits when one is added. |
| Globals | `window.presentation` (`next`, `prev`, `goto`, `toggleOverview`, `toggleFullscreen`, `toggleKeyboard`, `getCurrentSlide`, `getTotalSlides`), `window.initPresentation`, `window.__presentationState__`. |
| Keyboard | `document` listener. Active when the deck is hovered/clicked, in fullscreen, or after Ctrl+Shift+K / Alt+K. Arrows, Page Up / Down, Space, Home / End, `O` / Escape overview, `F` fullscreen. |
| URL | `history.replaceState` writes `#<index>`; a `hashchange` listener navigates. |
| Event | `slidechange` on the container with `detail: { currentSlide, totalSlides }`. |

There is no autoplay or speaker view in 17.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-slide/styles/slide.css` | Deck structure, layouts, transitions, overview. |
| `@fsegurai/marked-extended-slide/styles/slide-theme.css` | The 20 themes. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Styling guide](../guides/styling.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
