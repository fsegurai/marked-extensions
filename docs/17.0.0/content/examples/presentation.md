---
label: Presentation
description: A slide deck in 17.0.0 with colon directives, a theme, layouts and the injected navigation script.
order: 3
tags: [ "examples", "slides" ]
keywords: [ "presentation", "directives", "injectScript", "theme" ]
---

# Presentation

```bash
npm install marked@^17 @fsegurai/marked-extended-slide@17.0.0
```

```js
import { Marked } from 'marked';
import markedExtendedSlide from '@fsegurai/marked-extended-slide';
import '@fsegurai/marked-extended-slide/styles/slide.css';
import '@fsegurai/marked-extended-slide/styles/slide-theme.css'; // holds the presentation themes

const marked = new Marked().use(markedExtendedSlide({ theme: 'dracula', transition: 'fade' }));

document.querySelector('#deck').innerHTML = marked.parse(deckSource);
```

`deckSource`:

```markdown
::::presentation{title="Quarterly Review" theme="dracula"}

::::slide{layout="cover"}
# Quarterly Review
::::slideend

::::slide{layout="two-cols" notes="Mention the hiring plan."}
## Highlights
::::slideend

::::presentationend
```

## How it runs

| Step | What happens |
|------|--------------|
| `markedExtendedSlide()` in the browser | Appends `<script id="marked-extended-slide-script">` to `document.body` once (`injectScript: true`); later calls re-run `window.initPresentation()`. |
| Page with a deck | The script navigates the first `.marked-extended-slide-presentation`: keys, swipe, hash, controls, progress. |
| CSP | There is no nonce option in 17.0.0; the injected script needs `'unsafe-inline'` or a hash in `script-src`. |

Render one deck per page: the script drives only the first one.

## Next step

- [Slide reference](../extensions/slide.md)
