import { MarkedExtension, Token } from 'marked';
import type { marked } from 'marked';

// Declaration for the options object that will be passed to the createCodePreview function
export interface CodePreviewOptions {
  prefixId?: string; // Optional, default 'code-preview-'
  template?: string; // Optional, default 'Some template to modify the preview'
  customizeToken?: (token: Token) => void; // Optional, function to customize tokens
}

// Function to create code preview extensions
export default function markedExtendedCodePreview(options?: CodePreviewOptions, marked?: marked): MarkedExtension;
