---
label: Lists
description: Alphabetic and Roman ordered lists, start and skipped values, sanitizer-safe task checkboxes with a tasks-only mode, toggle events and list-editing helpers.
order: 9
tags: [ "extensions", "lists" ]
keywords: [ "roman numerals", "alphabetic lists", "task list", "checkbox", "attachLists" ]
---

# Lists

`@fsegurai/marked-extended-lists` replaces Marked's list tokenizer and renderer. It adds alphabetic (`a.`, `A.`) and
Roman (`i.`, `I.`) markers, `)` delimiters, start values, skipped numbers and ARIA task checkboxes. The `tasksOnly`
mode keeps Marked's lists and only replaces the task checkboxes.

## Install

```bash
npm install @fsegurai/marked-extended-lists marked
```

## Usage

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
| `tasksOnly` | `boolean` | `false` | Keep Marked's own lists and only replace task checkboxes (see below). |
| `labels` | `Partial<ListsLabels>` | `defaultListsLabels` | Accessible names of the checkboxes, shallow-merged and HTML-escaped. |
| `checkboxClass` | `string` | `undefined` | Extra classes on task checkboxes; words starting with `mx-lists-` are dropped. |
| `checkboxAriaLabel` | `boolean` | `true` | ARIA labels on checkboxes. |
| `useStartAttribute` | `boolean` | `true` | `start` on ordered lists that do not start at 1. |
| `preserveTightness` | `boolean` | `true` | Keep loose versus tight spacing. |
| `interactiveCheckboxes` | `boolean \| 'attached'` | `false` | Focusable checkboxes that carry their source position for the runtime. `'attached'`: read-only (`aria-disabled`, `mx-lists-task--attached`) until `attachLists` runs. |
| `lineOffset` | `number` | unset | Count task lines from the start of the document, plus this offset (front matter, `1` for 1-based lines). Unset: lines are relative to the list. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 `<label for><input type="checkbox" id>` markup and `data-task-list`. |
| `onCheckboxChange` | callback | | **Deprecated and ignored** (one-time warning). Use the toggle event. |

`labels` keys:

| Key | Default |
|-----|---------|
| `checked` | `'Checked task item'` |
| `unchecked` | `'Unchecked task item'` |

## Tasks-only mode

The full extension replaces Marked's list tokenizer, so it changes every list of the document. When you only want
sanitizer-safe, toggleable task checkboxes, use `tasksOnly`:

```js
marked.use(markedExtendedLists({ tasksOnly: true, interactiveCheckboxes: true }));
container.innerHTML = marked.parse('1. step\n\n- [ ] Write docs\n- [x] Ship it\n');
attachLists(container);
container.addEventListener('marked-extended:lists:toggle', (e) => save(e.detail)); // { checked, line, offset, raw, text }
```

- Every list keeps Marked's own markup, except that its `<input type="checkbox">` becomes the sanitizer-safe
  `<span class="mx-lists-task" role="checkbox" aria-checked>` (the 18.0 checkbox with `unsafeHtml`).
- With `interactiveCheckboxes`, the toggle event carries the same `line`, `offset` and `raw` as the full mode. They are
  added in `walkTokens`, so render with `marked.parse` (or `new Marked().parse`), not `Lexer` + `Parser` alone.
- `useStartAttribute` and `preserveTightness` do not apply; `checkboxClass`, `checkboxAriaLabel` and `labels` do.

## Rendered HTML

```html
<ul class="mx-lists-task-list">
  <li><span class="mx-lists-task" role="checkbox" aria-checked="false" aria-disabled="true" aria-label="Unchecked task item"></span> Open task</li>
</ul>
```

With `interactiveCheckboxes: true` the span gets `tabindex="0"` and the tokens `mx-lists-line-<n>`,
`mx-lists-offset-<n>` and `mx-lists-raw-<encoded>`.

## Sanitizer notes

