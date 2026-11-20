---
label: Kanban
description: Kanban boards from fenced kanban blocks, with board, table and list views, WIP limits, card metadata, drag and drop and keyboard moves.
order: 8
tags: [ "extensions", "kanban" ]
keywords: [ "board", "cards", "columns", "drag and drop", "attachKanban", "applyMoveToMarkdown" ]
---

# Kanban

`@fsegurai/marked-extended-kanban` renders a fenced `kanban` block as a board. Every view is in the markup and the
initial one is selected with CSS, so it works without JavaScript; `attachKanban` adds view switching, drag and drop
and keyboard moves.

## Install

```bash
npm install @fsegurai/marked-extended-kanban marked
```

## Usage

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
| `className` | `string` | `'mx-kanban'` | Root class; structural parts follow it. |
| `defaultView` | `'board' \| 'table' \| 'list'` | `'board'` | Initial view; invalid values fall back to `board` with a warning. |
| `showTaskCount` | `boolean` | `true` | Show the card count per column. |
| `template` | `string \| null` | `null` | Custom template (must keep `{tokenClasses}` on the board element). |
| `customizeToken` | `(token: KanbanToken) => void \| null` | `null` | Mutates each board token. |
| `labels` | `Partial<KanbanLabels>` | `defaultKanbanLabels` | User-visible strings, shallow-merged and HTML-escaped. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-*`, `style`, `<button>`, `draggable`, JSON view store), without `onclick`. |
| `onMove` | | | **Ignored** since 19 (one-time warning). Use the `marked-extended:kanban:move` event. |

`labels` keys:

| Key | Default | Used for |
|-----|---------|----------|
| `board` | `'Kanban board'` | Accessible name of the board region. |
| `viewSwitcher` | `'Kanban view'` | Accessible name of the view tablist. |
| `boardView`, `tableView`, `listView` | `'Board'`, `'Table'`, `'List'` | View switch texts. |
| `viewSuffix` | `'view'` | Appended to a switch's accessible name (`Board view`); `''` drops it. |
| `untitledColumn` | `'Untitled'` | Column heading without text. |
| `cards` | `'cards'` | Accessible card count (`3 cards`). |
| `limit` | `'limit'` | Accessible WIP limit (`3 cards, 5 limit`). |
| `priorityHigh`, `priorityMedium`, `priorityLow` | `'▲ HIGH'`, `'◆ MEDIUM'`, `'▼ LOW'` | Priority chips. |
| `status`, `task`, `description`, `details` | `'Status'`, `'Task'`, `'Description'`, `'Details'` | Table view headers. |
| `empty` | `'-'` | Table cell without a value. |

## Rendered HTML

Columns, cards and priorities carry `mx-kanban-*` class tokens, and `mx-kanban-view-<view>` selects the visible view.
Palette colors are CSS (`--mx-kanban-palette-<name>`); the runtime applies other colors through `--mx-kanban-color`.
Board ids hash the fence; repeated boards get `-2`, `-3`…

## Sanitizer notes

The default markup survives Angular's `SecurityContext.HTML`: no `onclick`, `<script>`, `<button>`, `id`, `style`,
`data-*` or `draggable`. View tabs are `<span role="tab">`, columns are native `<details>`, and configuration travels
as class tokens. `unsafeHtml: true` emits the 18.0 markup (`id`, `data-*`, inline `style`, `<button>` switchers,
`draggable`, a `<script type="application/json">` view store), which strict sanitizers strip; it still has no inline
handlers, so view switching needs `attachKanban` in both markups.

## CSS classes

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-kanban` | board `div` | Root. |
| `mx-kanban-header`, `mx-kanban-container` | `div` | Header; columns or table. |
| `mx-kanban-view-switcher`, `mx-kanban-view-button` | `div[role=tablist]`, `span[role=tab]` | View tabs (`<button>` with `unsafeHtml`). |
| `mx-kanban-column`, `mx-kanban-column--over-limit` | `details` | Column; over its WIP limit. |
| `mx-kanban-column-header`, `mx-kanban-column-title`, `mx-kanban-column-count` | `summary`, `h3`, `span` | Column header parts. |
| `mx-kanban-column-tasks`, `mx-kanban-column-label` | `div[role=list]`, `span` | Card list; column name in the table view. |
| `mx-kanban-task` | `div[role=listitem]` | Card. |
| `mx-kanban-task-title`, `mx-kanban-task-description`, `mx-kanban-task-meta` | `div` | Card text and chips. |
| `mx-kanban-task-priority`, `mx-kanban-task-priority--high`/`--medium`/`--low` | `span` | Priority chip and its level. |
| `mx-kanban-task-assignee`, `mx-kanban-task-due`, `mx-kanban-task-tag` | `span` | Card chips. |
| `mx-kanban-table` | `table` | Table view. |
| `mx-is-active`, `mx-is-dragging`, `mx-is-drop-target` | tab, card, card list | States. |
| `mx-kanban-view-<view>`, `mx-kanban-color-<name>`, `mx-kanban-priority-<level>` | board, column, card | Styled class tokens. |
| `mx-kanban-id-*`, `-switch-*`, `-column-*`, `-list-*`, `-card-*`, `-wip-*`, `-collapsed-*`, `-label-*` | | Class tokens read by `attachKanban`. |

