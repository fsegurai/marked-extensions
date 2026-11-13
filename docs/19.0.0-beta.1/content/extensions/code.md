---
label: Code
description: VitePress-style fenced code blocks with titles, line numbers, line highlights, diff, focus, magic comments and code-group tabs.
order: 3
tags: [ "extensions", "code" ]
keywords: [ "fence meta", "line numbers", "magic comments", "code group", "attachCode", "prism" ]
badge: New
badgeColor: green
---

# Code

`@fsegurai/marked-extended-code` (new in 19) reads VitePress, Expressive Code and Docusaurus fence meta and
`[!code …]` magic comments. Its output is classes only (`<figure>`, `<figcaption>`, `<pre>`, `<code>`), so it has
**no `unsafeHtml` option**. Fences without meta or markers fall back to the previous `code` renderer unchanged.

## Install

```bash
npm install @fsegurai/marked-extended-code marked
```

## Usage

```js
import { Marked } from 'marked';
import markedExtendedCode, { attachCode } from '@fsegurai/marked-extended-code';
import '@fsegurai/marked-extended-code/styles/code.css';

container.innerHTML = new Marked().use(markedExtendedCode()).parse(source);
const dispose = attachCode(container); // line classes and code-group tabs
```

## Fence meta

```text
lang[:line-numbers[=N]|:no-line-numbers] [{1,4-6}] [[title]] [title="…"]
  [ins={…}] [del={…}] [mark={…}] [highlight={…}] [focus={…}]
  [warning={…}] [error={…}] [info={…}]
  [showLineNumbers[=N|=false]] [startLineNumber=N] [other key=value / flags]
```

| Syntax | Meaning |
|--------|---------|
| `ts{1,4-6}` or `ts {1,4-6}` | Highlight lines 1 and 4 to 6. |
| `ts:line-numbers`, `ts:line-numbers=5` | Line numbers, optionally starting at 5. |
| `ts:no-line-numbers` | No line numbers (overrides `defaultLineNumbers`). |
| `ts [app.ts]`, `title="app.ts"` | Title. |
| `ins={1-2} del={4} mark={3}` | Inserted, deleted and marked lines. |
| `focus={2} warning={3} error={4} info={5}` | Focused, warning, error and info lines. |
| `showLineNumbers=5`, `startLineNumber=5`, `showLineNumbers=false` | Docusaurus / Expressive Code line numbers. |
| `frame="terminal" wrap` | Unknown pairs and flags, kept in `token.meta.attrs` and `token.meta.flags`. |

Rules: the language is the first word before `:`, `{`, `[` or whitespace. Ranges are 1-based, relative to the block
as written, merged and sorted. Malformed meta never throws. Caps: lines above 9999 are invalid, at most 32 ranges per
category, the first 2000 characters of the info string, start numbers up to 99999.

## Magic comments

| Marker | Category |
|--------|----------|
| `[!code highlight]`, `[!code hl]` | highlight |
| `[!code focus]` | focus |
| `[!code ++]`, `[!code --]` | ins, del |
| `[!code warning]`, `[!code error]`, `[!code info]` | warning, error, info |

````markdown
```ts
const a = 1; // [!code highlight]
// [!code focus:2]
const b = 2;
const c = 3;
const old = 0; // [!code --]
const now = 1; // [!code ++]
```
````

- Recognized only inside a comment (`//`, `#`, `--`, `;`, `/* */`, `<!-- -->`). Case-insensitive.
- `:n` names `n` lines. A marker alone on its line applies from the line below.
- Markers are stripped (`stripMarkers`), and empty lines left behind are removed. `[[!code hl]]` renders a literal
  `[!code hl]` (`escapeMarkers`).

## Code groups

````markdown
::: code-group
```sh [npm]
npm install @fsegurai/marked-extended-code
```
```sh [yarn]
yarn add @fsegurai/marked-extended-code
```
:::
````

Each block's `[label]` (or `title="…"`, then the language, then `Tab <n>`) becomes a tab. The body may hold only
fenced blocks; a malformed group renders as plain Markdown. Turn the syntax off with `codeGroups: false`. The
`Tab` fallback is `labels.tab`.

## Options

