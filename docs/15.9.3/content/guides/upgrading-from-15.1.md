---
label: Upgrading from 15.1
description: Move from the 15.1.x packages to 15.9.3, the removed code preview package, the spoiler directive and changed factory signatures.
order: 5
tags: [ "guides", "upgrade" ]
keywords: [ "15.1.3", "code preview", "breaking changes", "spoiler fence", "typographic attr" ]
---

# Upgrading from 15.1

Compared with the last 15.1 release (`v15.1.3`, monorepo 15.1.3), 15.9.3 removes the code preview package, moves the
spoiler to the colon directive and adds accordion, alert, tabs and timeline. This guide lists the changes verified
in the source; the changelog marks the code preview migration as breaking.

## Quick path

1. Replace `@fsegurai/marked-extended-code-preview` with `@fsegurai/marked-extended-accordion`, or remove it.
2. Rewrite fenced spoilers as `::::spoiler{…}` blocks.
3. Check the factory calls listed below.

## Content changes

| 15.1.3 | 15.9.3 |
|--------|--------|
| ```` ```preview title="…" subTitle="…" ```` fenced block (code preview) | No equivalent package. Accordion (`::::accordion{title="…"}` … `::::accordionend`) is the replacement named in the changelog; it renders Markdown, not a code preview. |
| ```` ```spoiler title="…" ```` fenced block | `::::spoiler{title="…"}` … `::::spoilerend` |

## Code changes

| Package | 15.1.3 | 15.9.3 |
|---------|--------|--------|
| code preview | `@fsegurai/marked-extended-code-preview` 15.1.0, `(options, markedInstance)` | Removed. |
| footnote | Options `prefixId`, `description`, `refMarkers` | Adds `backrefSymbol`, `backrefLinks`, `placeholderText`, `labelFormat` and the `[footnotes]` marker. |
| tables | Factory takes no options | `markedExtendedTables(options)` with `useTheadTbody`, `useTfoot`, `detectFooter`, `tableClass`, `captionTop`, `strictCaptions`, `maxColspan`, `handleComplexSpans`. |
| typographic | `markedExtendedTypographic(attr = '2')` | `markedExtendedTypographic(options)` with `attribute` (default `'3'`), `quotes`, `dashes`, `ellipses`, `customSymbols`, `outputUnicode`. |
| New | — | accordion, alert, tabs, timeline. |

All packages keep the `marked >=13 <16` peer.

## Checklist

- [ ] No ```` ```preview ```` or ```` ```spoiler ```` fences remain.
- [ ] Typographic receives an options object, not a string.
- [ ] Every `@fsegurai/marked-extended-*` package is upgraded together.

## Next step

- [What's new in 15.9.3](../help/whats-new.md)
