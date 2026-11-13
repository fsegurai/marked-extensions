---
label: Editable Content
description: Keep the Markdown source in sync with kanban card moves through applyMoveToMarkdown and with task-list toggles through the lists toggle event.
order: 4
tags: [ "examples", "editing" ]
keywords: [ "kanban sync", "task list", "applyMoveToMarkdown", "two-way binding" ]
---

# Editable Content

The runtimes never rewrite your Markdown. They dispatch events with enough detail for you to do it.

## Kanban moves

`marked-extended:kanban:move` is cancelable and fires **before** the card moves. Rewrite the source in a microtask,
after every listener ran, and only if no listener cancelled the move:

```js
import { applyMoveToMarkdown, attachKanban } from '@fsegurai/marked-extended-kanban';

let source = initialMarkdown;
container.innerHTML = marked.parse(source);
const dispose = attachKanban(container);

container.addEventListener('marked-extended:kanban:move', (event) => {
  const detail = event.detail;
  queueMicrotask(() => {
    if (event.defaultPrevented) return;
    source = applyMoveToMarkdown(source, detail);
    save(source);
  });
});
```

`applyMoveToMarkdown` locates the card by board, column and item ordinals, so attach the runtime to the element that
holds the whole rendered document: `boardIndex` counts boards inside that root. Only the affected columns change.

To block a move, cancel it:

```js
container.addEventListener('marked-extended:kanban:move', (event) => {
  if (isLocked(event.detail.toColumnIndex)) event.preventDefault();
});
```

## Task-list toggles

Render with `interactiveCheckboxes: true`, attach `attachLists`, and update the source from the toggle detail:

```js
import markedExtendedLists, { attachLists } from '@fsegurai/marked-extended-lists';

marked.use(markedExtendedLists({ interactiveCheckboxes: true }));
container.innerHTML = marked.parse(source);
attachLists(container);

container.addEventListener('marked-extended:lists:toggle', (event) => {
  const { raw, checked } = event.detail; // raw: the item's Markdown, for example "- [ ] Write docs\n"
  if (!raw) return;
  const line = raw.split('\n')[0];
  source = source.replace(line, line.replace(/\[[ xX]\]/, checked ? '[x]' : '[ ]'));
  save(source);
});
```

Call `event.preventDefault()` in a listener to revert the toggle. `line` and `offset` in the detail are positions
inside the list block that was parsed, not inside the whole document; match on `raw` when you edit the full source.
Identical items need extra disambiguation.

## Editing in a textarea

`enableSourceListEditing(textarea)` continues list markers on Enter and indents with Tab inside a Markdown
`<textarea>`. It returns a function that removes the listeners.

## Next step

- [Kanban reference](../extensions/kanban.md)
- [Lists reference](../extensions/lists.md)
