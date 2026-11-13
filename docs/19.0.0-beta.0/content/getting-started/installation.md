---
label: Installation
description: Install a single marked-extended package or the bundle with the marked 18 peer, import the stylesheets, or load the UMD builds from a CDN.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "bun", "peer dependency", "cdn", "umd", "stylesheets" ]
---

# Installation

Install only the extensions you use, or the bundle that depends on all of them. Either way, install `marked` 18 next
to them: it is a peer dependency.

## Single extension

```bash
npm install marked@^18 @fsegurai/marked-extended-tabs
# bun add marked@^18 @fsegurai/marked-extended-tabs
```

```js
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';
```

## Bundle

```bash
npm install marked@^18 @fsegurai/marked-extended-bundle
```

```js
import { attachAll, markedExtendedTabs, markedExtendedAlert } from '@fsegurai/marked-extended-bundle';
```

The bundle has **no default export**: every extension is a named export (`markedExtended<Name>`), next to every
runtime, helper and type, and `attachAll`.

## Which one to choose

| You want | Install |
|----------|---------|
| One or two extensions, smallest install | The individual packages |
| Many extensions and one `attachAll(root)` call | The bundle |
| To build your own runtime on the same contract | `@fsegurai/marked-extended-core` (the other packages bundle it; you never need it to use them) |

## Peer dependency

| Packages | Marked peer |
|----------|-------------|
| 19.0.0-beta.x | `^18` |
| 19.x stable (not released) | marked 19 |
| 18.0.x | `^18` |
| 17.x | `^17` |

Upgrade every `@fsegurai/marked-extended-*` package together.

## Stylesheets

No package injects CSS. Import the structural stylesheet, and optionally the theme:

```js
import '@fsegurai/marked-extended-tabs/styles/tabs.css';       // structure, required for icons, views, animations
import '@fsegurai/marked-extended-tabs/styles/tabs-theme.css'; // optional theme
```

Every package except `typographic` (no CSS) and `code` (only `code.css`) exports `styles/<name>.css` and
`styles/<name>-theme.css`, with `.scss` sources under the same paths. With the bundle, import the CSS from the
individual packages it depends on; under strict package managers (pnpm), add those packages as direct dependencies.
See [Styling and theming](../guides/styling.md).

## CDN and UMD

Each package ships `dist/index.umd.js`. The UMD global is a namespace named after the package, with the extension
on `default`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@18/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tabs@19.0.0-beta.0/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tabs@19.0.0-beta.0/dist/styles/tabs.css">
<script>
  marked.use(markedExtendedTabs.default());
  const root = document.getElementById('content');
  root.innerHTML = marked.parse(source);
  markedExtendedTabs.attachTabs(root);
</script>
```

| Package | UMD global |
|---------|------------|
| `@fsegurai/marked-extended-<name>` | `markedExtended<Name>` (for example `markedExtendedTabs`) |
| `@fsegurai/marked-extended-bundle` | `markedExtendedBundle` (expects `marked` and every package global loaded first) |
| `@fsegurai/marked-extended-core` | `markedExtendedCore` |

## Next step

Render your first page in the [Quick Start](quick-start.md).
