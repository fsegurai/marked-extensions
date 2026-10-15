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

`@fsegurai/marked-extended-code` (new in 19.0.0-beta.0) reads VitePress, Expressive Code and Docusaurus fence meta and
`[!code …]` magic comments. Its output is classes only (`<figure>`, `<figcaption>`, `<pre>`, `<code>`), so it has
**no `unsafeHtml` option**. Fences without meta or markers fall back to the previous `code` renderer unchanged.

## Quick path

```bash
npm install @fsegurai/marked-extended-code marked
```

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
fenced blocks; a malformed group renders as plain Markdown. Turn the syntax off with `codeGroups: false`.

## Options

`markedExtendedCode(options?: CodeOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-code'` | Class next to `mx-code` on the outer element. |
| `defaultLineNumbers` | `boolean` | `false` | Line numbers on every handled fence unless the meta turns them off. |
| `magicComments` | `boolean` | `true` | Recognize `[!code …]` markers. |
| `stripMarkers` | `boolean` | `true` | Remove markers and lines left empty. |
| `escapeMarkers` | `boolean` | `true` | `[[!code …]]` renders as literal text. |
| `emitDataAttributes` | `boolean` | `false` | Also emit Prism's `line-numbers`, `data-start`, `data-line`, `data-line-offset` (unsanitized pages). |
| `passthrough` | `string[]` | `['mermaid']` | Languages always left to the next `code` renderer. |
| `customizeToken` | `(token: CodeToken) => void \| null` | `null` | Called after `token.meta` is set. |
| `codeGroups` | `boolean` | `true` | Recognize `::: code-group` blocks. |

## Rendered HTML

````markdown
```ts:line-numbers=5 [app.ts] {1,3-4}
const a = 1;
const b = 2; // [!code ++]
```
````

```html
<figure class="mx-code marked-extended-code">
  <figcaption class="mx-code-title">app.ts</figcaption>
  <pre class="mx-code-pre mx-code-ln mx-code-start-5 mx-code-highlight-1_2c3-4 mx-code-ins-2 has-highlighted has-diff"><code class="language-ts">…</code></pre>
</figure>
```

Without a title, `<pre>` is the outer element and carries `mx-code <className>`. Range tokens use the core class-token
encoding (`,` becomes `_2c`). `has-highlighted`, `has-diff` and `has-focused` follow Shiki's names. Code groups render
an ARIA tablist (`div.mx-code-group`, `span.mx-code-tab[role=tab]`, `div.mx-code-panel[role=tabpanel]`) with the first
tab selected and the other panels `hidden`.

## Runtime

`attachCode(root, options?)` processes each `pre.mx-code-pre`: Prism attributes, then `highlight`, then line wrapping.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dataAttributes` | `boolean` | `true` | Translate class tokens into Prism's `line-numbers`, `data-start`, `data-line`, `data-line-offset`. |
| `lineClasses` | `boolean` | `true` | Wrap each line in `<span class="line …">` with Shiki class names. |
| `highlight` | `(code: HTMLElement) => void \| Promise<void>` | `null` | Highlighter run before wrapping, for example `Prism.highlightElement`. |
| `syncByLabel` | `boolean` | `false` | Switching one group switches every group in `root` with the same label. |
| `observe` | `boolean` | `false` | Process replaced content automatically. |

- Event: `marked-extended:code:group-switch` with `detail: { id, index, previousIndex, label, synced }`.
- Disposing removes listeners; wrapped lines and attributes stay in place.

### Helpers

| Export | Signature | Use |
|--------|-----------|-----|
| `parseFenceMeta` | `(info: string) => FenceMeta` | Pure fence-meta parser. |
| `applyMagicComments` | `(code: string, options?: MagicCommentOptions) => MagicCommentResult` | Pure marker parser (`strip`, `escape`). |
| `wrapLines` | `(code: Element, ranges?: LineRanges) => HTMLElement[]` | Wrap lines yourself, after highlighting. Idempotent. |
| `applyPrismAttributes` | `(pre: Element) => void` | Apply the Prism attributes to one block. |

## Integration notes

- Register `marked-highlight` (or any `walkTokens` highlighter) **before** this extension so it receives marker-free
  code and the normalized language.
- Indented code blocks and `passthrough` languages are never processed.
- Markers are found by a line-based scan: `"// [!code hl]"` inside a string still counts. Escape it as `[[!code hl]]`.

## Styling

`@fsegurai/marked-extended-code/styles/code.css` styles titles, line classes and group tabs (`code.scss` also exported).

## Next step

- [Examples: syntax highlighting with Prism](../examples/prism-highlighting.md)
