---
label: Quick Start
description: Render a page with tabs and alerts, attach the runtime after inserting the HTML, refresh it after re-rendering and dispose of it on teardown.
order: 2
tags: [ "getting-started", "quick-start" ]
keywords: [ "first page", "attachTabs", "dispose", "refresh" ]
---

# Quick Start

This page renders Markdown with two extensions: Alert (no runtime) and Tabs (runtime for switching).

## 1. Install

```bash
npm install marked@^18 @fsegurai/marked-extended-alert @fsegurai/marked-extended-tabs
```

## 2. Register and render

```js
import { Marked } from 'marked';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';
import '@fsegurai/marked-extended-alert/styles/alert.css';
import '@fsegurai/marked-extended-tabs/styles/tabs.css';

const marked = new Marked().use(markedExtendedAlert(), markedExtendedTabs());

const source = [
  '> [!TIP]',
  '> Tabs below switch without a page reload.',
  '',
  '```tabs',
  'label: npm',
  '',
  '`npm install marked`',
  '',
  '---',
  '',
  'label: bun',
  '',
  '`bun add marked`',
  '```',
].join('\n');

const container = document.querySelector('#content');
container.innerHTML = marked.parse(source);
```

A `new Marked()` instance keeps the extensions local to it. `marked.use(...)` on the default `marked` export works
too, but registers them globally.

## 3. Attach the runtime

```js
const dispose = attachTabs(container);
```

Without the runtime the first tab is shown and the others are `hidden`, so the page is still readable.

## 4. Re-render and tear down

```js
container.innerHTML = marked.parse(nextSource);
attachTabs.refresh(container); // or attachTabs(container, { observe: true }) once

dispose(); // when the view is destroyed
```

## Checklist

- [ ] `marked` 18 is installed next to the extensions.
- [ ] Each extension's CSS is imported.
- [ ] Runtimes are attached **after** the HTML is in the DOM.
- [ ] `refresh` runs after the content is replaced, `dispose` on teardown.

## Next step

- Using many extensions? Use [`attachAll`](../api/bundle.md) from the bundle.
- Using React, Vue or Angular? See [Framework integration](../examples/frameworks.md).
