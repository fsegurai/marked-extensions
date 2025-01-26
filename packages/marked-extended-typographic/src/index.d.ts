import type { MarkedExtension } from 'marked';

/**
 * Use [smartypants](https://github.com/othree/smartypants.js) and custom typographic symbol validation
 * for "smart" punctuation and symbol replacements.
 *
 * A number between -1 and 3 for a preset, or a string with letters for typographic rules. See [all options](https://github.com/othree/smartypants.js#options-and-configuration).
 *
 * @param attr - A number between -1 and 3 for a preset, or a string with letters for typographic rules.
 * @returns A {@link MarkedExtension | MarkedExtension} to be passed to {@link marked.use | `marked.use()`}.
 */
export default function markedExtendedTypographic(attr?: string | number): MarkedExtension;

export declare const typographicSymbols: {
  map: Record<string, string>
};
