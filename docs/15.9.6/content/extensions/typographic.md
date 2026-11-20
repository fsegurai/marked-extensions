---
label: Typographic
description: Symbol shortcodes such as (c^), (->) and (alpha), plus optional SmartyPants quotes, dashes and ellipses applied to the rendered HTML.
order: 9
tags: [ "extensions", "typographic" ]
keywords: [ "smartypants", "smart quotes", "symbols", "shortcodes", "customSymbols" ]
---

# Typographic

`@fsegurai/marked-extended-typographic` (15.2.3) replaces symbol shortcodes in the final HTML and can apply SmartyPants
quotes, dashes and ellipses. It runs in a `postprocess` hook and skips text inside tags such as `<pre>` and `<code>`.

## Quick path

```bash
npm install @fsegurai/marked-extended-typographic marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

marked.use(markedExtendedTypographic({ quotes: true, ellipses: true }));
```

## Syntax

| Group | Examples |
|-------|----------|
| Arrows and relations | `(->)` →, `(<-)` ←, `(<->)` ↔, `(=>)` ⇒, `(+-)` ±, `(x)` × |
| Typographic | `(c^)` ©, `(r^)` ®, `(--)` —, `(---)` –, `(middledot)` ·, `(bullet)` • |
| Math and logic | `(sum)` ∑, `(sqrt)` √, `(inf)` ∞, `(in)` ∈, `(forall)` ∀ |
| Greek letters | `(alpha)` α and the rest of the alphabet |
| Emoji | `(check)` ✅, `(warning)` ⚠️, `(heart)` ❤️, `(fire)` 🔥 |

The full mapping is in `src/custom-replacements.js`. Shortcodes are always replaced; the options below only control
the SmartyPants passes.

## Options

`markedExtendedTypographic(options?: TypographicSymbols)`

| Option | Type | Default (source) | Description |
|--------|------|------------------|-------------|
| `quotes` | `boolean` | `false` | Curly quotes. |
| `dashes` | `boolean` | `false` | Smart dashes. The source notes it can break CSS custom properties (`--variable`) in the HTML. |
| `ellipses` | `boolean` | `false` | `...` to an ellipsis. |
| `attribute` | `string \| number` | `'3'` | SmartyPants preset (`-1` to `3`) or letter flags (`q`, `b`, `B`, `d`, `D`, `i`, `e`, `w`). |
| `customSymbols` | `Record<string, string>` | `{}` | Extra replacements. Keys are regular expression sources, for example `'\\(tm\\)'`. |
| `outputUnicode` | `boolean` | `false` | Convert the generated entities to Unicode characters. |

`index.d.ts` documents `quotes`, `dashes`, `ellipses` and `outputUnicode` as defaulting to `true`; the source defaults
are `false`.

## Side effects in Marked

The factory overrides Marked's `inlineText` tokenizer so inline text is **not escaped**. Text such as `<` or `&` in
paragraphs reaches the HTML unchanged.

## Browser behavior

None.

## Next step

- [Combining extensions](../guides/combining-extensions.md)
