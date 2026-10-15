---
label: Examples
description: Complete, copyable 15.0.0 setups for plain JavaScript, React, Vue and Angular, and how to run the 15.0.0 demo.
order: 5
tags: [ "examples", "recipes" ]
keywords: [ "react", "vue", "angular", "playground", "demo" ]
breadcrumbTitle: Examples
---

# Examples

| Example | Shows |
|---------|-------|
| [Plain JavaScript](plain-javascript.md) | Tables registered on the default `marked` export. |
| [Frameworks](frameworks.md) | React, Vue and Angular components that render tables. |

## Live demo

The [demo](https://fsegurai.github.io/marked-extensions) and its playground render Markdown live. Run the 15.0.0
demo locally with npm, the package manager of this release:

```bash
git clone https://github.com/fsegurai/marked-extensions.git
cd marked-extensions
git checkout v15.0.0
npm install
npm start
```

`npm start` runs Rollup in watch mode and serves the demo on port 8000; the README gives the address as
`http://[::1]:8000`. The demo imports tables from `packages/marked-extended-tables/src`.

## Next step

Start with [Plain JavaScript](plain-javascript.md).
