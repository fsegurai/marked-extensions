---
label: Lists
description: Alphabetic and Roman ordered lists, skipped values and task checkboxes through a replacement list tokenizer and renderer.
order: 4
tags: [ "extensions", "lists" ]
keywords: [ "roman numerals", "alphabetic lists", "task list", "checkbox", "letterToInt" ]
---

# Lists

`@fsegurai/marked-extended-lists` (15.2.3) replaces Marked's `list` tokenizer and the `list` / `listitem` renderers.
It adds alphabetic (`a.`, `A.`) and Roman (`i.`, `IV.`) markers, `)` delimiters, values for skipped numbers and
task checkboxes. It takes no options and runs no browser code.

## Quick path

```bash
npm install @fsegurai/marked-extended-lists marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedLists from '@fsegurai/marked-extended-lists';

marked.use(markedExtendedLists());
```

## Syntax

```markdown
1. Numeric
   a. Lowercase letters
      i. Lowercase Roman
      ii. Second Roman item
   b. Back to letters

I. Uppercase Roman
II. Second

1. First item
3. Third item (skipped 2)

- [ ] Open task
- [x] Done task
```

| Marker | List type | Notes |
|--------|-----------|-------|
| `1.` `1)` | numeric | Up to 9 digits. |
| `i.` `v.` `x.` `l.` `c.` `ii.` `IV.` | Roman | Checked before letters, so single `i`, `v`, `x`, `l`, `c` (either case) start a Roman list. Upper-case Roman markers above `C` are not recognized. |
| `a.` `A.` | alphabetic | Other single letters. |

- Ordered lists render `type` when not numeric. There is no `start` attribute: when an item's number differs from
  the expected next number (including a first item other than 1), the item gets a `value` attribute.
- Task items need GFM (`gfm: true`, Marked's default).

## Options

`markedExtendedLists()` takes no arguments. `index.d.ts` also declares an `ExtendedListOptions` interface
(`pedantic`, `gfm`) that the factory does not accept; the tokenizer reads Marked's own `pedantic` and `gfm` options.

## Rendered HTML

```html
<ol type="a">
<li>Lowercase letters</li>
</ol>
<ol>
<li>First item</li>
<li value="3">Third item (skipped 2)</li>
</ol>
<ul>
<li><input disabled="" type="checkbox"> Open task</li>
<li><input checked="" disabled="" type="checkbox"> Done task</li>
</ul>
```

## Exports

`letterToInt(letter: string): number` and `romanToInt(roman: string): number` are named exports.

## Browser behavior

None. Checkboxes are always `disabled`.

## Next step

- [Spoiler](spoiler.md)
