# 📦 Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

---

## [19.0.0-beta.0] - 2026-10-09

### ⚠️ BREAKING CHANGES ⚠️

- **Beta** — 19.0.0-beta.0 ships the safe-by-default runtime contract ahead of marked 19; the peer stays `marked ^18`
  until the stable 19.0.0, which will require marked 19. Read [MIGRATION-19.md](./MIGRATION-19.md).
- **Runtime contract** — packages no longer start interactive behavior on their own. Call `attachX(root, options?)`
  (or the bundle's `attachAll(root)`) after inserting the HTML, and the returned `dispose` on teardown. Without a
  runtime, pages render static, sanitizer-safe content.
- **Sanitizer-safe markup by default** — the output survives strict sanitizers such as Angular's
  `SecurityContext.HTML`: no `id`, `style`, `data-*`, `<input>`, `<button>`, `<svg>`, `<iframe>`, `<script>` or
  `<style>`. Configuration is carried by `mx-<pkg>-<key>-<value>` class tokens and icons are CSS mask icons. A new
  `unsafeHtml: true` option restores the 18.0 markup (typographic was already safe).
    - `Alert`, `Accordion`, `Comments` — CSS icons; ids, groups, animation settings and `data-*` become class tokens.
    - `Footnote` — targets carry class tokens instead of ids; references and the endnotes section are named with
      `aria-label`.
    - `Tables` — a bottom caption uses the `mx-tables-caption-bottom` class instead of `data-caption-bottom`.
    - `Timeline` — ids and group indexes become class tokens; the collapse control is a `span[role=button]`.
    - `Spoiler` — no inline overlay, `<svg>` or random particles; the theme comes from `spoiler.css`.
    - `Lists` — task checkboxes are `span[role=checkbox][aria-checked]` instead of `<input>`; source line, offset and
      raw text become class tokens.
    - `Tabs` — a WAI-ARIA tablist (`span[role=tab]`, `div[role=tabpanel][hidden]`) replaces the radio inputs and the
      generated `<style>` block; the initial tab is correct without JavaScript.
    - `Embeds` — a privacy-first click-to-load placeholder with a fallback link to the provider page replaces the
      `<iframe>`; nothing loads from the provider until `attachEmbeds` creates the iframe.
    - `Kanban` — no inline `onclick`, JSON view store, `<button>`, `draggable` or `data-*`; every view is in the markup
      and a class token selects it with CSS. `unsafeHtml` keeps the 18.0 markup without the `onclick` handlers.
    - `Slide` — controls as `span[role=button]`, background images as `<img class="mx-slide-bg">` (only `http(s)` and
      relative URLs), colors as validated class tokens; without the runtime every slide is shown stacked.
- **Removed globals and listeners**
    - `Footnote` — no `document` click listener on creation (`setupSmoothScroll` removed); `smoothScroll` and
      `scrollOffset` are ignored with a one-time warning, pass them to `attachFootnotes`.
    - `Timeline` — `init*` / `destroy*` interaction functions removed; use `attachTimeline`.
    - `Spoiler` — no initialization on import; `initSpoilers` and `destroySpoilers` removed; use `attachSpoilers`.
    - `Tabs` — no `document` listeners, `body` observer or `window.initMarkedExtendedTabs`; `registerCallbacks` and the
      `tab-switched` event removed; `onBeforeSwitch` / `onAfterSwitch` extension options ignored with a warning.
    - `Slide` — no injected `<script>`, `window.presentation`, `window.__presentationState__`, global key/hash
      listeners, speaker popup or `console.log`; `injectScript` and `scriptNonce` ignored with a warning.
    - `Lists` — no `window.markedListsCallback` or global `change` listener; `onCheckboxChange` ignored with a warning.
    - `Kanban` — `onMove` ignored with a warning; `enableKanbanDragDrop` deprecated; no
      `window.updateMarkdownFromKanbanMove`.
    - `Embeds` — `onEmbedLoad` / `onEmbedError` ignored with a warning (they fired at render time, not on load).
- **Renamed events** — runtime events are bubbling `CustomEvent`s named `marked-extended:<pkg>:<event>`:
  `timeline:collapse`, `spoiler:toggle`, `kanban:move` (now cancelable, dispatched before the move) and `slidechange`
  (now the cancelable `marked-extended:slide:change` with `{ id, index, previousIndex, total }`).
- **Stable ids** — tabs, timeline, spoiler, embeds, kanban, slide and task-checkbox ids are content hashes with a
  `-2`, `-3`… suffix for repeated blocks in one parse, instead of module counters or `Math.random`; the tabs
  `persistSelection` storage key changed accordingly.
- **Peer range** — `comments` and `embeds` narrow their `marked` peer from `>=17.0.0` to `^18`, like every other
  package.

### 🚀 Features

- **Core** — new package `@fsegurai/marked-extended-core` (`19.0.0-beta.0`): dependency-free, framework-agnostic and
  SSR-safe helpers (`hashId`, `escapeHtml`, class tokens, `defineRuntime`, `onDelegated`, `findById`, `rovingIndex`,
  `emit`/`on`). Every package bundles it, so no runtime dependency is added.
- **Code** — new package `@fsegurai/marked-extended-code` (`19.0.0-beta.0`): VitePress-style fence meta (titles, line
  numbers, `{1,4-6}` highlights, `ins`/`del`/`mark`/`focus`/`warning`/`error`/`info` ranges, also the Expressive Code
  and Docusaurus forms), Shiki-style `[!code …]` magic comments, sanitizer-safe class markup, `::: code-group` tabs,
  and `attachCode` / `wrapLines` for Prism line attributes and per-line classes. Fences without meta fall back to the
  previous renderer, so other fence-based extensions are unaffected.
- **Runtimes** — scoped, idempotent and disposable `attachX(root, options?)` for accordion, comments, footnote,
  timeline, spoiler, lists, tabs, embeds, kanban, slide and code, exported from each package and the bundle.
    - Keyboard support (tabs, code groups, kanban, slide, timeline, spoiler, lists) and cancelable events where an
      action can be prevented (`tabs:before-switch`, `kanban:move`, `kanban:view`, `slide:change`, `lists:toggle`,
      `embeds:before-load`).
    - `attachEmbeds` builds iframe URLs only from a per-provider allowlist, never from the Markdown URL; optional
      privacy variants and static YouTube thumbnails (off by default).
    - `attachKanban` adds Alt+Arrow keyboard moves; `attachSlides` handles every presentation on the page with
      opt-in hash sync; `attachLists` reverts a cancelled toggle.
- **Re-render contract** — runtimes keep working when an attached root's content is replaced: `attachX.refresh(root)`
  re-applies per-element setup, or `attachX(root, { observe: true })` does it automatically.
- **Bundle** — `attachAll(root, options?)` attaches every runtime with per-runtime options (`false` leaves one out)
  and returns one `{ dispose(), refresh() }` handle; a failing runtime never stops the others.
- **SSR** — no package touches the DOM on import or when its extension is created.
- **Slide** — `createSlideRenderer(options, markedOptions?)` renders without a Marked renderer context.

### 🐞 Fixes

- **Tabs** — arrow-key navigation no longer stalls with `enableFocusManagement: false`; tabs no longer capture a
  widget nested in a panel (such as a code group).
- **Lists** — ordered and loose task lists keep their checkboxes inline.
- **Embeds** — a failed embed can be retried with a click; lazy autoloaded iframes no longer time out early.
- **Kanban** — the drag payload is the card id again; cards render with the caller's `Marked` instance.
- **Slide** — `#<id>-0` is no longer read as slide 1; reduced-motion rules cover controls, progress and overview.
- **Code** — fence ranges follow their lines when marker lines are removed; the code-group closer search stops at the
  next opener, so documents with many unclosed groups parse in linear time.
- **Timeline** — a refresh stops observing events that left the root.
- **Spoiler** — particles stay hidden once revealed.
- **Footnote** — the reference `aria-label` is escaped once.
- **Core** — a queued `observe` refresh no longer runs after dispose.

### 🔧 Changes

- **Comments** — `onVisibilityChange` and `onStatusChange` stay parse-time callbacks (they fire in `walkTokens`).
- **Kanban** — `applyMove` and the deprecated `enableKanbanDragDrop` still dispatch the legacy `kanban:move` after a
  move, for compatibility; `attachKanban` dispatches only the new cancelable event.
- **Embeds** — the global `privacyMode` option applies in both markups.

### 🔧 Infrastructure

- **Checks** — new `bun run type-check` (sources and specs), `bun run check:ssr-imports` (DOM traps in a plain Bun
  process) and `bun run check:dist` (every `exports`/`types` target exists; no build output imports core); all run
  in the GitHub `PR Validation` workflow and the Azure DevOps PR pipeline.
- **Testing** — an Angular `SecurityContext.HTML` sanitizer emulation and a conformance spec per extension package,
  plus runtime specs on the sanitized output.
- **Versions** — per-package targets in `versions.json`; `version:update` refreshes `bun.lock` until it is stable, and
  a spec checks that `bun.lock` matches every workspace `package.json`.
- **README generator** — `generate:readme` is idempotent and exits with code 1 on errors.
- **CI** — workflow path filters use the real `packages/<name>` layout; `labeler.yml` is valid YAML again.
- **Demo** — renders through `attachAll` and has a demo-only `?sanitize=1` switch (Angular sanitizer emulation).
- **GitHub metadata** — labels, reviewers and issue templates include `code` and `core`.

### 📝 Documentation

- New [MIGRATION-19.md](./MIGRATION-19.md): the runtime contract, framework integration (plain JS, React, Vue,
  Angular) and per-package changes from 18.0.
- Root `README.md`: code and core in the package table, a "Framework integration" section and the compatibility
  table.
- `AGENTS.md` and `CONTRIBUTING.md`: package count, `marked ^18`, Biome, the check scripts and the runtime-contract
  rules for new packages.
- Package READMEs: runtime, events and "Migrating from 18.0" sections; the bundle README documents `attachAll`.

### 🔐 Security

- **Embeds** — iframes are created only on user activation and only from allowlisted provider hosts.
- **Slide** — no inline script injection; background URLs are restricted to `http(s)` and relative paths.
- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dependencies
        - `marked` from `18.0.13` to `18.1.0`
    - Dev Dependencies
        - `@biomejs/biome` from `2.5.14` to `2.5.15`
        - `@types/node` from `26.6.1` to `26.6.5`
        - `jsdom` from `30.1.0` to `30.1.2`
        - `portless` from `0.15.6` to `0.15.7`
        - `vite` from `8.3.0` to `8.3.4`
        - `vite-plugin-dts` from `5.1.0` to `5.1.2`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/compare/v18.0.0...v19.0.0-beta.0

---

## [18.0.0] - TBD

### ⚠️ BREAKING CHANGES ⚠️

- **Syntax migration** — changed the markup syntax from custom `::::` colon-delimited blocks to standard Markdown fenced code blocks (`` ``` ``) for `Timeline`, `Spoiler`, `Tabs`, and `Slide` extensions. Existing content using the old `::::` syntax **must** be updated to the new fenced code block format.

### 🚀 Features

- **Kanban** — enhanced with formatting support, improved UI, Material Design integration, and optimized rendering logic.
- **Comments** — replace emoji icons with scalable SVG icons.
- **Theming** — add detailed light/dark theme support across demo extensions.
- **Typings** — extend `TokensList` typings across marked extensions; enable TypeScript declarations.
- **Aliases** — refine aliases across all extensions for clarity and consistency.
- **UI/UX** — update `markdown.css`, playground, and prism-theme for improved look and feel.

### 🐞 Fixes

- **Kanban tokenizer** — add safeguard for missing `kanbanColumnRegex`.
- **Packages reference** — fix CHANGELOG entry for package reference.
- Fixed `bun run build` — `build`, `build:packages:doppler`, and `build:demo:doppler` still called
  `postbuild:packages`/`postbuild:demo`, which no longer existed after those scripts were renamed to
  `build:packages:metadata`/`build:demo:metadata` during the Biome migration.
- Fixed `.github/workflows/dependency-audit.yml`'s age-report check comparing against the wrong dependency name
  (`"biome"` instead of `@biomejs/biome`), which always reported an empty installed version.

### 🔧 Changes

- **Embeds** — add Dailymotion and TikTok support; improve error fallback styles, aspect-ratio handling, utilities, and test coverage.
- **Timeline** — migrate to fenced code block syntax; add milestone mode, auto-group by year, collapsible events, subtitle support, deep-linkable anchors, and reveal animations.
- **Spoiler** — migrate to fenced code block syntax; remove hover-to-reveal behavior, add `destroySpoilers` support and `spoiler:toggle` event.
- **Tabs** — migrate to fenced code block syntax with `---` separators; add callback support and improve type safety.
- **Slide** — migrate to fenced code block syntax; introduce autoplay, speaker view, additional layouts, and CSP nonce support.
- **Lists** — implement Markdown list serialization and runtime editing; add `updateMarkdownFromCheckbox` host hook; enhance accessibility with touch-friendly checkboxes and CSP compliance.
- **Footnote** — introduce inline and contiguous numbering, undefined reference handling, safe id slugification, and hover previews.
- **Tables** — add responsive wrapper support, `scope="col"` on `<th>` for accessibility, and consistent attribute quoting.
- **Typographic** — enhance symbol mapping with 220+ Unicode symbols; add `breaks` and `fractions` options.
- **Kanban** — refactor utils and tests for board parsing, fenced block matching, and metadata extraction; add drag-and-drop via native HTML5 DnD with DOM operations and markdown synchronization.
- **Renderer** — escape HTML in dynamic attributes across embeds, spoiler, accordion, tabs, and slide modules to prevent XSS vulnerabilities.
- **Build and infrastructure** — centralize shared Markdown utils in `.helper` and migrate to a generator model; consolidate local extension styles into a dedicated chunk; remove deprecated `baseUrl` from tsconfig, VSCode settings, and `injectStyles` option; simplify AGENTS.md.
- **Type safety** — improve explicit typings across alert, list, footnote, and kanban modules; add `MarkedExtension` return types; refactor imports and enhance utilities.
- **Testing** — add comprehensive unit tests for embeds, comments, lists, and kanban; improve and increase overall test coverage.
- **Dependencies** — migrate `marked` from `^17` to `^18` (peer dependency); perform multiple library upgrades and version bumps across beta releases for improved stability.
- **Engines** — raise minimum requirements to Node.js `>=24` and npm `>=11`; update contribution guidelines accordingly.
- **GitHub metadata** — remove `CLAUDE.md` as redundant and covered by `AGENTS.md`.
- **Code style** — use `for...of` for RegExp matches and add braces to arrow functions for improved readability.
- **Documentation** — update README files to reflect the `marked` peer dependency upgrade from `^17` to `^18`.
- **Build** — refine bundle and README generation and helper utilities for improved synchronization, efficiency, and export consistency.

### 🔧 Infrastructure

- **Linting migration: ESLint → Biome** — replaced `eslint`, `@eslint/js`, `globals`,
  `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, and `typescript-eslint` with a single
  `@biomejs/biome` dependency.
	- Added `biome.json` (formatter + linter, single quotes, trailing commas, 120-char line width, import sorting).
	- Removed `eslint.config.js`.
	- `lint:check`/`lint:fix`/`lint:packages`/`lint:demo` now run Biome; added `format`/`format:check` aliases.
	- Reformatted every `packages/*/src/{index,utils}.ts` file and the `demo/` scripts/styles with Biome — formatting
	  and import-order only, no palette, tag, or behavioral changes.
	- Renamed `postbuild:packages`/`postbuild:demo` to `build:packages:metadata`/`build:demo:metadata` and updated
	  `build`, `build:packages:doppler`, `build:demo:doppler` to match.
	- Fixed inverted `start`/`start:prod` scripts: `start` now runs the Vite dev server, `start:prod` serves the
	  production build.
	- `.github/workflows/dependency-audit.yml`: bumped `actions/github-script` to `v9` (Node 24 runtime) and added the
	  `issues: write` permission needed to file security-audit issues.
	- Aligned `.editorconfig` with Biome's formatting rules (2-space indent, 120-char line width) across
	  `.js`/`.ts`/`.json`/`.css`.
- Generated `packages/*/README.md`'s "Available Themes" table from the live package list instead of a hardcoded
  block, via `packages/.helper/docs/generate-readme.ts`.
- Added `packages/.helper/utils/generate-bundle.ts` (`bun run generate:bundle`) to regenerate
  `packages/bundle/src/index.ts` and its `package.json` dependencies from the current package list, so a new theme
  can't be forgotten from the bundle.
- Added `types` conditions to every package's `exports` map, replaced per-package `.npmignore` blocklists with
  `"files": ["dist"]`, and added `repository.directory` across all 14 marked extensions.

### 📝 Documentation

- Fixed stale script references in `CONTRIBUTING.md` (`utils.copy:helpers` → `generate:helpers`, etc.) and added the
  new `generate:bundle` step to the "Adding a New Theme" guide.
- Fixed `AGENTS.md`'s stale "rollup dev server" reference — the build system moved to Vite in an earlier release.

### 🔐 Security

- Updated `trivy` to version `0.71.1` to address vulnerabilities in previous versions.
- **Added dependencies**.
    - Dev Dependencies
        - `@biomejs/biome` - `2.5.14` - needed for linting and formatting - replaces ESLint toolchain.
        - `husky` - `9.1.7` - needed for Git hooks to enforce code quality and pre-commit checks.
        - `vite-plugin-dts` - `5.1.0` - needed for generating TypeScript declaration files for the package.
- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
    - Dependencies
        - `@material/web` from `2.4.1` to `2.5.0`
        - `marked` from `17.0.6` to `18.0.13`
        - `marked-highlight` from `2.2.3` to `2.2.4`
    - Dev Dependencies
        - `@types/jsdom` from `28.0.1` to `30.0.0`
        - `@types/node` from `25.6.0` to `26.6.1`
        - `bun-types` from `1.3.12` to `1.4.2`
        - `jsdom` from `29.0.2` to `30.1.10`
        - `rimraf` from `6.0.1` to `6.1.3`
        - `portless` from `0.10.3` to `0.15.6`
        - `terser` from `5.46.1` to `5.51.2`
        - `typescript` from `6.0.2` to `7.0.2`
        - `vite` from `8.0.8` to `8.3.0`
    - Removed: `@eslint/js`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint`, `globals`,
      `typescript-eslint`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v18.0.0

---

## [17.0.0] - 2026-04-18

### ⚠️ BREAKING CHANGES ⚠️

- Migrated project from `Javascript` to `Typescript`. **(Note**: This change is not backward compatible.)
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
            - End: `:acdend` -> `:accordionend`
    - `Marked Extended Spoiler`
        - Old aliases:
            - Start: `:sp` -> `:spoiler`
            - End: `:spend` -> `:spoilerend`
        - New aliases:
            - Start: `:spr` -> `:spoiler`
            - End: `:sprend` -> `:spoilerend`
    - `Marked Extended Tabs`
        - Old aliases:
            - Start: `:tb` -> `:tabs`
            - End: `:tbend` -> `:tabsend`
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
- All extensions were migrated to `TypeScript`, improving type safety, tooling support, and maintainability.
- All extensions should now support nested tokens.

### 🐞 Fixes

- Fixed `marked-extended-tabs` tokenizer type errors and property access.
- Fixed `marked-extended-typographic` return path issues.
- Fixed `marked-extended-accordion` and `marked-extended-spoiler` content parsing issues.
- Fixed the issue with the util imports reference on all extensions.

### 🔧 Changes

- Refactored demo local storage extension keyword to a more accurate one based on the project.
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

- Added `Trivy Security Scanner` to the project to automatically scan for vulnerabilities in dependencies and container
  images as part of the CI/CD pipeline.
- **Added dependencies**.
    - Dev Dependencies
        - `@types/node` - `25.6.0` - needed for types declarations.
        - `@typescript-eslint/eslint-plugin` - `8.58.2` - needed for TypeScript linting.
          `@typescript-eslint/parser` - `8.58.2` - needed for TypeScript linting.
        - `bun-types` - `1.3.12` - needed for testing purposes only.
        - `portless` - `0.10.3` - needed for local development. Replace port numbers with stable names.
        - `terser` - `5.46.1` - needed for production builds as part of Vite.
        - `vite` - `8.0.8` - needed for development and build processes. Replacement of Rollup.
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
        - `globals` from `16.2.0` to `17.5.0`
        - `jsdom` from `27.4.0` to `29.0.2`
        - `rimraf` from `6.0.1` to `6.1.3`
        - `typescript` from `5.8.3` to `6.0.2`
        - `typescript-eslint` from `8.33.1` to `8.58.2`
- **Removed dependencies** — eliminated unused dependencies to reduce potential security risks and improve project
  maintainability.
    - Removed Dependencies
        - `@lezer/markdown`
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
    - Added `vite.config.ts` for cleaner configuration
    - Benefits:
        - Faster dev server with better HMR (Hot Module Replacement)
        - Built-in environment variable support (`.env` files)
        - Native TypeScript compilation
        - Better CSS/asset handling for future scalability
        - Simplified build configuration
    - Updated dev commands:
        - `bun run dev` now uses `vite serve` (was `rollup -w`)
        - `bun run build:demo` now uses `vite build` (was `rollup -c`)
    - Removed `rollup.config.js` (replaced by `vite.config.ts`)
    - Removed build helper script `packages/.helper/utils/scripts` (Vite handles env vars natively)

### 📝 Documentation

- Updated GitHub labeler configuration to track `vite.config.ts` changes instead of `rollup.config.js`

**Full Changelog**: https://github.com/fsegurai/marked-extensions/commits/v17.0.0

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

[unreleased]: https://github.com/fsegurai/marked-extensions/compare/v19.0.0-beta.0...HEAD

[19.0.0-beta.0]: https://github.com/fsegurai/marked-extensions/compare/v18.0.0...v19.0.0-beta.0

[18.0.0]: https://github.com/fsegurai/marked-extensions/compare/v17.0.0...v18.0.0

[17.0.0]: https://github.com/fsegurai/marked-extensions/compare/v15.9.6...v17.0.0

[15.9.6]: https://github.com/fsegurai/marked-extensions/compare/v15.9.4...v15.9.6

[15.9.4]: https://github.com/fsegurai/marked-extensions/compare/v15.9.3...v15.9.4

[15.9.3]: https://github.com/fsegurai/marked-extensions/compare/v15.1.3...v15.9.3

[15.1.3]: https://github.com/fsegurai/marked-extensions/compare/v15.1.2...v15.1.3

[15.1.2]: https://github.com/fsegurai/marked-extensions/compare/v15.1.0...v15.1.2

[15.1.0]: https://github.com/fsegurai/marked-extensions/compare/v15.0.0...v15.1.0

[15.0.0]: https://github.com/fsegurai/marked-extensions/commits/v15.0.0
