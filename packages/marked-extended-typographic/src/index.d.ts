import type { MarkedExtension } from 'marked';

/**
 * Use [smartypants](https://github.com/othree/smartypants.js) and custom typographic symbol validation
 * for "smart" punctuation and symbol replacements.
 *
 * @returns A {@link MarkedExtension | MarkedExtension} to be passed to {@link marked.use | `marked.use()`}.
 */
export default function markedExtendedTypographic(options?: {
  /**
   * A number between -1 and 3 for a preset, or a string with letters for typographic rules. See [all options](https://github.com/othree/smartypants.js#options-and-configuration).
   * @default 2
   */
  config?: string | number
}): MarkedExtension;

export declare const typographicSymbols: {
  map: Record<string, string>
};
