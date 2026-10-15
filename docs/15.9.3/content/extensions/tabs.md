---
label: Tabs
description: Tabbed content from ::::tabs blocks with :::tab items, switched with radio inputs and CSS only, with fade or slide animation and per-block styles.
order: 7
tags: [ "extensions", "tabs" ]
keywords: [ "tabbed content", "radio inputs", "css-only", "tb alias", "animation" ]
---

# Tabs

`@fsegurai/marked-extended-tabs` (15.0.1), new in the 15.9 line, renders a `::::tabs` block as a tab group. Switching
is CSS-only: each tab is a hidden radio input, and each block is followed by a `<style>` element with all of its CSS.

## Quick path

```bash
npm install @fsegurai/marked-extended-tabs marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';

marked.use(markedExtendedTabs({ animation: 'slide' }));
```

## Syntax

```markdown
::::tabs
:::tab{label="JavaScript" active="true"}
`console.log('Hello');`
:::tabend

:::tab{label="Python" icon="🐍"}
`print('Hello')`
:::tabend
::::tabsend
```

| Block | Opening | Closing | Aliases |
|-------|---------|---------|---------|
| Container | `::::tabs` (alone on its line) | `::::tabsend` | `:tb`, `:tabs` / `:tbend`, `:tabsend` |
| Item | `:::tab{…}` | `:::tabend` | `:t`, `:tab` / `:tend`, `:tabend` |

Items require `{…}`. The container must be followed by a line break, so it cannot carry properties: the source reads
a container `customClass` property, but `::::tabs{…}` never matches. Tab groups cannot be nested inside each other.

| Item property | Default | Description |
|---------------|---------|-------------|
| `label` | `""` | Tab label. Empty labels become `Tab 1`, `Tab 2`, … |
| `active` | `"false"` | `"true"` selects the tab initially. |
| `icon` | none | Text or HTML placed before the label. |

## Options

`markedExtendedTabs(options?: TabsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tabsClass` | `string` | `'marked-extended-tabs-container'` | Class of the container. |
| `customClass` | `string` | `''` | Appended **without a space** to the container and label classes, and with a space to the content class. Start the value with a space (`' my-tabs'`). |
| `animation` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Pane animation. Invalid values log a warning and become `'fade'`. |
| `autoActivate` | `boolean` | `true` | Select the first tab when none is `active`. |
| `persistSelection` | `boolean` | `true` | Declared, not implemented: selection is not persisted. |
| `storageKey` | `string` | `'marked-tabs-selection'` | Only normalized; never used for storage. |

There is no `template`, `customizeToken` or `injectStyles` option in 15.9.3. The only exported type is `TabsOptions`.

## Rendered HTML

```html
<div id="tabs-container-1" class="marked-extended-tabs-container" data-animation="fade">
  <input type="radio" name="tabs-container-1-tabs" id="input-tabs-container-1-tab-0" class="marked-extended-tabs-input" checked>
  <div class="marked-extended-tabs-nav" role="tablist">
    <label for="input-tabs-container-1-tab-0" id="label-tabs-container-1-tab-0" class="marked-extended-tabs-label"
           role="tab" aria-selected="true" data-tab-id="tabs-container-1-tab-0">
      <span class="tab-label">JavaScript</span>
    </label>
  </div>
  <div class="marked-extended-tabs-content ">
    <div class="marked-extended-tabs-content-pane" id="tabs-container-1-tab-0" role="tabpanel" aria-labelledby="input-tabs-container-1-tab-0">…</div>
  </div>
</div>
<style>/* layout, responsive rules, :checked rules and keyframes scoped to #tabs-container-1 */</style>
```

Container ids come from a module-level counter, so they keep increasing across parses. Pane content is parsed with
the global `marked.parse`.

## Browser behavior

| Item | Behavior |
|------|----------|
| Per-block `<style>` | All tab CSS, scoped to the container id, with responsive rules at 768px and 480px. The selected label uses `var(--marked-extended-tabs-selected-background)` and `var(--md-sys-color-primary)`. |
| Scripts, events, storage | None. |

## Next step

- [Timeline](timeline.md)
