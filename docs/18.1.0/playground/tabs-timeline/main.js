import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';
import markedExtendedTimeline, { attachTimeline } from '@fsegurai/marked-extended-timeline';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const marked = new Marked(
  markedExtendedTabs({ variant: 'pills' }),
  // Dates are formatted in this locale and time zone, whatever the reader's machine uses.
  markedExtendedTimeline({ locale: 'en-US', timeZone: 'UTC' }),
);

const output = document.querySelector('#output');
output.innerHTML = marked.parse(window.playgroundFiles['input.md']);

const disposers = [attachTabs(output), attachTimeline(output)];
output.addEventListener('marked-extended:tabs:switch', (event) => console.log(`Tab: ${event.detail.label}`));

console.log(`Runtimes attached: ${disposers.length}`);
