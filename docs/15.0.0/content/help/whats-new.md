---
label: What's New in 15.0.0
description: Release notes for @fsegurai/marked-extensions 15.0.0, the first tagged release, with Marked 15 support and the tables extension, compared with what the changelog claims.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.0.0", "breaking changes", "marked 15", "first release" ]
---

# What's New in 15.0.0

Released 2024-11-28 according to the changelog (tag `v15.0.0`, commit `2c54a16`, committed 2024-11-28). This is the
first tagged release of the repository.

## Breaking changes (from the changelog)

- Migrated `Marked` from v12 to v15; the changelog notes this is not backward compatible. No earlier release exists in
  this repository to compare against.

## Changes (from the changelog)

| Type | Change |
|------|--------|
| Features | New extensions: code preview, footnote, lists, tables, typographic. |
| Changes | Marked 15 support across all extensions; pipeline release workflow. |
| Security | `marked` 12.0.2 to 15.0.2; dev dependency updates (`@babel/core` 7.26.0, `prettier` 3.4.1, `rollup` 4.27.4, `semantic-release` 24.2.0, `typescript` 5.7.2 and others). |

## Verified in the source

| Changelog claim | `v15.0.0` tag |
|-----------------|---------------|
| Five new extensions | Only `packages/marked-extended-tables` (15.0.0) exists. Code preview, footnote, lists and typographic were added in December 2024 and first tagged in 15.1.0. |
| Marked 15 support | The package peer is `marked >=13 <16`; the root workspace uses `marked ^15.0.2`. |
| Release workflow | `.github/workflows` and `release.config.cjs` (semantic-release) are present. |

The changelog file itself does not exist at this tag; it was added to the repository later.

## Package versions at `v15.0.0`

| Package | Version |
|---------|---------|
| `@fsegurai/marked-extended-tables` | 15.0.0 |

## Checklist

- [ ] Install `marked` 13, 14 or 15 next to the package.
- [ ] Import the default export.
