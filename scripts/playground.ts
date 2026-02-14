import { mdRender, updateCheckboxInMarkdown } from './utils/markdown';
import type { TaskListMetadata } from '@fsegurai/marked-extended-lists';

import mdSample from './utils/markdown.example';

const mdEditor = document.querySelector('.md-editor') as HTMLTextAreaElement;
const mdBody = document.querySelector('.md-body') as HTMLElement;
const loadingSpinner = document.querySelector('#loadingSpinner') as HTMLElement;
const copyMarkdownBtn = document.querySelector('#copyMarkdown') as HTMLElement;
const clearEditorBtn = document.querySelector('#clearEditor') as HTMLElement;
const resetExampleBtn = document.querySelector('#resetExample') as HTMLElement;
const copyHtmlBtn = document.querySelector('#copyHtml') as HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
  if (mdEditor && mdBody) {
    // Insert content from the example into the textarea
    mdEditor.value = mdSample;
    mdRender(mdSample, mdBody);

    // Hide loading spinner after initial render
    setTimeout(() => {
      if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
        setTimeout(() => {
          loadingSpinner.style.display = 'none';
        }, 300);
      }
    }, 300);

    // Watch the textarea for changes
    mdEditor.addEventListener('input', () => {
      mdRender(mdEditor.value || '', mdBody);
    });
  }

  // Copy Markdown button
  if (copyMarkdownBtn) {
    copyMarkdownBtn.addEventListener('click', async() => {
      if (mdEditor) {
        try {
          await navigator.clipboard.writeText(mdEditor.value);

          // Visual feedback
          const icon = copyMarkdownBtn.querySelector('md-icon');
          if (icon) {
            const originalText = icon.textContent;
            icon.textContent = 'check';
            setTimeout(() => {
              icon.textContent = originalText;
            }, 2000);
          }
        } catch (err) {
          console.error('Failed to copy markdown:', err);
        }
      }
    });
  }

  // Clear editor button
  if (clearEditorBtn) {
    clearEditorBtn.addEventListener('click', () => {
      if (mdEditor) {
        mdEditor.value = '';
        mdRender('', mdBody);
      }
    });
  }

  // Reset to example button
  if (resetExampleBtn) {
    resetExampleBtn.addEventListener('click', () => {
      if (mdEditor) {
        mdEditor.value = mdSample;
        mdRender(mdSample, mdBody);
      }
    });
  }

  // Copy HTML button
  if (copyHtmlBtn) {
    copyHtmlBtn.addEventListener('click', async() => {
      if (mdBody) {
        try {
          await navigator.clipboard.writeText(mdBody.innerHTML);

          // Visual feedback
          const icon = copyHtmlBtn.querySelector('md-icon');
          if (icon) {
            const originalText = icon.textContent;
            icon.textContent = 'check';
            setTimeout(() => {
              icon.textContent = originalText;
            }, 2000);
          }
        } catch (err) {
          console.error('Failed to copy HTML:', err);
        }
      }
    });
  }
});

// Export function to update Markdown from checkbox changes
window.updateMarkdownFromCheckbox = (checkboxId: string, checked: boolean, metadata?: TaskListMetadata) => {
  console.log('[Checkbox Update] Called with:', {
    checkboxId,
    checked,
    hasMetadata: !!metadata,
    rawText: metadata?.rawText,
  });

  if (!mdEditor || !mdBody) {
    console.error('[Checkbox Update] Editor or body not found');
    return;
  }

  const currentMarkdown = mdEditor.value;

  const updatedMarkdown = updateCheckboxInMarkdown(currentMarkdown, metadata?.rawText, checked);

  if (updatedMarkdown !== currentMarkdown) {

    // Update the textarea
    mdEditor.value = updatedMarkdown;

    // Re-render the Markdown (this will recreate checkboxes with new IDs)
    mdRender(updatedMarkdown, mdBody);
  } else {
    console.warn('[Checkbox Update] No changes detected');
  }
};

