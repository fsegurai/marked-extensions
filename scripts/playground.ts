import { mdRender } from './utils/markdown';

import mdSample from './utils/markdown.example';

const mdEditor = document.querySelector('.md-editor');
const mdBody = document.querySelector('.md-body') as HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
  if (mdEditor && mdBody) {
    // material design 3 - textarea auto resize
    // Insert content from the example into the textarea
    (mdEditor as HTMLTextAreaElement).value = mdSample;
    mdRender(mdSample, mdBody);

    // Watch the textarea for changes
    mdEditor.addEventListener('input', () => {
      mdRender((mdEditor as HTMLTextAreaElement).value || '', mdBody);
    });
  }
});
