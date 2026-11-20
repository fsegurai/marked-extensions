import markedExtendedCode, { attachCode, copyText } from '@fsegurai/marked-extended-code';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const marked = new Marked(markedExtendedCode());

const output = document.querySelector('#output');
output.innerHTML = marked.parse(window.playgroundFiles['input.md']);

// Wraps each line in a span, applies the first line number (--mx-code-line-offset) and switches code groups.
attachCode(output, { syncByLabel: true });

// copyText skips deleted lines: this is what a copy button should put on the clipboard.
console.log(copyText(output.querySelectorAll('pre')[1]));
