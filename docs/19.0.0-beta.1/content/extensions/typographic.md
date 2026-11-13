---
label: Typographic
description: SmartyPants-style quotes, dashes and ellipses, fractions, and (:name:) symbol shortcodes for Greek letters, math, arrows, currency and emoji.
order: 17
tags: [ "extensions", "typographic" ]
keywords: [ "smartypants", "smart quotes", "em dash", "symbols", "shortcodes", "typographicTransform", "skipClasses" ]
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

`markedExtendedTypographic(options?: TypographicOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `attribute` | `string \| number` | `'3'` | SmartyPants mode. `'1'`, `'2'` and `'3'` enable quotes, backticks, dashes and ellipses; `'0'` disables them; `'-1'` reverts ("stupefy"). A string of letters (`q`, `b`, `B`, `d`, `D`, `i`, `e`, `w`) selects features. |
| `quotes` | `boolean` | unset | Smart quotes. Unset: `attribute` decides; `true`/`false` override it. |
| `dashes` | `boolean` | unset | Smart dashes. Unset: `attribute` decides (and picks the dash style); `true`/`false` override it. |
| `ellipses` | `boolean` | unset | Ellipses. Unset: `attribute` decides; `true`/`false` override it. |
| `fractions` | `boolean` | `false` | Convert fractions such as `1/2`. |
| `customSymbols` | `Record<string, string>` | `{}` | Extra replacements; keys are regular-expression sources. |
| `outputUnicode` | `boolean` | `false` | Output Unicode characters instead of HTML entities. |
| `breaks` | `boolean` | `false` | Render single line breaks as `<br>`, only on the instance the extension is used on. |
| `skipClasses` | `string[]` | `[]` | Elements with one of these classes are left untouched, with everything inside them. |

Dash modes: `'1'`: `--` em dash; `'2'`: `--` en dash, `---` em dash; `'3'` (default): `--` em dash, `---` en dash.

```js
marked.use(markedExtendedTypographic({
  dashes: false,                      // keep "--" as typed
  skipClasses: ['katex', 'mermaid'],  // leave rendered math and diagrams alone
  customSymbols: { '\\(todo\\)': '📋' },
  outputUnicode: true,
}));
```

The extension renders no strings of its own, so it has no `labels` option.

### `typographicTransform()`

`typographicTransform(html, options?)` runs the same transform as the extension's `postprocess` hook, for HTML
rendered elsewhere. `breaks` does not apply. If the transform throws, the input is returned unchanged.

```js
import { typographicTransform } from '@fsegurai/marked-extended-typographic';

typographicTransform('<p>Wait... "yes" -- no</p>', { skipClasses: ['katex'] });
```

### Exported constants

| Constant | Value |
|----------|-------|
| `TYPOGRAPHIC_SKIP_TAGS` | `['pre', 'code', 'kbd', 'script', 'math', 'style', 'svg']` (frozen): always skipped. |

## Sanitizer notes

The extension only replaces characters, so Angular's `SecurityContext.HTML` keeps its output unchanged. It has no
`unsafeHtml` option and no runtime.

## Styling

The extension emits no markup, CSS classes or custom properties and ships no stylesheet. `skipClasses` reads class
names other code put on elements; it adds none.

## Changes in 19.0.0-beta.1

- **Breaking:** `breaks: true` no longer calls `marked.setOptions({ breaks: true })` on the global `marked`. It only
  applies to the instance the extension is used on.
- **Breaking (fix):** `quotes`, `dashes`, `ellipses` and `fractions` now take effect. Before, the three booleans were
  only read with `attribute: '0'` and the output cache ignored them. They no longer default to `false`: unset means
  `attribute` decides.
- New `skipClasses` option, `typographicTransform()` export and `TYPOGRAPHIC_SKIP_TAGS` constant. The factory is also
  the named export `markedExtendedTypographic`.

## Next step

- [Combining extensions](../guides/combining-extensions.md)
