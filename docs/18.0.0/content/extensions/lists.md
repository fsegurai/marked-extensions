---
label: Lists
description: Alphabetic and Roman ordered lists, start and skipped values, accessible task checkboxes, a delegated checkbox callback and list-editing helpers.
order: 7
tags: [ "extensions", "lists" ]
keywords: [ "roman numerals", "alphabetic lists", "task list", "checkbox", "enableListsEditing" ]
---

# Lists

`@fsegurai/marked-extended-lists` replaces Marked's list tokenizer and renderer. It adds alphabetic (`a.`, `A.`) and
Roman (`ii.`, `IV.`) markers, `)` delimiters, start values, skipped numbers and accessible task checkboxes. Numbering
needs no JavaScript; interactive checkboxes and editing helpers do.

## Quick path

```bash
npm install @fsegurai/marked-extended-lists marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedLists from '@fsegurai/marked-extended-lists';
import '@fsegurai/marked-extended-lists/styles/lists.css';
import '@fsegurai/marked-extended-lists/styles/lists-theme.css';

marked.use(markedExtendedLists({
  interactiveCheckboxes: true,
  onCheckboxChange: (id, checked, { line, offset, rawText }) => save(line, checked),
}));
container.innerHTML = marked.parse(markdown);
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

- [ ] Open task
- [x] Done task
```

| Marker | List type | Notes |
|--------|-----------|-------|
| `1.` `1)` | numeric | Up to 9 digits. |
| `a.` `A.` | alphabetic | Any single letter except `i`/`I` sets the start (`c.` starts at 3). |
| `i.` `ii.` `IV.` | Roman | A single `i`/`I` starts a Roman list; multi-letter Roman numerals (up to `C`) also do. |

- Ordered lists render `type` (non-numeric), `start` (when greater than 1) and `value` on skipped items.
- Changing the delimiter (`.` to `)`) starts a new list.

## Options

`markedExtendedLists(options?: ListsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `checkboxClass` | `string` | `''` | Extra class on task checkboxes. |
| `checkboxAriaLabel` | `boolean` | `true` | `aria-label` on checkboxes (`Checked task item` / `Unchecked task item`). |
| `useStartAttribute` | `boolean` | `true` | `start` on ordered lists that do not start at 1. |
| `preserveTightness` | `boolean` | `true` | Keep tight versus loose spacing; `false` renders every item as loose. |
| `interactiveCheckboxes` | `boolean` | `false` | Enabled checkboxes with source-position `data-*` and a delegated change listener. |
| `onCheckboxChange` | `(checkboxId: string, checked: boolean, metadata?: TaskListMetadata) => void` | `undefined` | Called on toggle; `metadata` is `{ line?, offset?, rawText? }`. |

## Rendered HTML

```html
<ul data-task-list="">
<li><label for="task-checkbox-1"><input type="checkbox" id="task-checkbox-1" disabled aria-label="Unchecked task item"></label> Open task</li>
</ul>
<ol type="a" start="3">
<li>…</li>
</ol>
```

With `interactiveCheckboxes: true` the input drops `disabled` and gains `data-raw`, `data-line`, `data-offset` and
`data-task-checkbox=""`. Checkbox ids come from a module-level counter, so they keep increasing across parses.

## Browser behavior

| Item | Behavior |
|------|----------|
| Globals | With `interactiveCheckboxes`, the factory sets `window.markedListsCallback = onCheckboxChange` and `window.__markedListsListenerSetup = true`. |
| Global listener | One delegated `document` `change` listener for `input[data-task-checkbox]`; it calls `window.markedListsCallback(id, checked, { rawText, line, offset })`. |
| Inline handlers, injected `<script>`/`<style>`, events | None. |

The callback is global: the last factory call with `interactiveCheckboxes` wins.

## Helpers

| Export | Signature | Use |
|--------|-----------|-----|
| `enableListsEditing` | `(root: HTMLElement, options?: ListsEditingOptions) => () => void` | Makes `li` elements `contenteditable`; Enter splits, Tab / Shift+Tab indent and outdent. `onEdit(detail)` gets `{ type, li, root }`. |
| `indentListItem`, `outdentListItem`, `removeListItem` | `(li: HTMLLIElement) => void` | DOM list edits. |
| `getListMarkdown` | `(element: HTMLElement) => string` | Serialize rendered lists back to Markdown. |
| `enableSourceListEditing` | `(textarea: HTMLTextAreaElement) => () => void` | List continuation and indent in a Markdown `<textarea>`. |
| `applyListEnter` | `(text, cursorPos) => { text, cursorPos }` | Pure Enter handling for list lines. |
| `applyListTab` | `(text, selectionStart, selectionEnd, shiftKey) => { text, selectionStart, selectionEnd }` | Pure indent / outdent. |
| `detectListPrefix` | `(line: string) => ListPrefix \| null` | Parse a list marker. |
| `intToLetter`, `letterToInt`, `intToRoman`, `romanToInt` | number and string converters | Marker arithmetic. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-lists/styles/lists.css` | List and task checkbox layout (`[data-task-list]`). |
| `@fsegurai/marked-extended-lists/styles/lists-theme.css` | Optional theme. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Styling guide](../guides/styling.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
