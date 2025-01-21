import { MarkedExtension, Token } from 'marked';
import type { marked } from 'marked';

// Declaration for the options object that will be passed to the createSpoilerEffect function
export interface SpoilerOptions {
  animationDuration?: string;  // Optional, default '0.3s'
  customizeToken?: (token: Token) => void;  // Optional, function to customize tokens
}

// Function to create spoiler effect extensions
export default function markedExtendedSpoiler(options?: SpoilerOptions, marked?: marked): MarkedExtension;
