---
label: Kanban
description: Kanban boards from fenced kanban blocks, with board, table and list views, WIP limits, card metadata and opt-in drag and drop.
order: 6
tags: [ "extensions", "kanban" ]
keywords: [ "board", "cards", "columns", "drag and drop", "enableKanbanDragDrop", "applyMoveToMarkdown" ]
---

# Kanban

`@fsegurai/marked-extended-kanban` renders a fenced `kanban` block as a board. The board renders without setup, but
the view switcher uses inline `onclick` handlers and a JSON `<script>` per board, so switching views needs JavaScript
enabled. Drag and drop is opt-in through `enableKanbanDragDrop`.

## Quick path

```bash
npm install @fsegurai/marked-extended-kanban marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedKanban, { enableKanbanDragDrop } from '@fsegurai/marked-extended-kanban';
import '@fsegurai/marked-extended-kanban/styles/kanban.css';
import '@fsegurai/marked-extended-kanban/styles/kanban-theme.css';

marked.use(markedExtendedKanban());
container.innerHTML = marked.parse(markdown);
const dispose = enableKanbanDragDrop(container); // optional
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

## In Progress {color: orange, wip: 3}
- Implement auth

## Archive {collapsed}
- Old task
```
````

Backtick or tilde fences of 3+ characters work. Front matter is optional: the first non-blank line must be
`key: value` and a lone `---` ends it.

| Board key | Default | Description |
|-----------|---------|-------------|
| `view` | `defaultView` option | `board`, `table` or `list`; invalid values fall back to `defaultView`. |
| `class` | none | Extra classes on the board. |
| `data-*` | none | Copied as attributes onto the board. |

| Column attribute (`## Label {…}`) | Description |
|-----------------------------------|-------------|
| `color` | Header accent: hex, a named color, or comma-free `rgb()`/`hsl()`. Unsafe values are ignored. |
| `wip` | Work-in-progress limit; the count shows `count / limit` and flags overflow. |
| `collapsed` | Start folded (native `<details>` without `open`). |

Cards are unordered list items: the first line is the title, further lines the description. Metadata chips:
`@assignee`, `!high` / `!medium` (`!med`) / `!low`, `due:<value>`, `#tag`.

## Options

`markedExtendedKanban(options?: KanbanOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-kanban'` | Base CSS class. |
| `defaultView` | `'board' \| 'table' \| 'list'` | `'board'` | Initial view; invalid values fall back to `board` with a warning. |
| `showTaskCount` | `boolean` | `true` | Show the card count per column. |
| `template` | `string \| null` | `null` | Custom board template. Placeholders: `{kanbanId}`, `{className}`, `{viewMode}`, `{columnsHtml}`, `{viewSwitcher}`, `{extraClasses}`, `{dataAttrs}`. |
| `customizeToken` | `(token: KanbanToken) => void \| null` | `null` | Mutates each board token in `walkTokens`. |

## Rendered HTML

```html
<div id="kanban-<hash>" class="marked-extended-kanban sprint-board" data-view-mode="board" data-team="frontend" role="region" aria-label="Kanban board">
  <div class="marked-extended-kanban-header">
    <div class="marked-extended-kanban-view-switcher" role="tablist" aria-label="Kanban view">
      <button class="marked-extended-kanban-view-button active" onclick="…" type="button" role="tab" aria-selected="true" aria-label="Board view">Board</button>
      …
    </div>
  </div>
  <div class="marked-extended-kanban-container">
    <details class="marked-extended-kanban-column" role="group" aria-label="To Do" data-column-id="column-<hash>" open>
      <summary class="marked-extended-kanban-column-header" style="--kanban-color: #3498db;">…</summary>
      <div class="marked-extended-kanban-column-tasks" role="list" data-column-id="column-<hash>">
        <div class="marked-extended-kanban-task" role="listitem" draggable="true" data-task-id="<hash>" data-raw="…" data-priority="high">…</div>
      </div>
    </details>
  </div>
</div>
<script type="application/json" id="kanban-<hash>-views">{"board":"…","table":"…","list":"…"}</script>
```

Ids are hashes of the fence source (board) and label plus position (column). The `list` view reuses the board
markup and differs only in CSS.

## Browser behavior

| Item | Behavior |
|------|----------|
| Inline handlers | Each view button has an `onclick` that sets `data-view-mode`, parses the JSON `<script>` into `board.__views` and swaps the container HTML. |
| Injected `<script>` | One `type="application/json"` data block per board (not executable). |
| `enableKanbanDragDrop(root, options?)` | Native HTML5 drag and drop between columns, board view only, mouse only. Options: `className?`, `onMove?(detail)`. Returns a cleanup function. Marks `root` with `data-kanban-dnd="true"`. |
| `applyMove(taskEl, targetList, beforeEl, options?)` | DOM move helper used by drag and drop. Returns `KanbanMoveDetail \| null`. |
| Event | `kanban:move` (bubbles, not cancelable), dispatched after the DOM move with `KanbanMoveDetail`. |
| `applyMoveToMarkdown(source, detail)` | Pure function that rewrites the Markdown source for a move; only the affected columns change. |

`KanbanMoveDetail`: `taskId`, `title`, `fromColumn`, `toColumn`, `fromIndex`, `toIndex`, `boardIndex`,
`fromColumnIndex`, `toColumnIndex`, `raw?`.

```js
container.addEventListener('kanban:move', (event) => {
  source = applyMoveToMarkdown(source, event.detail);
});
```

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-kanban/styles/kanban.css` | Board, column, card and view layout. |
| `@fsegurai/marked-extended-kanban/styles/kanban-theme.css` | Colors, priorities and drag states. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Combining extensions](../guides/combining-extensions.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
