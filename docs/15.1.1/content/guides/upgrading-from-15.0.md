---
label: Upgrading from 15.0
description: Move from the 15.0.0 release, which shipped only the tables package, to 15.1.1 and its five additional extension packages.
order: 4
tags: [ "guides", "upgrade" ]
keywords: [ "15.0.0", "new packages", "code preview", "spoiler", "footnote" ]
---

# Upgrading from 15.0

The 15.0.0 tag contains a single package, `@fsegurai/marked-extended-tables` 15.0.0. 15.1.1 keeps it compatible and
adds five packages. There is nothing to migrate; install the new packages you want.

## Quick path

1. Upgrade tables: `npm install @fsegurai/marked-extended-tables@15.1.0`.
2. Add any of the new packages below.
3. Pass `marked` as the second argument to code preview and spoiler.

## Package changes

| Package | 15.0.0 | 15.1.1 |
|---------|--------|--------|
| tables | 15.0.0 | 15.1.0; source only adds `'use strict'`. Same syntax, no options. |
| code preview | — | New, 15.1.0 |
| footnote | — | New, 15.1.0 |
| lists | — | New, 15.1.0 |
| spoiler | — | New, 15.0.0 |
| typographic | — | New, 15.1.0 |

The peer stays `marked >=13 <16` and the declared entry points are unchanged.

The changelog lists code preview, footnote, lists and typographic under 15.0.0, but the `v15.0.0` tag contains only
tables; those packages were first added to the repository in December 2024 and first tagged in `v15.1.0`.

## Repository changes

| Area | 15.0.0 | 15.1.1 |
|------|--------|--------|
| Package manager | npm workspaces (`package-lock.json`) | Bun (`bun --filter '*' prepare`) |
| Demo | tables only | all six extensions |

## Next step

- [What's new in 15.1.1](../help/whats-new.md)
