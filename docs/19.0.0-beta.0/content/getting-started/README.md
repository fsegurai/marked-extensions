---
label: Getting Started
description: Install one extension or the bundle, register it with marked.use and attach its runtime after rendering.
order: 1
tags: [ "getting-started", "setup" ]
keywords: [ "install", "first steps", "marked.use" ]
breadcrumbTitle: Getting Started
---

# Getting Started

Three steps take you from nothing to a rendered page:

1. **Install** one extension, several, or the bundle, together with `marked` 18.
2. **Register** the extensions with `marked.use(...)` and parse your Markdown.
3. **Attach** the runtime after the HTML is in the DOM, if the extension has one, and load its CSS.

## Pages

| Page | Covers |
|------|--------|
| [Installation](installation.md) | Single packages versus the bundle, the `marked` peer, CSS imports, CDN and UMD builds. |
| [Quick Start](quick-start.md) | A complete page with two extensions, their runtimes and their styles. |

## Before you start

| Requirement | Value |
|-------------|-------|
| Marked | `^18` (peer dependency of every package in 19.0.0-beta.x) |
| Module formats | ESM, CommonJS and UMD in every package |
| Types | Bundled TypeScript declarations (`dist/types/index.d.ts`) |
| Browser APIs | Only inside the `attachX` runtimes; imports are SSR-safe |

## Next step

Go to [Installation](installation.md).
