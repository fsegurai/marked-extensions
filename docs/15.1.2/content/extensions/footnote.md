---
label: Footnote
description: Numbered footnote references and definitions with an endnotes section and backlinks, configured with prefixId, description and refMarkers.
order: 2
tags: [ "extensions", "footnote" ]
keywords: [ "footnotes", "endnotes", "references", "refMarkers", "backlinks" ]
---

# Footnote

`@fsegurai/marked-extended-footnote` (15.1.0) numbers `[^id]` references, collects `[^id]: …` definitions and appends
a footnotes section to the end of the document. It injects no styles and runs no browser code.

## Quick path

```bash
npm install @fsegurai/marked-extended-footnote marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';

marked.use(markedExtendedFootnote());
```

## Syntax

```markdown
Marked is fast[^speed] and extensible[^ext].

[^speed]: Benchmarks live in the Marked repository.
[^ext]:
    Through `marked.use()`.
    Continuation lines are indented by at least four spaces.
```

| Syntax | Meaning |
|--------|---------|
| `[^id]` | Reference. Numbers follow the order of the first reference to each id. A reference without a definition stays as literal text. |
| `[^id]: text` | Definition, at the start of a block. Following lines indented by at least 4 spaces belong to it. Definitions render nothing in place. |

Only footnotes that are both defined and referenced are listed. The section is always appended at the end of the
document; there is no placement marker in 15.1.2.

## Options

`markedExtendedFootnote(options?: Options)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefixId` | `string` | `'fnref-'` | Prefix of ids and `data-` attributes. |
| `description` | `string` | `'Footnotes'` | Text of the visually hidden section heading. |
| `refMarkers` | `boolean` | `false` | Wrap reference numbers in brackets (`[1]`). |

## Rendered HTML

```html
<p>Marked is fast<sup><a id="fnref-ref-speed" href="#fnref-speed" data-fnref-ref aria-describedby="fnref-label">1</a></sup> …</p>
<section class="footnotes" data-footnotes>
<h2 id="fnref-label" class="sr-only">Footnotes</h2>
<ol>
<li id="fnref-speed">
<p>Benchmarks live in the Marked repository. <a href="#fnref-ref-speed" data-fnref-backref aria-label="Back to reference speed">↩</a></p>
</li>
</ol>
</section>
```

| Detail | Behavior |
|--------|----------|
| Ids | Built from the label (`fnref-ref-<label>`, `fnref-<label>`), URI-encoded. |
| Repeated references | Every reference to the same label gets the same `id`; the footnote gets one backlink per reference (`↩`, `↩<sup>2</sup>`, …). |
| Backlink label | `aria-label="Back to reference <label>"`. |
| Content | Parsed with the parser of the Marked instance in use. |

The package README shows a different output (`fnref:1`, `footnote-ref`, `<div class="footnotes">`); the list above is
what the source renders. The package ships no CSS, so define `.sr-only` yourself to hide the heading visually.

## Browser behavior

None: no injected styles, scripts or listeners.

## Next step

- [Lists](lists.md)
