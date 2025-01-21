<p align="center">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/demo/public/marked-extensions.svg">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/marked-extensions/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/marked-extended-code-preview">
      <img src="https://img.shields.io/npm/v/@fsegurai/marked-extended-code-preview.svg"
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

**A library of extended code preview blocks for Marked.js.**

`@fsegurai/marked-extended-code-preview` is an extensions for Marked.js that adds support for extended code preview blocks, allowing the creation of expanded panels with code snippets. It supports `code block`, `image reference`, and `text` elements. 

### Table of contents

- [Installation](#installation)
    - [@fsegurai/marked-extended-code-preview](#fseguraimarked-extended-code-preview)
    - [Using Extended Code Preview](#using-extended-code-preview)
    - [Available Extensions](#available-extensions)
    - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/marked-extended-code-preview

To add `@fsegurai/marked-extended-code-preview` along with Marked.js to your `package.json` use the following commands.

```bash
npm install @fsegurai/marked-extended-code-preview marked@^15.0.0 --save
```

### Using Extended Code Preview

Import `@fsegurai/marked-extended-code-preview` and apply it to your Marked instance as shown below.

**`ecp`  is the alias for the extended code preview block. It means Extended Code Preview.
`ecp` is followed by the `preview` keyword and the options for the preview block.**

```javascript
import { marked } from 'marked'
import markedExtendedCodePreview from '@fsegurai/marked-extended-code-preview'

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-code-preview/lib/index.umd.js"></script>

marked.use(markedExtendedCodePreview())

const exampleMarkdown = `
\`\`\` ecp preview title="Code Sample" extraData="Sample extra data"
const foo = 'bar';

console.log(foo);
\`\`\`

\`\`\` ecp preview title="Image Sample" extraData="Sample extra data" elementType="image"
https://imgs.search.brave.com/FEvHxi-_YFY__gKQNDl1QSKSpFvPu2-yvEn8evGo_F0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzUwLzEzLzQw/LzM2MF9GXzUwMTM0/MDY5X29FU1pkQXJB/WHUzdmtvaXhUZHRk/QWZ2Uk5qMGZ1Vm1a/LmpwZw
\`\`\`

\`\`\` ecp preview title="Text Sample" elementType="text"
Hello, World!
\`\`\`
`

marked.parse(exampleMarkdown)

// Output:
// <details id="{previewId}" name="{title}" class="code-preview-card">
//     <summary>
//         <span class="preview-text">{title}</span>
//     </summary>
//     <p class="preview-content">
//         {previewContent}
//     </p>
//     {extraData}
// </details>
```

By default, this plugin does not include any styles for the code preview blocks.
So you will need to add the style as shown below to your CSS in case you would like to use the default template:

``` css
/* Marked Extended Code Preview to style code blocks */

.code-preview-card {
    padding: 5px 20px;
    margin: 15px 0;
    border-radius: 4px;
    position: relative;

    &[open] {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: scale(1.02);
    }

    .code-preview-card:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: scale(1.02);
    }

    /* Panel Header */

    .preview-text {
        font-size: 16px;
        font-weight: 600;
        max-width: 75%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Preview Content Styling */

    .preview-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        transition: all 0.3s ease;
    }

    .preview-img {
        object-fit: cover;
        border-radius: 8px;
        margin: 0 auto;
        aspect-ratio: 16 / 9;
        width: 100%;
        transition: transform 0.3s ease;
    }

    .preview-img:hover {
        transform: scale(1.05);
    }

    /* Extra Data Area */

    .extra-data {
        margin: 15px 0 5px;
        font-size: 14px;
        padding-top: 10px;
        font-style: italic;
    }

    /* Text-based Preview */

    .expanded-text {
        font-size: 16px;
        line-height: 1.6;
    }
}
```

Read the [Marked.js documentation](https://marked.js.org/) for more details about its usage.

### Options

The marked-code-preview extension accepts the following configuration options:

* `prefixId`: The prefix ID for code block. Defaults to 'code-preview-'.
* `title`: The title of the code preview block. Defaults to ''.
* `extraData`: The extra data of the code preview block which locates at the bottom of the preview block. Defaults to ''. 
* `elementType`: The type of the element to be displayed in the preview block. Defaults to 'code'. Available options are 'code', 'image', and 'text'.
* `customizeToken`: A function that allows you to customize the token object. Defaults to null.
* `template`: The template for the code preview block. Defaults to the default template.
* `codeLanguage`: The language of the code block. Defaults to 'plaintext'.

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