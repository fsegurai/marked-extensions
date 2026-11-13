---
label: Core
description: API of @fsegurai/marked-extended-core, pure helpers for class tokens, escaping, hashing, heading slugs and events, and browser helpers such as defineRuntime and onDelegated.
order: 2
tags: [ "api", "core" ]
keywords: [ "defineRuntime", "classToken", "hashId", "escapeHtml", "onDelegated", "rovingIndex", "createSlugger", "slugifyHeading" ]
---

# Core

`@fsegurai/marked-extended-core` has no dependencies, a single entry point, and no side effects at import.

> **Not public API.** The extension packages also share internal helpers (fence matching, front-matter props parsing,
> `warnOnce`, `labels` merging, time-zone-safe dates and the `data-*` allow-list), imported inside this repository as
> `@fsegurai/marked-extended-core/internal`. That path is not in the package `exports`, is not part of the public API,
> and may change in any release. Only the exports listed on this page are public.

## Pure helpers (server and browser)

| Export | Signature | Description |
|--------|-----------|-------------|
| `hashId` | `(seed: string, prefix?: string) => string` | djb2 hash in base 36; `prefix-hash` when a prefix is given. |
| `escapeHtml` | `(value: string) => string` | Escapes `& < > " '`. |
| `escapeAttribute` | `(value: string) => string` | Escapes a quoted attribute value (same as `escapeHtml` today). |
| `CLASS_TOKEN_PREFIX` | `'mx'` | Prefix of every class token. |
| `classToken` | `(pkg: string, key: string, value: ClassTokenValue) => string` | `mx-<pkg>-<key>-<encoded value>`. Throws `TypeError` for an invalid `pkg` or `key`. |
| `encodeClassTokenValue` | `(value: string) => string` | Value codec: keeps `[A-Za-z0-9-]`, writes other UTF-8 bytes as `_xx`. |
| `decodeClassTokenValue` | `(encoded: string) => string \| null` | Inverse; `null` for malformed input. |
| `parseClassTokens` | `(classAttribute: string, pkg: string) => Record<string, string>` | Decoded tokens of one package; later tokens win. |
| `readClassTokens` | `(el: Pick<Element, 'getAttribute'>, pkg: string) => Record<string, string>` | `parseClassTokens` on an element's `class`. |
| `dataAttrToTokenKey` | `(name: string) => string \| null` | `data-test-id` to `dataTestId`. |
| `tokenKeyToDataAttr` | `(key: string) => string \| null` | `dataTestId` to `data-test-id`. |
| `EVENT_NAMESPACE` | `'marked-extended'` | Event name prefix. |
| `eventName` | `(pkg, event) => MarkedExtendedEventName` | `marked-extended:<pkg>:<event>`. |
| `rovingIndex` | `(key: string, current: number, count: number, orientation?: 'horizontal' \| 'vertical') => number \| null` | Arrow (wrapping), Home and End navigation for roving-`tabindex` widgets. |

`ClassTokenValue` is `string | number | boolean`.

### Heading slugs (since 19.0.0-beta.1)

The slugger shared by `toc`, `wikilinks` and `source-map`, so their links and heading ids always match.

| Export | Signature | Description |
|--------|-----------|-------------|
| `slugifyHeading` | `(text: string) => string` | GitHub slug: trimmed, lowercase, punctuation removed, each space as `-`. |
| `createSlugger` | `(options?: SluggerOptions) => (text: string) => string` | Unique slugs in document order (`intro`, `intro-1`, `intro-2`). An empty or unsafe slug gets the prefix (`heading`, `heading-__proto__`). Create one per document. |
| `isSafeHeadingId` | `(id: string, options?: { reserved?: readonly string[] }) => boolean` | Slug characters only, not a name of `Object.prototype`, and not one of `reserved` (case-insensitive). |
| `DEFAULT_RESERVED_HEADING_IDS` | `readonly string[]` | `['katex', 'joypixels', 'mermaid', 'prism']`: globals a heading `id` would shadow (DOM clobbering). |
| `SluggerOptions` (type) | `{ reserved?: readonly string[]; prefix?: string }` | `reserved` defaults to `DEFAULT_RESERVED_HEADING_IDS`; `prefix` to `'heading'`. |

```ts
slugifyHeading('Hello, World!');      // 'hello-world'
const slug = createSlugger();
slug('Intro');                        // 'intro'
slug('Intro');                        // 'intro-1'
slug('constructor');                  // 'heading-constructor'
isSafeHeadingId('mermaid');           // false
```

```ts
classToken('tabs', 'variant', 'pills');            // 'mx-tabs-variant-pills'
classToken('code', 'lines', '1-3,5');              // 'mx-code-lines-1-3_2c5'
parseClassTokens('mx-code-lines-1-3_2c5', 'code'); // { lines: '1-3,5' }
```

## Browser helpers (call them only in the browser)

| Export | Signature | Description |
|--------|-----------|-------------|
| `isBrowser` | `() => boolean` | `true` when `window` and `document` exist. |
| `defineRuntime` | `<O extends object = NoRuntimeOptions>(definition: RuntimeDefinition<O>) => RuntimeAttach<O>` | Builds a runtime with the shared contract. |
| `onDelegated` | `(root, type, selector, handler, options?) => Dispose` | One delegated listener on `root`, matched with `closest()` and limited to `root`. |
| `emit` | `<D>(target: EventTarget, pkg: string, event: string, detail: D) => boolean` | Dispatches a bubbling, composed, cancelable `CustomEvent`; `false` when cancelled. |
| `on` | `<D>(target, pkg, event, handler, options?) => Dispose` | Typed listener for a `marked-extended:<pkg>:<event>` event. |
| `findByClassToken` | `(root, pkg, key, value) => Element \| null` | First element inside `root` carrying that token. |
| `findById` | `(root: Pick<ParentNode, 'querySelector'>, id: string) => Element \| null` | Element with that `id` inside `root` only; any id works. |

## Types

```ts
type Dispose = () => void;
type RuntimeRoot = Element | Document | DocumentFragment;
type NoRuntimeOptions = Record<never, never>;

interface RuntimeAttachOptions { observe?: boolean }
interface RuntimeInstance { dispose?: Dispose; refresh?: () => void }

interface RuntimeDefinition<O extends object> {
  name: string;
  attach: (root: RuntimeRoot, options: Partial<O>) => Dispose | RuntimeInstance | void;
}

interface RuntimeAttach<O extends object> {
  (root: RuntimeRoot, options?: Partial<O> & RuntimeAttachOptions): Dispose;
  readonly runtimeName: string;
  isAttached(root: RuntimeRoot): boolean;
  refresh(root: RuntimeRoot): boolean;
}

type MarkedExtendedEventName<P extends string = string, E extends string = string> = `marked-extended:${P}:${E}`;
```

## Class-token grammar

```text
token  = "mx-" pkg "-" key "-" value
pkg    = ALPHA *(ALPHA / DIGIT)          ; no hyphen
key    = ALPHA *(ALPHA / DIGIT)          ; no hyphen, camelCase allowed
value  = *(ALPHA / DIGIT / "-" / "_" 2HEXLOWER)
```

## Next step

- [Building on core](../guides/building-on-core.md)
