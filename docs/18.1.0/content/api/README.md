---
label: API Reference
description: Exact exports and signatures of the bundle, the core helpers and each extension package, read from the 18.1.0 sources.
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
| [Core](core.md) | `@fsegurai/marked-extended-core`: class tokens, escaping, hashing, heading slugs, events, `defineRuntime`. |
| [Extension Packages](extension-packages.md) | The extension contract, then the default export, named exports and exported types of each of the 18 packages. |

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

Every extension factory has the shape `(options?: XOptions) => MarkedExtension` and is both the package's default
export and a named export (`markedExtendedX`).

## Next step

- [Bundle](bundle.md)
