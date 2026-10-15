---
label: Quick Start
description: Render a page with an alert and tabs in 15.9.3 using colon directives, and see what each extension does in the browser.
order: 2
tags: [ "getting-started", "quick-start" ]
keywords: [ "first page", "marked.use", "tabs", "alert" ]
---

# Quick Start

This page renders Markdown with two extensions: Alert (static HTML) and Tabs (CSS-only switching).

## 1. Install

```bash
npm install marked@^15 @fsegurai/marked-extended-alert @fsegurai/marked-extended-tabs
```

## 2. Register and render

```js
import { marked } from 'marked';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';

marked.use(markedExtendedAlert(), markedExtendedTabs());

const source = [
  '> [!TIP]',
  '> Tabs below switch without a page reload.',
  '',
  '::::tabs',
  ':::tab{label="npm"}',
  '`npm install marked`',
  ':::tabend',
  '',
  ':::tab{label="bun"}',
  '`bun add marked`',
  ':::tabend',
  '::::tabsend',
].join('\n');

document.querySelector('#content').innerHTML = marked.parse(source);
```

Register on the default `marked` export. Accordion, spoiler, tabs, timeline and footnote parse their inner content
with the global `marked.parse`, so extensions registered only on a `new Marked()` instance are not applied inside those
blocks.

## 3. What happens in the browser

| Extension | Behavior |
|-----------|----------|
| Alert | Injects one `<style id="marked-extended-alert-styles">` into `document.head` when the factory runs. The alert itself is static HTML. |
| Tabs | Switching is CSS-only: radio inputs plus a `<style>` element emitted after each tabs block, which carries all tab CSS. |

See [Browser Behavior](../guides/browser-behavior.md) for the other extensions.

## Checklist

- [ ] `marked` 13, 14 or 15 is installed next to the extensions.
- [ ] Extensions are registered with `marked.use(...)` on the default export.
- [ ] The HTML is not passed through a sanitizer that removes `<style>` or `<input>` (tabs need both).

## Next step

- Look up every extension in the [catalog](../extensions/README.md).
- Using React, Vue or Angular? See [Framework integration](../examples/frameworks.md).
