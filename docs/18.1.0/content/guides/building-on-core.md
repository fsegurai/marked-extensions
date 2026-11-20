---
label: Building on Core
description: Write your own scoped, disposable runtime and sanitizer-safe markup with the helpers of @fsegurai/marked-extended-core.
order: 5
tags: [ "guides", "core" ]
keywords: [ "defineRuntime", "onDelegated", "classToken", "emit", "custom extension", "createSlugger", "heading ids" ]
---

# Building on Core

`@fsegurai/marked-extended-core` holds the helpers every package is built on. The packages bundle it into their own
builds, so install it only when you write your own extension or runtime on the same contract.

```bash
npm install @fsegurai/marked-extended-core
```

## 1. Render sanitizer-safe markup

Carry configuration in class tokens and derive ids from content:

```ts
import { classToken, escapeHtml, hashId } from '@fsegurai/marked-extended-core';

function renderWidget(raw: string, color: string, text: string): string {
  const id = hashId(raw, 'widget');                 // same id on server and client
  const classes = ['mx-widget', classToken('widget', 'id', id), classToken('widget', 'color', color)];
  return `<div class="${classes.join(' ')}" role="button" tabindex="0">${escapeHtml(text)}</div>`;
}
```

## 2. Define the runtime

```ts
import { defineRuntime, emit, onDelegated, readClassTokens } from '@fsegurai/marked-extended-core';

export const attachWidgets = defineRuntime<{ highlight: string }>({
  name: 'widget',
  attach: (root, options) => {
    // Per-element setup that cannot be delegated: re-applied by refresh.
    const refresh = () => {
      for (const el of root.querySelectorAll<HTMLElement>('.mx-widget')) {
        el.style.color = readClassTokens(el, 'widget').color ?? options.highlight ?? '';
      }
    };
    refresh();

    // Delegated behavior: keeps working when the content of root is replaced.
    const dispose = onDelegated(root, 'click', '.mx-widget', (_event, el) => {
      el.classList.toggle('on');
      emit(el, 'widget', 'toggle', { id: readClassTokens(el, 'widget').id, on: el.classList.contains('on') });
    });

    return { refresh, dispose };
  },
});
```

## 3. Use it like any package runtime

```ts
const dispose = attachWidgets(container, { observe: true });
container.addEventListener('marked-extended:widget:toggle', (e) => console.log(e.detail));
dispose();
```

`defineRuntime` gives you the full contract: idempotent per root and name, re-attachable, idempotent `dispose`,
errors reported with `console.error`, and `attach.refresh(root)` / `attach.isAttached(root)` / `observe`.

## 4. Link to headings

Use core's slugger when your extension links to headings or sets heading ids, so they match the ids of `toc`,
`wikilinks` and `source-map`:

```ts
import { createSlugger, isSafeHeadingId } from '@fsegurai/marked-extended-core';

const slug = createSlugger();       // one per document
const id = slug('Getting Started'); // 'getting-started'; unsafe names get a 'heading-' prefix
if (isSafeHeadingId(id)) heading.id = id;
```

`createSlugger` and `isSafeHeadingId` refuse names of `Object.prototype` and `DEFAULT_RESERVED_HEADING_IDS`
(`katex`, `joypixels`, `mermaid`, `prism`): an element `id` becomes a property of `window` and would shadow those
globals. Pass `reserved` to change the list.

## Rules to keep

| Rule | Why |
|------|-----|
| Touch the DOM only inside `attach` | Imports stay SSR-safe. |
| Register listeners on `root` with `onDelegated` | No `document` listeners, no leaks between roots. |
| Put non-delegable setup in `refresh`, and keep it idempotent | Frameworks replace content under an attached root. |
| Use `findByClassToken` / `findById` with `root` | Resolve `#hash` targets whose `id` a sanitizer removed, inside `root` only. |
| Name events with `emit(target, pkg, event, detail)` | Consistent `marked-extended:<pkg>:<event>` names. |

## What is not public

Only the exports of `@fsegurai/marked-extended-core` are public API (see the [core API](../api/core.md)). The
packages of this repository also share `@fsegurai/marked-extended-core/internal`: fence matching, front-matter props
parsing, `warnOnce`, `labels` merging, date helpers and the `data-*` allow-list. That entry is bundled into each
package at build time, is not in core's `exports`, and can change in any release; do not import it.

## Next step

- [Core API reference](../api/core.md)
