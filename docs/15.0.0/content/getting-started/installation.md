---
label: Installation
description: Install @fsegurai/marked-extended-tables 15.0.0 with the marked peer, understand the declared entry points and load the UMD build from a CDN.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "peer dependency", "cdn", "umd" ]
---

# Installation

15.0.0 publishes a single package.

## Install

```bash
npm install marked@^15 @fsegurai/marked-extended-tables@15.0.0
```

```js
import markedExtendedTables from '@fsegurai/marked-extended-tables';
```

The export is a default export. The root README's `import { markedExtendedTables } from …` does not match the source.

## Peer dependency

The package declares `"marked": ">=13 <16"`. The demo and root workspace use `marked ^15.0.2`. The package README
still installs `marked@^12.0.2`, which is outside the peer range.

## Entry points

`package.json` declares:

| Field | Value |
|-------|-------|
| `module`, `exports["."].import` | `./src/index.js` (the JavaScript source) |
| `main` | `./dist/index.cjs` |
| `exports["."].require` | `./lib/index.cjs` |
| `browser` | `./dist/index.umd.js` |
| `types` | `./src/index.d.ts` |

The Rollup config writes `dist/index.cjs` and `dist/index.umd.js`, while `files` lists only `lib/` and `src/` and
`exports.require` points to `lib/`. Check the files in the published tarball before relying on `require` or the UMD
path.

## CDN and UMD

The UMD global is `markedExtendedTables`. The README shows this form:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tables/lib/index.umd.js"></script>
```

Rollup writes the UMD file to `dist/index.umd.js`; use whichever path exists in the published version.

## Next step

Render your first table in the [Quick Start](quick-start.md).
