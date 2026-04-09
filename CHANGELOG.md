# 📦 Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

### ⚠️ BREAKING CHANGES ⚠️

- Migrated a project from `Javascript` to `Typescript`. **(Note**: This change is not backward compatible.)
    - Supported declaration files:
        - `ESM`
        - `CommonJS`
        - `UMD`
        - `Typescript`
- Improved aliases for extensions.
    - `Marked Extended Accordion`
        - Old aliases:
            - Start: `:acc` -> `:accordion`
            - End: `:accend` -> `:accordionend`
        - New aliases:
            - Start: `:acda` -> `:accordion`
            - End: `:acdend` -> `:accordionend
    - `Marked Extended Spoiler`
        - Old aliases:
            - Start: `:sp` -> `:spoiler`
            - End: `:spend` -> `:spoilerend`
        - New aliases:
            - Start: `:spr` -> `:spoiler`
            - End: `:sprend` -> `:spoilerend
    - `Marked Extended Tabs`
        - Old aliases:
            - Start: `:tb` -> `:tabs`
            - End: `:tbend` -> `:tabsend
        - New aliases:
            - Start: `:tbs` -> `:tabs`
            - End: `:tbsend` -> `:tabsend`
    - `Marked Extended Tabs (Item)`
        - Old aliases:
            - Start: `:t` -> `:tab`
            - End: `:tend` -> `:tabend`
        - New aliases:
            - Start: `:tab` -> `:tab`
            - End: `:tabend` -> `:tabend`
    - `Marked Extended Timeline`
        - Old aliases:
            - Start: `:tl`, `:timeline`
            - End: `:tlend`, `:timelineend`
        - New aliases:
            - Start: `:tml`, `:timeline`
            - End: `:tmlend`, `:timelineend`
    - `Marked Extended Timeline (Event)`
        - Old aliases:
            - Start: `:ev`, `:event`
            - End: `:evend`, `:eventend`
        - New aliases:
            - Start: `:evt`, `:event`
            - End: `:evtend`, `:eventend`

### 🚀 Features

- **New Extension**:`Marked Extended Bundle` with all available extensions - Tests are not included since each extension
  is evaluated individually.
- **New Extension**:`Marked Extended Comments` and its respective unit tests
- **New Extension**:`Marked Extended Embeds` and its respective unit tests
- **New Extension**:`Marked Extended Kanban` and its respective unit tests
- **New Extension**:`Marked Extended Slide` and its respective unit tests
- Added a dedicated interface extending the global Window type to safely expose marked without overwriting existing
  globals used by extensions or the demo playground.
- Introduced shared helper utilities to improve code reuse, readability, and long-term maintainability across
  extensions.
- Migrated the following extensions to `TypeScript`, improving type safety, tooling support, and maintainability:
    - `Marked Extended Accordion`
        - Supports recursive Markdown rendering within accordion panels.
    - `Marked Extended Alert`
    - `Marked Extended Footnote`
        - Added tooltip rendering for footnote references.
    - `Marked Extended Lists`
        - Extended attribute support for ol and ul elements.
        - Added support for start and reversed attributes.
        - Implemented reactive checkbox state updates.
    - `Marked Extended Spoiler`
        - Accessibility and UX improvements.
        - Supports Markdown rendering inside spoiler content.
    - `Marked Extended Tables`
    - `Marked Extended Tabs`
        - Supports Markdown rendering inside tab panels.
    - `Marked Extended Timeline`
        - Supports Markdown rendering inside timeline panels.
    - `Marked Extended Typographic`

### 🐞 Fixes

- Fixed `marked-extended-tabs` tokenizer type errors and property access.
- Fixed `marked-extended-typographic` return path issues.
- For rollout configuration file, fixed `process` import reference to point to `node:process` directly.
- Fixed the issue with the util imports reference on all extensions.

### 🔧 Changes

- Refactored the local storage extension keyword to a more accurate one based on the project.
- Refactored extensions tests to support the new `Typescript` project.
- Refactored tests to use `Bun test` instead of `Jest`
- Improved keywords declared in the `package.json` files.
- Improved README files structure and content.
- Updated `peerDependencies` to support `marked` version `^17.0.0`.
- Updated and improved documentation in `README.custom.md` files for all extensions.
- Extension styles are not tied to the package anymore. Users can now import the styles directly from the package if
  desired, but they are not required for the extension to work. This allows users to customize the styles as needed
  without having to override default styles.

### 🔐 Security

- **Added dependencies**.
    - Dependencies
        - `@lezer/markdown` - `1.6.3` - needed for Markdown parsing. 
    - Dev Dependencies
        - `@types/node` - `25.5.2` - needed for types declarations.
        - `@typescript-eslint/eslint-plugin` - `8.58.0` - needed for TypeScript linting.
          `@typescript-eslint/parser` - `8.58.0` - needed for TypeScript linting.
        - `bun-types` - `1.3.11` - needed for testing purposes only.
        - `glob` - `13.0.6` - needed for packages utilities.
        - `portless` - `0.9.6` - needed for local development. Replace port numbers with stable names.
        - `terser` - `5.46.1` - needed for production builds as part of Vite.
        - `vite` - `8.0.7` - needed for development and build processes. Replacement of Rollup.
- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dependencies
        - `@material/web` from `2.3.0` to `2.4.1`
        - `marked` from `15.0.12` to `17.0.6`
        - `marked-highlight` from `2.2.1` to `2.2.3`
    - Dev Dependencies
        - `@eslint/js` from `9.28.0` to `10.0.1`
        - `@types/jsdom` from `27.0.0` to `28.0.1`
        - `@types/prismjs` from `1.26.5` to `1.26.6`
        - `eslint` from `9.28.0` to `10.2.0`
        - `globals` from `16.2.0` to `17.4.0`
        - `jsdom` from `27.4.0` to `29.0.1`
        - `rimraf` from `6.0.1` to `6.1.3`
        - `typescript` from `5.8.3` to `6.0.2`
        - `typescript-eslint` from `8.33.1` to `8.58.0`
- **Removed dependencies** — eliminated unused dependencies to reduce potential security risks and improve project
  maintainability.
    - Removed Dependencies
        - `@rollup/plugin-commonjs`
        - `@rollup/plugin-node-resolve`
        - `@rollup/plugin-replace`
        - `@rollup/plugin-typescript`
        - `@semantic-release/changelog`
        - `@semantic-release/commit-analyzer`
        - `@semantic-release/release-notes-generator`
        - `@semantic-release/git`
        - `@semantic-release/github`
        - `@semantic-release/npm`
        - `@types/jest`
        - `cpy-cli`
        - `dotenv`
        - `github-slugger`
        - `jest-cli`
        - `rollup`
        - `rollup-plugin-dev`
        - `semantic-release`

### 🔧 Infrastructure

- **Build System Migration**: Migrated from Rollup to Vite
    - Replaced `rollup` + `rollup-plugin-dev` with `vite`
    - Removed all Rollup plugins (`@rollup/plugin-*`)
    - Added `vite.config.js` for cleaner configuration
    - Benefits:
        - Faster dev server with better HMR (Hot Module Replacement)
        - Built-in environment variable support (`.env` files)
        - Native TypeScript compilation
        - Better CSS/asset handling for future scalability
        - Simplified build configuration
    - Updated dev commands:
        - `bun run dev` now uses `vite serve` (was `rollup -w`)
        - `bun run build:demo` now uses `vite build` (was `rollup -c`)
    - Removed `rollup.config.js` (replaced by `vite.config.js`)
    - Removed build helper script `scripts/build-demo.mjs` (Vite handles env vars natively)

### 📝 Documentation

- Updated GitHub labeler configuration to track `vite.config.js` changes instead of `rollup.config.js`

---

[//]: # (## [17.0.0] - 2026-xx-xx)

[//]: # ()

[//]: # (**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v17.0.0)

---

## 15.9.6 - 2025-06-03

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dependencies
        - `marked` from `15.0.11` to `15.0.12`
    - Dev Dependencies
        - `@babel/core` from `7.27.3` to `7.27.4`
        - `@eslint/js` from `9.27.0` to `9.28.0`
        - `eslint` from `9.27.0` to `9.28.0`
        - `typescript-eslint` from `8.33.0` to `8.33.1`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v15.9.6

---

## 15.9.4 - 2025-05-12

### 🚀 Features

- New scripts for cleaning and building the project.

### 🔧 Changes

- Improved project and packages README structure

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dependencies
        - `marked` from `15.0.11` to `15.0.12`
    - Dev Dependencies
        - `@babel/core` from `7.27.1` to `7.27.3`
        - `@babel/preset-env` from `7.26.9` to `7.27.2`
        - `@eslint/js` from `9.26.0` to `9.27.0`
        - `@semantic-release/github` from `11.0.2` to `11.0.3`
        - `eslint` from `9.26.0` to `9.27.0`
        - `globals` from `16.1.0` to `16.2.0`
        - `rollup` from `4.40.2` to `4.41.1`
        - `semantic-release` from `24.2.4` to `24.2.5`
        - `typescript-eslint` from `8.32.0` to `8.32.1`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v15.9.4

---

## [15.9.3] - 2025-05-07

### ⚠️ BREAKING CHANGES ⚠️

- Migrated extensio from `Marked Extended Code Preview` to `Marked Extended Accordion`. **(Note**: This change is not
  backward compatible.)

### 🚀 Features

- **New Extension**:`Marked Extended Alert` and its respective unit tests
- **New Extension**:`Marked Extended Tabs` and its respective unit tests
- **New Extension**:`Marked Extended Timeline` and its respective unit tests

### 🔧 Changes

- Improved packages structure files
- Improved packages logic validation and inner styles
- Improved CI/CD pipelines workflows
- Improved utils logic

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dependencies
        - `@material/web` from `2.2.0` to `2.3.0`
        - `marked` from `15.0.7` to `15.0.9`
        - `prismjs` from `1.29.0` to `1.30.0`
    - Dev Dependencies
        - `@babel/core` from `7.26.9` to  `7.26.10`
        - `@eslint/js` from`9.21.0` to `9.25.1`
        - `@rollup/plugin-commonjs` from `28.0.2` to `28.0.3`
        - `@rollup/plugin-node-resolve` from `16.0.0` to `16.0.1`
        - `dotenv` from `16.4.7` to `16.5.0`
        - `eslint` from `9.21.0` to `9.25.1`
        - `rollup` from `4.34.9` to `4.40.0`
        - `tsd` from `0.31.2` to `0.32.0`
        - `typescript` from `5.7.3` to `5.8.3`
        - `typescript-eslint` from `8.25.0` to `8.31.0`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v15.9.3

---

## [15.1.3] - 2025-03-03

### 🚀 Features

- New `Browserslist` configuration file to support latest browser versions

### 🔧 Changes

- Improved `rollup` configuration file to better handle development host

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dev Dependencies
        - `@eslint/js` from `9.20.0` to  `9.21.0`
        - `eslint` from `9.20.1` to  `9.21.0`
        - `globals` from `15.15.0` to `16.0.0`
        - `prettier` from `3.5.1` to `3.5.3`
        - `rollup` from `4.34.7` to `4.34.9`
        - `typescript-eslint` from `8.24.0` to `8.25.0`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v15.1.3

---

## [15.1.2] - 2025-02-16

### 🔧 Changes

- Improved project README

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dev Dependencies
        - `@babel/core` from `7.26.8` to  `7.26.9`
        - `@babel/preset-env` from `7.26.8` to  `7.26.9`
        - `rollup` from `4.34.6` to `4.34.7`
        - `semantic-release` from `24.2.2` to `24.2.3`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v15.1.2

---

## [15.1.0] - 2025-01-26

### 🚀 Features

- **New Extension**:`Marked Extended Spoiler` and its respective unit tests

### 🔧 Changes

- Migrated to `BunJs` as package manager.
- Improved demo playground to support new extensions.
- Improved demo styles and logic
- Improved project structure
- Improved packages and README files

### 🐞 Fixes

- Fixed eslint formatting issues.
- Fixed extensions reference and README files across extensions
- Fixed CI/CD release workflow and environment variables
- Fixed unit tests and types declarations
- `Marked Extended Foonote` - Fixed index walktokens validation
- `Marked Extended Code Preview` - Fixed extension format and logic validation

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dev Dependencies
        - `@babel/core` from `7.26.0` to  `7.26.7`
        - `@babel/preset-env` from `7.26.0` to `7.26.7`
        - `@eslint/js` from `9.18.0` to `9.19.0`
        - `eslint` from `9.18.0` to `9.19.0`
        - `rollup` from `4.31.0` to `4.32.0`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v15.1.0

---

## [15.0.0] - 2024-11-28

### ⚠️ BREAKING CHANGES ⚠️

- Migrated `Marked` from `v12` to `v15`. **(Note**: This change is not backward compatible.)

### 🚀 Features

- **New Extension**:`Marked Extended Code Preview` and its respective unit tests
- **New Extension**:`Marked Extended Footnote` and its respective unit tests
- **New Extension**:`Marked Extended Lists` and its respective unit tests
- **New Extension**:`Marked Extended Tables` and its respective unit tests
- **New Extension**:`Marked Extended Typographic` and its respective unit tests

### 🔧 Changes

- Marked 15 Support across all extensions
- Pipeline release workflow

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dependencies
        - `marked` from `12.0.2` to `15.0.2`
    - Dev Dependencies
        - `@babel/core` from `7.25.9` to  `7.26.0`
        - `@babel/preset-env` from `7.25.9` to `7.26.0`
        - `@semantic-release/github` from `11.0.0` to `11.0.1`
        - `globals` from `15.11.0` to `15.12.0`
        - `prettier` from `3.3.3` to `3.4.1`
        - `rollup` from `4.24.0` to `4.27.4`
        - `semantic-release` from `24.1.3` to `24.2.0`
        - `typescript` from `5.6.3` to `5.7.2`
        - `typescript-eslint` from `8.15.0` to `8.16.0`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v15.0.0

---

## ✅ Compatibility

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer is **not supported**

---

[unreleased]: https://github.com/fsegurai/marked-extensions/compare/v17.0.0...HEAD

[17.0.0]: https://github.com/fsegurai/marked-extensions/compare/v15.9.6...v17.0.0

[15.9.6]: https://github.com/fsegurai/marked-extensions/compare/v15.9.4...v15.9.6

[15.9.4]: https://github.com/fsegurai/marked-extensions/compare/v15.9.3...v15.9.4

[15.9.3]: https://github.com/fsegurai/marked-extensions/compare/v15.1.3...v15.9.3

[15.1.3]: https://github.com/fsegurai/marked-extensions/compare/v15.1.2...v15.1.3

[15.1.2]: https://github.com/fsegurai/marked-extensions/compare/v15.1.0...v15.1.2

[15.1.0]: https://github.com/fsegurai/marked-extensions/compare/v15.0.0...v15.1.0

[15.0.0]: https://github.com/fsegurai/marked-extensions/commits/v15.0.0
