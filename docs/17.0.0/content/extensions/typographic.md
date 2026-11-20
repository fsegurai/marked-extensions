---
label: Typographic
description: SmartyPants-style dashes and ellipses plus (name) symbol shortcodes for Greek letters, math, currency, legal marks and emoji.
order: 13
tags: [ "extensions", "typographic" ]
keywords: [ "smartypants", "smart quotes", "em dash", "symbols", "shortcodes" ]
---

# Typographic

`@fsegurai/marked-extended-typographic` post-processes the rendered HTML: it educates dashes and ellipses and replaces
`(name)` shortcodes with symbols. Content inside `pre`, `code`, `kbd`, `script` and `math` is skipped, and tags are
left untouched. It needs no browser runtime and ships no stylesheet.

## Quick path

```bash
npm install @fsegurai/marked-extended-typographic marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

marked.use(markedExtendedTypographic());
marked.parse('Wait -- really... (alpha) (euro) (check)');
// <p>Wait &#8212; really&#8230; α € ✅</p>
```

## Syntax

| Input | Output | Category |
|-------|--------|----------|
| `--`, `---` | dashes (see `attribute`) | Smart dashes |
| `...`, `. . .` | `…` | Ellipses |
| `(alpha)`, `(Omega)` | `α`, `Ω` | Greek letters |
| `(sum)`, `(integral)`, `(inf)`, `(x)` | `∑`, `∫`, `∞`, `×` | Math |
| `(in)`, `(subset)`, `(forall)`, `(exists)` | `∈`, `⊂`, `∀`, `∃` | Sets and logic |
| `(euro)`, `(pound)`, `(C^)`, `(R^)`, `(TM^)` | `€`, `£`, `©`, `®`, `™` | Currency and legal |
| `(check)`, `(cross)`, `(warning)`, `(star)` | `✅`, `❌`, `⚠️`, `⭐` | Emoji |

Known 17 limitations, observed by running the 17 source:

- Straight quotes stay straight. marked escapes them to `&quot;` / `&#39;` before the hook, and 17 does not convert
  them back.
- Shortcodes containing `<` or `>` (such as `(->)`, `(<-)`, `(=>)`) do not match, because marked has already escaped
  those characters. The `(^up)`-style arrows never match either: their keys use an unescaped `^`.

## Options

`markedExtendedTypographic(options?: TypographicOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `attribute` | `string \| number` | `'3'` | SmartyPants mode. `'1'`, `'2'` and `'3'` enable quotes, backticks, dashes and ellipses; `'0'` disables them; `'-1'` reverts ("stupefy"). A string of letters (`q`, `b`, `B`, `d`, `D`, `i`, `e`, `w`) selects features. |
| `quotes` | `boolean` | `false` | Runs an extra smart-quotes pass. Has no effect when `attribute` is `0`. |
| `dashes` | `boolean` | `false` | Runs an extra smart-dashes pass. Has no effect when `attribute` is `0`. |
| `ellipses` | `boolean` | `false` | Runs an extra ellipses pass. Has no effect when `attribute` is `0`. |
| `customSymbols` | `Record<string, string>` | `{}` | Extra replacements; keys are regular-expression sources. An invalid key throws and the hook returns the HTML unchanged. |
| `outputUnicode` | `boolean` | `false` | Output Unicode characters instead of HTML entities. |

Dash modes: `'1'`: `--` em dash; `'2'`: `--` en dash, `---` em dash; `'3'` (default): `--` em dash, `---` en dash.
There is no `fractions` or `breaks` option in 17.

## Rendered HTML

The extension adds no elements or classes. It only rewrites text between tags, as entities (`&#8212;`, `&#8230;`) by
default or as Unicode characters with `outputUnicode: true`.

## Runtime

None. It runs in marked's `postprocess` hook and also overrides marked's `inlineText` tokenizer to return plain text
tokens. The package exports only the default factory and the types `TypographicOptions`, `ProcessingOptions`,
`SmartyOptions` and `SymbolMappings`.

## Styling

None. The package exports no stylesheets.

## Next step

- [Combining extensions](../guides/combining-extensions.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
