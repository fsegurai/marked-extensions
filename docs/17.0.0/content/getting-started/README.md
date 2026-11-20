---
label: Getting Started
description: Install one 17.0.0 extension or the bundle, register it with marked.use and load its stylesheet.
order: 1
tags: [ "getting-started", "setup" ]
keywords: [ "install", "first steps", "marked.use" ]
breadcrumbTitle: Getting Started
---

# Getting Started

Three steps take you from nothing to a rendered page:

1. **Install** one extension, several, or the bundle, together with `marked` 17.
2. **Register** the extensions with `marked.use(...)` and parse your Markdown.
3. **Load** each extension's CSS, and check whether the extension runs browser code.

## Pages

| Page | Covers |
|------|--------|
| [Installation](installation.md) | Single packages versus the bundle, the `marked` peer, CSS imports, CDN and UMD builds. |
| [Quick Start](quick-start.md) | A complete page with two extensions and their styles. |

## Before you start

| Requirement | Value |
|-------------|-------|
| Marked | `^17` (comments and embeds accept `>=17.0.0`) |
| Module formats | ESM, CommonJS and UMD in every package |
| Types | Bundled TypeScript declarations (`dist/types/index.d.ts`) |
| Browser APIs | Some extensions run browser code; see [Browser Behavior](../guides/browser-behavior.md) |

## Next step

Go to [Installation](installation.md).