## CSS custom properties

`kanban-theme.css` reads the host's Material tokens (`--md-sys-color-*`) as defaults when they exist.

| Area | Properties |
|------|------------|
| Switcher | `--mx-kanban-switcher-bg`, `--mx-kanban-switcher-border`, `--mx-kanban-button-color`, `--mx-kanban-button-hover-bg`, `--mx-kanban-button-active-bg`, `--mx-kanban-button-active-color` |
| Columns | `--mx-kanban-color` (default `#6c757d`), `--mx-kanban-column-bg`, `--mx-kanban-column-border`, `--mx-kanban-column-title`, `--mx-kanban-column-count-bg`, `--mx-kanban-column-count-border`, `--mx-kanban-column-count-color` |
| Status colors | `--mx-kanban-todo-color`, `--mx-kanban-inprogress-color`, `--mx-kanban-review-color`, `--mx-kanban-done-color` |
| Palette | `--mx-kanban-palette-<name>` for each `KANBAN_PALETTE` name (defaults to the named color) |
| Cards | `--mx-kanban-task-bg`, `--mx-kanban-task-bg-hover`, `--mx-kanban-task-border`, `--mx-kanban-task-title`, `--mx-kanban-task-description` |
| Tags | `--mx-kanban-tag-bg`, `--mx-kanban-tag-border`, `--mx-kanban-tag-color` |
| Priorities | `--mx-kanban-priority-high` (`#dc3545`), `--mx-kanban-priority-medium` (`#ffc107`), `--mx-kanban-priority-low` (`#28a745`), their `-ring` variants, `--mx-kanban-priority-text-color`, `--mx-kanban-priority-medium-text-color` |
| Table | `--mx-kanban-table-bg`, `--mx-kanban-table-divider`, `--mx-kanban-table-header-bg`, `--mx-kanban-table-header-divider`, `--mx-kanban-table-row-hover` |
| Shape | `--mx-kanban-radius-sm` (`4px`), `--mx-kanban-radius-md` (`6px`), `--mx-kanban-radius-lg` (`8px`), `--mx-kanban-radius-pill` (`12px`), `--mx-kanban-shadow-sm`, `--mx-kanban-shadow-md`, `--mx-kanban-shadow-elevated` |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-kanban/styles/kanban.css` | Structure, view selection and palette colors. |
| `@fsegurai/marked-extended-kanban/styles/kanban-theme.css` | Optional theme (`body.dark` switches it). |

## Runtime

`attachKanban(root, options?)` returns a `dispose` function.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-kanban'` | Must match the extension's `className`. |
| `dragAndDrop` | `boolean` | `true` | HTML5 drag and drop (board view, mouse). |
| `keyboard` | `boolean` | `true` | Move the focused card with Alt+Arrow keys (board view). |
| `allowedDataAttributes` | `readonly string[]` | `[]` | Board `data-*` names (case-insensitive) restored from the `data-*` front-matter keys; nothing else is restored. |
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

## Exported constants

| Export | Value |
|--------|-------|
| `KANBAN_VIEWS` | `['board', 'table', 'list']` |
| `KANBAN_PRIORITIES` | `['high', 'medium', 'low']` |
| `KANBAN_PALETTE` | Named column colors styled by the CSS: `red`, `orange`, `yellow`, `green`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`, `gray`, `grey`, `black`, `white`. |
| `defaultKanbanLabels` | Frozen English labels (see the `labels` table). |

## Changes in 19.0.0-beta.1

- Classes renamed: `marked-extended-kanban*` → `mx-kanban`, `mx-kanban-<part>`; `-column-over-limit` →
  `mx-kanban-column--over-limit`; priority chip `-priority-<level>` → `mx-kanban-task-priority--<level>` (no longer
  shares the card token); `active` → `mx-is-active`; `-dragging`/`-drop-target` → `mx-is-dragging`,
  `mx-is-drop-target`. `className` defaults to `'mx-kanban'` (extension and runtime).
- Custom properties renamed from `--kanban-*` (including the inline `--kanban-color`) to `--mx-kanban-*`.
- New `labels` option, `defaultKanbanLabels`, `KANBAN_VIEWS`, `KANBAN_PRIORITIES` and `KANBAN_PALETTE`.
- **Breaking:** `attachKanban` restores the board's custom `data-*` attributes only when listed in the new
  `allowedDataAttributes` option (default `[]`).

## Next step

- [Examples: editable kanban](../examples/editable-content.md)
