---
label: Tabs
description: Tabbed content from fenced tabs blocks, rendered as a WAI-ARIA tablist with variants, animations, keyboard navigation and persisted selection.
order: 12
tags: [ "extensions", "tabs" ]
keywords: [ "tablist", "tabpanel", "aria", "persistSelection", "attachTabs" ]
---

# Tabs

`@fsegurai/marked-extended-tabs` renders a fenced `tabs` block as a WAI-ARIA tablist. Without the runtime the
selected tab shows statically; `attachTabs` adds switching, keyboard navigation, ARIA ids and persistence.

## Quick path

```bash
npm install @fsegurai/marked-extended-tabs marked
```

```js
import { marked } from 'marked';
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';
import '@fsegurai/marked-extended-tabs/styles/tabs.css'; // animations and variants

marked.use(markedExtendedTabs());
container.innerHTML = marked.parse(markdown);
const dispose = attachTabs(container);
```

## Syntax

Each tab starts with its properties, then a blank line and its Markdown content. Tabs are separated by `---`.

```` markdown
```tabs
label: JavaScript
icon: 📜
active: true

JavaScript content


---

label: Python
icon: 🐍

Python content
```
````

| Tab key | Description |
|---------|-------------|
| `label` | Tab label. |
| `icon` | Emoji or text icon (escaped). |
| `active` | `true` selects this tab initially. Otherwise the first tab is selected. |

Override the variant for one block on the fence: ```` ```tabs{variant="vertical"} ````.

## Options

`markedExtendedTabs(options?: TabsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-tabs-container'` | Container class. |
| `persistSelection` | `boolean` | `false` | Remember the selected tab (`mx-tabs-persist-true`; stored by the runtime). |
| `animation` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Panel animation; invalid values fall back to `fade`. |
| `variant` | `'compact' \| 'vertical' \| 'pills' \| ''` | `''` | Visual variant; invalid values are ignored. |
| `autoActivate` | `boolean` | `true` | Select the first tab when none is `active`. |
| `enableKeyboardNavigation` | `boolean` | `true` | Arrow keys (`mx-tabs-keys-false` when off). |
| `enableFocusManagement` | `boolean` | `true` | Move focus to the selected tab (`mx-tabs-focus-false` when off). |
| `template` | `string \| null` | `null` | Custom template. |
| `customizeToken` | `(token: TabsToken) => void \| null` | `null` | Mutates each tabs token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 radio-input markup with a `<style>` block. |
| `onBeforeSwitch`, `onAfterSwitch` | callbacks | `null` | **Deprecated and ignored** (one-time warning). Use the events. |

## Rendered HTML

```html
<div class="marked-extended-tabs-container mx-tabs mx-tabs-id-tabs-1x2y3z mx-tabs-animation-fade">
  <div class="marked-extended-tabs-nav" role="tablist" aria-orientation="horizontal">
    <span class="marked-extended-tabs-label active mx-tabs-tab-0" role="tab" tabindex="0" aria-selected="true">
      <span class="marked-extended-tabs-icon" aria-hidden="true">📜</span><span class="tab-label">JavaScript</span>
    </span>
    <span class="marked-extended-tabs-label mx-tabs-tab-1" role="tab" tabindex="-1" aria-selected="false">…</span>
  </div>
  <div class="marked-extended-tabs-content">
    <div class="marked-extended-tabs-content-pane mx-tabs-panel-0" role="tabpanel">…</div>
    <div class="marked-extended-tabs-content-pane mx-tabs-panel-1" role="tabpanel" hidden>…</div>
  </div>
</div>
```

Variants are the classes `tabs-compact`, `tabs-vertical` and `tabs-pills`. Ids are content hashes (`tabs-<hash>`,
`-2` for repeats).

## Runtime

`attachTabs(root, options?)` handles click, arrow keys (Up/Down when vertical), Home/End and Enter/Space, with a roving
`tabindex`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `persistSelection` | `boolean` | `false` | Persist every block in `root`, even without the render option. |
| `storageKey` | `string` | none | Key scope: `marked-extended-tabs:<storageKey>:<tabs id>`. |
| `storage` | `TabsStorage \| null` | the window's `localStorage` | `null` disables storage; errors are ignored. |
| `onBeforeSwitch`, `onAfterSwitch` | callbacks | `null` | Deprecated; prefer the events. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

| Event | Detail | Notes |
|-------|--------|-------|
| `marked-extended:tabs:before-switch` | `{ id, index, previousIndex, tabId, previousTabId, label }` | Cancelable. |
| `marked-extended:tabs:switch` | same | After the switch (was `tab-switched`). |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-tabs/styles/tabs.css` | Structure, variants and animations (off under reduced motion). |
| `@fsegurai/marked-extended-tabs/styles/tabs-theme.css` | Optional theme. |

## Next step

- [Runtime contract](../guides/runtime-contract.md)
