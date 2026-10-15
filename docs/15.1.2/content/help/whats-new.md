---
label: What's New in 15.1.2
description: Release notes for @fsegurai/marked-extensions 15.1.2, a documentation release that adds a Bun recommendation to the project README.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.1.2", "readme", "bun", "dev dependencies" ]
---

# What's New in 15.1.2

Released 2025-02-16 according to the changelog (tag `v15.1.2`, commit `3f4f46b`, committed 2025-02-16). No package
changed: every extension keeps the source and version it had in 15.1.0.

## Changes (from the changelog)

| Type | Change |
|------|--------|
| Change | Improved project README. |
| Security | Development dependency updates: `@babel/core` and `@babel/preset-env` 7.26.9, `rollup` 4.34.7, `semantic-release` 24.2.3. |

## Verified in the source

- The diff from `v15.1.1` touches only `README.md` (one line recommending Bun for local development) and the root
  `package.json` version.
- The dependency updates listed above are not in this tag: `v15.1.2` still declares `@babel/core ^7.26.8`,
  `rollup ^4.34.6` and `semantic-release ^24.2.2`. The Babel and semantic-release bumps appear in `v15.1.3`.
- The changelog compares 15.1.2 with 15.1.0 and has no entry for 15.1.1.
- The changelog file itself does not exist at this tag; it was added to the repository later.

## Package versions at `v15.1.2`

| Package | Version |
|---------|---------|
| code preview, footnote, lists, tables, typographic | 15.1.0 |
| spoiler | 15.0.0 |

## Upgrade checklist

- [ ] Nothing to change when coming from 15.1.0 or 15.1.1.
- [ ] Coming from 15.0.0? Read [Upgrading from 15.0](../guides/upgrading-from-15.0.md).
