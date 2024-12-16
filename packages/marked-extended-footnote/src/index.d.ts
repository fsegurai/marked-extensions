import type { MarkedExtension } from 'marked';
import type { Options } from './types';

export default function markedExtendedFootnote(options?: Options): MarkedExtension;

export type { Footnote, FootnoteRef, Footnotes, LexerTokens, Options } from './types';
