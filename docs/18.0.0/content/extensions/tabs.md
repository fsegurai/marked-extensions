---
label: Tabs
description: Tabbed content from fenced tabs blocks, rendered as CSS-only radio tabs with variants, animations and an auto-attached keyboard and persistence runtime.
order: 11
tags: [ "extensions", "tabs" ]
keywords: [ "tablist", "tabpanel", "radio inputs", "persistSelection", "tab-switched" ]
---

# Tabs

`@fsegurai/marked-extended-tabs` renders a fenced `tabs` block as radio inputs, `role="tab"` labels and panels, plus an
inline `<style>` block that shows the checked panel. Switching works without JavaScript; in a browser, calling the
factory also attaches a document-level runtime for ARIA sync, keyboard navigation, persistence and callbacks.

## Quick path

```bash
npm install @fsegurai/marked-extended-tabs marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import '@fsegurai/marked-extended-tabs/styles/tabs.css';

marked.use(markedExtendedTabs()); // in a browser, also attaches the runtime
container.innerHTML = marked.parse(markdown); // picked up by a MutationObserver
```

## Syntax

Each tab starts with optional `key: value` lines, then a blank line and its Markdown content. Tabs are separated by a
`---` line. `---` inside a nested fenced code block is not a separator.

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
| `label` | Tab label (escaped). Defaults to `Tab <n>`. |
| `icon` | Emoji or text icon (escaped). |
| `active` | `true` selects this tab initially. With `autoActivate`, the first tab is selected when none is. |

Backtick or tilde fences of three or more characters work. Override the variant for one block on the fence:
```` ```tabs{variant="vertical"} ````.

## Options

`markedExtendedTabs(options?: TabsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-tabs-container'` | Container class. The runtime only manages containers with this class. |
| `persistSelection` | `boolean` | `false` | Save the selected tab in `localStorage`. |
| `animation` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Panel animation in the inline `<style>`; invalid values warn and fall back to `fade`. |
| `variant` | `'compact' \| 'vertical' \| 'pills' \| ''` | `''` | Adds `tabs-compact`, `tabs-vertical` or `tabs-pills`; invalid values warn and are ignored. |
| `autoActivate` | `boolean` | `true` | Select the first tab when none is `active`. |
| `enableKeyboardNavigation` | `boolean` | `true` | Arrow keys, Home/End, Enter/Space on labels. |
| `enableFocusManagement` | `boolean` | `true` | Roving `tabindex` and focus on the selected label. |
| `template` | `string \| null` | `null` | Custom container template (see placeholders below). |
| `customizeToken` | `(token: TabsToken) => void \| null` | `null` | Mutates each tabs token in `walkTokens`. |
| `onBeforeSwitch` | `(event: TabSwitchEvent) => boolean \| null` | `null` | Runs before a switch; return `false` to cancel. |
| `onAfterSwitch` | `(event: TabSwitchEvent) => void \| null` | `null` | Runs after a switch. |

`TabSwitchEvent` is `{ previousTabId, newTabId, tabIndex, timestamp }`. Template placeholders: `{tabsContainerId}`,
`{className}`, `{animation}`, `{runtimeAttrs}`, `{inputsNav}`, `{navList}`, `{content}`, `{stylesBehavior}`.

## Rendered HTML

```html
<div id="tabs-container-1" class="marked-extended-tabs-container" data-animation="fade"
     data-tabs-runtime="true" data-tabs-enable-keyboard-navigation="true"
     data-tabs-enable-focus-management="true" data-tabs-persist-selection="false"
     data-tabs-storage-key="marked-extended-tabs-active-tabs-container-1"
     data-tabs-callback-ref="tabs-cb-tabs-container-1">
  <input type="radio" name="tabs-container-1-tabs" id="input-tabs-container-1-tab-0" class="marked-extended-tabs-input" checked>
  <div class="marked-extended-tabs-nav" role="tablist">
    <label for="input-tabs-container-1-tab-0" id="label-tabs-container-1-tab-0" class="marked-extended-tabs-label"
           role="tab" aria-controls="tabs-container-1-tab-0" aria-selected="true" tabindex="0">
      <span class="marked-extended-tabs-icon">📜</span><span class="tab-label">JavaScript</span>
    </label>
  </div>
  <div class="marked-extended-tabs-content">
    <div class="marked-extended-tabs-content-pane" id="tabs-container-1-tab-0" role="tabpanel"
         aria-labelledby="label-tabs-container-1-tab-0">…</div>
  </div>
  <style>/* #tabs-container-1 #input-…:checked ~ … rules and keyframes */</style>
</div>
```

Ids come from a counter that resets on every `marked.parse` call (`tabs-container-1`, `-2`, …), so two separate parses
on one page reuse the same ids.

## Browser behavior

| Side effect | Details |
|-------------|---------|
| Inline `<style>` | One per block, emitted by the renderer. |
| Document listeners | `change`, `keydown` and `focusin` on `document`, attached once when the factory runs in a browser. |
| `MutationObserver` | Watches `document.body` and initializes added containers. |
| `window` globals | `window.__markedExtendedTabsRuntimeReady__`, `window.initMarkedExtendedTabs()` (rescans the document). |
| Storage | `localStorage` key `marked-extended-tabs-active-<container id>`; errors are ignored. |
| Event | `tab-switched` on the container, bubbling, `detail: { tabId, timestamp }`, dispatched after the switch. |

On the server the runtime is skipped. `registerCallbacks(ref, { onBeforeSwitch, onAfterSwitch })` is exported; the
extension calls it for each block, so you rarely need it directly. See [Browser behavior](../guides/browser-behavior.md).

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-tabs/styles/tabs.css` | Structure. |
| `@fsegurai/marked-extended-tabs/styles/tabs-theme.css` | Optional theme, including the `tabs-compact`, `tabs-vertical` and `tabs-pills` variants. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Upgrading from 17](../guides/upgrading-from-17.md) (the syntax changed from `::::tabs` to a fenced block)
- [Combining extensions](../guides/combining-extensions.md)
