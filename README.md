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

Since 19.0.0-beta.0, every package follows one runtime contract, so the same output works in plain pages, React, Vue,
Angular and server-side rendering. Upgrading from 18.x? Read [MIGRATION-19.md](./MIGRATION-19.md).

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

React, Vue and Angular examples are in [MIGRATION-19.md](./MIGRATION-19.md#the-runtime-contract). An ngx-markdown
adapter (`withMarkedExtended`) is planned.

## Compatibility

| Packages      | Marked peer       | Notes                                                                                 |
|---------------|-------------------|---------------------------------------------------------------------------------------|
| 19.x (stable) | marked 19         | Not released yet: the stable 19.0.0 moves the peer to marked 19 when marked 19 ships  |
| 19.0.0-beta.x | `^18` (for now)   | Safe-by-default runtime contract (breaking, see [MIGRATION-19.md](./MIGRATION-19.md)) |
| 18.0.x        | `^18`             |                                                                                       |
| 17.x          | `^17`             |                                                                                       |

Every package, including the new `code` and `core` packages, is released as 19.0.0-beta.0. The packages stay in beta,
with the `marked ^18` peer, until marked 19 is released.

## More Resources

### Available Extensions

| Extension    | Package                                                                                                      | Version                                                                    | Description                                                          |
|--------------|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------------------|
| All - Bundle | [@fsegurai/marked-extended-bundle](https://www.npmjs.com/package/@fsegurai/marked-extended-bundle)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-bundle)      | Includes all extensions in a single package for easy integration     |
| Accordion    | [@fsegurai/marked-extended-accordion](https://www.npmjs.com/package/@fsegurai/marked-extended-accordion)     | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-accordion)   | Add collapsible accordion sections to your markdown                  |
| Alert        | [@fsegurai/marked-extended-alert](https://www.npmjs.com/package/@fsegurai/marked-extended-alert)             | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-alert)       | Create styled alert boxes for important information                  |
| Code         | [@fsegurai/marked-extended-code](https://www.npmjs.com/package/@fsegurai/marked-extended-code)               | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-code)        | Code blocks with titles, line numbers, highlights, diffs and groups  |
| Comments     | [@fsegurai/marked-extended-comments](https://www.npmjs.com/package/@fsegurai/marked-extended-comments)       | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-comments)    | Add comment sections with author and timestamp metadata              |
| Core         | [@fsegurai/marked-extended-core](https://www.npmjs.com/package/@fsegurai/marked-extended-core)               | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-core)        | Shared runtime helpers (bundled into every package; for authors)     |
| Embeds       | [@fsegurai/marked-extended-embeds](https://www.npmjs.com/package/@fsegurai/marked-extended-embeds)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-embeds)      | Easily embed content from various platforms (YouTube, Twitter, etc.) |
| Footnote     | [@fsegurai/marked-extended-footnote](https://www.npmjs.com/package/@fsegurai/marked-extended-footnote)       | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-footnote)    | Add footnotes with automatic numbering                               |
| Kanban       | [@fsegurai/marked-extended-kanban](https://www.npmjs.com/package/@fsegurai/marked-extended-kanban)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-kanban)      | Create kanban boards with customizable columns and cards             |
| Lists        | [@fsegurai/marked-extended-lists](https://www.npmjs.com/package/@fsegurai/marked-extended-lists)             | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-lists)       | Enhanced list formatting options                                     |
| Slide        | [@fsegurai/marked-extended-slide](https://www.npmjs.com/package/@fsegurai/marked-extended-slide)             | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-slide)       | Create slide decks directly from markdown content                    |
| Spoiler      | [@fsegurai/marked-extended-spoiler](https://www.npmjs.com/package/@fsegurai/marked-extended-spoiler)         | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-spoiler)     | Hide content behind spoiler tags                                     |
| Tables       | [@fsegurai/marked-extended-tables](https://www.npmjs.com/package/@fsegurai/marked-extended-tables)           | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-tables)      | Advanced table formatting with cell spanning                         |
| Tabs         | [@fsegurai/marked-extended-tabs](https://www.npmjs.com/package/@fsegurai/marked-extended-tabs)               | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-tabs)        | Create tabbed content sections                                       |
| Timeline     | [@fsegurai/marked-extended-timeline](https://www.npmjs.com/package/@fsegurai/marked-extended-timeline)       | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-timeline)    | Display content in an interactive timeline format                    |
| Typographic  | [@fsegurai/marked-extended-typographic](https://www.npmjs.com/package/@fsegurai/marked-extended-typographic) | ![npm](https://img.shields.io/npm/v/@fsegurai/marked-extended-typographic) | Improve typography with smart quotes, dashes, and more               |

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
