---
label: Footnote
description: Numbered footnote references, definitions and an endnotes section with backlinks, custom labels and an optional placement marker.
order: 3
tags: [ "extensions", "footnote" ]
keywords: [ "footnotes", "endnotes", "references", "labelFormat", "backlinks" ]
---

# Footnote

`@fsegurai/marked-extended-footnote` (15.2.2) numbers `[^id]` references, collects `[^id]: …` definitions and appends
a footnotes section. It injects no styles and runs no browser code.

## Quick path

```bash
npm install @fsegurai/marked-extended-footnote marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';

marked.use(markedExtendedFootnote({ refMarkers: true }));
```

## Syntax

```markdown
Marked is fast[^speed] and extensible[^ext].

[^speed]: Benchmarks live in the Marked repository.
[^ext]: Through `marked.use()`.

[footnotes]
```

| Syntax | Meaning |
|--------|---------|
| `[^id]` | Reference. Numbers follow the order of the first reference to each id. |
| `[^id]: text` | Definition, at the start of a block. It runs until a blank line or the next `[^`. Definitions render nothing in place. |
| `[footnotes]` | Optional marker (`placeholderText`) where the section is rendered. Without it, the section is appended to the end of the HTML. |

Only footnotes that have both a reference and a definition are listed.

## Options

`markedExtendedFootnote(options?: FootnoteEnhancedOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefixId` | `string` | `'fnref-'` | Prefix of footnote ids. |
| `description` | `string` | `'Footnotes'` | Text of the visually hidden section heading. |
| `refMarkers` | `boolean` | `false` | Wrap reference labels in brackets (`[1]`). |
| `backrefSymbol` | `string` | `'↩'` | Text of backlinks. |
| `backrefLinks` | `boolean` | `true` | Add a backlink to each footnote. |
| `placeholderText` | `string` | `'[footnotes]'` | Marker for the section position. |
| `labelFormat` | `(id, number) => string \| number` | `(id, number) => number` | Label of references and backlink `aria-label`s. |

## Rendered HTML

```html
<p>Marked is fast<sup><a id="fnref-ref-speed" href="#fnref-speed" data-fnref-ref aria-describedby="fnref-label">1</a></sup> …</p>
<section class="footnotes" data-footnotes>
  <h2 id="fnref-label" class="sr-only">Footnotes</h2>
  <ol>
    <li id="fnref-speed" value="1">
      <p>Benchmarks live in the Marked repository. <a href="#fnref-ref-speed" data-fnref-backref aria-label="Back to reference 1">↩</a></p>
    </li>
  </ol>
</section>
```

Footnote content is parsed with the global `marked.parse`. The package ships no CSS, so define `.sr-only` yourself to
hide the heading visually.

## Browser behavior

None: no injected styles, scripts or listeners.

## Next step

- [Lists](lists.md)
