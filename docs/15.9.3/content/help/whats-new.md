---
label: What's New in 15.9.3
description: Release notes for @fsegurai/marked-extensions 15.9.3, the code preview to accordion migration, three new extensions and the source revision this snapshot uses.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "15.9.3", "breaking changes", "accordion", "alert", "tabs", "timeline" ]
---

# What's New in 15.9.3

Released 2025-05-07 according to the changelog. There is no `v15.9.3` git tag; this snapshot documents commit
`aab1cc7` ("docs: fix README", 2025-05-12), the only commit whose root `package.json` version is 15.9.3.

## Breaking changes

- The `Marked Extended Code Preview` extension was migrated to `Marked Extended Accordion`; the changelog notes this
  is not backward compatible. See [Upgrading from 15.1](../guides/upgrading-from-15.1.md).

## New extensions

| Package | Purpose |
|---------|---------|
| [`@fsegurai/marked-extended-alert`](../extensions/alert.md) | GitHub-style `> [!NOTE]` alerts. |
| [`@fsegurai/marked-extended-tabs`](../extensions/tabs.md) | CSS-only tab groups. |
| [`@fsegurai/marked-extended-timeline`](../extensions/timeline.md) | Vertical timelines. |

Accordion is also new as a package; the changelog lists it as the code preview migration rather than as a new
extension.

## Other changes (from the changelog)

- Improved package structure files, package logic validation and inner styles, utils logic and CI/CD workflows.
- Dependencies: `@material/web` 2.3.0, `marked` 15.0.7 to 15.0.9, `prismjs` 1.30.0; dev dependency updates
  (`@babel/core`, `eslint`, `rollup`, `typescript` 5.8.3 and others).

At `aab1cc7` the root workspace already depends on `marked ^15.0.11`, later than the 15.0.9 the changelog names.

## Package versions at `aab1cc7`

| Package | Version |
|---------|---------|
| accordion, alert, tabs, timeline | 15.0.1 |
| footnote, lists, tables, typographic | 15.2.1 |
| spoiler | 15.1.1 |

## Upgrade checklist

- [ ] Replace code preview fences and fenced spoilers.
- [ ] Pass an options object to the typographic factory.
- [ ] Upgrade every `@fsegurai/marked-extended-*` package together.