The default markup survives Angular's `SecurityContext.HTML`: task checkboxes are ARIA spans drawn by `lists.css`, and
their source position travels as class tokens. Ordered lists keep `type`, `start` and `value`, which sanitizers allow.
`unsafeHtml: true` emits the 18.0 `<label for><input type="checkbox" id data-*>` and `data-task-list`, which strict
sanitizers remove.

## CSS classes

Lists style native elements; classes are added only to task lists.

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-lists-task-list` | `ul` | Unordered task list (`data-task-list` with `unsafeHtml`). |
| `mx-lists-task` | `span[role=checkbox]` | Task checkbox. |
| `mx-lists-line-*`, `mx-lists-offset-*`, `mx-lists-raw-*` | checkbox | Class tokens read by `attachLists`. |

## CSS custom properties

| Property | Default |
|----------|---------|
| `--mx-lists-margin`, `--mx-lists-nested-margin`, `--mx-lists-item-margin` | `1rem 0`, `0.5rem 0`, `0.25rem 0` |
| `--mx-lists-line-height` | `1.6` |
| `--mx-lists-marker-color`, `--mx-lists-marker-weight` | `#495057`, `600` |
| `--mx-lists-ordered-padding`, `--mx-lists-ordered-padding-alpha`, `--mx-lists-ordered-padding-roman` | `2rem`, `2.5rem`, `3rem` |
| `--mx-lists-checkbox-size`, `--mx-lists-checkbox-radius` | `1rem`, `3px` |
| `--mx-lists-checkbox-accent`, `--mx-lists-checkbox-check-color`, `--mx-lists-checkbox-focus` | `#0066cc`, `#ffffff`, `#0066cc` |
| `--mx-lists-completed-color`, `--mx-lists-completed-opacity` | `#6c757d`, `0.7` |
| `--mx-lists-task-item-margin` | `0.5rem 0` |
| `--mx-lists-task-hover-bg`, `--mx-lists-task-hover-padding-right`, `--mx-lists-task-hover-radius` | `rgba(0, 0, 0, 0.02)`, `0.5rem`, `4px` |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-lists/styles/lists.css` | Task checkbox drawing (`.mx-lists-task`) and list styles. |
| `@fsegurai/marked-extended-lists/styles/lists-theme.css` | Optional theme (`body.dark` switches it). |

## Runtime

`attachLists(root, options?)` handles click, Space and Enter on interactive checkboxes and returns a `dispose`
function.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `editing` | `boolean` | `false` | Also make the list items editable (Enter splits, Tab / Shift+Tab indent and outdent). Needs an `HTMLElement` root. |
| `onEdit` | `(detail: ListEditDetail) => void` | none | Called after each edit when `editing` is set. |
| `labels` | `Partial<ListsLabels>` | `defaultListsLabels` | Accessible names set on toggled and added checkboxes; pass the extension's labels. |
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

## Exported constants

| Export | Value |
|--------|-------|
| `LIST_TYPES` | `['1', 'a', 'A', 'i', 'I']`: ordered list types of the full mode. |
| `defaultListsLabels` | `{ checked: 'Checked task item', unchecked: 'Unchecked task item' }`. |

Both are frozen.

## Changes in 18.1.0

- Unordered task lists get the `mx-lists-task-list` class instead of the `data-task-list` attribute.
- Custom properties renamed from `--marked-lists-*` to `--mx-lists-*`.
- New `tasksOnly` mode, `labels` option (extension and runtime), `defaultListsLabels` and `LIST_TYPES`.
- **Breaking:** list boundaries and looseness follow Marked: a paragraph after a blank line no
  longer joins the last item, a blank line inside an item makes the list loose (paragraphs), and a new bullet
  character starts a new list. Review stored HTML and list CSS.
- `interactiveCheckboxes: 'attached'` and `lineOffset`; a toggle keeps an `aria-label` the host set on the box.

## Next step

- [Examples: editable content](../examples/editable-content.md)
