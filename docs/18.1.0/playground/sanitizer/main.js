import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedFootnote, { attachFootnotes } from '@fsegurai/marked-extended-footnote';
import markedExtendedSpoiler, { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';
import markedExtendedWikilinks from '@fsegurai/marked-extended-wikilinks';
import { Marked } from 'marked';

// The package themes switch to their dark colors with `body.dark`: follow the preview theme.
document.body.classList.toggle('dark', document.documentElement.dataset.theme === 'dark');

/**
 * A small allow-list sanitizer in the spirit of Angular's `SecurityContext.HTML`: unknown elements are unwrapped,
 * and only these attributes survive (no id, style, data-* or on* handlers). Use your framework's sanitizer in an app.
 */
const ELEMENTS = new Set(
  'a abbr b blockquote br caption code del details div em h1 h2 h3 h4 h5 h6 hr i img ins li mark nav ol p pre section span strong sub summary sup table tbody td tfoot th thead tr ul'.split(
    ' ',
  ),
);
const ATTRIBUTES = new Set([
  'class',
  'href',
  'src',
  'alt',
  'title',
  'role',
  'hidden',
  'open',
  'tabindex',
  'colspan',
  'rowspan',
  'scope',
]);
const SAFE_URL = /^(?:(?:https?|mailto):|[^:]*$)/i;

function sanitize(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  for (const el of [...template.content.querySelectorAll('*')]) {
    if (!ELEMENTS.has(el.localName)) {
      el.replaceWith(...(el.localName === 'script' || el.localName === 'style' ? [] : el.childNodes));
      continue;
    }
    for (const { name, value } of [...el.attributes]) {
      const allowed = ATTRIBUTES.has(name) || name.startsWith('aria-');
      const safe = (name !== 'href' && name !== 'src') || SAFE_URL.test(value.trim());
      if (!allowed || !safe) el.removeAttribute(name);
    }
  }
  return template.innerHTML;
}

const marked = new Marked(
  markedExtendedAlert(),
  markedExtendedFootnote(),
  markedExtendedSpoiler(),
  markedExtendedTabs(),
  markedExtendedWikilinks({ resolve: (target) => ({ href: `/wiki/${encodeURIComponent(target)}` }) }),
);

const output = document.querySelector('#output');
const html = marked.parse(window.playgroundFiles['input.md']);
const clean = sanitize(html);
output.innerHTML = clean;

// Runtimes run on the sanitized DOM.
const disposers = [attachTabs(output), attachSpoilers(output), attachFootnotes(output)];
console.log(`Sanitizer removed ${html.length - clean.length} characters; ${disposers.length} runtimes attached`);
console.log(`Unsafe link kept: ${output.querySelector('a[href^="javascript"]') !== null}`);
