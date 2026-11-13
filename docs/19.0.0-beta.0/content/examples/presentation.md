---
label: Presentation
description: Build a themed slide deck with layouts, backgrounds, speaker notes delivered through an event, and URL hash sync.
order: 5
tags: [ "examples", "slides" ]
keywords: [ "slide deck", "speaker notes", "hash sync", "attachSlides" ]
---

# Presentation

```js
import { Marked } from 'marked';
import markedExtendedSlide, { attachSlides } from '@fsegurai/marked-extended-slide';
import '@fsegurai/marked-extended-slide/styles/slide.css';
import '@fsegurai/marked-extended-slide/styles/slide-theme.css';

const marked = new Marked().use(markedExtendedSlide({ theme: 'nord', speakerMode: true, transition: 'fade' }));

const deck = [
  '```presentation',
  'title: Quarterly Review',
  'author: Jane Developer',
  '---',
  'layout: cover',
  'background: "linear-gradient(to right, #667eea 0%, #764ba2 100%)"',
  'notes: Welcome everyone.',
  '',
  '# Quarterly Review',
  '---',
  'layout: two-cols',
  '',
  '## Results',
  '',
  '- Revenue up',
  '- Churn down',
  '```',
].join('\n');

const container = document.querySelector('#deck');
container.innerHTML = marked.parse(deck);
const dispose = attachSlides(container, { hash: true }); // #<presentation id>-<n> in the URL

container.addEventListener('marked-extended:slide:change', (e) => {
  console.log(`slide ${e.detail.index + 1} of ${e.detail.total}`);
});

// speakerMode adds a control that dispatches this event; open your own notes view.
container.addEventListener('marked-extended:slide:speaker', (e) => {
  notesPanel.textContent = e.detail.notes;
});
```

Keys work while the presentation has focus: arrows, Page Up/Down, Space, Home/End, `O` for the overview, `F` for
fullscreen. Attach synchronously after inserting the HTML: until the runtime adds `mx-slide-ready`, `slide.css` shows
every slide stacked.

## Next step

- [Slide reference](../extensions/slide.md)
