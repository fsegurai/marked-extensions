'use strict';

import { createFootnote } from './footnote.js';
import { createFootnoteRef } from './references.js';
import { createFootnotes } from './footnotes.js';

export default function(options = {}){
  const {
    prefixId = 'fnref-',
    description = 'Footnotes',
    refMarkers,
  } = options;
  const lexer = { hasFootnotes: false, tokens: [] };

  return {
    extensions: [
      createFootnote(lexer, description),
      createFootnoteRef(prefixId, refMarkers),
      createFootnotes(prefixId),
    ],
    walkTokens(token) {
      if (
        token.type === 'footnotes'
        && lexer.tokens.indexOf(token) === 0
        && token.items.length
      ) {
        lexer.tokens[0] = { type: 'space', raw: '' };
        lexer.tokens.push(token);
      }

      if (lexer.hasFootnotes) lexer.hasFootnotes = false;
    },
  };
}