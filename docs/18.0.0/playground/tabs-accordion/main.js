import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import { marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

marked.use(
  markedExtendedTabs({
    variant: 'pills', // 'compact', 'vertical', 'pills' or ''
    animation: 'fade',
    // persistSelection would use localStorage, which the sandboxed preview does not allow.
    onAfterSwitch: ({ previousTabId, newTabId, tabIndex }) =>
      console.log(`Tab switched: ${previousTabId} -> ${newTabId} (index ${tabIndex})`),
  }),
  markedExtendedAccordion({ iconPosition: 'before' }),
);

// The tabs runtime picks up the new containers through a MutationObserver.
document.querySelector('#output').innerHTML = marked.parse(window.playgroundFiles['input.md']);

document.querySelectorAll('details[name="faq"]').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open) console.log(`Opened: ${details.querySelector('summary').textContent.trim()}`);
  });
});
