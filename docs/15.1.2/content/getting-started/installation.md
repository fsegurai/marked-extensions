---
label: Installation
description: Install a 15.1.2 marked-extended package with the marked peer, understand the declared entry points and load the UMD build from a CDN.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "bun", "peer dependency", "cdn", "umd" ]
---

# Installation

Install only the extensions you use, next to `marked`. There is no bundle package in 15.1.2.

## Install

```bash
npm install marked@^15 @fsegurai/marked-extended-tables
# bun add marked@^15 @fsegurai/marked-extended-tables
```

```js
import markedExtendedTables from '@fsegurai/marked-extended-tables';
```

## Package versions in the 15.1.2 monorepo

Packages are versioned independently. At tag `v15.1.2` they are:

| Package | Version |
|---------|---------|
| `@fsegurai/marked-extended-code-preview` | 15.1.0 |
| `@fsegurai/marked-extended-footnote` | 15.1.0 |
| `@fsegurai/marked-extended-lists` | 15.1.0 |
| `@fsegurai/marked-extended-spoiler` | 15.0.0 |
| `@fsegurai/marked-extended-tables` | 15.1.0 |
| `@fsegurai/marked-extended-typographic` | 15.1.0 |

## Peer dependency

Every package declares `"marked": ">=13 <16"`. The demo and root workspace use `marked ^15.0.7`.

## Entry points

Each `package.json` declares:

| Field | Value |
|-------|-------|
| `module`, `exports["."].import` | `./src/index.js` (the JavaScript source) |
| `main` | `./dist/index.cjs` |
| `exports["."].require` | `./lib/index.cjs` |
| `browser` | `./dist/index.umd.js` |
| `types` | `./src/index.d.ts` |

The package Rollup config writes `dist/index.cjs` and `dist/index.umd.js`, while `files` lists only `lib/` and `src/`
and `exports.require` points to `lib/`. Check the files in the published tarball before relying on `require` or the
UMD path.

## Styles

There are no stylesheet files. The spoiler appends a `<style>` to `document.head` for every spoiler it renders in a
browser. Code preview ships no CSS; its README contains a stylesheet to copy. See [Styling](../guides/styling.md).

## CDN and UMD

The UMD global is named after the package (for example `markedExtendedTables`). The package READMEs show this form:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tables/lib/index.umd.js"></script>
```

Rollup writes the UMD file to `dist/index.umd.js`; use whichever path exists in the published version.

## Next step

Render your first page in the [Quick Start](quick-start.md).
