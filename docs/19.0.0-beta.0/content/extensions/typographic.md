---
label: Typographic
description: SmartyPants-style quotes, dashes and ellipses, fractions, and (:name:) symbol shortcodes for Greek letters, math, arrows, currency and emoji.
order: 14
tags: [ "extensions", "typographic" ]
keywords: [ "smartypants", "smart quotes", "em dash", "symbols", "shortcodes" ]
---

# Typographic

`@fsegurai/marked-extended-typographic` post-processes the rendered HTML: it educates quotes, dashes and ellipses,
optionally converts fractions, and replaces `(:name:)` shortcodes with symbols. Code, `pre` and tags are skipped. Its
output is plain characters, so it has no `unsafeHtml` option and no runtime.

## Quick path

```bash
npm install @fsegurai/marked-extended-typographic marked
```

```js
import { marked } from 'marked';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';

marked.use(markedExtendedTypographic());
marked.parse('"Hi" -- wait... (:alpha:) (:->:)');
// <p>&#8220;Hi&#8221; &#8212; wait&#8230; α →</p>
```

## Syntax

| Input | Output | Category |
|-------|--------|----------|
| `"text"`, `'text'` | curly quotes | Smart quotes |
| `--`, `---` | dashes (see `attribute`) | Smart dashes |
| `...` | `…` | Ellipses |
| `1/2` (with `fractions: true`) | `½` | Fractions |
| `(:alpha:)`, `(:Omega:)` | `α`, `Ω` | Greek letters |
| `(:sum:)`, `(:integral:)`, `(:infinity:)`, `(:plus-minus:)` | `∑`, `∫`, `∞`, `±` | Math |
| `(:element:)`, `(:subset:)`, `(:forall:)`, `(:exists:)` | `∈`, `⊂`, `∀`, `∃` | Sets and logic |
| `(:->:)`, `(:<-:)`, `(:=>:)`, `(:<=>:)`, `(:^up:)` | `→`, `←`, `⇒`, `⇔`, `↑` | Arrows |
| `(:euro:)`, `(:pound:)`, `(:C^:)`, `(:R^:)`, `(:TM^:)` | `€`, `£`, `©`, `®`, `™` | Currency and legal |
| `(:check:)`, `(:cross:)`, `(:warning:)`, `(:star:)` | `✅`, `❌`, `⚠️`, `⭐` | Emoji |

The package README has the complete symbol reference.

## Options

`markedExtendedTypographic(options?: TypographicOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `attribute` | `string \| number` | `'3'` | SmartyPants mode. `'1'`, `'2'` and `'3'` enable quotes, backticks, dashes and ellipses; `'0'` disables them; `'-1'` reverts ("stupefy"). A string of letters (`q`, `b`, `B`, `d`, `D`, `i`, `e`, `w`) selects features. |
| `quotes` | `boolean` | `false` | Smart quotes. Only read when `attribute` is `0`. |
| `dashes` | `boolean` | `false` | Smart dashes. Only read when `attribute` is `0`. |
| `ellipses` | `boolean` | `false` | Ellipses. Only read when `attribute` is `0`. |
| `fractions` | `boolean` | `false` | Convert fractions such as `1/2`. |
| `customSymbols` | `Record<string, string>` | `{}` | Extra replacements; keys are regular-expression sources. |
| `outputUnicode` | `boolean` | `false` | Output Unicode characters instead of HTML entities. |
| `breaks` | `boolean` | `false` | Calls `marked.setOptions({ breaks: true })` on the global `marked`. |

Dash modes: `'1'`: `--` em dash; `'2'`: `--` en dash, `---` em dash; `'3'` (default): `--` em dash, `---` en dash.

> [!IMPORTANT]
> With the default `attribute: '3'`, quotes, dashes and ellipses are already on. To pick features with the booleans,
> pass `attribute: 0`: `markedExtendedTypographic({ attribute: 0, quotes: true })`.

```js
marked.use(markedExtendedTypographic({
  customSymbols: { '\\(todo\\)': '📋', '\\(done\\)': '✅' },
  outputUnicode: true,
}));
```

## Next step

- [Combining extensions](../guides/combining-extensions.md)
