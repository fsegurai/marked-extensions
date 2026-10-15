---
label: What's New in 15.9.6
description: Release notes for @fsegurai/marked-extensions 15.9.6, dependency updates, new root scripts and package version bumps, with no extension source changes.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.9.6", "dependencies", "marked 15.0.12", "version bumps" ]
---

# What's New in 15.9.6

The changelog dates 15.9.6 at 2025-06-03. The `v15.9.6` tag points at merge commit `1bcab04` (2025-06-04 UTC), whose
tree matches commit `fef3780` ("perf: libraries version", 2025-06-03). The extension sources are unchanged from 15.9.4.

## From the changelog

- **Dependencies**: `marked` from 15.0.11 to 15.0.12.
- **Dev dependencies**: `@babel/core` 7.27.3 to 7.27.4, `@eslint/js` and `eslint` 9.27.0 to 9.28.0,
  `typescript-eslint` 8.33.0 to 8.33.1.

## Verified against git (`9c59b47` to `1bcab04`)

| Area | Change |
|------|--------|
| Extension `src/` | No changes. |
| Package versions | Patch bumps: accordion, alert, tabs, timeline 15.1.0 to 15.1.1; footnote, lists, typographic 15.2.2 to 15.2.3; spoiler 15.2.0 to 15.2.1; tables 15.3.0 to 15.3.1. |
| Package READMEs | Reformatted "Available Extensions" table. |
| Root scripts | New `clean:all` and `build:all`. |
| Root dependencies | `marked` `^15.0.11` to `^15.0.12`, plus dev dependency updates. |
| Tests | Adjusted accordion and spoiler unit tests. |

The changelog places the new scripts and the README restructuring under 15.9.4; in git they land after the last
15.9.4 commit. The `v15.9.4` tag also points at this same commit `1bcab04`.

## Upgrade checklist

- [ ] From 15.9.4: no code or content changes are needed.
- [ ] From 15.9.3: follow [Upgrading from 15.9.3](../guides/upgrading-from-15.9.3.md).
