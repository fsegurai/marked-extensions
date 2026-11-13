---
label: Quick Start
description: Render a page with an alert and tabs in 17.0.0 using colon directives, load their stylesheets and understand what the tabs extension does in the browser.
order: 2
tags: [ "getting-started", "quick-start" ]
keywords: [ "first page", "marked.use", "tabs", "alert" ]
---

# Quick Start

This page renders Markdown with two extensions: Alert (static HTML) and Tabs (CSS-only switching).

## 1. Install

```bash
npm install marked@^17 @fsegurai/marked-extended-alert@17.0.0 @fsegurai/marked-extended-tabs@17.0.0
```

## 2. Register and render

```js
import { Marked } from 'marked';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import '@fsegurai/marked-extended-alert/styles/alert.css';
import '@fsegurai/marked-extended-tabs/styles/tabs.css';

const marked = new Marked().use(markedExtendedAlert(), markedExtendedTabs());

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

A `new Marked()` instance keeps the extensions local to it. `marked.use(...)` on the default `marked` export works
too, but registers them globally.

## 3. What happens in the browser

| Extension | Behavior |
|-----------|----------|
| Alert | Static HTML. Nothing runs. |
| Tabs | Switching is CSS-only (radio inputs plus a `<style>` element in each block). Calling `markedExtendedTabs()` in a browser also installs a small document-level runtime once, for keyboard support and selection persistence. |

Spoiler, slide, kanban and lists put behavior into the HTML or the page; see
[Browser Behavior](../guides/browser-behavior.md).

## Checklist

- [ ] `marked` 17 is installed next to the extensions.
- [ ] Each extension's CSS is imported.
- [ ] The HTML is not passed through a sanitizer that removes `<style>` or `<input>` (tabs need both).

## Next step

- Using many extensions? Import them from the [bundle](../api/bundle.md).
- Using React, Vue or Angular? See [Framework integration](../examples/frameworks.md).
