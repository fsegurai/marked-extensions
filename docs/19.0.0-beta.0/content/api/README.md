---
label: API Reference
description: Exact exports and signatures of the bundle, the core helpers and each extension package, read from the 19.0.0-beta.0 sources.
order: 4
tags: [ "api", "reference" ]
keywords: [ "exports", "signatures", "typescript types" ]
breadcrumbTitle: API
---

# API Reference

Signatures on these pages are taken from each package's `src/index.ts` and `src/types.ts`.

| Page | Covers |
|------|--------|
| [Bundle](bundle.md) | `@fsegurai/marked-extended-bundle`: re-exports, `attachAll`, `RUNTIME_NAMES`. |
| [Core](core.md) | `@fsegurai/marked-extended-core`: class tokens, escaping, hashing, events, `defineRuntime`. |
| [Extension Packages](extension-packages.md) | Default export, named exports and exported types of each extension package. |

## Shared shapes

Every package with a runtime exports these types itself (packages never import core in their published declarations):

```ts
type Dispose = () => void;
type RuntimeRoot = Element | Document | DocumentFragment;

interface RuntimeAttachOptions {
  /** Refresh after the children of root change (MutationObserver on root only). @default false */
  observe?: boolean;
}

interface XRuntime {
  (root: RuntimeRoot, options?: Partial<XRuntimeOptions> & RuntimeAttachOptions): Dispose;
  readonly runtimeName: string;
  isAttached(root: RuntimeRoot): boolean;
  refresh(root: RuntimeRoot): boolean;
}
```

Every extension factory has the shape `(options?: XOptions) => MarkedExtension` and is the package's default export.

## Next step

- [Bundle](bundle.md)
