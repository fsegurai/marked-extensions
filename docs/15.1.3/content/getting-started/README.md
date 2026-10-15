---
label: Getting Started
description: Install a 15.1.3 extension with the marked peer, register it with marked.use and know which extensions need the marked function as a second argument.
order: 1
tags: [ "getting-started", "setup" ]
keywords: [ "install", "first steps", "marked.use" ]
breadcrumbTitle: Getting Started
---

# Getting Started

Three steps take you from nothing to a rendered page:

1. **Install** one or more extensions together with `marked` (13, 14 or 15).
2. **Register** them with `marked.use(...)` and parse your Markdown.
3. **Pass `marked`** to code preview and spoiler (`markedExtendedSpoiler({}, marked)`) so their content is rendered
   as Markdown.

## Pages

| Page | Covers |
|------|--------|
| [Installation](installation.md) | Packages, the `marked` peer, entry points and UMD builds. |
| [Quick Start](quick-start.md) | A complete page with two extensions. |

## Before you start

| Requirement | Value |
|-------------|-------|
| Marked | `>=13 <16` (peer of every package) |
| Module formats | ESM source (`src/index.js`), CommonJS and UMD builds produced by Rollup |
| Types | Hand-written `src/index.d.ts` in every package |
| Browser APIs | The spoiler touches the DOM after rendering; see [Browser Behavior](../guides/browser-behavior.md) |

## Next step

Go to [Installation](installation.md).