`markedExtendedCode(options?: CodeOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `''` | Extra class next to `mx-code` on the outer element. |
| `defaultLineNumbers` | `boolean` | `false` | Line numbers on every handled fence unless the meta turns them off. |
| `magicComments` | `boolean` | `true` | Recognize `[!code …]` markers. |
| `stripMarkers` | `boolean` | `true` | Remove markers and lines left empty. |
| `escapeMarkers` | `boolean` | `true` | `[[!code …]]` renders as literal text. |
| `emitDataAttributes` | `boolean` | `false` | Also emit Prism's `line-numbers`, `data-start`, `data-line`, `data-line-offset` (unsanitized pages). |
| `passthrough` | `string[]` | `['mermaid']` | Languages always left to the next `code` renderer. |
| `customizeToken` | `(token: CodeToken) => void \| null` | `null` | Called after `token.meta` is set. |
| `codeGroups` | `boolean` | `true` | Recognize `::: code-group` blocks. |
| `labels` | `Partial<CodeLabels>` | `defaultCodeLabels` | User-visible strings, shallow-merged and HTML-escaped. |

`labels` keys:

| Key | Default | Used for |
|-----|---------|----------|
| `tab` | `'Tab'` | Label of a group tab with no `[label]`, title or language, followed by its number (`Tab 2`). |

## Rendered HTML

````markdown
```ts:line-numbers=5 [app.ts] {1,3-4}
const a = 1;
const b = 2; // [!code ++]
```
````

```html
<figure class="mx-code">
  <figcaption class="mx-code-title">app.ts</figcaption>
  <pre class="mx-code-pre mx-code--line-numbers mx-code-start-5 mx-code-highlight-1_2c3-4 mx-code-ins-2 mx-code--has-highlighted mx-code--has-diff"><code class="language-ts">…</code></pre>
</figure>
```

Without a title, `<pre>` is the outer element and carries `mx-code <className>`. Range tokens use the core class-token
encoding (`,` becomes `_2c`). Code groups render an ARIA tablist (`div.mx-code-group`, `span.mx-code-tab[role=tab]`,
`div.mx-code-panel[role=tabpanel]`) with the first tab selected (`mx-is-active`) and the other panels `hidden`.

## Sanitizer notes

The output is classes only (`<figure>`, `<figcaption>`, `<pre>`, `<code>`, spans), so it survives Angular's
`SecurityContext.HTML` and there is **no `unsafeHtml` option**. The line-number start and Prism attributes travel as
class tokens and are applied by `attachCode`. Only `emitDataAttributes: true` adds `data-*`, for unsanitized pages.

## CSS classes

| Class | Element | Set by |
|-------|---------|--------|
| `mx-code` | Outer `<figure>` (with a title) or `<pre>` | Renderer |
| `mx-code-title` | `<figcaption>` | Renderer |
| `mx-code-pre` | `<pre>` | Renderer |
| `mx-code--line-numbers` | `<pre>` with line numbers | Renderer |
| `mx-code--has-highlighted`, `mx-code--has-diff`, `mx-code--has-focused` | `<pre>` with those line categories | Renderer |
| `mx-code-lines` | `<code>` whose lines are wrapped | `attachCode`, `wrapLines` |
| `mx-code-line` | One line `<span>` | `attachCode`, `wrapLines` |
| `mx-code--highlighted`, `--diff`, `--add`, `--remove`, `--focused`, `--warning`, `--error`, `--info` | Line `<span>` | `attachCode`, `wrapLines` |
| `mx-code-group`, `mx-code-tabs`, `mx-code-tab`, `mx-code-panel` | Code group, tablist, tab, panel | Renderer |
| `mx-is-active` | Selected tab and its panel | Renderer, `attachCode` |
| `mx-code-start-<n>`, `mx-code-<category>-<ranges>`, `mx-code-gid-<id>`, `mx-code-tab-<n>`, `mx-code-panel-<n>` | Class tokens | Renderer |

Kept third-party names: `language-<lang>` on `<code>`, Prism's `line-numbers` (added by `attachCode`),
`.line-numbers-rows`, `.line-highlight`, and Shiki's `span.line` (accepted as wrapped lines).

## CSS custom properties

All optional, with fallbacks.

| Area | Properties |
|------|------------|
| Block | `--mx-code-margin`, `--mx-code-border`, `--mx-code-border-width`, `--mx-code-radius` |
| Title | `--mx-code-title-padding`, `--mx-code-title-font`, `--mx-code-title-font-size`, `--mx-code-title-color`, `--mx-code-title-background` |
| Lines | `--mx-code-line-padding`, `--mx-code-line-highlight`, `--mx-code-line-warning`, `--mx-code-line-error`, `--mx-code-line-info` |
| Line numbers | `--mx-code-line-number-width`, `--mx-code-line-number-gap`, `--mx-code-line-number-color`, `--mx-code-line-offset` (set by `attachCode`) |
| Diff | `--mx-code-diff-gutter`, `--mx-code-diff-add`, `--mx-code-diff-remove`, `--mx-code-diff-remove-opacity`, `--mx-code-diff-remove-user-select`, `--mx-code-diff-add-marker`, `--mx-code-diff-remove-marker`, `--mx-code-diff-marker-left` |
| Focus | `--mx-code-unfocused-opacity`, `--mx-code-unfocused-blur`, `--mx-code-focus-transition` |
| Code groups | `--mx-code-tabs-background`, `--mx-code-tab-padding`, `--mx-code-tab-opacity`, `--mx-code-tab-color`, `--mx-code-tab-active-color`, `--mx-code-tab-active-border` |

## Styling

`@fsegurai/marked-extended-code/styles/code.css` styles titles, line classes, line numbers and group tabs
(`code.scss` also exported). It numbers the wrapped lines itself with the `mx-code-line` CSS counter, so no Prism
plugin or app counter is needed; it steps aside when Prism's line-numbers gutter is present.

## Runtime

`attachCode(root, options?)` returns a `dispose` function. For each `pre.mx-code-pre` it applies, in order: the
line-number start, Prism attributes, `highlight`, then line wrapping.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dataAttributes` | `boolean` | `true` | Translate class tokens into Prism's `line-numbers`, `data-start`, `data-line`, `data-line-offset`. |
| `prismLineHighlight` | `'set' \| 'skip' \| 'remove'` | `'set'` | Write `data-line`/`data-line-offset`, never write them, or also remove them when another tool set them. |
| `lineClasses` | `boolean` | `true` | Wrap each line in `<span class="mx-code-line …">`. |
| `highlight` | `(code: HTMLElement) => void \| Promise<void>` | `null` | Highlighter run before wrapping, for example `Prism.highlightElement`. |
| `syncByLabel` | `boolean` | `false` | Switching one group switches every group in `root` with the same label. |
| `observe` | `boolean` | `false` | Process replaced content automatically. |

