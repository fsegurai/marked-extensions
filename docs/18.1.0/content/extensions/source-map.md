---
label: Source map
description: Source line of every rendered block and unique heading ids, written as class keys and stamped as data-line and id attributes after sanitizing.
order: 11
tags: [ "extensions", "source-map" ]
keywords: [ "data-line", "scroll sync", "heading ids", "slugger", "attachSourceMap", "front matter" ]
badge: New
badgeColor: green
---

# Source map

`@fsegurai/marked-extended-source-map` records which source line each rendered block comes from and gives every
heading a unique GitHub-style id. Use it for scroll sync between an editor and its preview, outlines and
"jump to source" actions.

The extension only writes a class key on each block (`mx-sourcemap-key-<hash>-<n>`). After you sanitize, the
`attachSourceMap` runtime turns the keys into `data-line` attributes and heading `id`s.

## Quick path

```bash
npm install @fsegurai/marked-extended-source-map marked
```

```js
import { marked } from 'marked';
import markedExtendedSourceMap, { attachSourceMap } from '@fsegurai/marked-extended-source-map';

const sourceMap = markedExtendedSourceMap();
marked.use(sourceMap);

const markdown = '# Intro\n\nText\n\n## Intro\n';
root.innerHTML = sanitize(marked.parse(markdown));

// data-line="1" on the h1 (id="intro"), "3" on the p, "5" on the h2 (id="intro-1")
const dispose = attachSourceMap(root, { sourceMap: sourceMap.sourceMap, source: () => markdown });

// After each new render of root:
attachSourceMap.refresh(root);
```

> [!IMPORTANT]
> `attachSourceMap` is **not** part of the bundle's `attachAll`: it needs the per-parse `sourceMap` state of your
> extension instance. Call it yourself, after sanitizing and inserting the HTML.

## Syntax

The extension adds no Markdown syntax. It maps every top-level block, block-quote child and list item to its 1-based
source line, and slugs every heading.

## How it works

- Per parse, the `processAllTokens` hook counts the lines of each token's `raw` and wraps each mapped block in a
  `sourceMapBlock` token (`SOURCE_MAP_BLOCK_TOKEN`). Its renderer adds the class key to the block's opening tag.
- A key depends on the block's content only, so a block's HTML stays the same when lines are added above it.
- Heading slugs come from the core slugger (`createSlugger`, `intro`, `intro-1`, …), the same one
  `@fsegurai/marked-extended-toc` uses, so TOC links match the ids this runtime sets.
- The factory's result carries the recorded parses in `sourceMap` (non-enumerable, so `marked.use` ignores it).
  `sourceMap.latest` is the most recent parse; `sourceMap.renderFor(source)` finds the parse whose Markdown ends
  `source`, so a document with a front matter removed before parsing still finds its parse.

```js
const render = sourceMap.sourceMap.renderFor(fullDocument);
render.headings; // [{ level: 1, text: 'Intro', slug: 'intro', line: 1 }, …]
render.blocks;   // Map of key → { line, slug }
sourceLineOffset(fullDocument, render); // lines removed before the parsed Markdown
```

## Options

