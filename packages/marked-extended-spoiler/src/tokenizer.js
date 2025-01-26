'use strict';

import { renderSpoiler } from './renderer.js';

/**
 * Create a spoiler effect for the Markdown parser.
 * @param options - The options for the spoiler effect
 * @param markedInstance - The marked instance for rendering the content
 * @returns {{name: string, level: string, tokenizer(*): ({type: string, raw: string, title: string, code: string, animationDuration: string}|undefined), renderer({title: *, code: *, animationDuration: *}): string}|{type: string, raw: string, title: string, code: string, animationDuration: string}|string} The spoiler effect extension
 */
export function createSpoilerEffect(options = {}, markedInstance = null) {
  // Destructure options with default values
  const {
    prefixId = 'spoiler-', // Default prefix for IDs in the rendered HTML
    animationDuration = '2s', // Default animation duration
    template, // Default template for the code preview
  } = options;

  return {
    name: 'spoiler',
    level: 'block',
    tokenizer(src) {
      // Match code block or inline code that should be treated as a spoiler
      const match = /^``` ?spoiler(\s+title="([^"]+)")?\n([\s\S]+?)\n```/.exec(src);

      if (match) {
        const [raw, , title, code] = match;

        // Return a token for rendering
        return {
          type: 'spoiler',
          raw,
          title, // Default title if none is provided
          code, // Raw spoiler content
          animationDuration, // Pass the animation duration
          template, // Pass the template to the renderer
        };
      }
    },
    renderer({ title, code, animationDuration }) {
      // Render the spoiler content with hover effect
      return renderSpoiler({ prefixId, title, code, animationDuration, template }, markedInstance);
    },
  };
}
