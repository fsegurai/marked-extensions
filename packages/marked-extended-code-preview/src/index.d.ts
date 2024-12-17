import { MarkedExtension, Token } from 'marked';

// Declaration for the options object that will be passed to the createCodePreview function
export interface CodePreviewOptions {
  prefixId?: string;  // Optional, default 'code-preview-'
  extraData?: string;  // Optional, default 'Some extra data to modify the preview'
  elementType?: 'code' | 'image' | 'text';  // Optional, default 'code'
  customizeToken?: (token: Token) => void;  // Optional, function to customize tokens
  template?: string;  // Optional, default 'Some template to modify the preview'
  codeLanguage?: string;  // Optional, default 'javascript'
}

// Declaration for the return type of `createCodePreview` function
export interface CodePreviewExtension {
  extensions: string[];  // List of extensions
  walkTokens: (token: Token) => void;  // Function to walk tokens
}

// Function to create code preview extensions
export function createCodePreview(options?: CodePreviewOptions): CodePreviewExtension;

// Declaration for the `expandPanel` function (assumed to be exported from another file)
export function expandPanel(): void;

// Optional: If there are additional types for the `markedExtendedCodePreview` you can add them here
declare module '@fsegurai/marked-extended-code-preview' {
  // Example for declaring a method like markedExtendedCodePreview
  export function markedExtendedCodePreview(options?: CodePreviewOptions): MarkedExtension;
}
