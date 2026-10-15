import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import { marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

marked.use(
  markedExtendedAlert({
    // Adds [!HINT] next to the built-in types. `icon` is trusted markup.
    variants: [{ type: 'hint', icon: '💡', title: 'Hint' }],
  }),
);

const html = marked.parse(window.playgroundFiles['input.md']);
document.querySelector('#output').innerHTML = html;

console.log(`Rendered ${document.querySelectorAll('.marked-extended-alert').length} alerts`);
