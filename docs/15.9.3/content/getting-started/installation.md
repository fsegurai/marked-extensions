---
label: Installation
description: Install a 15.9.3 marked-extended package with the marked peer, understand the declared entry points and load the UMD build from a CDN.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "bun", "peer dependency", "cdn", "umd" ]
---

# Installation

Install only the extensions you use, next to `marked`. There is no bundle package in 15.9.3.

## Install

```bash
npm install marked@^15 @fsegurai/marked-extended-tabs
# bun add marked@^15 @fsegurai/marked-extended-tabs
```

```js
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
```

## Package versions in the 15.9.3 monorepo

Packages are versioned independently. At the 15.9.3 source revision (`aab1cc7`) they are:

| Package | Version |
|---------|---------|
| `@fsegurai/marked-extended-accordion` | 15.0.1 |
| `@fsegurai/marked-extended-alert` | 15.0.1 |
| `@fsegurai/marked-extended-footnote` | 15.2.1 |
| `@fsegurai/marked-extended-lists` | 15.2.1 |
| `@fsegurai/marked-extended-spoiler` | 15.1.1 |
| `@fsegurai/marked-extended-tables` | 15.2.1 |
| `@fsegurai/marked-extended-tabs` | 15.0.1 |
| `@fsegurai/marked-extended-timeline` | 15.0.1 |
| `@fsegurai/marked-extended-typographic` | 15.2.1 |

## Peer dependency

Every package declares `"marked": ">=13 <16"`. The demo and root workspace use `marked ^15.0.11`.

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

There are no stylesheet files. Accordion, spoiler, tabs and timeline write a `<style>` element into the HTML of every
block they render. Alert injects one `<style>` into `document.head` when its factory runs in a browser
(`injectStyles`). See [Styling](../guides/styling.md).

## CDN and UMD

The UMD global is named after the package (for example `markedExtendedTabs`). The package READMEs show this form:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tables/lib/index.umd.js"></script>
```

Rollup writes the UMD file to `dist/index.umd.js`; use whichever path exists in the published version.

## Next step

Render your first page in the [Quick Start](quick-start.md).
