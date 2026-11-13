---
label: Lists
description: Alphabetic and Roman ordered lists, start and skipped values, sanitizer-safe task checkboxes, toggle events and list-editing helpers.
order: 8
tags: [ "extensions", "lists" ]
keywords: [ "roman numerals", "alphabetic lists", "task list", "checkbox", "attachLists" ]
---

# Lists

`@fsegurai/marked-extended-lists` replaces Marked's list tokenizer and renderer. It adds alphabetic (`a.`, `A.`) and
Roman (`i.`, `I.`) markers, `)` delimiters, start values, skipped numbers and ARIA task checkboxes.

## Quick path

```bash
npm install @fsegurai/marked-extended-lists marked
```

```js
import { marked } from 'marked';
import markedExtendedLists, { attachLists } from '@fsegurai/marked-extended-lists';
import '@fsegurai/marked-extended-lists/styles/lists.css'; // draws the task checkboxes

marked.use(markedExtendedLists({ interactiveCheckboxes: true }));
container.innerHTML = marked.parse(markdown);
const dispose = attachLists(container);
container.addEventListener('marked-extended:lists:toggle', (e) => save(e.detail));
```

## Syntax

```markdown
1. Numeric
   a. Lowercase letters
      i. Lowercase Roman
      ii. Second Roman item
   b. Back to letters
2. Back to numeric

a) A parenthesis delimiter works too

I. Uppercase Roman
II. Second

1. First item
3. Third item (skipped 2)

5. Start from five
6. Continues

- [ ] Open task
- [x] Done task
```

Changing the delimiter (`.` to `)`) starts a new list, as in CommonMark. Ordered lists render `type`, `start` and
per-item `value` attributes. Sanitizers keep them, so numbering needs no
runtime.

## Options

`markedExtendedLists(options?: ListsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `checkboxClass` | `string` | `''` | Extra class on task checkboxes. |
| `checkboxAriaLabel` | `boolean` | `true` | ARIA labels on checkboxes. |
| `useStartAttribute` | `boolean` | `true` | `start` on ordered lists that do not start at 1. |
| `preserveTightness` | `boolean` | `true` | Keep loose versus tight spacing. |
| `interactiveCheckboxes` | `boolean` | `false` | Focusable checkboxes that carry their source position for the runtime. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 `<label for><input type="checkbox" id>` markup and `data-task-list`. |
| `onCheckboxChange` | callback | | **Deprecated and ignored** (one-time warning). Use the toggle event. |

## Rendered HTML

```html
<ul class="mx-lists-taskList">
  <li><span class="mx-lists-task" role="checkbox" aria-checked="false" aria-disabled="true" aria-label="Unchecked task item"></span> Open task</li>
</ul>
```

With `interactiveCheckboxes: true` the span gets `tabindex="0"` and the tokens `mx-lists-line-<n>`,
`mx-lists-offset-<n>` and `mx-lists-raw-<encoded>`.

## Runtime

`attachLists(root, options?)` handles click, Space and Enter on interactive checkboxes.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `editing` | `boolean` | `false` | Also make the list items editable (Enter splits, Tab / Shift+Tab indent and outdent). Needs an `HTMLElement` root. |
| `onEdit` | `(detail: ListEditDetail) => void` | none | Called after each edit when `editing` is set. |
| `observe` | `boolean` | `false` | Shared option; toggling is delegated, so refresh is a no-op. |

Event: `marked-extended:lists:toggle` (cancelable; `preventDefault()` reverts the toggle) with
`detail: { checked, line?, offset?, raw?, text }`.

## Helpers

| Export | Signature | Use |
|--------|-----------|-----|
| `enableListsEditing` | `(root: HTMLElement, options?: ListsEditingOptions) => () => void` | Editable rendered lists. |
| `indentListItem`, `outdentListItem`, `removeListItem` | `(li: HTMLLIElement) => void` | DOM list edits. |
| `getListMarkdown` | `(element: HTMLElement) => string` | Serialize rendered lists back to Markdown. |
| `enableSourceListEditing` | `(textarea: HTMLTextAreaElement) => () => void` | List continuation in a Markdown `<textarea>`. |
| `applyListEnter` | `(text, cursorPos) => { text, cursorPos }` | Pure Enter handling for list lines. |
| `applyListTab` | `(text, selectionStart, selectionEnd, shiftKey) => { text, selectionStart, selectionEnd }` | Pure indent / outdent. |
| `detectListPrefix` | `(line: string) => ListPrefix \| null` | Parse a list marker. |
| `intToLetter`, `letterToInt`, `intToRoman`, `romanToInt` | number and string converters | Marker arithmetic. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-lists/styles/lists.css` | Task checkbox drawing (`.mx-lists-task`) and list styles. |
| `@fsegurai/marked-extended-lists/styles/lists-theme.css` | Optional theme. |

## Next step

- [Examples: editable content](../examples/editable-content.md)
