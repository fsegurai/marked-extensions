import type { MarkedExtension } from 'marked';
import { createFootnote } from './footnote.js';
import { createFootnoteRef } from './references.js';
import { createFootnotes } from './footnotes.js';
import type { LexerTokens, Options } from './types.js';

export default function markedExtendedFootnote(options: Options = {}): MarkedExtension {
  const {
    prefixId = 'fnref-',
    description = 'Footnotes',
    refMarkers,
  } = options;
  const lexer: LexerTokens = { hasFootnotes: false, tokens: [] };

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

export type { Footnote, FootnoteRef, Footnotes, Options } from './types.js';