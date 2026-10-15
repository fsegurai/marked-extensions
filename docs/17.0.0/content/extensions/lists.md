---
label: Lists
description: Alphabetic and Roman ordered lists, start and skipped values, and accessible task checkboxes with an optional inline toggle callback.
order: 7
tags: [ "extensions", "lists" ]
keywords: [ "roman numerals", "alphabetic lists", "task list", "checkbox", "onCheckboxChange" ]
---

# Lists

`@fsegurai/marked-extended-lists` replaces Marked's list tokenizer and renderer. It adds alphabetic (`a.`, `A.`) and
Roman (`i.`, `IV.`) markers, `)` delimiters, start values, skipped numbers and accessible task checkboxes. Numbering
needs no JavaScript; the checkbox callback uses an inline `onclick` handler and a `window` global.

## Quick path

```bash
npm install @fsegurai/marked-extended-lists marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedLists from '@fsegurai/marked-extended-lists';
import '@fsegurai/marked-extended-lists/styles/lists.css';
import '@fsegurai/marked-extended-lists/styles/lists-theme.css';

marked.use(markedExtendedLists({
  interactiveCheckboxes: true,
  onCheckboxChange: (id, checked) => save(id, checked),
}));
container.innerHTML = marked.parse(markdown);
```

## Syntax

```markdown
1. Numeric
   a. Lowercase letters
      i. Lowercase Roman
      ii. Second Roman item
   b. Back to letters
2. Back to numeric

a) A parenthesis delimiter works too

I. Uppercase Roman
II. Second

1. First item
3. Third item (skipped 2)

5. Start from five

- [ ] Open task
- [x] Done task
```

| Marker | List type | Notes |
|--------|-----------|-------|
| `1.` `1)` | numeric | Up to 9 digits. |
| `i.` `v.` `x.` `c.` `ii.` `IV.` | Roman | Checked before letters, so single `i`, `v`, `x`, `l`, `c` (either case) start a Roman list. |
| `a.` `A.` | alphabetic | Other single letters; the letter sets the start (`b.` starts at 2). |

- Ordered lists render `type` (non-numeric), `start` (when greater than 1) and `value` on skipped items.
- Changing the delimiter (`.` to `)`) starts a new list.

## Options

`markedExtendedLists(options?: ListsOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `checkboxClass` | `string` | `''` | Extra class on task checkboxes. |
| `checkboxAriaLabel` | `boolean` | `true` | `aria-label` on checkboxes (`Checked task item` / `Unchecked task item`). |
| `useStartAttribute` | `boolean` | `true` | `start` on ordered lists that do not start at 1. |
| `preserveTightness` | `boolean` | `true` | Declared but not read by the 17 renderer; tightness always follows the source. |
| `interactiveCheckboxes` | `boolean` | `false` | Enabled checkboxes with `data-raw`. |
| `onCheckboxChange` | `(checkboxId: string, checked: boolean, metadata?: TaskListMetadata) => void` | `undefined` | Called from the inline handler with `{ rawText }`. Needs `interactiveCheckboxes`. |

## Rendered HTML

```html
<ul>
<li><input type="checkbox" id="task-checkbox-1" disabled aria-label="Unchecked task item"> Open task</li>
</ul>
<ol type="a" start="2">
<li>…</li>
</ol>
```

With `interactiveCheckboxes: true` the input drops `disabled` and gains `data-raw`; with `onCheckboxChange` as well, it
also gains an inline `onclick`. Checkbox ids come from a module-level counter, so they keep increasing across parses.

## Browser behavior

| Item | Behavior |
|------|----------|
| Globals | With `interactiveCheckboxes` and `onCheckboxChange`, the factory sets `window.markedListsCallback` and creates an empty `window.markedListsCallbacks` object. |
| Inline handlers | `onclick` on each interactive checkbox calls `window.markedListsCallback('<id>', checked, { rawText })`. |
| Exported functions | `letterToInt`, `romanToInt` (converters). No editing runtime. |
| Injected `<script>`/`<style>`, listeners, events | None. |

The callback is global: the last factory call with a callback wins.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-lists/styles/lists.css` | List type styles and task checkbox layout. |
| `@fsegurai/marked-extended-lists/styles/lists-theme.css` | Optional theme. |

`lists.css` styles task lists through `ul[data-task-list]`, but the 17 renderer does not emit that attribute, so those
rules only apply if you add it yourself. SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Styling guide](../guides/styling.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
