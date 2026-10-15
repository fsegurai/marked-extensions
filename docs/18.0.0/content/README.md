---
label: Documentation Home
description: Documentation for @fsegurai/marked-extensions 18.0.0, 13 Marked.js extensions with fenced block syntax, a bundle, and the marked 18 peer.
order: 0
tags: [ "documentation", "overview", "marked" ]
keywords: [ "markdown", "marked.js", "extensions", "fenced blocks" ]
breadcrumbTitle: Home
publishedAt: "2026-09-18"
---

# Marked Extensions

`@fsegurai/marked-extensions` is a monorepo of **13 extensions for [Marked](https://marked.js.org)**, published as
`@fsegurai/marked-extended-<name>`, plus a bundle. This documentation covers **18.0.0**, released 2026-09-18.

## Quick start

1. Install an extension and Marked: `npm install @fsegurai/marked-extended-tables@18.0.0 marked@^18`.
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

## What 18.0.0 changes

| Topic | Behavior |
|-------|----------|
| Syntax | Block extensions use fenced code blocks (```` ```tabs ````, ```` ```timeline ````…) instead of `::::name` directives. |
| Peer | `marked ^18` (comments and embeds accept `>=17.0.0`). |
| Browser helpers | `initSpoilers`, `registerCallbacks`, `initTimeline*`, `enableKanbanDragDrop` and list editing helpers. |
| Security | Dynamic attribute values are escaped in every renderer. |
| Extensions | Timeline milestones and grouping, slide autoplay and speaker view, inline footnotes, responsive tables, 220+ typographic symbols. |

Upgrading from 17.0.0? Read [Upgrading from 17](guides/upgrading-from-17.md). The full notes are in
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
