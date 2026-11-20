---
label: Inline
description: Inline marks for highlighted, inserted, superscript and subscript text, with word-boundary rules so operators such as a == b stay text.
order: 7
tags: [ "extensions", "inline" ]
keywords: [ "highlight", "mark", "ins", "superscript", "subscript", "INLINE_MARKS" ]
badge: New
badgeColor: green
---

# Inline

`@fsegurai/marked-extended-inline` adds inline marks: `==highlight==` (on by default) and, when you enable them,
`++inserted++`, `^superscript^` and `~subscript~`. Each mark renders as one element with a class. It needs no
browser runtime.

## Quick path

```bash
npm install @fsegurai/marked-extended-inline marked
```

```js
import { marked } from 'marked';
import markedExtendedInline from '@fsegurai/marked-extended-inline';
import '@fsegurai/marked-extended-inline/styles/inline.css'; // optional

marked.use(markedExtendedInline({ marks: { ins: true, sup: true, sub: true } }));
marked.parse('==Remember==: H~2~O, E = mc^2^ and ++new text++');
```

## Syntax

| Mark | Syntax | Output | Default |
|------|--------|--------|---------|
| Highlight | `==text==` | `<mark class="mx-inline-mark">text</mark>` | on |
| Inserted | `++text++` | `<ins class="mx-inline-ins">text</ins>` | off |
| Superscript | `^text^` | `<sup class="mx-inline-sup">text</sup>` | off |
| Subscript | `~text~` | `<sub class="mx-inline-sub">text</sub>` | off |

### Boundary rules

Highlight and inserted text follow the rule Markdown applies to `_`:

- The text may not start or end with whitespace or the delimiter character: `== b==` and `====` stay text.
- No letter or digit may touch the delimiters from the outside: `==b==`, `(==b==)` and `**==b==**` work, while
  `a==b==c`, `C++ and C++` and `i++` stay text.
- A mark never spans lines.
- A delimiter character right before the opening delimiter, plain or escaped, is not part of it: `x ===b==` and
  `x\===b==` mark `b` (as in 18.0 hosts), while `==b===` stays text.

Superscript and subscript follow Pandoc: the text may not contain whitespace, but the mark may sit inside a word.
`x^2^`, `2^10^` and `H~2~O` work; `a ^b c^ d` stays text. A `^` right after `[` never opens a superscript, so
footnote references (`[^1]`) are never taken.

Marks contain inline Markdown (`==**bold** text==`), nest in emphasis and in each other (`==E = mc^2^==`). They never
apply in code, and an escaped delimiter (`\==b==`) stays text.

### GFM strikethrough

`~~text~~` is always strikethrough. Marked also reads a single `~text~` as strikethrough; with `sub` on, a single
`~text~` without whitespace becomes a subscript, while `~text with spaces~` stays strikethrough.

## Options

`markedExtendedInline(options?: InlineOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `marks` | `Partial<Record<'mark' \| 'ins' \| 'sup' \| 'sub', boolean \| InlineMarkOptions>>` | `mark` on; `ins`, `sup`, `sub` off | `true` enables a mark with its defaults, `false` disables it, an object enables it with those settings. |

`InlineMarkOptions`:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tag` | `string` | `mark`, `ins`, `sup`, `sub` | Element name (`[a-z][a-z0-9-]*`). An invalid name keeps the default and warns once. |
| `className` | `string` | `mx-inline-mark`, `mx-inline-ins`, `mx-inline-sup`, `mx-inline-sub` | `class` attribute (escaped); `''` renders no class. |

```js
marked.use(markedExtendedInline({
  marks: { mark: { tag: 'span', className: 'highlight' }, sup: true },
}));
```

The extension renders no strings of its own, so it has no `labels` option.

### Exported constants

| Constant | Value |
|----------|-------|
| `INLINE_MARKS` | `['mark', 'ins', 'sup', 'sub']` (frozen), in the order they are tried. |
| `INLINE_TOKEN_TYPES` | `{ mark: 'inlineMark', ins: 'inlineIns', sup: 'inlineSup', sub: 'inlineSub' }` (frozen). |
| `INLINE_MARK_DEFINITIONS` | Delimiter, default element, class and boundary rule of each mark (frozen). |

## Sanitizer notes

Each mark is one plain element with a `class` and nothing else, so Angular's `SecurityContext.HTML` keeps the output
unchanged. There is no `unsafeHtml` option and no runtime.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-inline/styles/inline.css` | Optional base styles (also `inline.scss`). |

### CSS classes

| Class | Element |
|-------|---------|
| `mx-inline-mark` | `<mark>` |
| `mx-inline-ins` | `<ins>` |
| `mx-inline-sup` | `<sup>` |
| `mx-inline-sub` | `<sub>` |

### CSS custom properties

| Property | Default |
|----------|---------|
| `--mx-inline-mark-background` | `rgba(255, 213, 0, 0.4)` |
| `--mx-inline-mark-color` | `inherit` |
| `--mx-inline-mark-padding` | `0 0.15em` |
| `--mx-inline-mark-radius` | `0.2em` |
| `--mx-inline-ins-color` | `inherit` |
| `--mx-inline-ins-decoration` | `underline` |
| `--mx-inline-script-size` | `0.75em` |

## Next step

- [Combining extensions](../guides/combining-extensions.md)
