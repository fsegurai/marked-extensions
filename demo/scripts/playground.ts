import type { ListsToggleDetail } from '../../packages/bundle/src/index';
import { enableSourceListEditing } from '../../packages/bundle/src/index';
import { syncKanbanMoves } from './utils/kanban-sync';
import { mdRender, updateCheckboxInMarkdown } from './utils/markdown';
import mdSample from './utils/markdown.example';

type MarkdownEditorElement = HTMLElement & { value: string };

const editor = document.querySelector('#md-editor') as MarkdownEditorElement | null;
const body = document.querySelector('#md-body') as HTMLElement | null;
const loadingSpinner = document.querySelector('#loadingSpinner') as HTMLElement | null;
const copyMarkdownButton = document.querySelector('#copyMarkdown') as HTMLElement | null;
const clearEditorButton = document.querySelector('#clearEditor') as HTMLElement | null;
const resetExampleButton = document.querySelector('#resetExample') as HTMLElement | null;
const copyHtmlButton = document.querySelector('#copyHtml') as HTMLElement | null;

const FEEDBACK_DURATION = 2000;

const render = (): void => {
  if (!editor || !body) return;
  mdRender(editor.value, body);
};

const setContent = (markdown: string): void => {
  if (!editor) return;

  editor.value = markdown;
  render();
};

const hideSpinner = (): void => {
  if (!loadingSpinner) return;

  loadingSpinner.classList.add('hidden');
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
  }, 300);
};

const showCopyFeedback = (button: HTMLElement | null, iconName: string): void => {
  if (!button) return;

  const icon = button.querySelector('md-icon');
  if (!icon) return;

  const previous = icon.textContent;
  icon.textContent = iconName;

  setTimeout(() => {
    icon.textContent = previous;
  }, FEEDBACK_DURATION);
};

const copyText = async (text: string, button: HTMLElement | null): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    showCopyFeedback(button, 'check');
  } catch (err) {
    console.error('Failed to copy:', err);
    showCopyFeedback(button, 'error');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (!editor || !body) {
    console.error('Required DOM elements not found');
    return;
  }

  setContent(mdSample);

  setTimeout(() => {
    hideSpinner();
  }, 300);

  editor.addEventListener('input', () => {
    render();
  });

  // Wire source-level list editing (Enter to continue/break, Tab indent/outdent)
  const textarea = editor.shadowRoot?.querySelector('textarea');
  if (textarea) {
    enableSourceListEditing(textarea);
  }

  copyMarkdownButton?.addEventListener('click', () => {
    void copyText(editor.value, copyMarkdownButton);
  });

  copyHtmlButton?.addEventListener('click', () => {
    void copyText(body.innerHTML, copyHtmlButton);
  });

  clearEditorButton?.addEventListener('click', () => {
    setContent('');
  });

  resetExampleButton?.addEventListener('click', () => {
    setContent(mdSample);
  });
});

// Task checkbox toggles bubble from the rendered container (attachLists, see utils/markdown.ts).
body?.addEventListener('marked-extended:lists:toggle', (event) => {
  if (!editor) return;
  const { checked, raw } = (event as CustomEvent<ListsToggleDetail>).detail;

  const currentMarkdown = editor.value;
  const updatedMarkdown = updateCheckboxInMarkdown(currentMarkdown, raw, checked);

  if (updatedMarkdown !== currentMarkdown) {
    editor.value = updatedMarkdown;
    render();
  }
});

// Kanban card moves bubble from the rendered container (attachKanban, see utils/markdown.ts).
// The cancelable event fires before the card moves: the sync waits for every listener and skips cancelled moves.
if (body && editor) {
  syncKanbanMoves(body, {
    get: () => editor.value,
    set: (markdown) => {
      editor.value = markdown;
      render();
    },
  });
}
