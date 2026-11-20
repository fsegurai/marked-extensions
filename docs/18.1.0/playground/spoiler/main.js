import markedExtendedSpoiler, { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const marked = new Marked(markedExtendedSpoiler());

const output = document.querySelector('#output');
output.innerHTML = marked.parse(window.playgroundFiles['input.md']);

// data-* front-matter values travel as class tokens; only the allowed names are restored as attributes.
attachSpoilers(output, { allowedDataAttributes: ['data-release'] });

output.addEventListener('marked-extended:spoiler:toggle', (event) => {
  console.log(`Spoiler ${event.detail.id}: ${event.detail.expanded ? 'revealed' : 'hidden'}`);
});
console.log(`data-release: ${output.querySelector('[data-release]')?.dataset.release}`);
