import markedExtendedLists, { attachLists } from '@fsegurai/marked-extended-lists';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

// The host removes the front matter before parsing. lineOffset adds those lines back, so every task's `line`
// is its 0-based line in input.md (nested and quoted items included), not a line inside its list.
const lines = window.playgroundFiles['input.md'].split(/\r?\n/);
const frontMatterEnd = lines[0] === '---' ? lines.indexOf('---', 1) : -1;
const lineOffset = frontMatterEnd + 1;

// 'attached': the boxes carry their source position but render read-only (aria-disabled, no tabindex)
// until attachLists runs, so the HTML is safe to show before (or without) the runtime.
const marked = new Marked(markedExtendedLists({ interactiveCheckboxes: 'attached', lineOffset }));

const output = document.querySelector('#output');
output.innerHTML = marked.parse(lines.slice(lineOffset).join('\n'));

// An accessible name the host gave a box is kept on toggle; only the extension's own names follow the state.
output.querySelector('.mx-lists-task')?.setAttribute('aria-label', 'Release blocker: freeze the API');

const source = document.querySelector('#source');
const renderSource = (changed) => {
  source.replaceChildren(
    ...lines.map((text, index) => {
      const row = document.createElement('span');
      row.className = index === changed ? 'line changed' : 'line';
      row.textContent = text;
      return row;
    }),
  );
};
renderSource();

output.addEventListener('marked-extended:lists:toggle', (event) => {
  const { checked, line, text } = event.detail;
  if (line === undefined) return;
  lines[line] = lines[line].replace(/\[[ xX]\]/, checked ? '[x]' : '[ ]');
  renderSource(line);
  const label = event.target.getAttribute('aria-label');
  console.log(`Line ${line + 1}: "${text}" ${checked ? 'checked' : 'unchecked'} (aria-label: ${label})`);
});

const button = document.querySelector('#attach');
const state = document.querySelector('#state');
let dispose;
button.addEventListener('click', () => {
  if (dispose) {
    dispose(); // the 'attached' boxes become read-only again
    dispose = undefined;
  } else {
    dispose = attachLists(output);
  }
  button.textContent = dispose ? 'Disable toggling' : 'Enable toggling';
  button.setAttribute('aria-pressed', String(Boolean(dispose)));
  state.textContent = dispose ? 'Click a box, or focus it and press Space' : 'Read-only: attachLists is not attached';
});

console.log(`Front matter: ${lineOffset} lines; task lines: ${[...output.querySelectorAll('.mx-lists-task')].length}`);
