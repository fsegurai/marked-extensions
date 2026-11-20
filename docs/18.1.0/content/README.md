---
label: Documentation Home
description: Documentation for @fsegurai/marked-extensions 18.1.0, 18 Marked.js extensions with sanitizer-safe markup, scoped runtimes, a bundle and a core package.
order: 0
tags: [ "documentation", "overview", "marked" ]
keywords: [ "markdown", "marked.js", "extensions", "sanitizer-safe", "runtime contract" ]
breadcrumbTitle: Home
---

# Marked Extensions

`@fsegurai/marked-extensions` is a monorepo of **18 extensions for [Marked](https://marked.js.org)**, published as
`@fsegurai/marked-extended-<name>`, plus a bundle and a core package. This documentation covers **18.1.0**.

> **⚠️ 18.1.0 is a minor version with breaking changes.** `^18` ranges pick it up: pin `~18.0.0` to stay on 18.0,
> and read [Migrating to 18.1](guides/migration-18.1.md) before upgrading.

New in 18.1.0: the sanitizer-safe runtime contract, the `code`, `core`, `inline`, `source-map`, `toc` and `wikilinks`
packages, one `mx-` class convention with `--mx-<pkg>-*` custom properties and `--mx-*` base tokens, `labels` for every
user-visible string, and fixes found while integrating the packages into Arkenda and Arkodex. Read
[What's new in 18.1.0](release-notes/whats-new.md).

## Quick start

1. Install an extension and Marked: `npm install @fsegurai/marked-extended-tables marked`.
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

## What 18.1.0 changes

| Topic | Behavior |
|-------|----------|
| Markup | Sanitizer-safe by default: state in `class`, `aria-*`, `role`, `hidden`, `open`, `tabindex`; settings in `mx-<pkg>-<key>-<value>` class tokens; CSS icons. |
| `unsafeHtml: true` | Restores the 18.0 markup in every package whose markup changed. |
| Classes | One convention: `mx-<pkg>`, `mx-<pkg>-<part>`, `mx-<pkg>--<modifier>`, `mx-is-<state>`; theme with `--mx-<pkg>-*` custom properties. |
| Extension contract | Every package exports its factory as default and named (`markedExtended<Name>`), returning a `MarkedExtension`; options are `<Name>Options`; user-visible strings come from `labels`. |
| Runtimes | Interactive behavior comes from `attachX(root, options?)`, which returns `dispose`. Nothing runs at import. |
| `attachAll` | The bundle attaches every runtime at once and returns `{ dispose(), refresh() }`. `attachSourceMap` is attached on its own. |
| Events | Bubbling `CustomEvent`s named `marked-extended:<pkg>:<event>`. |
| SSR | Importing a package or creating an extension never touches `document` or `window`; ids are content hashes. |
| Peer | `marked ^18` for every package. |

Upgrading from 18.0.x? Read [Migrating to 18.1](guides/migration-18.1.md).

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install a single extension or the bundle and render your first page. |
| [Extensions](extensions/README.md) | Look up the syntax, options, markup and runtime of each extension. |
| [Guides](guides/README.md) | Understand the runtime contract, sanitizers, styling, combining extensions and migration. |
| [API Reference](api/README.md) | Find exact exports and signatures of the bundle, core and each package. |
| [Examples](examples/README.md) | Copy complete setups for plain JavaScript, frameworks and common pages. |
| [Help](help/README.md) | Solve common problems and find contribution resources. |
| [Release Notes](release-notes/README.md) | See what 18.1.0 added, fixed and broke. |

## Links

- Live demo: [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions)
- Source: [github.com/fsegurai/marked-extensions](https://github.com/fsegurai/marked-extensions)
- License: MIT
