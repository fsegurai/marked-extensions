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

`@fsegurai/marked-extended-code-preview` is an extension for Marked.js that adds support for extended code preview blocks, allowing the creation of expanded panels with code snippets. It supports any markdown rendering (only if the `marked` instance is passed as an argument) and can be customized to fit your needs. In contrary case, it will have some limitations while rendering the content.

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

**`preview`  is the alias for the extended code preview block.**

```javascript
import { marked } from 'marked'
import markedExtendedCodePreview from '@fsegurai/marked-extended-code-preview'

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-code-preview/lib/index.umd.js"></script>

marked.use(markedExtendedCodePreview())
// marked.use(markedExtendedCodePreview({}, marked))

const exampleMarkdown = `
\`\`\` preview title="Code Preview 📄" subTitle="This is a javascript sample"
  \`\`\` javascript
  const foo = 'bar';
  
  console.log(foo);
  \`\`\`
\`\`\`

\`\`\` preview title="Image Preview" subTitle="Image sample"
![Test image](https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "test image")
\`\`\`

\`\`\` preview title="Text Sample"
Hello, World!
\`\`\`
`

marked.parse(exampleMarkdown)

// Output:
// <details id="{previewId}" name="{previewId}" class="code-preview-card">
//     <summary>
//         <span class="preview-text">{customTitle}</span>
//     </summary>
//     <div class="preview-content">
//         {markedCode}
//     </div>
//     {customSubTitle}
// </details>
```

By default, this plugin does not include any styles for the code preview blocks.
So you will need to add the style as shown below to your CSS in case you would like to use the default template:

``` css
/* Marked Extended Code Preview to style code blocks */

.code-preview-card {
    padding: 10px 20px;
    margin: 15px 0;
    border-radius: 4px;
    position: relative;

    &[open] {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: scale(1.02);
    }

    &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: scale(1.02);
    }

    /* Panel Header */

    & .preview-title {
        font-size: 16px;
        font-weight: 600;
        max-width: 75%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    /* Preview Content Styling */

& .preview-content {
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
        width: 100%;
    }

    & img {
        object-fit: cover;
        border-radius: 8px;
        margin: 0 auto;
        aspect-ratio: 16 / 9 !important;
        width: 100% !important;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }
}

    /* Subtitle Area */

    & .preview-subtitle {
        margin: 15px 0 5px;
        font-size: 14px;
        padding-top: 10px;
        font-style: italic;
    }
}
```

Read the [Marked.js documentation](https://marked.js.org/) for more details about its usage.

### Options

The marked-code-preview extension accepts the following configuration options:

* `prefixId`: The prefix ID for code block. Defaults to 'code-preview-'.
* `title`: The title of the code preview block. Defaults to ''.
* `subTitle`: The subtitle of the code preview block which locates at the bottom of the preview block. Defaults to ''.
* `customizeToken`: A function that allows you to customize the token object. Defaults to null.
* `template`: The template for the code preview block. Defaults to the default template.
* `marked`: The Marked instance to extend rendering for the code preview block. Example: You can render the code preview block with a custom extension like `@fsegurai/marked-extended-tables`.

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