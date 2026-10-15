---
label: Editable Content
description: Write kanban drag-and-drop moves and task-list checkbox toggles back to the Markdown source with the 18.0.0 helpers.
order: 3
tags: [ "examples", "editing" ]
keywords: [ "enableKanbanDragDrop", "applyMoveToMarkdown", "onCheckboxChange", "task lists" ]
---

# Editable Content

Kanban and lists render from Markdown, and both can report user edits so you can update that Markdown.

## Kanban moves

```js
import { Marked } from 'marked';
import markedExtendedKanban, {
  applyMoveToMarkdown,
  enableKanbanDragDrop,
} from '@fsegurai/marked-extended-kanban';
import '@fsegurai/marked-extended-kanban/styles/kanban.css';

const marked = new Marked().use(markedExtendedKanban());
let source = '```kanban\n## To Do\n- Write docs\n\n## Done\n- Ship 18.0.0\n```';

const root = document.querySelector('#board');
root.innerHTML = marked.parse(source);

const disable = enableKanbanDragDrop(root, {
  onMove: (detail) => {
    source = applyMoveToMarkdown(source, detail);
    save(source);
  },
});
```

| Piece | Role |
|-------|------|
| `enableKanbanDragDrop(root, options?)` | Native HTML5 drag and drop on every board in `root`; returns a cleanup function. |
| `onMove(detail)` / `kanban:move` event | Fired after each move with a `KanbanMoveDetail` (`taskId`, `title`, `fromColumn`, `toColumn`, `fromIndex`, `toIndex`, `boardIndex`…). The event is not cancelable. |
| `applyMoveToMarkdown(source, detail)` | Returns the source with the card moved; returns it unchanged when the indexes do not resolve. |

## Task-list toggles

```js
import markedExtendedLists from '@fsegurai/marked-extended-lists';

const marked = new Marked().use(
  markedExtendedLists({
    interactiveCheckboxes: true,
    onCheckboxChange: (checkboxId, checked, metadata) => {
      // metadata: { line?, offset?, rawText? } locates the item in the source
      source = toggleTaskAt(source, metadata?.line, checked);
    },
  }),
);
```

`toggleTaskAt` is your code: replace `[ ]` with `[x]` (or back) on that source line. For editing the rendered list
itself (split, indent, outdent, remove items) use `enableListsEditing(root, { onEdit })`, and `getListMarkdown(list)`
to serialize the edited list back to Markdown. For a `<textarea>` editor, `enableSourceListEditing(textarea)` continues
list markers on Enter and indents on Tab.

## Next step

- [Presentation](presentation.md)
