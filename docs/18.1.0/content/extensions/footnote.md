---
label: Footnote
description: Numbered, named and inline footnotes with backlinks, labels, hover previews and an endnotes section placed automatically or with a placeholder.
order: 6
tags: [ "extensions", "footnote" ]
keywords: [ "endnotes", "references", "backlinks", "hover preview", "attachFootnotes" ]
---

# Footnote

`@fsegurai/marked-extended-footnote` renders `[^id]` references, `^[inline]` footnotes and `[^id]: …` definitions into
a numbered endnotes `<section>`. The optional runtime adds smooth scrolling with an offset and hover previews.

## Install

```bash
npm install @fsegurai/marked-extended-footnote marked
```

## Usage

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
- The section is appended at the end of the output, or placed where a paragraph holding only `placeholderText`
  (`[footnotes]`) appears.
- Definitions are rendered with the Marked instance being parsed, so extensions registered on that instance apply
  inside them (not the ones on the global `marked`).

## Options

`markedExtendedFootnote(options?: FootnoteOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefixId` | `string` | `'fnref-'` | Prefix of footnote ids. |
| `labels` | `Partial<FootnoteLabels>` | `defaultFootnoteLabels` | User-visible strings, shallow-merged and HTML-escaped. |
| `description` | `string` | `'Footnotes'` | **Deprecated**: use `labels.heading`, which wins when both are set. |
| `refMarkers` | `boolean` | `false` | Show references in brackets (`[1]`). |
| `backrefSymbol` | `string` | `'↩'` | Backlink symbol. |
| `backrefLinks` | `boolean` | `true` | Add backlinks to each definition. |
| `placeholderText` | `string` | `'[footnotes]'` | Paragraph text that marks where the section goes. |
| `labelFormat` | `(id: string, number: number) => string \| number` | `(id, n) => n` | Formats the visible label. |
| `hoverPreview` | `boolean` | `true` | Hover previews of the definition. |
| `hoverPreviewMaxLength` | `number` | `200` | Maximum preview length. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id` targets, `data-fnref-*`, `data-footnotes`, `data-footnote-preview`). |

`labels` keys:

| Key | Default | Used for |
|-----|---------|----------|
| `heading` | `'Footnotes'` | Section heading, section `aria-label`, and reference `aria-label` (`Footnotes 1`). |
| `backReference` | `'Back to reference'` | Start of each backlink's `aria-label` (`Back to reference 1`). |

`smoothScroll` and `scrollOffset` are not extension options: pass them to `attachFootnotes`. Passing them to the
extension prints one `console.warn`.

## Rendered HTML

```html
<sup><a class="mx-footnote-ref mx-footnote-id-fnref-ref-1 mx-footnote-preview-200" href="#fnref-1"
        role="doc-noteref" aria-label="Footnotes 1">1</a></sup>
…
<section class="mx-footnote" role="doc-endnotes" aria-label="Footnotes">
  <h2 class="mx-footnote-heading">Footnotes</h2>
  <ol>
    <li class="mx-footnote-id-fnref-1" value="1" tabindex="-1">
      <p>… <a href="#fnref-ref-1" class="mx-footnote-backref" role="doc-backlink" aria-label="Back to reference 1">↩</a></p>
    </li>
  </ol>
