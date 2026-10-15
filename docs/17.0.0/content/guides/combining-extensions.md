---
label: Combining Extensions
description: Register several 17.0.0 extensions on one Marked instance, nest colon directives, and know which extensions hook the same Marked stages.
order: 4
tags: [ "guides", "integration" ]
keywords: [ "marked.use", "nesting", "directives", "hooks", "registration order" ]
---

# Combining Extensions

All 13 extensions can be registered on the same `Marked` instance. Directive blocks tokenize their content as
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

## Nesting directives

Each container tracks the depth of its own start and end markers, so a block can hold another extension's block:

```markdown
::::accordion{title="Install"}
> [!NOTE]
> Pick your package manager.

::::tabs
:::tab{label="npm"}
`npm install marked`
:::tabend
::::tabsend
::::accordionend
```

## Where each extension hooks into Marked

| Stage | Extensions | What to know |
|-------|------------|--------------|
| Block tokenizer (own syntax) | accordion, comments (block), embeds, footnote (definitions, section placeholder), kanban, slide, spoiler, tables (`spanTable`), tabs, timeline | Tables takes over pipe-table syntax. |
| Inline tokenizer | comments (`:::comment{…}…:::`), footnote (`[^id]`) | |
| Replaces a built-in tokenizer | lists (`list`), typographic (`inlineText`, so inline text is not escaped) | Other extensions that rely on escaped inline text see raw text when typographic is registered. |
| `walkTokens` | accordion, alert (turns blockquotes into alerts), comments, embeds, kanban, slide, spoiler, tabs, timeline | Marked runs the most recently registered `walkTokens` first. |
| `hooks.postprocess` | footnote (endnotes section), typographic (character replacement) | Typographic runs on the final HTML. |

## Global side effects to avoid

- `marked.use(...)` on the default `marked` export registers globally. Prefer `new Marked().use(...)` per renderer.
- Tabs, slide, footnote and lists install document-level behavior or `window` globals when their factory runs in a
  browser. Create each extension once per page. See [Browser Behavior](browser-behavior.md).

## Next step

- [Upgrading from 15](upgrading-from-15.md)
