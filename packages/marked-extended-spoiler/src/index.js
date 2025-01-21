'use strict';

import { createSpoilerEffect } from './tokenizer.js';

export default function(options = {}, marked = null) {
  // Pass the options to the extension for more flexibility
  return {
    extensions: [
      createSpoilerEffect(options, marked),
    ],
  };
}
