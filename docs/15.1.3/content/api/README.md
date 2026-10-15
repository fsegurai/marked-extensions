---
label: API Reference
description: Exact exports and signatures of each extension package, read from the 15.1.3 sources and declarations.
order: 4
tags: [ "api", "reference" ]
keywords: [ "exports", "signatures", "typescript declarations" ]
breadcrumbTitle: API
---

# API Reference

Signatures on these pages are taken from each package's `src/index.js` and hand-written `src/index.d.ts` at tag
`v15.1.3`. Where the two disagree, the extension pages follow the JavaScript source.

| Page | Covers |
|------|--------|
| [Extension Packages](extension-packages.md) | Default export, factory arguments and declared types of each package. |

## Shared shape

Every package's default export is a factory that returns a `MarkedExtension`. Pass its result to `marked.use(...)`.
Code preview and spoiler take a second `markedInstance` argument.

```ts
import type { marked, MarkedExtension } from 'marked';

declare function markedExtendedSpoiler(options?: SpoilerOptions, markedInstance?: typeof marked): MarkedExtension;
```

## Module formats

| Entry | File |
|-------|------|
| ESM (`import`, `module`) | `src/index.js` |
| CommonJS | `main`: `dist/index.cjs`; `exports.require`: `lib/index.cjs` |
| UMD (`browser`) | `dist/index.umd.js`, global `markedExtended<Name>` |
| Types | `src/index.d.ts` |

## Next step

- [Extension Packages](extension-packages.md)
