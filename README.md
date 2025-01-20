<p align="center" class="intro">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/demo/public/marked-extensions.svg">
</p>

<p align="center" class="intro">
  <a href="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://github.com/fsegurai/marked-extensions/releases/latest">
      <img src="https://img.shields.io/github/v/release/fsegurai/marked-extensions"
          alt="Latest Release">
  <a href="https://github.com/fsegurai/marked-extensions/actions/workflows/test.yml">
      <img src="https://github.com/fsegurai/marked-extensions/actions/workflows/test.yml/badge.svg?branch=main"
          alt="Test Status">
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

**A library of custom extensions for Marked.js**

`@fsegurai/marked-extensions` is a collection of custom extensions for Marked.js, making it more powerful and versatile.

### Table of contents

- [Installation](#installation)
  - [Using a Specific Extension](#using-a-specific-extension)
  - [Available Extensions](#available-extensions)
  - [Demo Application](#demo-application)
  - [Local Development](#local-development)
- [License](#license)

## Installation

### Using a Specific Extension

Import the desired extension from the package and apply it to your Marked instance as shown below.

```typescript
import { marked } from "marked";
import { markedExtendedTables } from "@fsegurai/marked-extended-tables";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tables/lib/index.umd.js"></script>

marked.use(markedExtendedTables());

marked(`
      | H1                        | H2  | H3  |
      | ------------------------- | --- | --- |
      | This cell spans 3 columns |     |     |
    `);

/**
 * <table>
 *  <thead>
 *    <tr>
 *      <th>H1</th>
 *      <th>H2</th>
 *      <th>H3</th>
 *    </tr>
 *  </thead>
 *  <tbody>
 *  <tr>
 *    <td colspan="3">This cell spans 3 columns</td>
 *  </tr>
 *  </tbody>
 * </table>
 */
```

Read the [Marked.js documentation](https://marked.js.org/) for more details about its usage.

### Available Extensions

- [Marked Extended Code Preview](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-code-preview)
- [Marked Extended Footnote](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-footnote)
- [Marked Extended Lists](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-lists)
- [Marked Extended Spoiler](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-spoiler)
- [Marked Extended Tables](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-tables)
- [Marked Extended Typographic](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-typographic)

### Demo Application

To see all themes in action, check out the [DEMO](https://fsegurai.github.io/marked-extensions/).

### Local Development

To set up the demo locally:

```bash
git clone https://github.com/fsegurai/marked-extensions.git
npm install
npm start
```

This will serve the application locally at [http://[::1]:8000](http://[::1]:8000).

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).