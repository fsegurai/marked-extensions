---
label: Combining Extensions
description: Register several 15.9.4 extensions on the default marked instance, nest colon directives, and know which extensions hook the same Marked stages.
order: 4
tags: [ "guides", "integration" ]
keywords: [ "marked.use", "nesting", "directives", "hooks", "registration order" ]
---

# Combining Extensions

All 9 extensions can be registered together. Register them on the default `marked` export: block extensions parse
their inner content with the global `marked.parse`, so that is where nested syntax is recognized.

## Quick path

```js
import { marked } from 'marked';
import markedExtendedAccordion from '@fsegurai/marked-extended-accordion';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

marked.use(
  markedExtendedAccordion(),
  markedExtendedAlert(),
  markedExtendedFootnote(),
  markedExtendedTabs(),
  markedExtendedTypographic(),
);
```

## Nesting directives

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

| Container | Can hold the same type? |
|-----------|-------------------------|
| Accordion, spoiler | Yes, start and end markers are balanced by depth. |
| Tabs, timeline | No, matched with a non-balanced regular expression. Put a tabs block in an accordion instead. |

## Where each extension hooks into Marked

| Stage | Extensions | What to know |
|-------|------------|--------------|
| Block tokenizer (own syntax) | accordion, footnote (definitions, section marker), spoiler, tables (`spanTable`), tabs, timeline | Tables takes over pipe-table syntax. |
| Inline tokenizer | footnote (`[^id]`) | |
| Replaces a built-in tokenizer | lists (`list`), typographic (`inlineText`, so inline text is not escaped) | |
| Replaces built-in renderers | lists (`list`, `listitem`) | |
| `walkTokens` | accordion, alert (turns blockquotes into alerts), spoiler, tabs, timeline | |
| `hooks.postprocess` | footnote (endnotes section), typographic (replacements) | Typographic runs on the final HTML. |

## Next step

- [Upgrading from 15.9.3](upgrading-from-15.9.3.md)
