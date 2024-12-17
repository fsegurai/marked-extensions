import { createCodePreview } from './tokenizer.js';
import { expandPanel } from './eventListener.js';

export function markedExtendedCodePreview(options = {}) {
  // Pass the options to the extension for more flexibility
  return {
    extensions: [
      createCodePreview(options),
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

export { expandPanel };
