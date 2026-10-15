---
label: Combining Extensions
description: Register several extensions on one Marked instance, nest fenced blocks, order highlighters and know which extensions hook the same Marked stages.
order: 4
tags: [ "guides", "integration" ]
keywords: [ "marked.use", "nesting", "registration order", "marked-highlight", "hooks" ]
---

# Combining Extensions

All 14 extensions can be registered on the same `Marked` instance. Fenced extensions tokenize their content as
Markdown, so blocks nest.

## Quick path

```js
import { Marked } from 'marked';
import {
  markedExtendedAccordion,
  markedExtendedAlert,
  markedExtendedFootnote,
  markedExtendedTabs,
  markedExtendedTypographic,
} from '@fsegurai/marked-extended-bundle';

const marked = new Marked().use(
  markedExtendedAccordion(),
  markedExtendedAlert(),
  markedExtendedFootnote(),
  markedExtendedTabs(),
  markedExtendedTypographic(),
);
```

## Nesting fenced blocks

Use a **longer outer fence** so the inner fence does not close it:

`````markdown
````accordion
title: Install
---
> [!NOTE]
> Pick your package manager.

```tabs
label: npm

`npm install marked`
```
````
`````

The accordion, spoiler and similar fences accept backtick or tilde fences of three or more characters.

## Where each extension hooks into Marked

| Stage | Extensions | What to know |
|-------|------------|--------------|
| Block tokenizer (own syntax) | accordion, comments (block), embeds, footnote (definitions, section placeholder), kanban, slide, spoiler, tables (`spanTable`), tabs, timeline, code (`::: code-group`) | Fenced blocks are independent. Tables takes over pipe-table syntax. |
| Inline tokenizer | comments (`:::comment{…}…:::`), footnote (`[^id]`, `^[…]`) | `::: code-group` needs its own line, so it never matches an inline comment. |
| Replaces a built-in tokenizer | lists (`list`) | Lists replaces Marked's list tokenizer and renderer. |
| `walkTokens` | accordion, alert (turns blockquotes into alerts), code, comments, embeds, footnote, kanban, slide, spoiler, tabs, timeline | Marked runs the most recently registered `walkTokens` first. |
| `renderer.code` | code | Falls back to the previous `code` renderer for fences without meta or markers, indented code and `passthrough` languages (`mermaid` by default). |
| `hooks.postprocess` | footnote (endnotes section), typographic (character replacement) | Typographic skips code, `pre` and tags. |
| `hooks.preprocess` | comments | Resets thread state per parse. |

## Syntax highlighting

Register a `walkTokens` highlighter such as `marked-highlight` **before** the code extension, so the highlighter
receives marker-free code and the normalized language:

```js
marked.use(markedHighlight({ highlight: (code, lang) => Prism.highlight(code, Prism.languages[lang], lang) }));
marked.use(markedExtendedCode()); // after the highlighter
```

Or highlight in the browser with `attachCode(root, { highlight: (code) => Prism.highlightElement(code) })`. See the
[Prism example](../examples/prism-highlighting.md).

## Global side effects to avoid

- `marked.use(...)` on the default `marked` export registers globally. Prefer `new Marked().use(...)` per renderer.
- `markedExtendedTypographic({ breaks: true })` calls `marked.setOptions({ breaks: true })` on the **global**
  `marked`, even when you register it on a `new Marked()` instance. Pass `breaks: true` to your own instance instead
  if you need line breaks there.

## Runtimes

When several runtimes apply, attach them all with the bundle's `attachAll(root)` instead of calling each `attachX`.

## Next step

- [Building on core](building-on-core.md)
