'use strict';

import { createFootnote } from './tokenizer.js';
import { createFootnoteRef } from './renderer-footnotes-reference.js';
import { createFootnotes } from './renderer-footnotes.js';

export default function(options = {}) {
  const { prefixId = 'fnref-', description = 'Footnotes', refMarkers } = options;
  const lexer = { hasFootnotes: false, tokens: [] };

  return {
    extensions: [
      createFootnote(lexer, description),
      createFootnoteRef(prefixId, refMarkers),
      createFootnotes(prefixId),
    ],
    walkTokens(token) {
      if (token.type !== 'footnotes') return;

      if (lexer.tokens.indexOf(token) === 0 && token.items.length) {
        lexer.tokens[0] = { type: 'space', raw: '' };
        lexer.tokens.push(token);
      }

      if (lexer.hasFootnotes) lexer.hasFootnotes = false;
    },
  };
}