`markedExtendedSourceMap(options?: SourceMapOptions): SourceMapExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `classPrefix` | `string` | `'mx-sourcemap-key-'` | Class of the keys, followed by the key. Letters, digits, `-`, `_`; starts with a letter. |
| `headingIds` | `boolean` | `true` | Give each heading a unique slug. With `false`, headings are recorded with `slug: null`. |
| `reservedIds` | `readonly string[]` | core `DEFAULT_RESERVED_HEADING_IDS` (`katex`, `joypixels`, `mermaid`, `prism`) | Ids a slug may not take (they get a `heading-` prefix), besides `Object.prototype` names. |
| `slugger` | `(() => (text: string) => string) \| null` | core `createSlugger` | Creates the slug function of each parse. Takes precedence over `reservedIds`. |
| `lineOffset` | `number` | `0` | Lines added to every recorded line. |
| `quoteMarkers` | `'keep' \| 'map'` | `'keep'` | A `> [!X]` quote that no extension made an alert: `'keep'` leaves its first paragraph unwrapped (for alert extensions that read the marker in `walkTokens`); `'map'` maps it like any quote. |
| `embedLines` | `boolean` | `false` | Also write `mx-sourcemap-line-<n>` and `mx-sourcemap-id-<slug>` class tokens, so the runtime works without `sourceMap` (server rendering). |
| `history` | `number` | `3` | How many recent parses `renderFor` can match. |

`embedLines` puts the lines in the HTML, so a block's HTML changes when lines are added above it. The extension
renders no strings of its own, so it has no `labels` option.

### Exported constants and helpers

| Export | Value |
|--------|-------|
| `DEFAULT_SOURCE_MAP_CLASS_PREFIX` | `'mx-sourcemap-key-'` |
| `DEFAULT_SOURCE_LINE_ATTRIBUTE` | `'data-line'` |
| `SOURCE_MAP_BLOCK_TOKEN` | `'sourceMapBlock'` |
| `sourceLineOffset(source, render)` | Lines removed before the parsed Markdown (e.g. a front matter). |
| `countNewlines(text)` | Line breaks in a string. |
| `stampSourceLines(root, options)` | The runtime's stamp, as a function; returns the headings. |
| `hardenSourceAttributes(root, { attribute, reservedIds, scopes })` | Removes unsafe line attributes and heading ids in the given subtrees. |

## Sanitizer notes

The extension writes only `class` keys, so Angular's `SecurityContext.HTML` keeps the markup unchanged. It has no
`unsafeHtml` option: `data-line` and `id` are added after sanitizing by the runtime. Ids are checked with core
`isSafeHeadingId` to prevent DOM clobbering; unsafe ids are never set.

## Runtime

`attachSourceMap(root, options?)` returns a dispose function. It stamps `root` on attach, on every
`attachSourceMap.refresh(root)` and, with `observe: true`, on each mutation of `root`. It is idempotent per root. The
stamped attributes stay after dispose. Nothing touches the DOM at import time.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sourceMap` | `SourceMap \| null` | `null` | The extension's `sourceMap`. Without it, the `embedLines` tokens are read. |
| `source` | `string \| (() => string) \| null` | `null` | The full document (front matter included): selects the parse and the line offset. |
| `attribute` | `string` | `'data-line'` | Attribute of the line; must be a `data-*` name. |
| `headingIds` | `boolean` | `true` | Set heading `id`s from their slugs. |
| `reservedIds` | `readonly string[]` | core default | Ids refused by the guard. |
| `harden` | `boolean` | `true` | Also remove line attributes that are not positive integers and unsafe heading ids. |
| `observe` | `boolean` | `false` | Re-stamp after the children of `root` change. |

| Event | Dispatched on | Detail |
|-------|---------------|--------|
| `marked-extended:sourcemap:stamp` | `root` | `{ headings }`, lines include the front-matter offset. |

## Working with other extensions

- **Table of contents**: `@fsegurai/marked-extended-toc` looks inside `sourceMapBlock` tokens and shares the slugger.
- **Alerts**: a block quote that starts with `> [!NOTE]` keeps its first paragraph unwrapped, so alert extensions
  still find the marker.
- **Front matter**: register the source map before an extension whose `preprocess` removes a front matter, or pass
  `source` to the runtime.

## Styling

The package ships no stylesheet. Its classes are keys for the runtime, not styling hooks.

| Class | Purpose |
|-------|---------|
| `mx-sourcemap-key-<hash>-<n>` | Source key of a block (`classPrefix`). |
| `mx-sourcemap-line-<n>`, `mx-sourcemap-id-<slug>` | Embedded line and slug (`embedLines: true`). |

## Next step

- [Table of contents](toc.md)
- [Sanitizer-safe markup](../guides/sanitizer-safe-markup.md)
