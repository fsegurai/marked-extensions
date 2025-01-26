// Import necessary types from 'marked'
import { MarkedExtension } from 'marked';

// Extending the 'Marked' interface to include `use` method with correct options type
declare module 'marked' {
  interface MarkedStatic {
    use(extension: () => MarkedExtension): this;
  }
}

// Extending Jest to include your custom matchers (e.g., toContainSubstring)
import '@jest/globals';

declare module '@jest/globals' {
  interface Matchers<R> {
    toContainSubstring(expected: string): R;
  }
}
