---
label: Combining Extensions
description: Register several 18.0.0 extensions on one Marked instance, nest fenced blocks, and know which extensions hook the same Marked stages or touch global state.
order: 4
tags: [ "guides", "integration" ]
keywords: [ "marked.use", "nesting", "registration order", "hooks", "global marked" ]
---

# Combining Extensions

All 13 extensions can be registered on the same `Marked` instance. Fenced extensions tokenize their content as
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

## Where each extension hooks into Marked

| Stage | Extensions | What to know |
|-------|------------|--------------|
| Block tokenizer (own syntax) | accordion, comments (block), embeds, footnote (definitions, section placeholder), kanban, slide, spoiler, tables (`spanTable`), tabs, timeline | Fenced blocks are independent. Tables takes over pipe-table syntax. |
| Inline tokenizer | comments (`:::comment{…}…:::`), footnote (`[^id]`, `^[…]`) | |
| Replaces a built-in tokenizer | lists (`list`) | Lists replaces Marked's list tokenizer and renderer. |
| `walkTokens` | accordion, alert (turns blockquotes into alerts), comments, embeds, footnote, kanban, slide, spoiler, tabs, timeline | Marked runs the most recently registered `walkTokens` first. |
| `hooks.preprocess` | comments, footnote, tabs | Reset per-parse state. |
| `hooks.postprocess` | footnote (endnotes section), typographic (character replacement) | Typographic runs on the final HTML. |

## Global side effects to avoid

- `marked.use(...)` on the default `marked` export registers globally. Prefer `new Marked().use(...)` per renderer.
- `markedExtendedTypographic({ breaks: true })` calls `marked.setOptions({ breaks: true })` on the **global**
  `marked`, even when you register it on a `new Marked()` instance.
- Tabs, slide, footnote and lists install document-level behavior when their factory runs in a browser. Create each
  extension once per page, not once per render. See [Browser Behavior](browser-behavior.md).

## Syntax highlighting

There is no code extension in 18.0.0. Use a `walkTokens` highlighter such as `marked-highlight` for standard fenced
code; the extension fences (`tabs`, `spoiler`…) are consumed by their own tokenizers before a highlighter sees them.

## Next step

- [Upgrading from 17](upgrading-from-17.md)
