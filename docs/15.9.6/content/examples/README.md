---
label: Examples
description: Complete, copyable 15.9.6 setups for plain JavaScript, React, Vue and Angular.
order: 5
tags: [ "examples", "recipes" ]
keywords: [ "react", "vue", "angular", "playground", "directives" ]
breadcrumbTitle: Examples
---

# Examples

Each example is complete: install, register, render.

| Example | Shows |
|---------|-------|
| [Plain JavaScript](plain-javascript.md) | All 9 extensions registered on the default `marked` export. |
| [Frameworks](frameworks.md) | React, Vue and Angular components that render 15.9.6 Markdown. |

## Live demo

The [demo](https://fsegurai.github.io/marked-extensions) renders every extension; its playground edits Markdown live.
Run the 15.9.6 demo locally from the repository:

```bash
git clone https://github.com/fsegurai/marked-extensions.git
cd marked-extensions
bun install
bun start
```

`bun start` runs Rollup in watch mode and serves the demo at `http://[::1]:8000`.

## Next step

Start with [Plain JavaScript](plain-javascript.md).
