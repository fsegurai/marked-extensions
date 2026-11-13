---
label: Kanban
description: Kanban boards from ::::kanban blocks with :::column children, with board, table and list views and hashtag tags.
order: 6
tags: [ "extensions", "kanban" ]
keywords: [ "board", "cards", "columns", "view switcher", "task tags" ]
---

# Kanban

`@fsegurai/marked-extended-kanban` renders a `::::kanban` block with `:::column` children as a board. The board renders
without setup, but the view switcher uses inline `onclick` handlers and a JSON `<script>` per board, so switching views
needs JavaScript enabled. There is no drag and drop in 17.

## Quick path

```bash
npm install @fsegurai/marked-extended-kanban marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedKanban from '@fsegurai/marked-extended-kanban';
import '@fsegurai/marked-extended-kanban/styles/kanban.css';
import '@fsegurai/marked-extended-kanban/styles/kanban-theme.css';

marked.use(markedExtendedKanban());
container.innerHTML = marked.parse(markdown);
```

## Syntax

```markdown
::::kanban{view="board"}

:::column{label="To Do" color="#e74c3c"}
- Task title
  Task description
  #tag1 #tag2
:::columnend

:::column{label="Done" color="#27ae60"}
- Completed task
:::columnend

::::kanbanend
```

| Element | Start (aliases) | End (aliases) | Properties |
|---------|-----------------|---------------|------------|
| Board | `::::kanban` (`:::kanban`, `:kanban`, `:kbn`) | `::::kanbanend` (`:::kanbanend`, `:kanbanend`, `:kbnend`) | `view="board\|table\|list"` |
| Column | `:::column` (`:column`, `:col`) | `:::columnend` (`:columnend`, `:colend`) | `label="…"` (default `Untitled`), `color="…"` (default `#6c757d`) |

- Properties use `name="value"` inside `{…}`, written directly after the start marker. Unknown properties are ignored.
- Cards are unordered list items: the first line is the title (inline Markdown), further lines the description.
- A description line that starts with `#word` is read as tags (`#\w+`) and is not rendered as text.
- Board and column ids are random (`kanban-<random>`, `column-<random>`), so output differs between parses.

## Options

`markedExtendedKanban(options?: KanbanOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-kanban'` | Base CSS class. |
| `defaultView` | `'board' \| 'table' \| 'list'` | `'board'` | View when the block has no `view`; invalid values fall back to `board` with a warning. |
| `showTaskCount` | `boolean` | `true` | Show the card count per column. |
| `template` | `string \| null` | `null` | Custom board template. Placeholders: `{kanbanId}`, `{className}`, `{viewMode}`, `{columnsHtml}`, `{viewSwitcher}`. |
| `customizeToken` | `(token: KanbanToken) => void \| null` | `null` | Mutates each board token in `walkTokens`. |

The block's `view` value is not validated in 17.

## Rendered HTML

```html
<div id="kanban-<random>" class="marked-extended-kanban" data-view-mode="board">
  <div class="marked-extended-kanban-header">
    <div class="marked-extended-kanban-view-switcher">
      <button class="marked-extended-kanban-view-button active" onclick="…" type="button">Board</button>
      …
    </div>
  </div>
  <div class="marked-extended-kanban-container">
    <div class="marked-extended-kanban-column">
      <div class="marked-extended-kanban-column-header" style="--kanban-color: #e74c3c;">
        <h3 class="marked-extended-kanban-column-title">To Do</h3>
        <span class="marked-extended-kanban-column-count">1</span>
      </div>
      <div class="marked-extended-kanban-column-tasks">
        <div class="marked-extended-kanban-task" style="border-left-color: #e74c3c;">…</div>
      </div>
    </div>
  </div>
</div>
<script type="application/json" id="kanban-<random>-views">{"board":"…","table":"…","list":"…"}</script>
```

Column `label` and `color` are inserted without HTML escaping. The `list` view reuses the board markup and differs only
in CSS.

## Browser behavior

| Item | Behavior |
|------|----------|
| Inline handlers | Each view button has an `onclick` that sets `data-view-mode`, parses the JSON `<script>` into `board.__views` and swaps the container HTML. |
| Injected `<script>` | One `type="application/json"` data block per board (not executable). |
| Exported functions | None besides the default factory (types only). |
| Events, globals | None. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-kanban/styles/kanban.css` | Board, column, card and view layout. |
| `@fsegurai/marked-extended-kanban/styles/kanban-theme.css` | Colors and tags. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Combining extensions](../guides/combining-extensions.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
