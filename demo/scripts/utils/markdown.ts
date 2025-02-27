import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import markedExtendedCodePreview from '@fsegurai/marked-extended-code-preview';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import markedExtendedLists from '@fsegurai/marked-extended-lists';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

import prismjs from 'prismjs';
import ClipboardJS from 'clipboard';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

const extensions = [
  markedExtendedCodePreview({}, marked),
  markedExtendedFootnote(),
  markedExtendedLists(),
  markedExtendedSpoiler({}, marked),
  markedExtendedTables(),
  markedExtendedTypographic(),
  markedHighlight({
    emptyLangClass: 'language-plaintext',
    langPrefix: 'language-',
    highlight(code, lang) {
      const language = prismjs.languages[lang] ? lang : 'plaintext';
      return prismjs.highlight(code, prismjs.languages[language], language);
    },
  }),
];

marked.use(
  ...extensions,
  {
    gfm: true,
    breaks: false,
    pedantic: false,
    renderer: {
      link({ href, title, text }) {
        return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
      },
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const escapedText = text.toLowerCase().replace(/\W+/g, '-');
        return `
          <h${depth}>
            <a class="anchor" href="#${escapedText}">
              <span class="header-link"></span>
            </a>
            ${text}
          </h${depth}>`;
      },
    },
  },
);

export const mdRender = (md: string, mdBody: HTMLElement | null) => {
  if (!mdBody) return;

  mdBody.innerHTML = marked.parse(md) as string;
  insertCopyElement();
};

const insertCopyElement = () => {
  document.querySelectorAll('pre').forEach((pre) => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.setAttribute('data-clipboard-text', pre.textContent || '');

    button.addEventListener('click', () => {
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });

    pre.appendChild(button);
  });

  new ClipboardJS('.copy-btn');
};
