import markedExtendedAlert, { ALERT_VARIANTS } from '@fsegurai/marked-extended-alert';
import { marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

marked.use(
  markedExtendedAlert({
    // A custom variant next to the built-in ones; the icon comes from CSS (sanitizer-safe).
    variants: [{ type: 'release', icon: '🚀', title: 'Release' }],
  }),
);

document.querySelector('#output').innerHTML = marked.parse(window.playgroundFiles['input.md']);

console.log(`Built-in variants: ${ALERT_VARIANTS.join(', ')}`);
