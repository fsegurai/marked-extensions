import markedExtendedFootnote, { attachFootnotes } from '@fsegurai/marked-extended-footnote';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const marked = new Marked(markedExtendedFootnote({ refMarkers: true, hoverPreview: true }));

const output = document.querySelector('#output');
output.innerHTML = marked.parse(window.playgroundFiles['input.md']);

// Scrolling is a runtime concern: smoothScroll and scrollOffset are options of attachFootnotes.
attachFootnotes(output, { smoothScroll: true, scrollOffset: 16 });

console.log(`Footnotes: ${output.querySelectorAll('.mx-footnote li').length}`);
