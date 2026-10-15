---
label: API Reference
description: Exact export, declared types and module formats of @fsegurai/marked-extended-tables 15.0.0, with the gaps between its declarations and source.
order: 4
tags: [ "api", "reference" ]
keywords: [ "exports", "signatures", "typescript declarations", "declaration gaps" ]
breadcrumbTitle: API
---

# API Reference

Read from `packages/marked-extended-tables/src/index.js` and `src/index.d.ts` at tag `v15.0.0`.

| Page | Covers |
|------|--------|
| [Extension Packages](extension-packages.md) | The tables export, declared types and declaration gaps. |

## Shared shape

```ts
import type { MarkedExtension } from 'marked';

declare function markedExtendedTables(): MarkedExtension;
```

## Module formats

| Entry | File |
|-------|------|
| ESM (`import`, `module`) | `src/index.js` |
| CommonJS | `main`: `dist/index.cjs`; `exports.require`: `lib/index.cjs` |
| UMD (`browser`) | `dist/index.umd.js`, global `markedExtendedTables` |
| Types | `src/index.d.ts` |

## Next step

- [Extension Packages](extension-packages.md)
