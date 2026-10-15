---
label: What's New in 15.9.4
description: Release notes for @fsegurai/marked-extensions 15.9.4, prefixed class names, runtime-injected stylesheets, renamed options and the source revision this snapshot uses.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.9.4", "injectStyles", "class names", "git tag" ]
---

# What's New in 15.9.4

The changelog dates 15.9.4 at 2025-05-12. This snapshot documents commit `9c59b47` ("perf: libraries version",
2025-05-17), the last commit whose root `package.json` version is 15.9.4 (the first is `77215ab`, 2025-05-14, with the
same extension sources).

## Which revision is 15.9.4?

| Reference | Points at | Root version |
|-----------|-----------|--------------|
| Git tag `v15.9.4` | `1bcab04` (2025-06-04 UTC) | 15.9.6 |
| Git tag `v15.9.6` | `1bcab04` | 15.9.6 |
| Commit `9c59b47` (used here) | — | 15.9.4 |

The `v15.9.4` tag does not identify a 15.9.4 tree, so it was not used. The extension sources at `9c59b47` and
`1bcab04` are identical; only package versions, READMEs, tests and root tooling differ.

## From the changelog

- **Features**: new scripts for cleaning and building the project.
- **Changes**: improved project and package README structure.
- **Dependencies**: `marked` 15.0.11 to 15.0.12, plus dev dependency updates (`@babel/core`, `@babel/preset-env`,
  `@eslint/js`, `eslint`, `globals`, `rollup`, `semantic-release`, `typescript-eslint` and others).

In git, the new root scripts (`clean:all`, `build:all`), the README restructuring and the `marked ^15.0.12` bump land
after `9c59b47`, in the 15.9.5 and 15.9.6 commits. At `9c59b47` the root still depends on `marked ^15.0.11`.

## Verified against git (`aab1cc7`, root 15.9.3, to `9c59b47`)

| Area | Change |
|------|--------|
| Shared helper | New `packages/helper/inject-styles.js` (`ensureStyles`); `customClass` removed from the directive properties. |
| accordion | Classes renamed to `marked-extended-accordion*`; new `className` and `injectStyles` options; per-block `<style>` replaced by an injected stylesheet. |
| alert | Default class `markdown-alert` renamed to `marked-extended-alert`. |
| spoiler | Classes renamed to `marked-extended-spoiler*`; new `className`, `injectStyles`, `cssVariables`; `animationDuration` and the `duration` property removed. |
| tables | `tableClass` option renamed to `className`. |
| tabs | `tabsClass` renamed to `className`; new `template`, `customizeToken`, `injectStyles`; `storageKey` and `customClass` removed. |
| timeline | Single container element; new `template` and `injectStyles`; `customClass` removed. |
| footnote, lists, typographic | No behavior change. |
| Package versions | accordion, alert, tabs, timeline 15.0.1 to 15.1.0; footnote, lists, typographic 15.2.1 to 15.2.2; spoiler 15.1.1 to 15.2.0; tables 15.2.1 to 15.3.0. |
| Root dev dependencies | `@eslint/js` and `eslint` 9.27.0, `semantic-release` 24.2.4, `typescript-eslint` 8.32.1. |

None of these source changes are listed in the changelog entry. Details: [Upgrading from 15.9.3](../guides/upgrading-from-15.9.3.md).

## Upgrade checklist

- [ ] Replace removed options and `customClass` properties.
- [ ] Update CSS that targeted the old class names.
