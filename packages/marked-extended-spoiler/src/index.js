'use strict';

import { createSpoilerEffect } from './tokenizer.js';

export default function(options = {}, markedInstance = null) {
  // Pass the options to the extension for more flexibility
  return {
    extensions: [
      createSpoilerEffect(options, markedInstance),
    ],
    walkTokens(token) {
      // Example: Add custom handling or logging of the tokens
      if (token.type !== 'spoilerEffect') return;

      // Modify the token based on the passed options if necessary
      if (options.customizeToken) {
        token.title = options.customizeToken(token.title);
        token.extraData = options.customizeToken(token.extraData);
      }
    },
  };
}
