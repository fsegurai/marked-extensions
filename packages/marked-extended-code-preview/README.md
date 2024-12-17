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

\`\`\` ecp preview title="Image Sample" extraData="Sample extra data"  elementType="image"
https://imgs.search.brave.com/FEvHxi-_YFY__gKQNDl1QSKSpFvPu2-yvEn8evGo_F0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzUwLzEzLzQw/LzM2MF9GXzUwMTM0/MDY5X29FU1pkQXJB/WHUzdmtvaXhUZHRk/QWZ2Uk5qMGZ1Vm1a/LmpwZw
\`\`\`

\`\`\` ecp preview title="Text Sample" extraData="Sample extra data" elementType="text"
Hello, World!
\`\`\`
`

marked.parse(exampleMarkdown)

// Output:
// <div id="{previewId}" class="code-preview-card">
//         <!-- Panel Header -->
// <div class="panel-header">
//         <div class="preview-header-content">
//         <span class="preview-text">{title}</span>
// <span class="preview-icon">{icon}</span>
// </div>
// <button class="expand-btn" aria-expanded="false" aria-controls="{previewId}-content">
//     <span class="expand-icon">▼</span>
// </button>
// </div>
//
// <!-- Panel Body -->
// <div id="{previewId}-content" class="code-preview-content">
//     <div class="full-content collapsed-content collapsed">
//         <div class="code-full-content">
//             {previewContent}
//         </div>
//         <div class="extra-data">{extraData}</div>
//     </div>
// </div>
// </div>
```

By default, this plugin does not include any styles for the code preview blocks.
So you will need to add the style as shown below to your CSS in case you use the default template:

``` css
/* General Card Styling */
.code-preview-card {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 15px 0;
    border-radius: 12px;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.code-preview-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
}

/* Initially hide the full content */
.code-preview-content .full-content.collapsed {
    display: none;
}

/* Expanded content */
.code-preview-content .full-content {
    display: block;
    margin-top: 15px;
}

/* Panel Header */
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 5px;
}

.preview-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    margin-right: 10px;
}

.preview-text {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.preview-icon {
    font-size: 24px;
    margin-left: 12px;
}

/* Expand Button */
.expand-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

.expand-btn[aria-expanded="true"] {
    background-color: #28a745; /* Green when expanded */
}

.expand-btn:hover {
    background-color: #0056b3;
}

.expand-icon {
    font-size: 18px;
}

.expand-btn[aria-expanded="true"] .expand-icon {
    content: "▲"; /* Change icon when expanded */
}

/* Preview content styling */
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

/* Full content styling */
.code-full-content {
    padding: 18px;
    background-color: #f9f9f9;
    border-radius: 10px;
    margin-top: 12px;
    border: 1px solid #ddd;
    font-size: 16px;
    overflow: auto;
}

/* Extra data area */
.extra-data {
    margin-top: 15px;
    font-size: 14px;
    color: #555;
    padding-top: 10px;
    border-top: 1px dashed #ddd;
    font-style: italic;
}

/* Text-based preview */
.expanded-text {
    font-size: 16px;
    color: #444;
    line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .expand-btn {
        font-size: 14px;
        padding: 10px 20px;
    }

    .code-preview-card {
        padding: 16px;
    }

    .preview-text {
        font-size: 14px;
        max-width: 60%;
    }

    .preview-img {
        max-width: 85px;
        max-height: 85px;
    }

    .expanded-img {
        max-width: 90%;
        max-height: 280px;
    }
}
```

Read the [Marked.js documentation](https://marked.js.org/) for more details about its usage.

### Options

The marked-footnote extension accepts the following configuration options:

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