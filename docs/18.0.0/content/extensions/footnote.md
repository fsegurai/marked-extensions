---
label: Footnote
description: Numbered, named and inline footnotes with backlinks, CSS hover previews and an endnotes section placed automatically or with a placeholder.
order: 5
tags: [ "extensions", "footnote" ]
keywords: [ "endnotes", "references", "backlinks", "hover preview", "smooth scroll" ]
---

# Footnote

`@fsegurai/marked-extended-footnote` renders `[^id]` references, `^[inline]` footnotes and `[^id]: …` definitions into
a numbered endnotes `<section>`. No setup call is needed in the browser, but with `smoothScroll: true` (the default)
creating the extension registers a global `document` click listener.

## Quick path

```bash
npm install @fsegurai/marked-extended-footnote marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import '@fsegurai/marked-extended-footnote/styles/footnote.css';
import '@fsegurai/marked-extended-footnote/styles/footnote-theme.css';

marked.use(markedExtendedFootnote());
container.innerHTML = marked.parse(markdown);
```

## Syntax

```markdown
Text with a footnote[^1] and a named one[^key-concept].
Quick note^[Inline footnotes need no definition].
The same source again[^1].

[^1]: Footnote content.
[^key-concept]: Definitions support **Markdown**.
    Indent continuation lines by 4 spaces or a tab.

[footnotes]
```

| Construct | Form | Notes |
|-----------|------|-------|
| Reference | `[^id]` | Repeated references get extra backlinks (`a`, `b`, …). |
| Inline footnote | `^[text]` | Id is `inline-<hash of text>`; identical text de-duplicates. |
| Definition | `[^id]: text` | Continues over blank or indented (4 spaces / tab) lines. |
| Placeholder | `[footnotes]` | Places the section here instead of at the end. |

- Display numbers are contiguous, in document order, and only for references that have a definition. An undefined
  reference renders as its literal text.
- Ids are slugified (lowercase, `[a-z0-9_-]`) before going into `id`/`href`.
- State resets at the start of every `marked.parse` call.

## Options

`markedExtendedFootnote(options?: FootnoteOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefixId` | `string` | `'fnref-'` | Prefix of footnote ids. |
| `description` | `string` | `'Footnotes'` | Section heading text (screen-reader only). |
| `refMarkers` | `boolean` | `false` | Show references in brackets (`[1]`). |
| `backrefSymbol` | `string` | `'↩'` | Backlink symbol. |
| `backrefLinks` | `boolean` | `true` | Add backlinks to each definition. |
| `placeholderText` | `string` | `'[footnotes]'` | Line that marks where the section goes. |
| `labelFormat` | `(id: string, number: number) => string \| number` | `(id, n) => n` | Formats the visible label. |
| `smoothScroll` | `boolean` | `true` | Install the global click handler described under Browser behavior. |
| `scrollOffset` | `number` | `80` | Pixels kept above the target when scrolling. |
| `hoverPreview` | `boolean` | `true` | Emit `data-footnote-preview` with a plain-text preview. |
| `hoverPreviewMaxLength` | `number` | `200` | Maximum preview length (then `...`). |

## Rendered HTML

```html
<sup><a id="fnref-ref-1" href="#fnref-1" role="doc-noteref" data-fnref-ref aria-describedby="fnref-label" data-footnote-preview="Footnote content.">1</a></sup>
…
<section class="footnotes" role="doc-endnotes" aria-labelledby="fnref-label" data-footnotes>
  <h2 id="fnref-label" class="sr-only">Footnotes</h2>
  <ol>
    <li id="fnref-1" value="1">
      <p>Footnote content. <a href="#fnref-ref-1" class="footnote-backref" role="doc-backlink" data-fnref-backref aria-label="Back to reference 1">↩</a></p>
    </li>
  </ol>
</section>
```

Definition content is parsed with the global `marked` instance (`marked.parser(marked.lexer(…))`).

## Browser behavior

| Item | Behavior |
|------|----------|
| Exported functions | None besides the default factory (types only). |
| Global listener | With `smoothScroll`, `document.addEventListener('click', …)` once per factory call. Skipped when `window` is undefined. |
| On click of `a[data-fnref-ref]` / `a[data-fnref-backref]` | `scrollTo` with `scrollOffset` (instant under `prefers-reduced-motion`), `history.pushState` with the hash, focus the target. |
| Hover preview | Pure CSS: `footnote-theme.css` shows `attr(data-footnote-preview)` on `:hover`. |
| Injected `<script>`/`<style>`, events | None. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-footnote/styles/footnote.css` | Structure of references and the section. |
| `@fsegurai/marked-extended-footnote/styles/footnote-theme.css` | Colors, hover preview tooltip, `:target` highlight. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Browser behavior guide](../guides/browser-behavior.md)
- [Styling guide](../guides/styling.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
