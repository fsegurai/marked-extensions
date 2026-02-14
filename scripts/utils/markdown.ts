import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedComments from '@fsegurai/marked-extended-comments';
import markedExtendedEmbeds from '@fsegurai/marked-extended-embeds';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import markedExtendedKanban from '@fsegurai/marked-extended-kanban';
import markedExtendedLists from '@fsegurai/marked-extended-lists';
import markedExtendedSlide from '@fsegurai/marked-extended-slide';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import markedExtendedTimeline from '@fsegurai/marked-extended-timeline';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';


import prismjs from 'prismjs';
import ClipboardJS from 'clipboard';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

const extensions = [
  markedExtendedAccordion({}),
  markedExtendedAlert({}),
  markedExtendedComments({}),
  markedExtendedEmbeds({}),
  markedExtendedFootnote({
    refMarkers: true, // Show [1] instead of just 1
    labelFormat: (id, number) => {
      const icons = {
        source: '📚',
        note: '📝',
        warning: '⚠️',
        explanation: '💡',
      };
      return id in icons ? icons[id as keyof typeof icons] : number; // [number / id]
    },
  }),
  markedExtendedKanban({}),
  markedExtendedLists({
    interactiveCheckboxes: true,
    onCheckboxChange: (checkboxId, checked, metadata) => {
      console.log('Checkbox toggled:', checkboxId, checked, metadata);

      // Call the global update function from playground.ts
      if (window.updateMarkdownFromCheckbox) {
        window.updateMarkdownFromCheckbox(checkboxId, checked, metadata);
      }
    },
  }),
  markedExtendedSlide({}),
  markedExtendedSpoiler({}),
  markedExtendedTables({}),
  markedExtendedTabs({}),
  markedExtendedTimeline({}),
  markedExtendedTypographic({}),
  markedHighlight({
    emptyLangClass: 'language-plaintext',
    langPrefix: 'language-',
    highlight(code, lang) {
      const language = prismjs.languages[lang] ? lang : 'plaintext';
      return prismjs.highlight(code, prismjs.languages[language], language);
    },
  }),
];

marked.use(...extensions, {
  gfm: true,
  breaks: false,
  pedantic: false,
  renderer: {
    link({ href, title, text }) {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    },
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/\W+/g, '-');
      return `
          <h${depth}>
            <a class="anchor" href="#${escapedText}">
              <span class="header-link"></span>
            </a>
            ${text}
          </h${depth}>`;
    },
  },
});

export const mdRender = (md: string, mdBody: HTMLElement | null) => {
  if (!mdBody) return;

  mdBody.innerHTML = marked.parse(md) as string;
  insertCopyElement();
};

/**
 * Updates checkbox state in Markdown source
 * Handles duplicate task names by matching both content and current checked state
 * @param markdown - The current Markdown text
 * @param rawText - The raw text of the list item to update
 * @param checked - The new checked state (what it should become)
 * @returns Updated Markdown with checkbox state changed
 */
