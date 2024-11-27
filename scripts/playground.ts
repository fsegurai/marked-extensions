import mdSample from './markdown.example';

import markedExtendedTables from '../../packages/marked-extended-tables/src/index';

import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import prismjs from 'prismjs';
import ClipboardJS from 'clipboard';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'; // Import the highlight-keywords plugin
import 'prismjs/plugins/line-highlight/prism-line-highlight'; // Import the line-highlight plugin
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-bash'; // Import the bash language
import 'prismjs/components/prism-diff'; // Import the diff language
import 'prismjs/components/prism-javascript'; // Import the javascript language
import 'prismjs/components/prism-json'; // Import the json language
import 'prismjs/components/prism-markdown'; // Import the markdown language
import 'prismjs/components/prism-markup'; // Import the markup language
import 'prismjs/components/prism-typescript'; // Import the typescript language

marked.use(
  markedExtendedTables(),
  markedHighlight({
    emptyLangClass: 'language-plaintext',
    langPrefix: 'language-',
    highlight(code, lang) {
      const language = prismjs.languages[lang] ? lang : 'plaintext';
      return prismjs.highlight(code, prismjs.languages[language], language);
    },
  }),
  {
    gfm: true, // GitHub Flavored Markdown
    breaks: false, // Line breaks {false to allow correct rendering of katex}
    pedantic: false, // Pedantic mode
  },
);

const mdEditor = document.querySelector('.md-editor');
const mdBody = document.querySelector('.md-body');

const mdRender = (md: string) => {
  if (mdBody) {
    // Render the markdown into the mdBody element
    mdBody.innerHTML = marked.parse(md) as string;

    // Target every pre element and then, insert the copy button
    insertCopyElement();
  }
};

const insertCopyElement = () => {
  document.querySelectorAll('pre').forEach(pre => {
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

  // Initialize ClipboardJS
  new ClipboardJS('.copy-btn');
};

document.addEventListener('DOMContentLoaded', () => {
  if (mdEditor && mdBody) {
    // material design 3 - textarea auto resize
    // Insert content from the example into the textarea
    (mdEditor as HTMLTextAreaElement).value = mdSample;
    mdRender(mdSample);

    // Watch the textarea for changes
    mdEditor.addEventListener('input', () => {
      mdRender((mdEditor as HTMLTextAreaElement).value || '');
    });
  }
});
