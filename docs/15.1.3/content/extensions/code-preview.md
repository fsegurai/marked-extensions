---
label: Code Preview
description: Collapsible details panels from ```preview fenced blocks with a title, a subtitle and Markdown content, plus a custom template and token hook.
order: 1
tags: [ "extensions", "code-preview" ]
keywords: [ "details", "collapsible", "preview fence", "template", "subTitle" ]
---

# Code Preview

`@fsegurai/marked-extended-code-preview` (15.1.0) turns a ```` ```preview ```` fenced block into a `<details>` panel
with a title, optional subtitle and rendered content. It ships no CSS and runs no browser code. The package was removed
in the 15.9 line.

## Quick path

```bash
npm install @fsegurai/marked-extended-code-preview marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedCodePreview from '@fsegurai/marked-extended-code-preview';

marked.use(markedExtendedCodePreview({}, marked));
```

## Syntax

````markdown
```preview title="Install" subTitle="Run it in your project root"
Use **npm** or **bun**.
```
````

| Part | Rule |
|------|------|
| Opening | ```` ``` ```` at the start of a line, an optional single space, then `preview`. |
| `title="…"` | Optional. Must come before `subTitle`, otherwise the block renders as a normal code block; the value cannot be empty or contain `"`. |
| `subTitle="…"` | Optional. |
| Content | Every line up to the first line that starts with ```` ``` ````. Indent nested fences so they do not close the block. |

## Options

`markedExtendedCodePreview(options = {}, markedInstance = null)`

| Argument / option | Type | Default | Description |
|-------------------|------|---------|-------------|
| `prefixId` | `string` | `'code-preview-'` | Prefix of the generated id (prefix plus 7 random characters). Must be a non-empty string; the renderer throws otherwise. |
| `template` | `string` | built-in `<details>` template | Custom HTML with `{previewId}`, `{customTitle}`, `{markedCode}` and `{customSubTitle}` placeholders. |
| `customizeToken` | `function` | none | Called in `walkTokens` with the token's `title`; its return value replaces the title. It is also called with `token.extraData` (always `undefined`). |
| `markedInstance` | callable | `null` | Second argument. The extension calls `markedInstance(code)`, so pass the `marked` function. A `new Marked()` instance is not callable and makes parsing throw. |

`index.d.ts` types `customizeToken` as `(token: Token) => void`; the source passes the title string and uses the
return value.

## Rendered HTML

With the default template and `marked` passed:

```html
<details id="code-preview-be4y1b8" name="code-preview-be4y1b8" class="code-preview-card">
  <summary><span class="preview-title">Install</span></summary>
  <div class="preview-content"><p>Use <strong>npm</strong> or <strong>bun</strong>.</p>
</div>
  <span class="preview-subtitle">Run it in your project root</span>
</details>
```

| Case | Output |
|------|--------|
| No `title` | No `<summary>`; the browser shows its default "Details" label. |
| No `markedInstance` | Content inserted as raw text, without the `preview-content` wrapper. |
| Custom `template` | `{customTitle}` and `{customSubTitle}` receive the plain values, `{markedCode}` the rendered content. |

Title and subtitle are inserted without escaping. The README's sample output names the title class `preview-text`;
the source emits `preview-title`.

## Browser behavior

None. Open and close is native `<details>` behavior. Style `.code-preview-card`, `.preview-title`,
`.preview-content` and `.preview-subtitle` yourself (the package README contains a stylesheet).

## Next step

- [Footnote](footnote.md)
