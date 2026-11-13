---
label: Prism Highlighting
description: Highlight code blocks rendered by the code extension with Prism, either in the browser through attachCode or at parse time with marked-highlight.
order: 3
tags: [ "examples", "code" ]
keywords: [ "prism", "marked-highlight", "line numbers", "line highlight", "code group" ]
---

# Prism Highlighting

Two ways to combine `@fsegurai/marked-extended-code` with Prism.

## Option A: highlight in the browser

The runtime sets Prism's `line-numbers` class and `data-*` attributes **before** calling your highlighter, then wraps
the highlighted lines.

```ts
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight'; // optional overlay for data-line
import { Marked } from 'marked';
import markedExtendedCode, { attachCode } from '@fsegurai/marked-extended-code';
import '@fsegurai/marked-extended-code/styles/code.css';

container.innerHTML = new Marked().use(markedExtendedCode()).parse(source) as string;
const dispose = attachCode(container, { highlight: (code) => Prism.highlightElement(code) });
```

## Option B: highlight at parse time

Register `marked-highlight` **before** the code extension, then attach without `highlight`; the runtime only wraps
the already highlighted HTML.

```ts
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import Prism from 'prismjs';
import markedExtendedCode, { attachCode } from '@fsegurai/marked-extended-code';

const marked = new Marked().use(
  markedHighlight({
    langPrefix: 'language-',
    highlight: (code, lang) => {
      const language = Prism.languages[lang] ? lang : 'plaintext';
      return Prism.highlight(code, Prism.languages[language], language);
    },
  }),
  markedExtendedCode(), // after the highlighter
);

container.innerHTML = marked.parse(source) as string;
attachCode(container);
```

## Markdown to try

`````markdown
```ts:line-numbers=5 [app.ts] {1,3}
const a = 1;
const b = 2; // [!code ++]
const c = 3;
```

::: code-group
```sh [npm]
npm install @fsegurai/marked-extended-code
```
```sh [bun]
bun add @fsegurai/marked-extended-code
```
:::
`````

## Next step

- [Code extension reference](../extensions/code.md)
