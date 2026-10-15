---
label: Runtime Contract
description: How the attachX runtimes work, when to call attach, refresh and dispose, the observe option, events and SSR safety.
order: 1
tags: [ "guides", "runtime" ]
keywords: [ "attachX", "dispose", "refresh", "observe", "custom events", "ssr" ]
---

# Runtime Contract

Every package with interactive behavior exports one `attachX(root, options?)` function. Call it after the rendered HTML
is inside `root`, call `refresh` after replacing that content, and call the returned `dispose` on teardown.

```ts
const dispose = attachX(root, options?); // after the HTML is in the DOM
attachX.refresh(root);                   // after replacing the root's content (or pass { observe: true })
dispose();                               // on teardown
```

## Runtimes

| Package | Runtime | Own options |
|---------|---------|-------------|
| accordion | `attachAccordion` | `className` |
| code | `attachCode` | `dataAttributes`, `lineClasses`, `highlight`, `syncByLabel` |
| comments | `attachComments` | none |
| embeds | `attachEmbeds` | `autoload`, `privacy`, `trustedOrigins`, `timeout`, `allow`, `referrerPolicy` |
| footnote | `attachFootnotes` | `smoothScroll`, `scrollOffset`, `updateHash` |
| kanban | `attachKanban` | `className`, `dragAndDrop`, `keyboard` |
| lists | `attachLists` | `editing`, `onEdit` |
| slide | `attachSlides` | `className`, `hash`, `keyboard`, `touch`, `autoplay` |
| spoiler | `attachSpoilers` | none |
| tabs | `attachTabs` | `persistSelection`, `storageKey`, `storage` |
| timeline | `attachTimeline` | `reveal`, `copyAnchorLinks`, `updateHash`, `followInitialHash`, `highlightDelay` |

Alert, tables and typographic have no runtime. Every runtime also accepts `observe`.

## Guarantees

| Rule | What it means |
|------|---------------|
| Idempotent per root | A second `attachX(root)` while attached returns a no-op `dispose`. Only the first `dispose` detaches. |
| Re-attachable | After `dispose`, `attachX(root)` sets the runtime up again. `dispose` can be called twice safely. |
| Scoped | Listeners are delegated on `root` only. No `document` or `body` observers, no `window` globals. Exception: `attachSlides` with `hash: true` listens for `hashchange`. |
| Re-render safe | Delegated behavior (clicks, keys) keeps working when the content changes. Per-element setup (CSS variables, restored `data-*`, observers) needs `refresh`. |
| Fault tolerant | Errors in a runtime's attach, refresh or cleanup are reported with `console.error`, not thrown. |
| SSR safe | Importing a package or calling its factory never touches `document` or `window`. |

Each runtime function also has `runtimeName` and `isAttached(root)`.

## refresh versus observe

| Use | When |
|-----|------|
| `attachX.refresh(root)` | You know when you replaced the content (after a framework update). Returns `false` if nothing is attached to `root`. |
| `attachX(root, { observe: true })` | You do not control re-renders. A `MutationObserver` on `root` only refreshes once per batch of child changes; `dispose` disconnects it. |

## Events

Runtimes dispatch bubbling, composed `CustomEvent`s named `marked-extended:<pkg>:<event>`. Listen once on the
container.

| Event | Cancelable | Detail |
|-------|------------|--------|
| `marked-extended:accordion:toggle` | no | `{ id, open, group }` |
| `marked-extended:code:group-switch` | no | `{ id, index, previousIndex, label, synced }` |
| `marked-extended:comments:navigate` | no | `{ id, from }` |
| `marked-extended:embeds:before-load` | yes | `{ id, provider, src }` |
| `marked-extended:embeds:load` | no | `{ id, provider, src }` |
| `marked-extended:embeds:error` | no | `{ id, provider, reason, src }` |
| `marked-extended:footnote:navigate` | no | `{ id, kind }` |
| `marked-extended:kanban:move` | yes | `KanbanMoveDetail` |
| `marked-extended:kanban:view` | yes | `{ id, view, previousView }` |
| `marked-extended:kanban:collapse` | no | `{ id, columnId, collapsed }` |
| `marked-extended:lists:toggle` | yes | `{ checked, line?, offset?, raw?, text }` |
| `marked-extended:slide:change` | yes | `{ id, index, previousIndex, total }` |
| `marked-extended:slide:overview` | no | `{ id, open }` |
| `marked-extended:slide:speaker` | no | `{ id, index, total, notes, nextNotes }` |
| `marked-extended:spoiler:toggle` | no | `{ id, expanded }` |
| `marked-extended:tabs:before-switch` | yes | `{ id, index, previousIndex, tabId, previousTabId, label }` |
| `marked-extended:tabs:switch` | no | same as above |
| `marked-extended:timeline:collapse` | no | `{ id, expanded }` |
| `marked-extended:timeline:anchor` | no | `{ id }` |

"Cancelable" lists the events whose `preventDefault()` stops the action.

```js
container.addEventListener('marked-extended:tabs:before-switch', (event) => {
  if (hasUnsavedChanges()) event.preventDefault();
});
```

## All runtimes at once

The bundle's `attachAll(root, options?)` attaches every runtime and returns one handle. See the
[bundle API](../api/bundle.md).

```js
const handle = attachAll(container, { tabs: { persistSelection: true }, embeds: false });
handle.refresh();
handle.dispose();
```

## Next step

- [Framework examples](../examples/frameworks.md)
- [Building on core](building-on-core.md)
