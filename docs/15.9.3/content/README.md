---
label: Documentation Home
description: "Documentation for @fsegurai/marked-extensions 15.9.3: 9 JavaScript extensions for Marked 13 to 15, with accordion, alert, tabs and timeline new in the 15.9 line."
order: 0
tags: [ "documentation", "overview", "marked" ]
keywords: [ "markdown", "marked.js", "extensions", "directives", "javascript" ]
breadcrumbTitle: Home
publishedAt: "2025-05-07"
---

# Marked Extensions

`@fsegurai/marked-extensions` is a monorepo of **9 extensions for [Marked](https://marked.js.org)**, each published as
`@fsegurai/marked-extended-<name>`. This documentation covers the **15.9.3** release of the monorepo (changelog date
2025-05-07). There is no `v15.9.3` git tag; this snapshot is built from commit `aab1cc7` (2025-05-12), the only
commit whose root version is 15.9.3. See [What's New](help/whats-new.md).

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

## What 15.9.3 looks like

| Topic | Behavior |
|-------|----------|
| Version scheme | The monorepo is 15.9.3; each package has its own version (for example accordion 15.0.1, tables 15.2.1). |
| Language | Plain JavaScript (`src/*.js`) with hand-written `src/index.d.ts` declarations. |
| Peer | `marked >=13 <16` in every package. |
| Packages | Accordion, alert, footnote, lists, spoiler, tables, tabs, timeline, typographic. No bundle. |
| Syntax | Block extensions use `::::name{prop="value"}` … `::::nameend` directives with short aliases (`:acc`, `:sp`, `:tb`, `:t`, `:tl`, `:ev`). |
| Styles | Accordion, spoiler, tabs and timeline emit a `<style>` element inside every rendered block; alert injects one stylesheet into `document.head`. |
| New in the 15.9 line | Accordion (replacing code preview), alert, tabs and timeline; see [What's New](help/whats-new.md). |

Coming from 15.1.x? Read [Upgrading from 15.1](guides/upgrading-from-15.1.md).

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
