---
label: Getting Started
description: Install the 15.0.0 tables extension with the marked peer and register it with marked.use.
order: 1
tags: [ "getting-started", "setup" ]
keywords: [ "install", "first steps", "marked.use" ]
breadcrumbTitle: Getting Started
---

# Getting Started

Two steps take you from nothing to a rendered table:

1. **Install** `@fsegurai/marked-extended-tables` together with `marked` (13, 14 or 15).
2. **Register** it with `marked.use(markedExtendedTables())` and parse your Markdown.

## Pages

| Page | Covers |
|------|--------|
| [Installation](installation.md) | The package, the `marked` peer, entry points and the UMD build. |
| [Quick Start](quick-start.md) | A complete page with a spanning table. |

## Before you start

| Requirement | Value |
|-------------|-------|
| Marked | `>=13 <16` (peer of the package) |
| Module formats | ESM source (`src/index.js`), CommonJS and UMD builds produced by Rollup |
| Types | Hand-written `src/index.d.ts` |
| Browser APIs | None |

## Next step

Go to [Installation](installation.md).
