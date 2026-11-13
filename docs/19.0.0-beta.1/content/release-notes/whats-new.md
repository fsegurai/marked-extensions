---
label: What's New in 19.0.0-beta.1
description: The highlights of 19.0.0-beta.1, four new packages, one mx- class convention, the shared extension contract with labels, and safer data-* restoration.
order: 1
tags: [ "release-notes", "overview" ]
keywords: [ "what's new", "inline", "source-map", "toc", "wikilinks", "mx- classes", "labels" ]
---

# What's New in 19.0.0-beta.1

19.0.0-beta.1 keeps the sanitizer-safe runtime contract of 19.0.0-beta.0 and the `marked ^18` peer. It adds four
packages, gives every package the same class names and the same API shape, and fixes what came up while integrating
the packages into a real application.

## Four new packages

| Package | Syntax | Output |
|---------|--------|--------|
| [`inline`](../extensions/inline.md) | `==mark==`, and opt-in `++ins++`, `^sup^`, `~sub~` | `<mark class="mx-inline-mark">` and friends |
| [`toc`](../extensions/toc.md) | `[toc]`, `[toc:N]` on a line of its own | `<nav class="mx-toc">` with nested `#<slug>` links |
| [`wikilinks`](../extensions/wikilinks.md) | `[[Page]]`, `[[Page#Heading\|alias]]`, `[[Page#^block]]` | `<a class="mx-wikilinks-link">` from your `resolve` callback, or an unresolved `<span>` |
| [`source-map`](../extensions/source-map.md) | none: maps every block | `attachSourceMap` stamps `data-line` and heading ids after sanitizing, for scroll sync and outlines |

```js
import { Marked } from 'marked';
import {
  attachSourceMap,
  markedExtendedInline,
  markedExtendedSourceMap,
  markedExtendedToc,
  markedExtendedWikilinks,
} from '@fsegurai/marked-extended-bundle';

const sourceMap = markedExtendedSourceMap();
const marked = new Marked().use(
  sourceMap,
  markedExtendedInline(),
  markedExtendedToc(),
  markedExtendedWikilinks({ resolve: (target) => ({ href: `/notes/${encodeURIComponent(target)}` }) }),
);

root.innerHTML = marked.parse(markdown);
attachSourceMap(root, { sourceMap: sourceMap.sourceMap, source: () => markdown });
```

`toc`, `wikilinks` and `source-map` share core's slugger, so a `[toc]` link, a `[[Page#Heading]]` fragment and a
heading `id` always agree.

## One class convention

| Kind | Pattern | Example |
|------|---------|---------|
| Root | `mx-<pkg>` | `mx-alert` |
| Part | `mx-<pkg>-<part>` | `mx-alert-title` |
| Modifier | `mx-<pkg>--<modifier>` | `mx-alert--warning` |
| State | `mx-is-<state>` | `mx-is-active` |
| Custom property | `--mx-<pkg>-<name>` | `--mx-alert-note-color` |

Theme any package by overriding its `--mx-<pkg>-*` properties; see [Styling and theming](../guides/styling.md). The
old class and property names were removed without aliases: the [migration tables](../guides/migration-19.md#class-renames-per-package)
list every rename.

## One API shape

Every package exports its factory as default and as `markedExtended<Name>`, names its options `<Name>Options`, takes
its user-visible strings from `labels`, and exports frozen constants:

```js
import { markedExtendedAlert, ALERT_VARIANTS, defaultAlertLabels } from '@fsegurai/marked-extended-alert';

marked.use(markedExtendedAlert({ labels: { note: 'Nota', warning: 'Atención' } }));
```

See the [extension contract](../api/extension-packages.md#the-extension-contract).

## Safer and more predictable

- Accordion, comments, embeds, kanban and spoiler restore custom `data-*` attributes only for names in `allowedDataAttributes`: hand-written
  class tokens can no longer forge attributes other scripts trust.
- Wiki links accept only relative, `http(s):` and `mailto:` URLs; everything they render is escaped.
- Heading ids refuse names that would shadow globals (`__proto__`, `mermaid`, `katex`…).
- Tables merge cells only with `^^`, and remove the marker completely.
- Timeline and comments dates no longer depend on the host time zone.
- Typographic `breaks` no longer changes the global `marked`.

## Next steps

- Full list: [19.0.0-beta.1 release notes](19.0.0-beta.1.md)
- Upgrading: [From 19.0.0-beta.0 to 19.0.0-beta.1](../guides/migration-19.md#from-1900-beta0-to-1900-beta1)
