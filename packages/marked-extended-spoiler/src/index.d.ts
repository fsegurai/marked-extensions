import { MarkedExtension, Token } from 'marked';
import type { marked } from 'marked';

// Declaration for the options object that will be passed to the createSpoilerEffect function
export interface SpoilerOptions {
  prefixId?: string;  // Optional, default 'spoiler-'
  animationDuration?: string;  // Optional, default '2s'
  template?: string;  // Optional, default 'Some template to modify the preview'
  customizeToken?: (token: Token) => void;  // Optional, function to customize tokens
}

// Function to create spoiler effect extensions
export default function markedExtendedSpoiler(options?: SpoilerOptions, marked?: marked): MarkedExtension;
