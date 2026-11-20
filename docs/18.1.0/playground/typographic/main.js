import markedExtendedTypographic, { typographicTransform } from '@fsegurai/marked-extended-typographic';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const options = { fractions: true, outputUnicode: true, skipClasses: ['no-smart'] };
const marked = new Marked(markedExtendedTypographic(options));

document.querySelector('#output').innerHTML = marked.parse(window.playgroundFiles['input.md']);

// The same transform on HTML that did not come from Marked.
console.log(typographicTransform('<p>"Done" -- at last...</p>', options));

// Since 18.1.0 `quotes` only converts straight quotes; backtick quotes (``like this'') follow `backticks`.
// Unset, both follow `attribute` (on with the default '3').
const line = `"Straight" quotes and \`\`backtick quotes''`;
const configurations = [{}, { quotes: false }, { backticks: false }, { quotes: false, backticks: false }];
const rows = document.querySelector('#groups-body');
for (const extra of configurations) {
  const html = new Marked(markedExtendedTypographic({ outputUnicode: true, ...extra })).parseInline(line);
  const row = rows.insertRow();
  const code = document.createElement('code');
  code.textContent = JSON.stringify(extra);
  row.insertCell().append(code);
  row.insertCell().innerHTML = html;
}
