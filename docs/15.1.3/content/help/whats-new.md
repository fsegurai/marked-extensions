---
label: What's New in 15.1.3
description: Release notes for @fsegurai/marked-extensions 15.1.3, a tooling release with a Browserslist file, a dev server host setting and development dependency updates.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.1.3", "browserslist", "rollup", "dev dependencies" ]
---

# What's New in 15.1.3

Released 2025-03-03 according to the changelog (tag `v15.1.3`, commit `5eb120a`, committed 2025-03-02). No package
changed: every extension keeps the source and version it had in 15.1.0.

## Changes (from the changelog)

| Type | Change |
|------|--------|
| Feature | New Browserslist configuration (`demo/.browserslistrc`) targeting the latest browser versions. |
| Change | The root Rollup config sets the dev server host (`host: 'localhost'`). |
| Security | Development dependency updates: `@eslint/js` and `eslint` 9.21.0, `globals` 16.0.0, `prettier` 3.5.3, `rollup` 4.34.9, `typescript-eslint` 8.25.0. |

## Verified in the source

- The root `package.json` diff from `v15.1.2` also bumps `@babel/core` and `@babel/preset-env` to 7.26.9 and
  `semantic-release` to 24.2.3, and pins `typescript` to `5.7.3`. The changelog lists the Babel and
  semantic-release bumps under 15.1.2 instead.
- The changelog says `rollup` went from 4.34.7; `v15.1.2` declares `^4.34.6`.
- `bun.lockb` was replaced by the text lockfile `bun.lock`, and the demo and release workflows changed.
- The changelog file itself does not exist at this tag; it was added to the repository later.

## Package versions at `v15.1.3`

| Package | Version |
|---------|---------|
| code preview, footnote, lists, tables, typographic | 15.1.0 |
| spoiler | 15.0.0 |

## Upgrade checklist

- [ ] Nothing to change when coming from 15.1.0, 15.1.1 or 15.1.2.
- [ ] Coming from 15.0.0? Read [Upgrading from 15.0](../guides/upgrading-from-15.0.md).
