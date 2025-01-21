'use strict';

import SmartyPants from './smartypants.js';

export default function(attr = '2') {
  return {
    tokenizer: {
      inlineText(src) {
        // don't escape inlineText
        const cap = this.rules.inline.text.exec(src);

        /* istanbul ignore next */
        if (!cap) return;

        return {
          type: 'text',
          raw: cap[0],
          text: cap[0],
        };
      },
    },
    hooks: {
      postprocess(html) {
        return SmartyPants(html, attr); // Further process the text with smartypants
      },
    },
  };
}