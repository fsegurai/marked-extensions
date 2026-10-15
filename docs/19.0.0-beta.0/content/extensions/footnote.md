---
label: Footnote
description: Numbered, named and inline footnotes with backlinks, hover previews and an endnotes section placed automatically or with a placeholder.
order: 6
tags: [ "extensions", "footnote" ]
keywords: [ "endnotes", "references", "backlinks", "hover preview", "attachFootnotes" ]
---

# Footnote

`@fsegurai/marked-extended-footnote` renders `[^id]` references, `^[inline]` footnotes and `[^id]: …` definitions into
a numbered endnotes `<section>`. The optional runtime adds smooth scrolling with an offset and hover previews.

## Quick path

```bash
npm install @fsegurai/marked-extended-footnote marked
```

```js
import { marked } from 'marked';
import markedExtendedFootnote, { attachFootnotes } from '@fsegurai/marked-extended-footnote';
import '@fsegurai/marked-extended-footnote/styles/footnote.css';

marked.use(markedExtendedFootnote());
container.innerHTML = marked.parse(markdown);
const dispose = attachFootnotes(container, { scrollOffset: 80 });
```

## Syntax

```markdown
Text with a footnote[^1] and a named one[^key-concept].
Quick note^[Inline footnotes need no definition].
The same source again[^1].

[^1]: Footnote content.
[^key-concept]: Definitions support **Markdown**; indent continuation lines.

[footnotes]
```

- Display numbers are contiguous, in document order, and only for references that have a definition. An undefined
  reference renders as plain text.
- The section is appended at the end of the output, or placed where the `placeholderText` line (`[footnotes]`)
  appears.

## Options

`markedExtendedFootnote(options?: FootnoteOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefixId` | `string` | `'fnref-'` | Prefix of footnote ids. |
| `description` | `string` | `'Footnotes'` | Section heading (screen-reader only) and accessible names. |
| `refMarkers` | `boolean` | `false` | Show references in brackets (`[1]`). |
| `backrefSymbol` | `string` | `'↩'` | Backlink symbol. |
| `backrefLinks` | `boolean` | `true` | Add backlinks to each definition. |
| `placeholderText` | `string` | `'[footnotes]'` | Line that marks where the section goes. |
| `labelFormat` | `(id: string, number: number) => string \| number` | `(id, n) => n` | Formats the visible label. |
| `hoverPreview` | `boolean` | `true` | Hover previews of the definition. |
| `hoverPreviewMaxLength` | `number` | `200` | Maximum preview length. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id` targets, `data-fnref-*`, `data-footnotes`, `data-footnote-preview`). |
| `smoothScroll`, `scrollOffset` | `boolean`, `number` | `true`, `80` | **Deprecated and ignored** (one-time warning). Pass them to `attachFootnotes`. |

## Rendered HTML

```html
<sup><a class="footnote-ref mx-footnote-id-fnref-ref-1" href="#fnref-1" role="doc-noteref" aria-label="Footnotes 1">1</a></sup>
…
<section class="footnotes" role="doc-endnotes" aria-label="Footnotes">
  <h2 class="sr-only">Footnotes</h2>
  <ol>
    <li class="mx-footnote-id-fnref-1" value="1" tabindex="-1">… <a href="#fnref-ref-1" class="footnote-backref" role="doc-backlink">↩</a></li>
  </ol>
</section>
```

| 18.0 / `unsafeHtml` | 19 default |
|---------------------|------------|
| `<li id="fnref-1">` | `<li class="mx-footnote-id-fnref-1" tabindex="-1">` |
| `data-footnote-preview="…"` | `mx-footnote-preview-<maxLength>`; the runtime fills the preview |
| `data-footnotes`, `<h2 id="fnref-label">` | removed; names use `aria-label` |
| `:target` | `.footnote-targeted`, added by the runtime |

## Runtime

`attachFootnotes(root, options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `smoothScroll` | `boolean` | `true` | Smooth scrolling (instant with reduced motion). |
| `scrollOffset` | `number` | `80` | Pixels kept above the target (fixed headers). |
| `updateHash` | `boolean` | `false` | `history.pushState` after navigating. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

- Event: `marked-extended:footnote:navigate` with `detail: { id, kind: 'ref' | 'backref' }`.
- Hover previews fill on the first hover or focus; `attachFootnotes.refresh(root)` fills them all.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-footnote/styles/footnote.css` | Structure, `.footnote-targeted` and previews (both markups). |
| `@fsegurai/marked-extended-footnote/styles/footnote-theme.css` | Optional theme. |

## Next step

- [Runtime contract](../guides/runtime-contract.md)
