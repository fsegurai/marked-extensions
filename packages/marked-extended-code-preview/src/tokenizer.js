import { renderCodePreview } from './renderer.js';
import { DEFAULT_TEMPLATE } from './constants.js';

export function createCodePreview(options = {}) {
  // Destructure options with default values
  const {
    prefixId = 'code-preview-', // Default prefix for IDs in the rendered HTML
    template = DEFAULT_TEMPLATE, // Default template for the code preview
  } = options;

  return {
    name: 'codePreview',
    level: 'block',
    tokenizer(src) {
      // Updated regex to match code preview block with multiple attributes including codeLanguage
      const match =
        /^``` ecp preview(\s+title="([^"]+)")?(\s+extraData="([^"]+)")?(\s+elementType="([^"]+)")?(\s+codeLanguage="([^"]+)")?\n([\s\S]+?)\n```/.exec(
          src,
        );

      if (match) {
        const [raw, , title, , extraData, , elementType, , codeLanguage, code] = match;

        // Return the token with modifications from the options
        return {
          type: 'codePreview',
          raw,
          title: title || 'Untitled', // Default title if none is provided
          extraData: extraData || '', // Default extraData if none is provided
          code, // Raw code within the preview block
          elementType: elementType || 'code', // Default to 'code' if elementType is missing
          template, // Pass the template to the renderer
          codeLanguage: codeLanguage || '', // Default code language if none is provided
        };
      }
    },
    renderer({ title, code, extraData, elementType, codeLanguage }) {
      // Pass the token data to the renderCodePreview function for HTML rendering
      return renderCodePreview({ prefixId, title, code, extraData, elementType, template, codeLanguage });
    },
  };
}
