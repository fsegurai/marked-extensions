import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedFootnote, { attachFootnotes } from '@fsegurai/marked-extended-footnote';
import markedExtendedLists, { attachLists } from '@fsegurai/marked-extended-lists';
import markedExtendedSpoiler, { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';
import markedExtendedTimeline, { attachTimeline } from '@fsegurai/marked-extended-timeline';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
const dark = document.documentElement.dataset.theme === 'dark';
document.body.classList.toggle('dark', dark);

const marked = new Marked(
  markedExtendedAlert(),
  markedExtendedFootnote(),
  markedExtendedLists({ interactiveCheckboxes: true }),
  markedExtendedSpoiler(),
  markedExtendedTables(),
  markedExtendedTabs(),
  markedExtendedTimeline({ locale: 'en-US', timeZone: 'UTC' }),
);

const output = document.querySelector('#output');
output.innerHTML = marked.parse(window.playgroundFiles['input.md']);
const disposers = [
  attachFootnotes(output),
  attachLists(output),
  attachSpoilers(output),
  attachTabs(output),
  attachTimeline(output),
];

// Base tokens go on :root. Every theme declares its component properties there (and under body.dark) as
// `var(--mx-<token>, <default>)`, so they are resolved on :root: a token set on #output would not reach them.
const root = document.documentElement;
const form = document.querySelector('#tokens');
const inputs = [...form.querySelectorAll('input')];
const css = document.querySelector('#css');
const tokenValue = (input) => (input.type === 'range' ? `${input.value}px` : input.value);

const presets = {
  defaults: {},
  // The playground's own colors: the preview and the extensions share one palette.
  playground: {
    '--mx-text': 'var(--pg-text)',
    '--mx-text-muted': 'var(--pg-text-muted)',
    '--mx-surface': 'var(--pg-bg)',
    '--mx-surface-muted': 'var(--pg-surface)',
    '--mx-border': 'var(--pg-border)',
    '--mx-accent': 'var(--pg-primary)',
    '--mx-radius': 'var(--pg-radius)',
  },
  forest: dark
    ? {
        '--mx-text': '#e2ece4',
        '--mx-text-muted': '#9db3a3',
        '--mx-surface': '#14201a',
        '--mx-surface-muted': '#1c2c23',
        '--mx-border': '#2f4a3a',
        '--mx-accent': '#5fc48a',
        '--mx-success': '#8fd16a',
        '--mx-warning': '#e0b44c',
        '--mx-danger': '#ef7a6a',
        '--mx-radius': '12px',
      }
    : {
        '--mx-text': '#1d2b22',
        '--mx-text-muted': '#56685c',
        '--mx-surface': '#fbfdf9',
        '--mx-surface-muted': '#edf4ea',
        '--mx-border': '#c5d6c4',
        '--mx-accent': '#2f7d4f',
        '--mx-success': '#4b8f29',
        '--mx-warning': '#a86b00',
        '--mx-danger': '#b23b2e',
        '--mx-radius': '12px',
      },
};

const applied = new Map();
const show = () => {
  css.textContent =
    applied.size === 0
      ? '/* No base token set: every theme keeps its own defaults. */'
      : `:root {\n${[...applied].map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`;
};
const setToken = (name, value) => {
  root.style.setProperty(name, value);
  applied.set(name, value);
};
const fillInputs = (palette) => {
  for (const [token, value] of Object.entries(palette)) {
    const input = form.elements.namedItem(token);
    if (input?.type === 'color' && /^#[0-9a-f]{6}$/i.test(value)) input.value = value;
    if (input?.type === 'range' && value.endsWith('px')) input.value = Number.parseInt(value, 10);
  }
};

const applyPreset = (name) => {
  for (const token of applied.keys()) root.style.removeProperty(token);
  applied.clear();
  for (const [token, value] of Object.entries(presets[name])) setToken(token, value);
  fillInputs(presets[name]);
  show();
  console.log(`Preset: ${name} (${applied.size} tokens)`);
};

// Only the tokens you touch are set; the others keep following the preset (or the package defaults).
for (const input of inputs) {
  input.addEventListener('input', () => {
    setToken(input.name, tokenValue(input));
    show();
  });
}
form.addEventListener('click', (event) => {
  const preset = event.target.closest('[data-preset]')?.dataset.preset;
  if (preset) applyPreset(preset);
});

// Start on the package defaults: the inputs only get starting colors, nothing is set until you change one.
fillInputs(presets.forest);
show();

console.log(`Runtimes attached: ${disposers.length}`);
