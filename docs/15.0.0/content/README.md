---
label: Documentation Home
description: "Documentation for @fsegurai/marked-extensions 15.0.0, the first release: one extension, tables with row and column spanning, for Marked 13 to 15."
order: 0
tags: [ "documentation", "overview", "marked" ]
keywords: [ "markdown", "marked.js", "tables", "colspan", "javascript" ]
breadcrumbTitle: Home
publishedAt: "2024-11-28"
---

# Marked Extensions

`@fsegurai/marked-extensions` is a monorepo of extensions for [Marked](https://marked.js.org). This documentation
covers the **15.0.0** release (tag `v15.0.0`, changelog date 2024-11-28), the first tagged release of the repository.
It contains **one package**: `@fsegurai/marked-extended-tables`. See [What's New](help/whats-new.md).

## Quick start

1. Install the extension and Marked: `npm install @fsegurai/marked-extended-tables marked@^15`.
2. Register it: `marked.use(markedExtendedTables())`.
3. Parse Markdown: `marked.parse(markdown)`.

```js
import { marked } from 'marked';
import markedExtendedTables from '@fsegurai/marked-extended-tables';

marked.use(markedExtendedTables());

marked.parse(`
| H1      | H2      | H3      |
|---------|---------|---------|
| This cell spans 3 columns |||
`);
```

## What 15.0.0 looks like

| Topic | Behavior |
|-------|----------|
| Version scheme | Monorepo and package are both 15.0.0. |
| Language | Plain JavaScript (`src/index.js`) with a hand-written `src/index.d.ts`. |
| Peer | `marked >=13 <16`. |
| Packages | Tables only. Code preview, footnote, lists, spoiler and typographic first appear in 15.1.0. |
| Styles | None; the tables extension emits plain table markup. |

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install the extension and render your first table. |
| [Extensions](extensions/README.md) | Look up the table syntax and rendered markup. |
| [Guides](guides/README.md) | Style the tables and combine the extension with others. |
| [API Reference](api/README.md) | Find the exact export and declared types. |
| [Examples](examples/README.md) | Copy complete setups for plain JavaScript and frameworks. |
| [Help](help/README.md) | Read the release notes, solve common problems and find project resources. |

## Links

- Live demo: [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions)
- Source: [github.com/fsegurai/marked-extensions](https://github.com/fsegurai/marked-extensions)
- License: MIT
