---
label: What's New in 15.1.0
description: Release notes for @fsegurai/marked-extensions 15.1.0, which adds the spoiler extension and is the first tag with code preview, footnote, lists and typographic.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.1.0", "spoiler", "new packages", "bun migration" ]
---

# What's New in 15.1.0

Released 2025-01-26 according to the changelog (tag `v15.1.0`, commit `96a2ca2`, committed 2025-01-26).

## New extensions

| Package | Version | Changelog |
|---------|---------|-----------|
| [`@fsegurai/marked-extended-spoiler`](../extensions/spoiler.md) | 15.0.0 | New in 15.1.0. |
| [`@fsegurai/marked-extended-code-preview`](../extensions/code-preview.md) | 15.1.0 | Listed under 15.0.0. |
| [`@fsegurai/marked-extended-footnote`](../extensions/footnote.md) | 15.1.0 | Listed under 15.0.0. |
| [`@fsegurai/marked-extended-lists`](../extensions/lists.md) | 15.1.0 | Listed under 15.0.0. |
| [`@fsegurai/marked-extended-typographic`](../extensions/typographic.md) | 15.1.0 | Listed under 15.0.0. |

The `v15.0.0` tag contains only the tables package. Code preview, footnote, lists and typographic were added to the
repository in December 2024 and first appear in a tag here. See [Upgrading from 15.0](../guides/upgrading-from-15.0.md).

## Other changes (from the changelog)

- Migrated to Bun as package manager; improved the demo playground, demo styles, project structure, packages and
  README files.
- Fixes: ESLint formatting, extension references in READMEs, CI/CD release workflow and environment variables, unit
  tests and type declarations, footnote `walkTokens` validation, code preview format and logic validation.
- Dev dependency updates: `@babel/core` and `@babel/preset-env` 7.26.7, `@eslint/js` and `eslint` 9.19.0, `rollup`
  4.32.0.

## Verified in the source

- Tables changed only by adding `'use strict'` to `src/index.js` and bumping its version to 15.1.0.
- The root `marked` dependency moved from `^15.0.2` to `^15.0.6`; the changelog does not list it.
- The changelog file itself does not exist at this tag; it was added to the repository later.

## Package versions at `v15.1.0`

| Package | Version |
|---------|---------|
| code preview, footnote, lists, tables, typographic | 15.1.0 |
| spoiler | 15.0.0 |

## Upgrade checklist

- [ ] Upgrade tables to 15.1.0 (no code changes).
- [ ] Pass `marked` as the second argument to code preview and spoiler.
