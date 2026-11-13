---
label: Kanban
description: Kanban boards from fenced kanban blocks, with board, table and list views, WIP limits, card metadata, drag and drop and keyboard moves.
order: 7
tags: [ "extensions", "kanban" ]
keywords: [ "board", "cards", "columns", "drag and drop", "attachKanban", "applyMoveToMarkdown" ]
---

# Kanban

`@fsegurai/marked-extended-kanban` renders a fenced `kanban` block as a board. Every view is in the markup and the
initial one is selected with CSS, so it works without JavaScript; `attachKanban` adds view switching, drag and drop
and keyboard moves.

## Quick path

```bash
npm install @fsegurai/marked-extended-kanban marked
```

```js
import { marked } from 'marked';
import markedExtendedKanban, { attachKanban } from '@fsegurai/marked-extended-kanban';
import '@fsegurai/marked-extended-kanban/styles/kanban.css'; // required for views

marked.use(markedExtendedKanban());
container.innerHTML = marked.parse(markdown);
const dispose = attachKanban(container);
```

## Syntax

````markdown
```kanban
view: board
class: sprint-board
data-team: frontend
---
## To Do {color: #3498db}
- Write documentation
  Complete API reference guide
  @alice !high due:2025-03-01 #docs

## In Progress {color: #f39c12, wip: 3}
- Implement auth

## Archive {collapsed}
- Old task
```
````

| Board key | Default | Description |
|-----------|---------|-------------|
| `view` | `defaultView` option | `board`, `table` or `list`. |
| `class` | none | Extra classes on the board. |
| `data-*` | none | Custom data values. |

Front matter is optional and ends with a lone `---` before the first `##` heading.

| Column attribute | Description |
|------------------|-------------|
| `color` | Header accent (hex, `rgb()`, `hsl()`, named). Unsafe values are ignored. |
| `wip` | Work-in-progress limit; the header shows `count / limit` and flags overflow. |
| `collapsed` | Start folded (native `<details>`). |

Cards are list items: the first line is the title, indented lines are the description (Markdown). Metadata chips:
`@assignee`, `!high` / `!medium` / `!low`, `due:<value>`, `#tag`.

## Options

`markedExtendedKanban(options?: KanbanOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-kanban'` | Base CSS class. |
| `defaultView` | `'board' \| 'table' \| 'list'` | `'board'` | Initial view; invalid values fall back to `board` with a warning. |
| `showTaskCount` | `boolean` | `true` | Show the card count per column. |
| `template` | `string \| null` | `null` | Custom template (supports `{tokenClasses}`). |
| `customizeToken` | `(token: KanbanToken) => void \| null` | `null` | Mutates each board token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-*`, `style`, `<button>`, `draggable`, JSON view store), without `onclick`. |
| `onMove` | | | **Ignored** since 19 (one-time warning). Use the `marked-extended:kanban:move` event. |

## Rendered HTML

There are no `onclick` handlers, `<script>`, `<button>`, `id`, `style`, `data-*` or `draggable` attributes. Columns,
cards and priorities carry `mx-kanban-*` tokens, and `mx-kanban-view-<view>` selects the visible view. Palette colors
are CSS (`--kanban-palette-<name>`); the runtime applies other colors. Board ids hash the fence; repeated boards get
`-2`, `-3`…

## Runtime

`attachKanban(root, options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-kanban'` | Must match the extension's `className`. |
| `dragAndDrop` | `boolean` | `true` | HTML5 drag and drop (board view, mouse). |
| `keyboard` | `boolean` | `true` | Move the focused card with Alt+Arrow keys (board view). |
| `onMove` | `(detail: KanbanMoveDetail) => void \| null` | `null` | Deprecated; called after a non-cancelled move. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

| Event | Detail | Notes |
|-------|--------|-------|
| `marked-extended:kanban:move` | `KanbanMoveDetail` (`boardId`, `taskId`, `title`, `fromColumn`, `toColumn`, `fromIndex`, `toIndex`, `boardIndex`, `fromColumnIndex`, `toColumnIndex`, `raw?`) | Cancelable, dispatched before the card moves. |
| `marked-extended:kanban:view` | `{ id, view, previousView }` | Cancelable, before the view changes. |
| `marked-extended:kanban:collapse` | `{ id, columnId, collapsed }` | After a column toggles. |

### Persisting moves

The runtime never rewrites Markdown. Use the pure helper:

```js
container.addEventListener('marked-extended:kanban:move', (event) => {
  source = applyMoveToMarkdown(source, event.detail);
});
```

`applyMoveToMarkdown(source: string, detail: KanbanMoveDetail): string` locates the card by board, column and item
ordinals and changes only the affected columns. Attach the runtime to the element that holds the rendered Markdown so
`boardIndex` matches the source.

### Other exports

| Export | Status |
|--------|--------|
| `applyMove(taskEl, targetList, beforeEl, options?)` | DOM move helper; dispatches the move event and the legacy `kanban:move`. Returns `KanbanMoveDetail \| null`. |
| `enableKanbanDragDrop(root, options?)` | **Deprecated**: runs `attachKanban` and also dispatches the legacy `kanban:move`. Returns a dispose function. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-kanban/styles/kanban.css` | Structure, view selection and palette colors. |
| `@fsegurai/marked-extended-kanban/styles/kanban-theme.css` | Optional theme. |

## Next step

- [Examples: editable kanban](../examples/editable-content.md)
