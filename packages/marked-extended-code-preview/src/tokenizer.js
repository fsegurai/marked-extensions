'use strict';

import { renderCodePreview } from './renderer.js';

/**
 * Create a code preview for the Markdown parser.
 * @param options - The options for the code preview
 * @param markedInstance - The marked instance for rendering the content
 * @returns {{name: string, level: string, tokenizer(*): ({type: string, raw: string, title: string, code: string, subTitle: string}|undefined), renderer({title: *, code: *, subTitle: *}): string}|{type: string, raw: string, title: string, code: string, subTitle: string}|string} The code preview extension
 */
export function createCodePreview(options = {}, markedInstance = null) {
  // Destructure options with default values
  const {
    prefixId = 'code-preview-', // Default prefix for IDs in the rendered HTML
    template, // Custom template for the code preview
  } = options;

  return {
    name: 'codePreview',
    level: 'block',
    tokenizer(src) {
      // Match code block or inline code that should be treated as a code preview
      const match =
        /^``` ?preview(\s+title="([^"]+)")?(\s+subTitle="([^"]+)")?\n([\s\S]+?)\n```/.exec(
          src,
        );

      if (match) {
        const [raw, , title, , subTitle, code] = match;

        // Return the token with modifications from the options
        return {
          type: 'codePreview',
          raw,
          title, // Default title if none is provided
          code, // Raw code within the preview block
          subTitle: subTitle ?? '', // Extra data for the preview
          template, // Pass the template to the renderer
        };
      }
    },
    renderer({ title, code, subTitle }) {
      // Pass the token data to the renderCodePreview function for HTML rendering
      return renderCodePreview({ prefixId, title, code, subTitle, template }, markedInstance);
    },
  };
}
