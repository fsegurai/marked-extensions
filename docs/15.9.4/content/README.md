---
label: Documentation Home
description: "Documentation for @fsegurai/marked-extensions 15.9.4: 9 JavaScript extensions for Marked 13 to 15 that inject their own styles."
order: 0
tags: [ "documentation", "overview", "marked" ]
keywords: [ "markdown", "marked.js", "extensions", "directives", "javascript" ]
breadcrumbTitle: Home
publishedAt: "2025-05-12"
---

# Marked Extensions

`@fsegurai/marked-extensions` is a monorepo of **9 extensions for [Marked](https://marked.js.org)**, each published as
`@fsegurai/marked-extended-<name>`. This documentation covers the **15.9.4** release of the monorepo (changelog date
2025-05-12). It is built from commit `9c59b47` (2025-05-17), the last commit whose root version is 15.9.4. The git
tag `v15.9.4` points at the 15.9.6 commit `1bcab04` instead; see [What's New](help/whats-new.md).

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

## What 15.9.4 looks like

| Topic | Behavior |
|-------|----------|
| Version scheme | The monorepo is 15.9.4; each package has its own version (for example accordion 15.1.0, tables 15.3.0). |
| Language | Plain JavaScript (`src/*.js`) with hand-written `src/index.d.ts` declarations. |
| Peer | `marked >=13 <16` in every package. |
| Packages | Accordion, alert, footnote, lists, spoiler, tables, tabs, timeline, typographic. No bundle. |
| Syntax | Block extensions use `::::name{prop="value"}` … `::::nameend` directives with short aliases (`:acc`, `:sp`, `:tb`, `:t`, `:tl`, `:ev`). |
| Styles | Accordion, alert, spoiler, tabs and timeline inject a `<style>` element into `document.head` when the factory runs in a browser (`injectStyles: true`). |
| Changes since 15.9.3 | Class names, options and injected styles; see [What's New](help/whats-new.md). |

Coming from 15.9.3? Read [Upgrading from 15.9.3](guides/upgrading-from-15.9.3.md).

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install an extension and render your first page. |
| [Extensions](extensions/README.md) | Look up the syntax, options, markup and browser behavior of each extension. |
| [Guides](guides/README.md) | Understand browser behavior, injected styles, combining extensions and upgrading. |
| [API Reference](api/README.md) | Find exact exports and signatures of each package. |
| [Examples](examples/README.md) | Copy complete setups for plain JavaScript and frameworks. |
| [Help](help/README.md) | Read the release notes, solve common problems and find project resources. |

## Links

- Live demo: [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions)
- Source: [github.com/fsegurai/marked-extensions](https://github.com/fsegurai/marked-extensions)
- License: MIT
