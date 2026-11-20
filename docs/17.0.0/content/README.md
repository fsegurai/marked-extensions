---
label: Documentation Home
description: Documentation for @fsegurai/marked-extensions 17.0.0, 13 Marked.js extensions written in TypeScript, the first bundle release and the marked 17 peer.
order: 0
tags: [ "documentation", "overview", "marked" ]
keywords: [ "markdown", "marked.js", "extensions", "typescript", "directives" ]
breadcrumbTitle: Home
publishedAt: "2026-04-18"
---

# Marked Extensions

`@fsegurai/marked-extensions` is a monorepo of **13 extensions for [Marked](https://marked.js.org)**, published as
`@fsegurai/marked-extended-<name>`, plus a bundle. This documentation covers **17.0.0**, released 2026-04-18.

## Quick start

1. Install an extension and Marked: `npm install @fsegurai/marked-extended-tables@17.0.0 marked@^17`.
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

## What 17.0.0 changes

| Topic | Behavior |
|-------|----------|
| Language | Every package is TypeScript, with ESM, CommonJS, UMD and type declarations. |
| Peer | `marked ^17` (comments and embeds accept `>=17.0.0`). |
| New packages | Bundle, comments, embeds, kanban and slide. |
| Syntax | Block extensions use `::::name{prop="value"}` … `::::nameend` directives; short aliases were renamed. |
| Styles | Imported explicitly from each package's `styles/` exports. |

Upgrading from 15.x? Read [Upgrading from 15](guides/upgrading-from-15.md). The full notes are in
[What's New](help/whats-new.md).

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install a single extension or the bundle and render your first page. |
| [Extensions](extensions/README.md) | Look up the syntax, options, markup and browser behavior of each extension. |
| [Guides](guides/README.md) | Understand browser behavior, styling, combining extensions and upgrading. |
| [API Reference](api/README.md) | Find exact exports and signatures of the bundle and each package. |
| [Examples](examples/README.md) | Copy complete setups for plain JavaScript, frameworks and common pages. |
| [Help](help/README.md) | Read the release notes, solve common problems and find contribution resources. |

## Links

- Live demo: [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions)
- Source: [github.com/fsegurai/marked-extensions](https://github.com/fsegurai/marked-extensions)
- License: MIT
