import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';
import { marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

// Footnote definitions are parsed with the global `marked`, so this sample registers everything on it.
marked.use(
  markedExtendedAccordion(),
  markedExtendedAlert(),
  markedExtendedFootnote({ refMarkers: true, scrollOffset: 16 }),
  markedExtendedTabs({ variant: 'compact' }),
  markedExtendedTypographic({ outputUnicode: true }),
);

document.querySelector('#output').innerHTML = marked.parse(window.playgroundFiles['input.md']);

console.log(`Footnotes: ${document.querySelectorAll('.footnotes li').length}`);
