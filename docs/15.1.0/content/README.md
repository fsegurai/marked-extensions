---
label: Documentation Home
description: "Documentation for @fsegurai/marked-extensions 15.1.0: 6 JavaScript extensions for Marked 13 to 15, including the fenced code preview and spoiler blocks of the 15.1 line."
order: 0
tags: [ "documentation", "overview", "marked" ]
keywords: [ "markdown", "marked.js", "extensions", "fenced blocks", "javascript" ]
breadcrumbTitle: Home
publishedAt: "2025-01-26"
---

# Marked Extensions

`@fsegurai/marked-extensions` is a monorepo of **6 extensions for [Marked](https://marked.js.org)**, each published as
`@fsegurai/marked-extended-<name>`. This documentation covers the **15.1.0** release of the monorepo (tag `v15.1.0`,
changelog date 2025-01-26). See [What's New](help/whats-new.md).

## Quick start

1. Install an extension and Marked: `npm install @fsegurai/marked-extended-tables marked@^15`.
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

## What 15.1.0 looks like

| Topic | Behavior |
|-------|----------|
| Version scheme | The monorepo is 15.1.0; each package has its own version (spoiler 15.0.0, all others 15.1.0). |
| Language | Plain JavaScript (`src/*.js`) with hand-written `src/index.d.ts` declarations. |
| Peer | `marked >=13 <16` in every package. |
| Packages | Code preview, footnote, lists, spoiler, tables, typographic. No bundle. |
| Syntax | Code preview and spoiler are fenced blocks: ```` ```preview ```` and ```` ```spoiler ````. |
| Inner Markdown | Code preview and spoiler render their content only when you pass `marked` as the second factory argument. |
| Styles | No CSS files. Only the spoiler adds styles, by appending a `<style>` to `document.head` for every spoiler. |

Coming from 15.0.0? Read [Upgrading from 15.0](guides/upgrading-from-15.0.md).

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install an extension and render your first page. |
| [Extensions](extensions/README.md) | Look up the syntax, options, markup and browser behavior of each extension. |
| [Guides](guides/README.md) | Understand browser behavior, styles, combining extensions and upgrading. |
| [API Reference](api/README.md) | Find exact exports and signatures of each package. |
| [Examples](examples/README.md) | Copy complete setups for plain JavaScript and frameworks. |
| [Help](help/README.md) | Read the release notes, solve common problems and find project resources. |

## Links

- Live demo: [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions)
- Source: [github.com/fsegurai/marked-extensions](https://github.com/fsegurai/marked-extensions)
- License: MIT
