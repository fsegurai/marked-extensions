---
label: Tabs
description: Tabbed content from ::::tabs / :::tab blocks, rendered as CSS-only radio tabs with animations and an auto-attached keyboard and persistence runtime.
order: 11
tags: [ "extensions", "tabs" ]
keywords: [ "tablist", "tabpanel", "radio inputs", "persistSelection", "tab-switched" ]
---

# Tabs

`@fsegurai/marked-extended-tabs` renders a `::::tabs` block of `:::tab` items as radio inputs, `role="tab"` labels and
panels, plus an inline `<style>` block that shows the checked panel. Switching works without JavaScript; in a browser,
calling the factory also attaches a document-level runtime for ARIA sync, keyboard navigation and persistence.

## Quick path

```bash
npm install @fsegurai/marked-extended-tabs marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';
import '@fsegurai/marked-extended-tabs/styles/tabs.css';

marked.use(markedExtendedTabs()); // in a browser, also attaches the runtime
container.innerHTML = marked.parse(markdown); // picked up by a MutationObserver
```

## Syntax

```markdown
::::tabs
:::tab{label="JavaScript" icon="📜" active="true"}
JavaScript content
:::tabend

:::tab{label="Python" icon="🐍"}
Python content
:::tabend
::::tabsend
```

| Element | Forms |
|---------|-------|
| Container | `::::tabs` … `::::tabsend` (aliases `:tabs` / `:tbs` … `:tabsend` / `:tbsend`) |
| Tab | `:::tab{…}` … `:::tabend` (aliases `:tab` … `:tabend`) |

| Tab property | Description |
|--------------|-------------|
| `label="…"` | Tab label. Defaults to `Tab <n>`. Not escaped. |
| `icon="…"` | Emoji or text icon. Not escaped. |
| `active="true"` | Selects this tab initially. With `autoActivate`, the first tab is selected when none is. |

Content between the tags is parsed as block Markdown. There is no per-block variant and no fenced syntax in 17.

## Options

`markedExtendedTabs(options?: TabsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-tabs-container'` | Container class. The runtime only manages containers with this class. |
| `persistSelection` | `boolean` | `false` | Save the selected tab in `localStorage`. |
| `animation` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Panel animation in the inline `<style>`; invalid values warn and fall back to `fade`. |
| `autoActivate` | `boolean` | `true` | Select the first tab when none is `active`. |
| `enableKeyboardNavigation` | `boolean` | `true` | Arrow keys, Home/End, Enter/Space on labels. |
| `enableFocusManagement` | `boolean` | `true` | Roving `tabindex` and focus on the selected label. |
| `template` | `string \| null` | `null` | Custom container template (see placeholders below). |
| `customizeToken` | `(token: TabsToken) => void \| null` | `null` | Mutates each tabs token in `walkTokens`. |
| `onBeforeSwitch` | `(event: TabSwitchEvent) => boolean \| null` | `null` | Accepted and type-checked, but never called by the 17 runtime. |
| `onAfterSwitch` | `(event: TabSwitchEvent) => void \| null` | `null` | Accepted and type-checked, but never called by the 17 runtime. |

Note: the 17 README documents `onBeforeSwitch`/`onAfterSwitch` as working; the 17 source stores them on the token but
never invokes them. Use the `tab-switched` event instead. Template placeholders: `{tabsContainerId}`, `{className}`,
`{animation}`, `{runtimeAttrs}`, `{inputsNav}`, `{navList}`, `{content}`, `{stylesBehavior}`.

## Rendered HTML

```html
<div id="tabs-container-1" class="marked-extended-tabs-container" data-animation="fade"
     data-tabs-runtime="true" data-tabs-enable-keyboard-navigation="true"
     data-tabs-enable-focus-management="true" data-tabs-persist-selection="false"
     data-tabs-storage-key="marked-extended-tabs-active-tabs-container-1">
  <input type="radio" name="tabs-container-1-tabs" id="input-tabs-container-1-tab-0" class="marked-extended-tabs-input" checked>
  <div class="marked-extended-tabs-nav" role="tablist">
    <label for="input-tabs-container-1-tab-0" id="label-tabs-container-1-tab-0" class="marked-extended-tabs-label"
           role="tab" aria-selected="true" tabindex="0">
      <span class="marked-extended-tabs-icon">📜</span><span class="tab-label">JavaScript</span>
    </label>
  </div>
  <div class="marked-extended-tabs-content">
    <div class="marked-extended-tabs-content-pane" id="tabs-container-1-tab-0" role="tabpanel"
         aria-labelledby="input-tabs-container-1-tab-0">…</div>
  </div>
  <style>/* #tabs-container-1 #input-…:checked ~ … rules and keyframes */</style>
</div>
```

Ids come from a module-level counter that is never reset, so they keep increasing across `marked.parse` calls.

## Browser behavior

| Side effect | Details |
|-------------|---------|
| Inline `<style>` | One per block, emitted by the renderer. |
| Document listeners | `change`, `keydown` and `focusin` on `document`, attached once when the factory runs in a browser. |
| `MutationObserver` | Watches `document.body` and initializes added containers. |
| `window` globals | `window.__markedExtendedTabsRuntimeReady__`, `window.initMarkedExtendedTabs()` (rescans the document). |
| Storage | `localStorage` key `marked-extended-tabs-active-<container id>`; errors are ignored. |
| Event | `tab-switched` on the container, bubbling, `detail: { tabId, timestamp }`, dispatched after the switch. |

On the server the runtime is skipped. The package exports only the default factory and types. See
[Browser behavior](../guides/browser-behavior.md).

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-tabs/styles/tabs.css` | Structure. |
| `@fsegurai/marked-extended-tabs/styles/tabs-theme.css` | Optional theme. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Combining extensions](../guides/combining-extensions.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
