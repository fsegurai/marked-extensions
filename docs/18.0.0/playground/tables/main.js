import markedExtendedTables from '@fsegurai/marked-extended-tables';
import { marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

marked.use(
  markedExtendedTables({
    detectFooter: true, // the last row becomes the footer row...
    useTfoot: true, // ...rendered in a <tfoot>
    responsiveWrapper: true, // scrolls horizontally on narrow screens
    className: 'report-table',
  }),
);

const html = marked.parse(window.playgroundFiles['input.md']);
document.querySelector('#output').innerHTML = html;

const spans = document.querySelectorAll('[colspan], [rowspan]').length;
console.log(`Rendered ${document.querySelectorAll('table').length} tables with ${spans} spanning cells`);
