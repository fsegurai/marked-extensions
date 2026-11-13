---
label: Typographic
description: Symbol shortcodes such as (c^), (==) and (alpha), plus SmartyPants dashes and ellipses applied to the rendered HTML, configured with a single attr argument.
order: 6
tags: [ "extensions", "typographic" ]
keywords: [ "smartypants", "symbols", "shortcodes", "dashes", "attr" ]
---

# Typographic

`@fsegurai/marked-extended-typographic` (15.1.0) runs a SmartyPants port and a table of symbol shortcodes over the
final HTML in a `postprocess` hook. Text inside `<pre>`, `<code>`, `<kbd>`, `<script>` and `<math>` is skipped.

## Quick path

```bash
npm install @fsegurai/marked-extended-typographic marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

marked.use(markedExtendedTypographic());
```

```markdown
Copyright (c^) 2025 -- all rights reserved... (alpha) (+-) 3 (x) 4
```

Renders as `<p>Copyright © 2025 &#8211; all rights reserved&#8230; α ± 3 × 4</p>`.

## Options

`markedExtendedTypographic(attr = '2')`: one argument, a SmartyPants preset (number or string) or a string of flags.

| `attr` | Quotes | Backticks | `--` | `---` | Ellipses |
|--------|--------|-----------|------|-------|----------|
| `0` | no | no | no | no | no |
| `1` | yes | yes | em dash | em dash followed by `-` | yes |
| `2` (default) | yes | yes | en dash | em dash | yes |
| `3` | yes | yes | em dash | en dash | yes |
| `-1` | Converts entities back to ASCII ("stupefy"). | | | | |

Flag letters: `q` quotes, `b` double backticks, `B` double and single backticks, `d` `--` em dash, `D` old school
dashes, `i` inverted old school dashes, `e` ellipses. `w` is meant to convert `&quot;`, but its regular expression (`/$quot;/`) never matches. Output uses numeric entities
(`&#8212;`).

Symbol shortcodes are applied with every `attr`, including `0`.

## Shortcodes

| Group | Shortcodes |
|-------|------------|
| Typographic | `(c^)` ©, `(r^)` ®, `(tm^)` ™, `(p^)` ℗, `(s^)` §, `(d^)` †, `(dd^)` ‡, `(p*)` ¶; upper case also works (`(C^)`, `(TM^)`, …) |
| Math and logic | `(==)` ≡, `(+-)` ±, `(-+)` ∓, `(x)` ×, `(/)` ÷, `(+)` ⊕, `(-)` ⊖, `(*)` ⊗, `(\|)` ∣, `(\|\|)` ∨, `(!)` ¬, `(=)` ≠, `(~)` ≈, `(^)` ∧, `(%)` ‰, `(#)` №, `(@)` ⊕, `($)` ¤ |
| Greek | `(alpha)` α through `(omega)` ω, lower case only |
| Containing `<`, `>` or `&` | `(<<)`, `(>>)`, `(<-)`, `(->)`, `(<->)`, `(<=>)`, `(=>)`, `(<==)`, `(==>)`, `(<)`, `(>)`, `(<=)`, `(>=)`, `(<>)`, `(><)`, `(&)` |

## Known limits with Marked 15

Tested with `marked` 15.0.7: Marked escapes text before the `postprocess` hook runs, although the extension
overrides the `inlineText` tokenizer to avoid that. As a result:

| Effect | Example |
|--------|---------|
| Shortcodes with `<`, `>` or `&` are not replaced | `(->)` renders as `(-&gt;)` |
| Quotes are not educated | `"Hi"` renders as `&quot;Hi&quot;` |

Dashes, ellipses and the other shortcodes work.

## Exports

`index.d.ts` declares `markedExtendedTypographic(attr?: string | number)` and a `typographicSymbols` constant; the
source exports only the default factory.

## Browser behavior

None.

## Next step

- [Browser Behavior](../guides/browser-behavior.md)
