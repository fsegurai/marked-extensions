---
label: Quick Start
description: Render a page with tables and a fenced spoiler in 15.1.3, pass marked to the spoiler factory and see what the spoiler does in the browser.
order: 2
tags: [ "getting-started", "quick-start" ]
keywords: [ "first page", "marked.use", "spoiler", "tables" ]
---

# Quick Start

This page renders Markdown with two extensions: Tables (static HTML) and Spoiler (hover reveal added in the browser).

## 1. Install

```bash
npm install marked@^15 @fsegurai/marked-extended-tables @fsegurai/marked-extended-spoiler
```

## 2. Register and render

```js
import { marked } from 'marked';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';

marked.use(markedExtendedTables(), markedExtendedSpoiler({}, marked));

const source = [
  '| Package | Purpose |',
  '|---------|---------|',
  '| spoiler | Hides content until hover |',
  '',
  '```spoiler title="Hover to reveal"',
  'The answer is **42**.',
  '```',
].join('\n');

document.querySelector('#content').innerHTML = marked.parse(source);
```

The second argument matters: the spoiler calls `markedInstance.parse(content)`. Without it, the content is inserted
as raw text (`The answer is **42**.`).

## 3. What happens in the browser

| Extension | Behavior |
|-----------|----------|
| Tables | Static HTML. |
| Spoiler | `setTimeout(…, 0)` after rendering looks up the spoiler by id, adds 15 particle elements and appends one `<style>` to `document.head`. That style carries the hover reveal. |

Insert the HTML into the document synchronously, as above: if the spoiler element is not in the DOM when the timer
fires, the particle code throws. See [Browser Behavior](../guides/browser-behavior.md).

## Checklist

- [ ] `marked` 13, 14 or 15 is installed next to the extensions.
- [ ] Code preview and spoiler receive `marked` as their second argument.
- [ ] The HTML is in the document before the next macrotask (needed by the spoiler).

## Next step

- Look up every extension in the [catalog](../extensions/README.md).
- Using React, Vue or Angular? See [Framework integration](../examples/frameworks.md).
