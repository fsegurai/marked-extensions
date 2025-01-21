import { MarkedExtension, Token } from 'marked';
import type { marked } from 'marked';

// Declaration for the options object that will be passed to the createSpoilerEffect function
export interface SpoilerOptions {
  animationDuration?: string;  // Optional, default '0.3s'
  customizeToken?: (token: Token) => void;  // Optional, function to customize tokens
}

// Declaration for the return type of `createSpoilerEffect` function
export interface SpoilerExtension {
  extensions: string[];  // List of extensions
  walkTokens: (token: Token) => void;  // Function to walk tokens
}

// Function to create spoiler effect extensions
export default function markedExtendedSpoiler(options?: SpoilerOptions, marked?: marked): MarkedExtension;
