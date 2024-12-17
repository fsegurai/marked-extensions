<p align="center">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/demo/public/marked-extensions.svg">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/marked-extended-footnote">
      <img src="https://img.shields.io/npm/v/@fsegurai/marked-extended-footnote.svg"
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

**A library of extended footnotes for Marked.js.**

`@fsegurai/marked-extended-footnote` is an extensions for Marked.js that adds support for extended footnotes. 

### Table of contents

- [Installation](#installation)
    - [@fsegurai/marked-extended-footnote](#fseguraimarked-extended-footnote)
    - [Using Extended Footnotes](#using-extended-footnotes)
    - [Available Extensions](#available-extensions)
    - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/marked-extended-footnote

To add `@fsegurai/marked-extended-footnote` along with Marked.js to your `package.json` use the following commands.

```bash
npm install @fsegurai/marked-extended-footnote marked@^15.0.0 --save
```

### Using Extended Footnotes

Import `@fsegurai/marked-extended-footnote` and apply it to your Marked instance as shown below.

```javascript
import { marked } from 'marked'
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote'

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-footnote/lib/index.umd.js"></script>

marked.use(markedExtendedFootnote())

const exampleMarkdown = `
This is an inline footnote reference[^1].

[^1]: This is the footnote.

This is a block footnote reference[^2].

[^2]:
    This is the block footnote.
    It can contain multiple lines.
`

marked.parse(exampleMarkdown)

// Output:
// <p>This is an inline footnote reference<sup id="fnref:1"><a href="#fn:1" class="footnote-ref">1</a></sup>.</p>

// <p>This is a block footnote reference<sup id="fnref:2"><a href="#fn:2" class="footnote-ref">2</a></sup>.</p>

// <div class="footnotes">
//   <hr>
//   <ol>
//     <li id="fn:1">
//       <p>This is the footnote. <a href="#fnref:1" class="footnote-backref">↩</a></p>
//     </li>
//     <li id="fn:2">
//       <p>This is the block footnote. It can contain multiple lines. <a href="#fnref:2" class="footnote-backref">↩</a></p>
//     </li>
//   </ol>
// </div>
```

    By default, this plugin does not place footnote markers in square brackets ([1]), instead like this: 1. 
    So you will need to add the style as shown below to your CSS:

``` css
/* Marked Extended Footnotes to style links references */
[data-fnref-ref]::before {
  content: '[';
}

[data-fnref-ref]::after {
  content: ']';
}
```

Read the [Marked.js documentation](https://marked.js.org/) for more details about its usage.

### Options

The marked-footnote extension accepts the following configuration options:

* `prefixId`: The prefix ID for footnotes. Defaults to 'fnref-'.
* `description`: The description of footnotes, used by aria-labeledby attribute. Defaults to 'Footnotes'.
* `refMarkers`: If set to true, it will place footnote reference in square brackets, like this: [1]. Defaults to false.

### Available Extensions

- [Marked Extended Code Preview](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-code-preview)
- [Marked Extended Footnote](https://github.com/fsegurai/marked-extensions/tree/main/packages/marked-extended-footnote)
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