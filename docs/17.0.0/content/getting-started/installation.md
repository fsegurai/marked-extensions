---
label: Installation
description: Install a single marked-extended 17.0.0 package or the bundle with the marked 17 peer, import the stylesheets, or load the UMD builds from a CDN.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "bun", "peer dependency", "cdn", "umd", "stylesheets" ]
---

# Installation

Install only the extensions you use, or the bundle that depends on all of them. Either way, install `marked` 17 next
to them: it is a peer dependency.

## Single extension

```bash
npm install marked@^17 @fsegurai/marked-extended-tabs@17.0.0
# bun add marked@^17 @fsegurai/marked-extended-tabs@17.0.0
```

```js
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
```

## Bundle

```bash
npm install marked@^17 @fsegurai/marked-extended-bundle@17.0.0
```

```js
import { markedExtendedTabs, markedExtendedAlert } from '@fsegurai/marked-extended-bundle';
```

The bundle has **no default export**: every extension is a named export (`markedExtended<Name>`), next to the
packages' types. See [Bundle](../api/bundle.md).

## Which one to choose

| You want | Install |
|----------|---------|
| One or two extensions, smallest install | The individual packages |
| Many extensions from one import | The bundle (new in 17.0.0) |

## Peer dependency

| Packages | Marked peer |
|----------|-------------|
| 17.0.0 (11 packages and the bundle) | `^17` |
| 17.0.0 comments and embeds | `>=17.0.0` |
| 18.0.0 | `^18` (comments and embeds `>=17.0.0`) |

Upgrade every `@fsegurai/marked-extended-*` package together.

## Stylesheets

No package injects CSS through JavaScript imports. Import the structural stylesheet, and optionally the theme:

```js
import '@fsegurai/marked-extended-tabs/styles/tabs.css';       // structure
import '@fsegurai/marked-extended-tabs/styles/tabs-theme.css'; // optional theme
```

Every package except `typographic` (no CSS) and the bundle exports `styles/<name>.css` and `styles/<name>-theme.css`,
with `.scss` sources under the same paths. With the bundle, import the CSS from the individual packages it depends on;
under strict package managers (pnpm), add those packages as direct dependencies. See
[Styling and theming](../guides/styling.md).

## CDN and UMD

Each package ships `dist/index.umd.js`. The UMD global is a namespace named after the package, with the extension
on `default`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@17/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-alert@17.0.0/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-alert@17.0.0/dist/styles/alert.css">
<script>
  marked.use(markedExtendedAlert.default());
  document.getElementById('content').innerHTML = marked.parse(source);
</script>
```

| Package | UMD global |
|---------|------------|
| `@fsegurai/marked-extended-<name>` | `markedExtended<Name>` (for example `markedExtendedTabs`) |
| `@fsegurai/marked-extended-bundle` | `markedExtendedBundle` (expects `marked` and every package global loaded first) |

## Next step

Render your first page in the [Quick Start](quick-start.md).
