---
label: Examples
description: Complete, copyable setups for plain JavaScript, React, Vue, Angular, Prism highlighting, editable kanban and task lists, and slide presentations.
order: 5
tags: [ "examples", "recipes" ]
keywords: [ "react", "vue", "angular", "prism", "playground" ]
breadcrumbTitle: Examples
---

# Examples

Each example is complete: install, render, attach, tear down.

| Example | Shows |
|---------|-------|
| [Plain JavaScript](plain-javascript.md) | Every extension from the bundle, `attachAll`, refresh and dispose. |
| [Frameworks](frameworks.md) | React, Vue and Angular components that render Markdown and own the runtimes. |
| [Prism Highlighting](prism-highlighting.md) | Code blocks with line numbers, highlights and groups, highlighted by Prism. |
| [Editable Content](editable-content.md) | Writing kanban moves and task toggles back to the Markdown source. |
| [Presentation](presentation.md) | A slide deck with a theme, speaker notes and hash sync. |

## Live demo

The [demo](https://fsegurai.github.io/marked-extensions) renders every extension; its playground edits Markdown live.
Its source in the repository (`demo/scripts/utils/markdown.ts`) registers all 14 extensions with `marked-highlight`
and uses `attachAll`; `demo/scripts/utils/kanban-sync.ts` keeps the Markdown in sync with kanban moves.

Run it locally:

```bash
git clone https://github.com/fsegurai/marked-extensions.git
cd marked-extensions
bun install
bun start
```

## Next step

Start with [Plain JavaScript](plain-javascript.md).
