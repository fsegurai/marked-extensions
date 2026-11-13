---
label: API Reference
description: Exact exports and signatures of the bundle and each extension package, read from the 17.0.0 sources.
order: 4
tags: [ "api", "reference" ]
keywords: [ "exports", "signatures", "typescript types" ]
breadcrumbTitle: API
---

# API Reference

Signatures on these pages are taken from each package's `src/index.ts` and `src/types.ts` at the 17.0.0 release.

| Page | Covers |
|------|--------|
| [Bundle](bundle.md) | `@fsegurai/marked-extended-bundle`: the named re-exports of every extension factory and type. |
| [Extension Packages](extension-packages.md) | Default export, named functions and exported types of each extension package. |

## Shared shape

Every extension factory has the shape `(options?: XOptions) => MarkedExtension` and is the package's default export.
Pass its result to `marked.use(...)` or `new Marked().use(...)`.

```ts
import type { MarkedExtension } from 'marked';

declare function markedExtendedTabs(options?: TabsOptions): MarkedExtension;
```

17.0.0 exports no browser helpers apart from two numbering helpers in lists. Interactive extensions ship their
behavior inside the rendered HTML or attach it themselves; see [Browser Behavior](../guides/browser-behavior.md).

## Module formats

| Entry | File |
|-------|------|
| ESM (`import`) | `dist/index.esm.js` |
| CommonJS (`require`) | `dist/index.cjs` |
| UMD (`browser`) | `dist/index.umd.js`, global `markedExtended<Name>` with the extension on `default` |
| Types | `dist/types/index.d.ts` |

## Next step

- [Bundle](bundle.md)
