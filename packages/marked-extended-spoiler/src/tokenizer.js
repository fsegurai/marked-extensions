'use strict';

import { renderSpoiler } from './renderer.js';

/**
 * Create a spoiler effect for the Markdown parser.
 * @param options - The options for the spoiler effect
 * @param marked - The marked instance for rendering the content
 * @returns {{name: string, level: string, tokenizer(*): ({type: string, raw: string, title: string, code: string, animationDuration: string}|undefined), renderer({title: *, code: *, animationDuration: *}): string}|{type: string, raw: string, title: string, code: string, animationDuration: string}|string} The spoiler effect extension
 */
export function createSpoilerEffect(options = {}, marked = null) {
  // Destructure options with default values
  const {
    animationDuration = '2s', // Default animation duration
  } = options;

  return {
    name: 'spoiler',
    level: 'block',
    tokenizer(src) {
      // Match code block or inline code that should be treated as a spoiler
      const match = /^``` spoiler(\s+title="([^"]+)")?\n([\s\S]+?)\n```/.exec(src);

      if (match) {
        const [raw, , title, code] = match;

        // Return a token for rendering
        return {
          type: 'spoiler',
          raw,
          title, // Default title if none is provided
          code, // Raw spoiler content
          animationDuration, // Pass the animation duration
        };
      }
    },
    renderer({ title, code, animationDuration }) {
      // Render the spoiler content with hover effect
      return renderSpoiler({ title, code, animationDuration }, marked);
    },
  };
}
