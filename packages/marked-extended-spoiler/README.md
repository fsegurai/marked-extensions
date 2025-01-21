<p align="center">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/demo/public/marked-extensions.svg">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/marked-extended-spoiler">
      <img src="https://img.shields.io/npm/v/@fsegurai/marked-extended-spoiler.svg"
          alt="Latest Release">
  </a>
  <br>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/fsegurai/marked-extensions">
  <img alt="Dependency status for repo" src="https://img.shields.io/librariesio/github/fsegurai/marked-extensions">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="GitHub License" src="https://img.shields.io/github/license/fsegurai/marked-extensions">
  </a>
  <br>
  <img alt="Stars" src="https://img.shields.io/github/stars/fsegurai/marked-extensions?style=square&labelColor=343b41"/> 
  <img alt="Forks" src="https://img.shields.io/github/forks/fsegurai/marked-extensions?style=square&labelColor=343b41"/>
</p>

**A library of extended spoiler blocks for Marked.js.**

`@fsegurai/marked-extended-spoiler` is an extensions for Marked.js that adds support for extended code preview blocks, allowing the creation of expanded panels with code snippets. It supports markdown elements, even custom extensions by passing the Marked instance to the extension. 

### Table of contents

- [Installation](#installation)
    - [@fsegurai/marked-extended-spoiler](#fseguraimarked-extended-spoiler)
    - [Using Extended Code Preview](#using-extended-code-preview)
    - [Available Extensions](#available-extensions)
    - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/marked-extended-spoiler

To add `@fsegurai/marked-extended-spoiler` along with Marked.js to your `package.json` use the following commands.

```bash
npm install @fsegurai/marked-extended-spoiler marked@^15.0.0 --save
```

### Using Extended Spoiler

Import `@fsegurai/marked-extended-spoiler` and apply it to your Marked instance as shown below.

**`spoiler`  is the alias for the extended spoiler block.**

```javascript
import { marked } from 'marked'
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler'

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-spoiler/lib/index.umd.js"></script>

marked.use(markedExtendedSpoiler())
// marked.use(markedExtendedSpoiler({}, marked)) // If you want to use a custom Marked instance)

const exampleMarkdown = `
\`\`\` spoiler title="Hover on text"
This is a hidden code block that will only appear on hover. Some text later it will be all over again and again, so be sure that it will work
\`\`\`
`

marked.parse(exampleMarkdown)

// Output:
// <div id="spoiler-1rsxmc9" class="spoiler-container">
//         <div class="spoiler-content" style="opacity: 0;">
//         <p>This is a hidden code block that will only appear on hover. Some text later it will be all over again and again, so be sure that it will work</p>
// </div>
// <div class="spoiler-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; pointer-events: none;">
//     <span>Hover on text</span>
// </div>
//
// <!-- Particles effect container -->
// <div class="spoiler-particles">
//     <div class="particle"></div>
// </div>
```

Read the [Marked.js documentation](https://marked.js.org/) for more details about its usage.

### Options

The marked-spoiler extension accepts the following configuration options:

* `animationDuration` (default: `2s`): The duration of the spoiler animation in seconds.
* `marked`: The Marked instance to extend rendering with the spoiler block. Example: You can render the spoiler block with a custom extension like `@fsegurai/marked-extended-tables`.

### Available Extensions

- [Marked Extended Code Preview](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-code-preview)
- [Marked Extended Footnote](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-footnote)
- [Marked Extended Lists](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-lists)
- [Marked Extended Spoiler](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-spoiler)
- [Marked Extended Tables](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-tables)
- [Marked Extended Typographic](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-typographic)

### Demo Application

To see all themes in action, check out the
demo: [https://fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions).

To set up the demo locally:

```bash
git clone https://github.com/fsegurai/marked-extensions.git
npm install
npm start
```

This will serve the application locally at [http://[::1]:8000](http://[::1]:8000).

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).