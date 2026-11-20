---
label: Tabs
description: Tabbed content from fenced tabs blocks, rendered as a WAI-ARIA tablist with variants, animations, keyboard navigation and persisted selection.
order: 14
tags: [ "extensions", "tabs" ]
keywords: [ "tablist", "tabpanel", "aria", "persistSelection", "attachTabs", "defaultTabsLabels" ]
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
| `label` | Tab label. Without it the tab is named `labels.untitledTab` plus its position (`Tab 2`). |
| `icon` | Emoji or text icon (escaped). |
| `active` | `true` selects this tab initially. Otherwise the first tab is selected. |

Override the variant for one block on the fence: ```` ```tabs{variant="vertical"} ````.

## Options

`markedExtendedTabs(options?: TabsOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-tabs'` | Root class. `mx-tabs` is always added, since the runtime looks for it. |
| `persistSelection` | `boolean` | `false` | Remember the selected tab (`mx-tabs-persist-true`; stored by the runtime). |
| `animation` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Panel animation; invalid values fall back to `fade`. |
| `variant` | `'compact' \| 'vertical' \| 'pills' \| ''` | `''` | Visual variant; invalid values are ignored. |
| `autoActivate` | `boolean` | `true` | Only changes the `unsafeHtml` markup. The default markup always selects one tab. |
| `enableKeyboardNavigation` | `boolean` | `true` | Arrow keys (`mx-tabs-keys-false` when off). |
| `enableFocusManagement` | `boolean` | `true` | Move focus to the selected tab (`mx-tabs-focus-false` when off). |
| `labels` | `Partial<TabsLabels>` | `defaultTabsLabels` | User-visible strings, see below. |
| `template` | `string \| null` | `null` | Custom template. |
| `customizeToken` | `(token: TabsToken) => void \| null` | `null` | Mutates each tabs token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 radio-input markup with a `<style>` block. |
| `onBeforeSwitch`, `onAfterSwitch` | callbacks | `null` | **Deprecated and ignored** (one-time warning). Use the events. |

### Labels

Labels are shallow-merged over the frozen `defaultTabsLabels`. Values are plain text: HTML-escaped, never templates.

| Key | Default | Used for |
|-----|---------|----------|
| `untitledTab` | `'Tab'` | Name of a tab without `label`, followed by its 1-based position. |
| `empty` | `'No tab content found'` | Message of a tabs block left without tabs (e.g. by `customizeToken`). |

```js
marked.use(markedExtendedTabs({ labels: { untitledTab: 'Pestaña' } }));
```

### Exported constants

| Constant | Value |
|----------|-------|
| `TABS_ANIMATIONS` | `['fade', 'slide', 'none']` (frozen) |
| `TABS_VARIANTS` | `['compact', 'vertical', 'pills']` (frozen) |
| `defaultTabsLabels` | The default labels (frozen) |

## Rendered HTML

```html
<div class="mx-tabs mx-tabs-id-tabs-1x2y3z mx-tabs-animation-fade">
  <div class="mx-tabs-nav" role="tablist" aria-orientation="horizontal">
    <span class="mx-tabs-label mx-is-active mx-tabs-tab-0" role="tab" tabindex="0" aria-selected="true">
      <span class="mx-tabs-icon" aria-hidden="true">📜</span><span class="mx-tabs-label-text">JavaScript</span>
    </span>
    <span class="mx-tabs-label mx-tabs-tab-1" role="tab" tabindex="-1" aria-selected="false">…</span>
  </div>
  <div class="mx-tabs-content">
    <div class="mx-tabs-content-pane mx-tabs-panel-0" role="tabpanel">…</div>
    <div class="mx-tabs-content-pane mx-tabs-panel-1" role="tabpanel" hidden>…</div>
  </div>
</div>
```

Ids are content hashes (`tabs-<hash>`, `-2` for repeats). Tabs and panels pair by class token
(`mx-tabs-tab-<n>` ↔ `mx-tabs-panel-<n>`); `attachTabs` adds the ids, `aria-controls` and `aria-labelledby`.

### Sanitizer notes

The default markup keeps all state in `class`, `role`, `aria-*`, `tabindex` and `hidden`, so Angular's
`SecurityContext.HTML` keeps it unchanged. `unsafeHtml: true` emits hidden radio `<input>`s, `<label for>`, a
`<style>` block, `id`s and `data-tabs-*`; a sanitizer strips those, so only use it with unsanitized HTML.

## Runtime

`attachTabs(root, options?)` returns a dispose function. It handles click, arrow keys (Up/Down when vertical),
Home/End and Enter/Space, with a roving `tabindex`. It is idempotent per root; `attachTabs.refresh(root)` re-applies
ids and the persisted selection after the content changes.

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
| `marked-extended:tabs:switch` | same | After the switch. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-tabs/styles/tabs.css` | Structure, variants and animations (off under reduced motion). |
| `@fsegurai/marked-extended-tabs/styles/tabs-theme.css` | Optional theme (reads the host's `body.dark`). |

### CSS classes

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-tabs` | container | Root and runtime hook. |
| `mx-tabs--compact`, `mx-tabs--vertical`, `mx-tabs--pills` | container | `variant` modifiers. |
| `mx-tabs-nav` | `role="tablist"` | Tab list. |
| `mx-tabs-label`, `mx-tabs-label-text`, `mx-tabs-icon` | tab | Tab, its text and icon. |
| `mx-tabs-content`, `mx-tabs-content-pane` | panels | Panels wrapper and panel. |
| `mx-tabs-input` | `<input type="radio">` | `unsafeHtml` markup only. |
| `mx-tabs-error` | `<div>` | `labels.empty` message. |
| `mx-is-active` | tab | Selected tab. |
| `mx-tabs-animation-fade`, `mx-tabs-animation-slide` | container | Animation class tokens (styled). |
| `mx-tabs-id-*`, `-tab-*`, `-panel-*`, `-persist-*`, `-keys-*`, `-focus-*` | various | Class tokens read by `attachTabs`. |

### CSS custom properties

| Property | Default |
|----------|---------|
| `--mx-tabs-animation-duration` | `0.3s` |
| `--mx-tabs-border-color` | `#ddd` |
| `--mx-tabs-border-radius` | `4px` |
| `--mx-tabs-container-bg` | `#fff` |
| `--mx-tabs-container-shadow` | `0 1px 3px rgba(0, 0, 0, 0.05)` |
| `--mx-tabs-content-background` | `#fff` |
| `--mx-tabs-content-color` | `inherit` |
| `--mx-tabs-focus-outline` | `#4a9eff` |
| `--mx-tabs-label-bg` | `transparent` |
| `--mx-tabs-label-color` | `#333` |
| `--mx-tabs-label-gap` | `0.5rem` |
| `--mx-tabs-label-hover-bg` | `#e8e8e8` |
| `--mx-tabs-label-hover-color` | `#222` |
| `--mx-tabs-label-padding` | `0.75rem 1rem` |
| `--mx-tabs-margin` | `1rem 0` |
| `--mx-tabs-nav-bg` | `#f5f5f5` |
| `--mx-tabs-nav-border-color` | `#ddd` |
| `--mx-tabs-pills-hover-bg` | `#e9ecef` |
| `--mx-tabs-pills-nav-bg` | `#f8f9fa` |
| `--mx-tabs-scrollbar-thumb` | `#888` |
| `--mx-tabs-scrollbar-thumb-hover` | `#555` |
| `--mx-tabs-scrollbar-track` | `#f1f1f1` |
| `--mx-tabs-selected-background` | `#fff` |
| `--mx-tabs-selected-border-color` | `#0066cc` |
| `--mx-tabs-selected-color` | `#0066cc` |
| `--mx-tabs-transition` | `all 0.2s ease` |

## Changes in 18.1.0

- Classes move to the `mx-` convention: `marked-extended-tabs-*` → `mx-tabs-*`, `tab-label` → `mx-tabs-label-text`,
  `tabs-compact`/`-vertical`/`-pills` → `mx-tabs--compact`/`--vertical`/`--pills`, `error-message` →
  `mx-tabs-error`, `active` → `mx-is-active`, `--marked-extended-tabs-*` → `--mx-tabs-*`. No aliases.
- `className` defaults to `'mx-tabs'`.
- New `labels` option and exported `defaultTabsLabels`, `TABS_ANIMATIONS`, `TABS_VARIANTS`.
- The `localStorage` key is unchanged (`marked-extended-tabs:<tabs id>`).

## Next step

- [Runtime contract](../guides/runtime-contract.md)
