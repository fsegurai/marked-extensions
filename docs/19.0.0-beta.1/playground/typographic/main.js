import markedExtendedTypographic, { typographicTransform } from '@fsegurai/marked-extended-typographic';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const options = { fractions: true, outputUnicode: true, skipClasses: ['no-smart'] };
const marked = new Marked(markedExtendedTypographic(options));

document.querySelector('#output').innerHTML = marked.parse(window.playgroundFiles['input.md']);

// The same transform on HTML that did not come from Marked.
console.log(typographicTransform('<p>"Done" -- at last...</p>', options));
