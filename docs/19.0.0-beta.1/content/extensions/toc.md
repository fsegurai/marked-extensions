---
label: Table of contents
description: A [toc] line becomes a nested list of links to the document's headings, with depth limits, labels and the slugs the source map gives heading ids.
order: 16
tags: [ "extensions", "toc" ]
keywords: [ "table of contents", "headings", "slugger", "anchors" ]
badge: New
badgeColor: green
---

# Table of contents

`@fsegurai/marked-extended-toc` replaces a `[toc]` line with a table of contents: the document's headings as a
nested list of `#<slug>` links. Slugs come from the core slugger, the same ones
[`@fsegurai/marked-extended-source-map`](source-map.md) gives heading ids. It needs no browser runtime.

## Quick path

```bash
npm install @fsegurai/marked-extended-toc marked
```

```js
import { marked } from 'marked';
import markedExtendedToc from '@fsegurai/marked-extended-toc';
import markedExtendedSourceMap, { attachSourceMap } from '@fsegurai/marked-extended-source-map';
import '@fsegurai/marked-extended-toc/styles/toc.css'; // optional

const sourceMap = markedExtendedSourceMap();
marked.use(sourceMap, markedExtendedToc({ maxDepth: 3, labels: { title: 'On this page' } }));
root.innerHTML = sanitize(marked.parse('[toc]\n\n# Guide\n\n## Install\n'));
attachSourceMap(root, { sourceMap: sourceMap.sourceMap }); // heading ids that match the links
```

Marked gives headings no `id`. Set them with the source map runtime (as above) or with your own heading renderer
that uses core `createSlugger`.

## Syntax

```markdown
# Guide

[toc]

## Install
### Bun
## Usage
```

| Marker | Effect |
|--------|--------|
| `[toc]` | Lists every heading level allowed by `minDepth` and `maxDepth`. |
| `[toc:N]` | Lists levels up to `N` (1–6) for that block. |

- The marker is case-insensitive and must fill a top-level line (up to three spaces before it, blanks after it).
  Inside a paragraph line, a list item, a block quote, a code span or a code block it stays text.
- Headings are collected from the whole document: top-level blocks, block quotes, list items and wrapper tokens of
  other extensions (`wrapperTokenTypes`). Headings inside code blocks are never listed.
- Every heading takes its slug, listed or not, so repeated titles get the same numbering as the source map
  (`intro`, `intro-1`).

## Options

`markedExtendedToc(options?: TocOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minDepth` | `number` | `1` | Shallowest level listed (1–6). |
| `maxDepth` | `number` | `6` | Deepest level listed (1–6); `[toc:N]` overrides it for its block. |
| `className` | `string` | `''` | Extra classes of the `nav`, after `mx-toc`. |
| `labels` | `Partial<TocLabels>` | `defaultTocLabels` | User-visible strings, see below. |
| `slugger` | `(() => (text: string) => string) \| null` | core `createSlugger` | Creates the slug function of each parse, to match an app's heading ids. |
| `reservedIds` | `readonly string[]` | core `DEFAULT_RESERVED_HEADING_IDS` (`katex`, `joypixels`, `mermaid`, `prism`) | Ids a slug may not take (prefixed with `heading-`). Ignored with `slugger`. |
| `wrapperTokenTypes` | `readonly string[]` | `DEFAULT_TOC_WRAPPER_TOKEN_TYPES` | Token types searched for headings, besides block quotes and list items. |

### Labels

Labels are shallow-merged over the frozen `defaultTocLabels`. Values are plain text: HTML-escaped, never templates.

| Key | Default | Used for |
|-----|---------|----------|
| `title` | `'Contents'` | Caption and `aria-label` of the `nav`. An empty title keeps an empty `.mx-toc-title` and drops the `aria-label`. |

### Exported constants

| Constant | Value |
|----------|-------|
| `TOC_TOKEN` | `'toc'` |
| `DEFAULT_TOC_WRAPPER_TOKEN_TYPES` | `['sourceMapBlock']` (frozen): the source map's wrapper token. |
| `defaultTocLabels` | `{ title: 'Contents' }` (frozen) |

## Rendered HTML

```html
<nav class="mx-toc" aria-label="Contents">
  <p class="mx-toc-title">Contents</p>
  <ul class="mx-toc-list">
    <li class="mx-toc-item mx-toc-level-1"><a class="mx-toc-link" href="#guide">Guide</a>
      <ul class="mx-toc-list">…</ul>
    </li>
  </ul>
</nav>
```

Nesting is relative to the shallowest listed level. A jump (h1 → h3) adds an item without link and without level
token.

### Sanitizer notes

The output is `nav`, `p`, `ul`, `li` and `a href="#…"` with classes only, and heading text is HTML-escaped, so
Angular's `SecurityContext.HTML` keeps it unchanged. There is no `unsafeHtml` option and no runtime. The heading
`id`s the links point to come from the source map runtime, which sets them after sanitizing.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-toc/styles/toc.css` | Optional minimal styles (also `toc.scss`). |

### CSS classes

| Class | Element |
|-------|---------|
| `mx-toc` | The `nav`. |
| `mx-toc-title` | The caption; hidden while empty. |
| `mx-toc-list`, `mx-toc-item`, `mx-toc-link` | Lists, items, links. |
| `mx-toc-level-<n>` | Class token: the heading level of an item. |

### CSS custom properties

| Property | Default |
|----------|---------|
| `--mx-toc-margin` | `1rem 0` |
| `--mx-toc-padding` | `0.75rem 1rem` |
| `--mx-toc-border` | `1px solid color-mix(in srgb, currentColor 15%, transparent)` |
| `--mx-toc-radius` | `6px` |
| `--mx-toc-background` | `transparent` |
| `--mx-toc-title-size` | `0.875rem` |
| `--mx-toc-title-weight` | `600` |
| `--mx-toc-indent` | `1rem` |
| `--mx-toc-gap` | `0.25rem` |
| `--mx-toc-link-color` | `inherit` |
| `--mx-toc-link-hover-color` | `inherit` |

## Next step

- [Source map](source-map.md)
