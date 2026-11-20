import markedExtendedInline from '@fsegurai/marked-extended-inline';
import markedExtendedSourceMap, { attachSourceMap } from '@fsegurai/marked-extended-source-map';
import markedExtendedToc from '@fsegurai/marked-extended-toc';
import markedExtendedWikilinks from '@fsegurai/marked-extended-wikilinks';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

const pages = new Map([
  ['roadmap', '/notes/roadmap'],
  ['glossary', '/notes/glossary'],
]);

const sourceMap = markedExtendedSourceMap();
const marked = new Marked(
  markedExtendedInline({ marks: { sup: true, sub: true } }),
  markedExtendedToc({ maxDepth: 2, labels: { title: 'On this page' } }),
  markedExtendedWikilinks({
    // Return null for an unknown page: the link renders as unresolved. Unsafe schemes are refused anyway.
    resolve: (target) => {
      const href = pages.get(target.toLowerCase());
      return href ? { href } : null;
    },
  }),
  sourceMap, // last: it wraps the blocks the other extensions produced
);

const markdown = window.playgroundFiles['input.md'];
const output = document.querySelector('#output');
output.innerHTML = marked.parse(markdown);

// Not part of the bundle's attachAll: it needs this parse's source map. Stamps data-line and safe heading ids.
attachSourceMap(output, { sourceMap: sourceMap.sourceMap, source: () => markdown });

output.addEventListener('click', (event) => {
  const link = event.target.closest('a.mx-wikilinks-link');
  if (!link) return;
  event.preventDefault(); // the sample has no other pages
  console.log(`Wiki link to ${link.getAttribute('href')}`);
});

for (const heading of output.querySelectorAll('h1, h2')) console.log(`#${heading.id} (line ${heading.dataset.line})`);
