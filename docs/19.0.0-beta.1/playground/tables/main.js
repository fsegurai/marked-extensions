import markedExtendedTables from '@fsegurai/marked-extended-tables';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const marked = new Marked(
  markedExtendedTables({
    detectFooter: true, // the last row becomes the footer row...
    useTfoot: true, // ...rendered in a <tfoot>
    responsiveWrapper: true, // scrolls horizontally on narrow screens
  }),
);

const output = document.querySelector('#output');
output.innerHTML = marked.parse(window.playgroundFiles['input.md']);

const spans = output.querySelectorAll('[colspan], [rowspan]').length;
console.log(`Rendered ${output.querySelectorAll('table').length} tables with ${spans} spanning cells`);