export const updateCheckboxInMarkdown = (markdown: string, rawText: string | undefined, checked: boolean): string => {
  if (!rawText) return markdown;

  // Only trim trailing whitespace/newlines, preserve leading indentation
  const cleanRawText = rawText.replace(/\s+$/, '');

  // Extract indentation BEFORE any other processing
  const indentMatch = cleanRawText.match(/^(\s*)-/);
  const rawIndentString = indentMatch ? indentMatch[1] : '';
  const rawIndentDepth = rawIndentString.replace(/\t/g, '    ').length;

  // Extract the task text and current checkbox state from rawText
  // Use non-greedy regex to stop at the next checkbox (if present on the same line)
  const taskMatch = cleanRawText.match(/- \[([ xX])] (.+?)(?=\s+-\s*\[[ xX]]|$)/);
  if (!taskMatch) return markdown;

  const oldCheckboxState = taskMatch[1]; // ' ', 'x', or 'X'
  const taskText = taskMatch[2].trim();
  const wasChecked = oldCheckboxState.toLowerCase() === 'x';

  // Find the exact line with this task text, matching state, and indentation
  const lines = markdown.split('\n');
  let matchCount = 0;
  let updateIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line is a task list item
    const lineTaskMatch = line.match(/^(\s*)- \[([ xX])] (.+)$/);

    if (lineTaskMatch) {
      const [, indentation, currentState, lineTaskText] = lineTaskMatch;
      const lineChecked = currentState.toLowerCase() === 'x';
      const lineIndentDepth = indentation.replace(/\t/g, '    ').length;

      // Match by: task text, indentation depth (flexible), and current checked state
      if (lineTaskText.trim() === taskText
          && lineIndentDepth === rawIndentDepth
          && lineChecked === wasChecked) {
        
        // For duplicate tasks, we want the first unupdated match
        if (updateIndex === -1) updateIndex = i;
        matchCount++;
      }
    }
  }

  // Update the matched line
  if (updateIndex !== -1) {
    const line = lines[updateIndex];
    const lineTaskMatch = line.match(/^(\s*)- \[([ xX])] (.+)$/);

    if (lineTaskMatch) {
      const [, indentation, , lineTaskText] = lineTaskMatch;
      const newCheckbox = checked ? 'x' : ' ';
      lines[updateIndex] = `${indentation}- [${newCheckbox}] ${lineTaskText}`;

      // Log warning if duplicates detected
      if (matchCount > 1) {
        console.warn(`[Checkbox Update] Found ${matchCount} tasks with text "${taskText}". Updated the first match.`);
      }

      return lines.join('\n');
    }
  }

  // Fallback: If the exact indentation match failed, try matching by text and state only
  // This handles cases where tokenizer indentation doesn't match source indentation
  console.warn(`[Checkbox Update] No exact match found. Trying fallback match for: "${taskText}"`);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineTaskMatch = line.match(/^(\s*)- \[([ xX])] (.+)$/);

    if (lineTaskMatch) {
      const [, indentation, currentState, lineTaskText] = lineTaskMatch;
      const lineChecked = currentState.toLowerCase() === 'x';

      // Match only by text and state (ignore indentation)
      if (lineTaskText.trim() === taskText && lineChecked === wasChecked) {
        console.log(`[Checkbox Update] Fallback match found at line ${i}`);
        const newCheckbox = checked ? 'x' : ' ';
        lines[i] = `${indentation}- [${newCheckbox}] ${lineTaskText}`;
        return lines.join('\n');
      }
    }
  }

  console.warn(`[Checkbox Update] Could not find matching task for: "${taskText}"`);
  return markdown;
};

const insertCopyElement = () => {
  document.querySelectorAll('pre').forEach((pre) => {
    // Skip if already has a copy button
    if (pre.querySelector('.copy-btn')) return;

    // Get the code element
    const codeElement = pre.querySelector('code');
    const codeText = codeElement?.textContent || pre.textContent || '';

    // Detect language from class
    let language = 'plaintext';
    if (codeElement) {
      const classList = Array.from(codeElement.classList);
      const langClass = classList.find(cls => cls.startsWith('language-'));
      if (langClass) {
        language = langClass.replace('language-', '');
      }
    }

    // Create a toolbar container
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    // Create a language label
    if (language !== 'plaintext') {
      const langLabel = document.createElement('span');
      langLabel.className = 'code-language-label';
      langLabel.textContent = language.toUpperCase();
      langLabel.setAttribute('aria-label', `Code language: ${language}`);
      toolbar.appendChild(langLabel);
    }

    // Create a copy button
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
        <path d="M2 6h1v6H2V6z"/>
      </svg>
      <span>Copy</span>
    `;
    button.setAttribute('data-clipboard-text', codeText);
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.setAttribute('type', 'button');

    toolbar.appendChild(button);
    pre.appendChild(toolbar);
  });

  // Initialize ClipboardJS with success/error callbacks
  const clipboard = new ClipboardJS('.copy-btn');

  clipboard.on('success', (e) => {
    const button = e.trigger as HTMLElement;
    showCopySuccess(button);
    e.clearSelection();
  });

  clipboard.on('error', (e) => {
    const button = e.trigger as HTMLElement;
    console.error('Copy failed:', e);
    showCopyError(button);
  });
};

/**
 * Show success state on copy button
 */
function showCopySuccess(button: HTMLElement): void {
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
    </svg>
    <span>Copied!</span>
  `;
  button.classList.add('copied');

  setTimeout(() => {
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
        <path d="M2 6h1v6H2V6z"/>
      </svg>
      <span>Copy</span>
    `;
    button.classList.remove('copied');
  }, 2000);
}

/**
 * Show error state on copy button
 */
function showCopyError(button: HTMLElement): void {
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM7 11V7h2v4H7zm0-6V3h2v2H7z"/>
    </svg>
    <span>Failed</span>
  `;

  setTimeout(() => {
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
        <path d="M2 6h1v6H2V6z"/>
      </svg>
      <span>Copy</span>
    `;
  }, 2000);
}