- Line-number start: a block starting at N gets `--mx-code-line-offset: N - 1` on its `<pre>`; `code.css` starts the
  counter there. Sanitizers strip `style`, so the start only travels as `mx-code-start-N` until the runtime applies it.
- `prismLineHighlight: 'skip'` or `'remove'` keeps Prism's `data-line` off blocks when the page uses `data-line` for
  something else (for example scroll sync); `code.css` still marks the lines.
- Event: `marked-extended:code:group-switch` with `detail: { id, index, previousIndex, label, synced }`.
- Disposing removes listeners; wrapped lines and attributes stay in place.

### Helpers

| Export | Signature | Use |
|--------|-----------|-----|
| `parseFenceMeta` | `(info: string) => FenceMeta` | Pure fence-meta parser. |
| `applyMagicComments` | `(code: string, options?: MagicCommentOptions) => MagicCommentResult` | Pure marker parser (`strip`, `escape`). |
| `wrapLines` | `(code: Element, ranges?: LineRanges) => HTMLElement[]` | Wrap lines yourself, after highlighting. Idempotent. |
| `copyText` | `(block: Element, options?: CopyTextOptions) => string` | Text for a copy button; skips deleted lines unless `excludeDeleted: false`. |
| `applyPrismAttributes` | `(pre: Element, prismLineHighlight?) => void` | Apply the Prism attributes to one block. |
| `applyLineNumberStart` | `(pre: Element) => void` | Set `--mx-code-line-offset` on one block. |

Deleted lines are also unselectable in `code.css` (`--mx-code-diff-remove-user-select`, default `none`), so a native
selection copy skips them.

## Exported constants

| Export | Value |
|--------|-------|
| `RANGE_KEYS` | Line categories in output order: `highlight`, `mark`, `ins`, `del`, `focus`, `warning`, `error`, `info`. |
| `LINE_CLASSES` | Line modifier classes per category (for example `ins` → `['mx-code--diff', 'mx-code--add']`). |
| `PRISM_LINE_HIGHLIGHT_MODES` | `['set', 'skip', 'remove']`. |
| `defaultCodeLabels` | `{ tab: 'Tab' }`. |

All are frozen.

## Integration notes

- Register `marked-highlight` (or any `walkTokens` highlighter) **before** this extension so it receives marker-free
  code and the normalized language.
- Indented code blocks and `passthrough` languages are never processed.
- Markers are found by a line-based scan: `"// [!code hl]"` inside a string still counts. Escape it as `[[!code hl]]`.

## Changes in 19.0.0-beta.1

- Classes renamed: `mx-code-ln` → `mx-code--line-numbers`; `has-highlighted`/`has-diff`/`has-focused` →
  `mx-code--has-*`; line `line` → `mx-code-line`; line states (`highlighted`, `diff`, `add`, `remove`, `focused`,
  `warning`, `error`, `info`) → `mx-code--<state>`; group `active` → `mx-is-active`. `LINE_CLASSES` values change.
- `className` defaults to `''` (no more `marked-extended-code`); style `mx-code`.
- `code.css` numbers lines itself; drop your own line counter. The start line is applied by `attachCode` through
  `--mx-code-line-offset`.
- New `prismLineHighlight` runtime option, `copyText` (skips deleted lines), `applyLineNumberStart`, `labels`,
  `PRISM_LINE_HIGHLIGHT_MODES` and `defaultCodeLabels`.

## Next step

- [Examples: syntax highlighting with Prism](../examples/prism-highlighting.md)
