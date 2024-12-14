<p align="center">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/demo/public/marked-extensions.svg">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/marked-extended-tables">
      <img src="https://img.shields.io/npm/v/@fsegurai/marked-extended-tables.svg"
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

**A library of extended tables for Marked.js.**

`@fsegurai/marked-extended-tables` is an extension for Marked.js, allowing for more complex table structures and
styling. It adds support for tables with merged cells, row and column spans, and other advanced features.

### Table of contents

- [Installation](#installation)
    - [@fsegurai/marked-extended-tables](#fseguraimarked-extended-tables)
    - [Using Extended Tables](#using-extended-tables)
    - [Available Extensions](#available-extensions)
    - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/marked-extended-tables

To add `@fsegurai/marked-extended-tables` along with Marked.js to your `package.json` use the following commands.

```bash
npm install @fsegurai/marked-extended-tables marked@^12.0.2 --save
```

### Using Extended Tables

Import `@fsegurai/marked-extended-tables` and apply it to your Marked instance as shown below.

```javascript
import { marked } from "marked";
import markedExtendedTables from "@fsegurai/marked-extended-tables";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tables/lib/index.umd.js"></script>

marked.use(markedExtendedTables());

marked(`
      | H1      | H2      | H3      |
      |---------|---------|---------|
      | This cell spans 3 columns |||
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

- [Marked Extended Lists](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-lists)
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