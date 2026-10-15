---
label: Presentation
description: A slide deck in 18.0.0 with a theme, speaker notes, autoplay and the injected navigation script, including the CSP nonce.
order: 4
tags: [ "examples", "slides" ]
keywords: [ "presentation", "speaker notes", "autoplay", "scriptNonce", "theme" ]
---

# Presentation

```bash
npm install marked@^18 @fsegurai/marked-extended-slide@18.0.0
```

```js
import { Marked } from 'marked';
import markedExtendedSlide from '@fsegurai/marked-extended-slide';
import '@fsegurai/marked-extended-slide/styles/slide.css';
import '@fsegurai/marked-extended-slide/styles/slide-theme.css'; // holds the presentation themes

const marked = new Marked().use(
  markedExtendedSlide({
    theme: 'dracula',
    transition: 'fade',
    speakerMode: true,           // adds a speaker-view button
    scriptNonce: window.cspNonce, // nonce for the injected <script>
  }),
);

document.querySelector('#deck').innerHTML = marked.parse(deckSource);
```

`deckSource`:

````markdown
```presentation
title: Quarterly Review
author: Jane Developer
---
layout: cover

# Quarterly Review
---
layout: two-cols
notes: Mention the hiring plan.

## Highlights
```
````

## How it runs

| Step | What happens |
|------|--------------|
| `markedExtendedSlide()` in the browser | Appends `<script id="marked-extended-slide-script">` to `document.body` once (`injectScript: true`). |
| Page with a deck | The script navigates the first `.marked-extended-slide-presentation`: keys, swipe, hash, controls, progress. |
| Speaker view | Opens a window kept in sync over a `BroadcastChannel`. |
| Slide change | A `slidechange` event fires. |

Render one deck per page: the script drives only the first one. On a page rendered on the server, call
`markedExtendedSlide()` in the browser too, or the script is never added.

## Next step

- [Slide reference](../extensions/slide.md)
