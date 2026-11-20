import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedFootnote, { attachFootnotes } from '@fsegurai/marked-extended-footnote';
import markedExtendedSpoiler, { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
import markedExtendedTimeline, { attachTimeline } from '@fsegurai/marked-extended-timeline';
import markedExtendedToc from '@fsegurai/marked-extended-toc';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

// Labels are plain text: they are HTML-escaped and never read as templates. Missing keys keep the English default.
const marked = new Marked(
  markedExtendedAlert({ labels: { note: 'Nota', warning: 'Advertencia' } }),
  markedExtendedFootnote({ labels: { heading: 'Notas al pie', backReference: 'Volver al texto' } }),
  markedExtendedSpoiler({ labels: { ariaLabel: 'Contenido oculto', revealHint: 'Pulsa para mostrar' } }),
  markedExtendedTimeline({ locale: 'es-ES', timeZone: 'UTC', labels: { untitledEvent: 'Evento' } }),
  markedExtendedToc({ labels: { title: 'En esta página' } }),
);

const output = document.querySelector('#output');
output.innerHTML = marked.parse(window.playgroundFiles['input.md']);

const disposers = [attachFootnotes(output), attachSpoilers(output), attachTimeline(output)];
console.log(`Runtimes attached: ${disposers.length}`);