</section>
```

## Sanitizer notes

The default markup survives Angular's `SecurityContext.HTML`: no `id` and no `data-*`. Targets are named with core
class tokens (`mx-footnote-id-<id>`) that the runtime resolves; the `href="#…"` links are kept.

| `unsafeHtml: true` (18.0) | Default |
|---------------------------|---------|
| `<li id="fnref-1">`, `<a id="fnref-ref-1" … data-fnref-ref>` | `<li class="mx-footnote-id-fnref-1" tabindex="-1">`, `<a class="mx-footnote-ref mx-footnote-id-fnref-ref-1">` |
| `data-footnote-preview="…"` | `mx-footnote-preview-<maxLength>`; the runtime fills the preview |
| `data-footnotes`, `data-fnref-backref`, `<h2 id="fnref-label">`, `aria-labelledby` | removed; names use `aria-label` |
| `:target` | `mx-is-targeted`, added by the runtime |

## CSS classes

| Class | Element | Purpose |
|-------|---------|---------|
| `mx-footnote` | `section` | Root: the endnotes section. |
| `mx-footnote-heading` | `h2` | Section heading, visually hidden by `footnote.css`. |
| `mx-footnote-ref` | `a` | In-text reference (inside a `<sup>`). |
| `mx-footnote-backref` | `a` | Link back to the reference. |
| `mx-footnote-id-<id>` | `a`, `li` | Class token naming a reference or definition. |
| `mx-footnote-preview-<max>` | `a` | Class token asking the runtime to fill the preview. |
| `mx-is-targeted` | `a`, `li` | Set by the runtime on the element jumped to. |

## CSS custom properties

Every value is read with a fallback; `footnote-theme.css` defines the colors on `:root` and overrides them under
`body.dark`.

| Property | Default | Purpose |
|----------|---------|---------|
| `--mx-footnote-section-margin-top` | `3rem` | Space above the section. |
| `--mx-footnote-section-padding-top` | `1.5rem` | Padding above the list. |
| `--mx-footnote-scroll-offset` | `80px` | `scroll-margin-top` of the section and items. |
| `--mx-footnote-list-padding` | `1.5rem` | List left padding. |
| `--mx-footnote-item-margin` | `0.75rem` | Space below each item. |
| `--mx-footnote-item-line-height` | `1.6` | Item line height. |
| `--mx-footnote-backref-margin` | `0.25rem` (`0.5rem` in the theme) | Space before the back link. |
| `--mx-footnote-backref-font-size` | `1.1em` | Back link size. |
| `--mx-footnote-backref-color`, `--mx-footnote-backref-hover-color` | `#3b82f6`, `#2563eb` | Back link colors. |
| `--mx-footnote-ref-color`, `--mx-footnote-ref-hover-color` | `#0066cc`, `#0052a3` | Reference colors. |
| `--mx-footnote-ref-hover-bg` | `rgba(0, 102, 204, 0.1)` | Reference hover background. |
| `--mx-footnote-ref-radius`, `--mx-footnote-ref-padding` | `3px`, `0 2px` | Reference shape. |
| `--mx-footnote-tooltip-bg`, `--mx-footnote-tooltip-color` | `#2a2a2a`, `#ffffff` | Preview colors. |
| `--mx-footnote-tooltip-shadow` | `0 4px 12px rgba(0, 0, 0, 0.15)` | Preview shadow. |
| `--mx-footnote-tooltip-radius`, `--mx-footnote-tooltip-padding`, `--mx-footnote-tooltip-font-size` | `6px`, `8px 12px`, `0.875rem` | Preview shape. |
| `--mx-footnote-section-bg` | `#eff6ff` | Section background. |
| `--mx-footnote-section-border-color`, `--mx-footnote-section-border-width` | `#3b82f6`, `3px` | Section top border. |
| `--mx-footnote-section-radius`, `--mx-footnote-section-padding` | `8px`, `1.5rem` | Section shape. |
| `--mx-footnote-marker-color` | `#6b7280` | List number color. |
| `--mx-footnote-target-bg` | `rgba(255, 229, 100, 0.45)` | Highlight of the targeted element. |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-footnote/styles/footnote.css` | Structure, `mx-is-targeted` and previews (both markups). |
| `@fsegurai/marked-extended-footnote/styles/footnote-theme.css` | Optional theme. |

## Runtime

`attachFootnotes(root, options?)` returns a `dispose` function. It is idempotent per root and listens on `root` only.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `smoothScroll` | `boolean` | `true` | Smooth scrolling (instant with reduced motion). |
| `scrollOffset` | `number` | `80` | Pixels kept above the target (fixed headers). |
| `updateHash` | `boolean` | `false` | `history.pushState` after navigating. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

- Event: `marked-extended:footnote:navigate`, dispatched on the target, with `detail: { id, kind: 'ref' | 'backref' }`.
- Hover previews fill on the first hover or focus; `attachFootnotes.refresh(root)` fills them all.
- The runtime drives both the default and the `unsafeHtml` markup.

## Exported constants

| Export | Value |
|--------|-------|
| `defaultFootnoteLabels` | Frozen `{ heading: 'Footnotes', backReference: 'Back to reference' }`. |
| `attachFootnotes` | The runtime (`runtimeName`, `isAttached(root)`, `refresh(root)`). |
| `footnoteTokenClass(id)` | The class (`mx-footnote-id-<id>`, bytes outside `[A-Za-z0-9-]` encoded as `_xx`) that names the element whose 18.0 `id` was `id`. |

## Changes in 18.1.0

- Classes renamed: `footnotes` → `mx-footnote`, `sr-only` heading → `mx-footnote-heading`, `footnote-backref` →
  `mx-footnote-backref`. References (`a[data-fnref-ref]` in 18.0) get `mx-footnote-ref`, and `attachFootnotes` marks
  the targeted definition with `mx-is-targeted` instead of relying on `:target`.
- Custom properties renamed from `--marked-footnote-*` to `--mx-footnote-*`; keyframes are `mx-footnote-fade-in` and
  `mx-footnote-target-fade`.
- `smoothScroll` and `scrollOffset` removed from `FootnoteOptions`; they are runtime options of `attachFootnotes`.
- New `labels` option and `defaultFootnoteLabels`; `description` is deprecated.
- Footnote content is rendered with the parsing instance, no longer with the global `marked`.
- New `footnoteTokenClass(id)`: the class of the element whose 18.0 `id` was `id`, for hosts that resolve `#fragment` links.

## Next step

- [Runtime contract](../guides/runtime-contract.md)
