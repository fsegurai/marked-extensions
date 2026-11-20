---
label: Combining Extensions
description: Register several extensions on one Marked instance, nest fenced blocks, order highlighters and know which extensions hook the same Marked stages.
order: 4
tags: [ "guides", "integration" ]
keywords: [ "marked.use", "nesting", "registration order", "marked-highlight", "hooks" ]
---

# Combining Extensions

All 18 extensions can be registered on the same `Marked` instance. Fenced extensions tokenize their content as
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
| Block tokenizer (own syntax) | accordion, alert (`> [!TYPE]`), comments (block), embeds, footnote (definitions, section placeholder), kanban, slide, spoiler, tables (`spanTable`), tabs, timeline, toc (`[toc]`), code (`::: code-group`) | Fenced blocks are independent. Tables takes over pipe-table syntax. Alert detects its marker while lexing, so it also works inside wrapper tokens. |
| Inline tokenizer | comments (`:::comment{…}…:::`), footnote (`[^id]`, `^[…]`), inline (`==mark==`, optional `++ins++`, `^sup^`, `~sub~`), wikilinks (`[[target]]`) | `::: code-group` needs its own line, so it never matches an inline comment. Inline `^sup^` never opens right after `[`, so footnote references keep working. |
| Replaces a built-in tokenizer | lists (`list`) | Lists replaces Marked's list tokenizer and renderer, except with `tasksOnly: true`, which keeps Marked's lists and only renders the task checkboxes. |
| `walkTokens` | accordion, alert (turns blockquotes into alerts), code, comments, embeds, footnote, kanban, slide, spoiler, tabs, timeline | Marked runs the most recently registered `walkTokens` first. |
| `renderer.code` | code | Falls back to the previous `code` renderer for fences without meta or markers, indented code and `passthrough` languages (`mermaid` by default). |
| `hooks.postprocess` | footnote (endnotes section), typographic (character replacement) | Typographic skips code, `pre` and tags. |
| `hooks.preprocess` | comments, source-map | Comments resets thread state per parse. Source-map records the Markdown it maps. |
| `hooks.processAllTokens` | source-map (wraps each block in a `sourceMapBlock` token), toc (collects the headings) | Toc looks inside `sourceMapBlock` tokens (`wrapperTokenTypes`), so the order of the two does not matter. |

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
- Since 19.0.0-beta.1, `markedExtendedTypographic({ breaks: true })` only sets `breaks` on the instance it is used
  on; it no longer calls the global `marked.setOptions`.

## Headings, links and source lines

`toc`, `wikilinks` and `source-map` share core's GitHub-style slugger (`createSlugger`), so a `[toc]` link, a
`[[Page#Heading]]` fragment and the heading `id` set by `attachSourceMap` agree. If your app uses its own slugs, pass
them to all three: `toc` and `source-map` take a factory (`slugger: () => (text) => slug`), `wikilinks` takes the slug
function itself (`slugger: (heading) => slug`).

- Register `source-map` before an extension whose `preprocess` removes a front matter (Marked runs the hooks of the
  last registered extension first), or pass the full document as `source` to `attachSourceMap`.
- A block quote that starts with an alert marker keeps its first paragraph unwrapped by the source map, so alerts
  still convert.

## Runtimes

When several runtimes apply, attach them all with the bundle's `attachAll(root)` instead of calling each `attachX`.
`attachAll` does not include `attachSourceMap`: it needs the extension's per-parse `sourceMap` and the document, so
attach it yourself (see the [plain JavaScript example](../examples/plain-javascript.md)).

## Next step

- [Building on core](building-on-core.md)
