---
label: Plain JavaScript
description: Register the 15.0.0 tables extension on the default marked export and render a spanning table into the page.
order: 1
tags: [ "examples", "javascript" ]
keywords: [ "vanilla", "demo setup", "colspan" ]
---

# Plain JavaScript

```bash
npm install marked@^15 @fsegurai/marked-extended-tables
```

```js
import { marked } from 'marked';
import markedExtendedTables from '@fsegurai/marked-extended-tables';

marked.use(markedExtendedTables());

const markdown = `
| H1      | H2      | H3      |
|---------|---------|---------|
| This cell spans 3 columns |||
`;

document.querySelector('#content').innerHTML = marked.parse(markdown);
```

Output:

```html
<table><thead><tr><th>H1</th>
<th>H2</th>
<th>H3</th>
</tr></thead><tbody><tr><td colspan=3>This cell spans 3 columns</td>
</tr></tbody></table>
```

Nothing runs after rendering; the output is static HTML.

## Next step

- [Frameworks](frameworks.md)
