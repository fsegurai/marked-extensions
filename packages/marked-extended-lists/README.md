<p align="center">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/demo/public/marked-extensions.svg">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/marked-extended-lists">
      <img src="https://img.shields.io/npm/v/@fsegurai/marked-extended-lists.svg"
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

**A library of extended lists for Marked.js.**

`@fsegurai/marked-extended-lists` is an extensions for Marked.js that adds support for extended lists. It allows you to
create lists with different types of markers and nested lists with different types of markers, like `a.`, `A.`, `i.`,
`I.`, and other patterns to be rendered as `<ol>` elements with corresponding `type` values (e.g., `<ol type="a">`).

It also adds support for lists that start with a custom value or that skips values, by using the `value` attribute on
the list item.

This enables more flexible list formatting in Markdown, enhancing the output to match the intended ordering style.

### Table of contents

- [Installation](#installation)
    - [@fsegurai/marked-extended-lists](#fseguraimarked-extended-lists)
    - [Using Extended Lists](#using-extended-lists)
    - [Available Extensions](#available-extensions)
    - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/marked-extended-lists

To add `@fsegurai/marked-extended-lists` along with Marked.js to your `package.json` use the following commands.

```bash
npm install @fsegurai/marked-extended-lists marked@^15.0.0 --save
```

### Using Extended Lists

Import `@fsegurai/marked-extended-lists` and apply it to your Marked instance as shown below.

```javascript
import { marked } from "marked";
import markedExtendedLists from "@fsegurai/marked-extended-lists";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-lists/lib/index.umd.js"></script>

marked.use(markedExtendedLists());

const exampleMarkdown = `
1. item 1
2. item 2
    a. item 2a
        I.  sub item I
        II. sub item II
    e. item 2e
7. item 7
`;

marked.parse(exampleMarkdown);
// <ol>
//   <li>item 1</li>
//   <li>item 2
//     <ol type="a">
//       <li>item 2a</li>
//       <ol type="I">
//         <li>sub item I</li>
//         <li>sub item II</li>
//       </ol>
//       <li value="5">item 2e</li>
//     </ol>
//   </li>
//   <li value="7">item 7</li>
// </ol>
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