---
label: Examples
description: Complete, copyable 15.1.3 setups for plain JavaScript, React, Vue and Angular.
order: 5
tags: [ "examples", "recipes" ]
keywords: [ "react", "vue", "angular", "playground", "demo" ]
breadcrumbTitle: Examples
---

# Examples

Each example is complete: install, register, render.

| Example | Shows |
|---------|-------|
| [Plain JavaScript](plain-javascript.md) | All 6 extensions registered as the project demo does. |
| [Frameworks](frameworks.md) | React, Vue and Angular components that render 15.1.3 Markdown. |

## Live demo

The [demo](https://fsegurai.github.io/marked-extensions) renders every extension; its playground edits Markdown live.
Run the 15.1.3 demo locally from the repository:

```bash
git clone https://github.com/fsegurai/marked-extensions.git
cd marked-extensions
git checkout v15.1.3
bun install
bun start
```

`bun start` runs Rollup in watch mode and serves the demo on port 8000. In 15.1.3 the dev server host is set to
`localhost` (`http://localhost:8000`); the README still shows `http://[::1]:8000`.

## Next step

Start with [Plain JavaScript](plain-javascript.md).
