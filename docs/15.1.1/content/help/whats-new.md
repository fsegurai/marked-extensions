---
label: What's New in 15.1.1
description: Release notes for @fsegurai/marked-extensions 15.1.1, reconstructed from git because the changelog has no 15.1.1 entry; a CI and dependency release.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.1.1", "release workflow", "azure devops", "dev dependencies" ]
---

# What's New in 15.1.1

There is **no changelog entry for 15.1.1**. These notes are built from `git log v15.1.0..v15.1.1` and
`git diff v15.1.0 v15.1.1`. The date is the commit date of the tag commit (`68e5cc7`, 2025-02-16), not a changelog
release date. No package changed: every extension keeps the source and version it had in 15.1.0.

## Commits

| Commit | Date | Message |
|--------|------|---------|
| `b6190d2` | 2025-02-02 | feat: ADO template reference |
| `74e6a24` | 2025-02-02 | perf: libraries version |
| `513b85c` | 2025-02-13 | fix: workflows configuration for release and copy branch |
| `6117d44`, `a5a6416` | 2025-02-13 | perf: libraries version |
| `68e5cc7` | 2025-02-16 | Merge pull request #39 from fsegurai/development |

## Changes in the diff

| Area | Change |
|------|--------|
| Dependencies | Root `marked` from `^15.0.6` to `^15.0.7` (used by the demo; the package peers stay `>=13 <16`). |
| Dev dependencies | `@babel/core`, `@babel/preset-env` 7.26.8; `@eslint/js` 9.20.0; `eslint` 9.20.1; `globals` 15.15.0; `prettier` 3.5.1; `rollup` 4.34.6; `semantic-release` 24.2.2; `typescript-eslint` 8.24.0. |
| CI | Updated `.github/workflows/release.yml` and the Azure DevOps `copy-main-branch.yml` template; removed `release.config.cjs`. |
| Lockfile | `bun.lockb` updated. |

## Package versions at `v15.1.1`

| Package | Version |
|---------|---------|
| code preview, footnote, lists, tables, typographic | 15.1.0 |
| spoiler | 15.0.0 |

## Upgrade checklist

- [ ] Nothing to change when coming from 15.1.0.
- [ ] Coming from 15.0.0? Read [Upgrading from 15.0](../guides/upgrading-from-15.0.md).
