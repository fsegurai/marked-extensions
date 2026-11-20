<p align="center" class="intro">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/demo/public/marked-extensions.svg">
</p>

<p align="center" class="intro">
  <a href="https://github.com/fsegurai/marked-extensions">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/93779823-473d-4fb3-a5b1-27aaa1a88ea2/18/main?label=build"
          alt="Build Main Status">
  </a>
  <a href="https://github.com/fsegurai/marked-extensions/releases/latest">
      <img src="https://img.shields.io/github/v/release/fsegurai/marked-extensions"
          alt="Latest Release">
  </a>
  <a href="https://www.npmjs.com/package/@fsegurai/marked-extended-bundle">
      <img src="https://img.shields.io/npm/dt/@fsegurai/marked-extended-bundle?label=bundle%20downloads"
          alt="Total npm downloads of the bundle">
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

---

### Table of contents

- [Installation](#installation)
- [Usage](#usage)
    - [Basic Usage](#basic-usage)
- [Framework Integration](#framework-integration)
- [Compatibility](#compatibility)
- [More Resources](#more-resources)
    - [Available Extensions](#available-extensions)
    - [Demo Application](#demo-application)
    - [Local Development](#local-development)
- [License](#license)

## Installation

Import the desired extension from the available list and apply it to your Marked instance as shown below.

## Usage

### Basic Usage

```javascript
import {marked} from "marked";
import markedExtendedTables from "@fsegurai/marked-extended-tables";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@fsegurai/marked-extended-tables/lib/index.umd.js"></script>

marked.use(markedExtendedTables());

const exampleMarkdown = `
| H1      | H2      | H3      |
|---------|---------|---------|
| This cell spans 3 columns |||
`;

marked.parse(exampleMarkdown);
```

## Framework Integration

Since 18.1.0, every package follows one runtime contract, so the same output works in plain pages, React, Vue,
Angular and server-side rendering. Upgrading from 18.0.x? Read [MIGRATION-18.1.md](./MIGRATION-18.1.md): 18.1.0 is a
minor version with breaking changes.

- **Sanitizer-safe markup.** The default HTML survives strict sanitizers such as Angular's `SecurityContext.HTML`:
  state lives in `class`, `aria-*`, `role`, `hidden`, `open` and `tabindex`, configuration in `mx-<pkg>-<key>-<value>`
  class tokens, and icons are drawn with CSS. No `id`, `style`, `data-*`, inline handlers, `<script>`, `<svg>` or
  `<iframe>` in the default output.
- **`unsafeHtml: true`.** Each package whose markup changed keeps its 18.0 markup behind this option, for pages that
  do not sanitize.
- **Explicit runtimes.** Interactive behaviour comes from `attachX(root, options?)` (`attachTabs`, `attachEmbeds`,
  `attachSlides`…), which returns a `dispose` function. Runtimes are idempotent per root, delegate their listeners to
  `root` only and create no `window` globals. `attachX.refresh(root)`, or `{ observe: true }`, re-applies per-element
  setup after the content is replaced.
- **`attachAll`.** The bundle attaches every runtime at once and returns one `{ dispose(), refresh() }` handle.
- **Events.** Runtimes dispatch bubbling `CustomEvent`s named `marked-extended:<pkg>:<event>`, for example
  `marked-extended:tabs:switch` or the cancelable `marked-extended:lists:toggle`.
- **SSR safety.** Importing a package or creating an extension never touches `document` or `window`; ids are
  content hashes, so server and client renders match.

```javascript
import { Marked } from 'marked';
import { attachAll, markedExtendedTabs, markedExtendedEmbeds } from '@fsegurai/marked-extended-bundle';

const marked = new Marked().use(markedExtendedTabs(), markedExtendedEmbeds());
container.innerHTML = marked.parse(markdown); // or your framework's sanitized [innerHTML] / v-html binding

const handle = attachAll(container); // after render
handle.refresh();                     // after replacing the content
handle.dispose();                     // on teardown
```

React, Vue and Angular examples are in [MIGRATION-18.1.md](./MIGRATION-18.1.md#the-runtime-contract). An ngx-markdown
adapter (`withMarkedExtended`) is planned.

## Compatibility

| Packages      | Marked peer | Notes                                                                                                   |
|---------------|-------------|---------------------------------------------------------------------------------------------------------|
| 18.1.x        | `^18`       | Safe-by-default runtime contract, `mx-` classes (breaking, see [MIGRATION-18.1.md](./MIGRATION-18.1.md)) |
| 18.0.x        | `^18`       | Pin `~18.0.0` to stay on the 18.0 markup                                                                |
| 17.x          | `^17`       |                                                                                                         |

18.1.0 is a minor version that contains breaking changes, so a `^18` range picks it up: pin `~18.0.0` until you have
followed [MIGRATION-18.1.md](./MIGRATION-18.1.md).

## More Resources

### Available Extensions

| Extension    | Package                                                                                                      | Version                                                                    | Downloads | Description                                                          |
|--------------|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|-----------|----------------------------------------------------------------------|
| All - Bundle | [@fsegurai/marked-extended-bundle](https://www.npmjs.com/package/@fsegurai/marked-extended-bundle)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-bundle)      | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-bundle) | Includes all extensions in a single package for easy integration     |
| Accordion    | [@fsegurai/marked-extended-accordion](https://www.npmjs.com/package/@fsegurai/marked-extended-accordion)     | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-accordion)   | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-accordion) | Add collapsible accordion sections to your markdown                  |
| Alert        | [@fsegurai/marked-extended-alert](https://www.npmjs.com/package/@fsegurai/marked-extended-alert)             | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-alert)       | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-alert) | Create styled alert boxes for important information                  |
| Code         | [@fsegurai/marked-extended-code](https://www.npmjs.com/package/@fsegurai/marked-extended-code)               | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-code)        | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-code) | Code blocks with titles, line numbers, highlights, diffs and groups  |
| Comments     | [@fsegurai/marked-extended-comments](https://www.npmjs.com/package/@fsegurai/marked-extended-comments)       | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-comments)    | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-comments) | Add comment sections with author and timestamp metadata              |
| Core         | [@fsegurai/marked-extended-core](https://www.npmjs.com/package/@fsegurai/marked-extended-core)               | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-core)        | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-core) | Shared runtime helpers (bundled into every package; for authors)     |
| Embeds       | [@fsegurai/marked-extended-embeds](https://www.npmjs.com/package/@fsegurai/marked-extended-embeds)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-embeds)      | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-embeds) | Easily embed content from various platforms (YouTube, Twitter, etc.) |
| Footnote     | [@fsegurai/marked-extended-footnote](https://www.npmjs.com/package/@fsegurai/marked-extended-footnote)       | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-footnote)    | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-footnote) | Add footnotes with automatic numbering                               |
| Inline       | [@fsegurai/marked-extended-inline](https://www.npmjs.com/package/@fsegurai/marked-extended-inline)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-inline)      | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-inline) | Inline marks: ==highlight==, optional ++insert++, ^superscript^ and ~subscript~ |
| Kanban       | [@fsegurai/marked-extended-kanban](https://www.npmjs.com/package/@fsegurai/marked-extended-kanban)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-kanban)      | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-kanban) | Create kanban boards with customizable columns and cards             |
| Lists        | [@fsegurai/marked-extended-lists](https://www.npmjs.com/package/@fsegurai/marked-extended-lists)             | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-lists)       | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-lists) | Enhanced list formatting options                                     |
| Slide        | [@fsegurai/marked-extended-slide](https://www.npmjs.com/package/@fsegurai/marked-extended-slide)             | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-slide)       | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-slide) | Create slide decks directly from markdown content                    |
| Source Map   | [@fsegurai/marked-extended-source-map](https://www.npmjs.com/package/@fsegurai/marked-extended-source-map)   | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-source-map)  | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-source-map) | Source line numbers and safe heading ids for editor-preview scroll sync |
| Spoiler      | [@fsegurai/marked-extended-spoiler](https://www.npmjs.com/package/@fsegurai/marked-extended-spoiler)         | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-spoiler)     | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-spoiler) | Hide content behind spoiler tags                                     |
| Tables       | [@fsegurai/marked-extended-tables](https://www.npmjs.com/package/@fsegurai/marked-extended-tables)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-tables)      | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-tables) | Advanced table formatting with cell spanning                         |
| Tabs         | [@fsegurai/marked-extended-tabs](https://www.npmjs.com/package/@fsegurai/marked-extended-tabs)               | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-tabs)        | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-tabs) | Create tabbed content sections                                       |
| Timeline     | [@fsegurai/marked-extended-timeline](https://www.npmjs.com/package/@fsegurai/marked-extended-timeline)       | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-timeline)    | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-timeline) | Display content in an interactive timeline format                    |
| TOC          | [@fsegurai/marked-extended-toc](https://www.npmjs.com/package/@fsegurai/marked-extended-toc)                 | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-toc)         | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-toc) | Generate a table of contents with [toc] or [toc:N]                   |
| Typographic  | [@fsegurai/marked-extended-typographic](https://www.npmjs.com/package/@fsegurai/marked-extended-typographic) | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-typographic) | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-typographic) | Improve typography with smart quotes, dashes, and more               |
| Wikilinks    | [@fsegurai/marked-extended-wikilinks](https://www.npmjs.com/package/@fsegurai/marked-extended-wikilinks)     | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-wikilinks)   | ![downloads](https://img.shields.io/npm/dt/@fsegurai/marked-extended-wikilinks) | Wiki-style [[target#heading\|alias]] links resolved by your callback |

### Demo Application

To see all extensions in action, check out the [[DEMO]](https://fsegurai.github.io/marked-extensions).

### Local Development

> I highly recommend using "bun" to manage the project dependencies.

To set up the demo locally, follow the next steps:

```shell
git clone https://github.com/fsegurai/marked-extensions.git
bun install
bun start
```

This will serve the application locally at [http://[::1]:8000](http://[::1]:8000).

### Semantic Versioning

The expected commits format follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
specification. Example:

- feat: add new markdown extension for spoilers
- fix: resolve issue with user profile update
- docs: update API documentation
- style: format code according to new style guide
- refactor: simplify user authentication logic
- test: add or fix unit tests for user registration
- chore: update build process or dependencies
- perf: improve database query performance

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
