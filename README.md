<p align="center" class="intro">
  <img alt="Marked Extensions Logo" src="https://raw.githubusercontent.com/fsegurai/marked-extensions/main/public/marked-extensions.svg">
</p>

<p align="center" class="intro">
  <a href="https://github.com/fsegurai/marked-extensions">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/93779823-473d-4fb3-a5b1-27aaa1a88ea2/18/main?label=Build%20Status&"
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

### Table of contents

- [Installation](#installation)
- [Usage](#usage)
    - [Basic Usage](#basic-usage)
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
import { marked } from "marked";
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

### Available Extensions

- [Marked Extended Accordion](https://www.npmjs.com/package/@fsegurai/marked-extended-accordion)
- [Marked Extended Alert](https://www.npmjs.com/package/@fsegurai/marked-extended-alert)
- [Marked Extended Footnote](https://www.npmjs.com/package/@fsegurai/marked-extended-footnote)
- [Marked Extended Lists](https://www.npmjs.com/package/@fsegurai/marked-extended-lists)
- [Marked Extended Spoiler](https://www.npmjs.com/package/@fsegurai/marked-extended-spoiler)
- [Marked Extended Tables](https://www.npmjs.com/package/@fsegurai/marked-extended-tables)
- [Marked Extended Tabs](https://www.npmjs.com/package/@fsegurai/marked-extended-tabs)
- [Marked Extended Timeline](https://www.npmjs.com/package/@fsegurai/marked-extended-timeline)
- [Marked Extended Typographic](https://www.npmjs.com/package/@fsegurai/marked-extended-typographic)

### Demo Application

To see all extensions in action, check out the [[DEMO]](https://fsegurai.github.io/marked-extensions).

### Local Development

    I highly recommend using "bun" to manage the project dependencies.

To set up the demo locally, follow the next steps:

```bash
git clone https://github.com/fsegurai/marked-extensions.git
bun install
bun start
```

This will serve the application locally at [http://[::1]:8000](http://[::1]:8000).

### Semantic Versioning

The expected commits format follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Example:

- feat: add new user login feature
- fix: resolve issue with user profile update
- docs: update API documentation
- style: format code according to new style guide
- refactor: simplify user authentication logic
- perf: improve database query performance
- test: add tests for user registration

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
