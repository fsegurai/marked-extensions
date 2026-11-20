---
label: Tabs
description: Tabbed content from ::::tabs blocks with :::tab items, switched with radio inputs and CSS only, with fade or slide animation.
order: 7
tags: [ "extensions", "tabs" ]
keywords: [ "tabbed content", "radio inputs", "css-only", "tb alias", "animation" ]
---

# Tabs

`@fsegurai/marked-extended-tabs` (15.1.0) renders a `::::tabs` block as a tab group. Switching is CSS-only: each tab
is a hidden radio input, and each block carries its own `<style>` element with the selection rules.

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

Items require `{…}`. The container takes no properties. Tab groups cannot be nested inside each other (the container is
matched with a non-balanced regular expression).

| Item property | Default | Description |
|---------------|---------|-------------|
| `label` | `""` | Tab label. Empty labels become `Tab 1`, `Tab 2`, … |
| `active` | `"false"` | `"true"` selects the tab initially. |
| `icon` | none | Text or HTML placed before the label. |

## Options

`markedExtendedTabs(options?: TabsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-tabs-container'` | Class of the container. The injected stylesheet always targets `.marked-extended-tabs-container`. |
| `animation` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Pane animation. Invalid values log a warning and become `'fade'`. |
| `autoActivate` | `boolean` | `true` | Select the first tab when none is `active`. |
| `persistSelection` | `boolean` | `true` | Declared and defaulted, but not read by the source: selection is not persisted. |
| `template` | `string` | `null` | Custom HTML template. |
| `customizeToken` | `(token) => void` | `null` | Called for each tabs token in `walkTokens`. |
| `injectStyles` | `boolean` | `true` | Append the default stylesheet to `document.head`. |

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
  <div class="marked-extended-tabs-content">
    <div class="marked-extended-tabs-content-pane" id="tabs-container-1-tab-0" role="tabpanel" aria-labelledby="input-tabs-container-1-tab-0">…</div>
  </div>
  <style>/* :checked rules and keyframes for this container */</style>
</div>
```

Container ids come from a module-level counter, so they keep increasing across parses. Pane content is parsed with
the global `marked.parse`. Template placeholders: `{tabsContainerId}`, `{className}`, `{animation}`, `{inputsNav}`,
`{navList}`, `{content}`, `{stylesBehavior}`.

## Browser behavior

| Item | Behavior |
|------|----------|
| Injected stylesheet | `<style id="marked-extended-tabs-styles">` once per page (`injectStyles`), with responsive rules at 768px and 480px. |
| Per-block `<style>` | Shows the pane of the checked input and highlights its label with `var(--marked-extended-tabs-selected-background)` and `var(--md-sys-color-primary)`. |
| Scripts, events, storage | None. |

## Next step

- [Timeline](timeline.md)
