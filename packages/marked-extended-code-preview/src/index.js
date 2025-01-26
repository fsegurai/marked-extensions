'use strict';

import { createCodePreview } from './tokenizer.js';

export default function(options = {}, markedInstance = null) {
  // Pass the options to the extension for more flexibility
  return {
    extensions: [
      createCodePreview(options, markedInstance),
    ],
    walkTokens(token) {
      // Example: Add custom handling or logging of the tokens
      if (token.type !== 'codePreview') return;

      // Modify the token based on the passed options if necessary
      if (options.customizeToken) {
        token.title = options.customizeToken(token.title);
        token.extraData = options.customizeToken(token.extraData);
      }
    },
  };
}