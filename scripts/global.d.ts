// Type definitions for demo playground

import type { TaskListMetadata } from '@fsegurai/marked-extended-lists';

declare global {
  interface Window {
    updateMarkdownFromCheckbox?: (checkboxId: string, checked: boolean, metadata?: TaskListMetadata) => void;
  }
}

export {};

