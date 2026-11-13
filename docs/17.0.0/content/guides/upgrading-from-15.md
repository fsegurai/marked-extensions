---
label: Upgrading from 15
description: Move content and code from marked-extensions 15.x to 17.0.0, renamed directive aliases, the marked 17 peer, explicit stylesheet imports and TypeScript builds.
order: 5
tags: [ "guides", "upgrade" ]
keywords: [ "15.x", "aliases", "breaking changes", "marked 17", "typescript" ]
---

# Upgrading from 15

Upgrade every package to 17.0.0 together with `marked@^17`, replace the short directive aliases that were renamed, and
import the stylesheets explicitly. There was no 16.x release.

## Quick path

1. `npm install marked@^17 @fsegurai/marked-extended-<name>@17.0.0` for every package you use.
2. Search your Markdown for the old short aliases below and replace them.
3. Import `@fsegurai/marked-extended-<name>/styles/<name>.css` (and optionally `<name>-theme.css`).

## Renamed aliases

The aliases below are read from each package's `src/utils/props.ts` at 17.0.0. The long forms still work, so content
that already used them needs no change.

| Extension | Start aliases | End aliases | Removed short forms |
|-----------|---------------|-------------|---------------------|
| Accordion | `:acd`, `:accordion` | `:acdend`, `:accordionend` | `:acc`, `:accend` |
| Spoiler | `:spr`, `:spoiler` | `:sprend`, `:spoilerend` | `:sp`, `:spend` |
| Tabs (container) | `:tbs`, `:tabs` | `:tbsend`, `:tabsend` | `:tb`, `:tbend` |
| Tabs (item) | `:tab` | `:tabend` | `:t`, `:tend` |
| Timeline (container) | `:tml`, `:timeline` | `:tmlend`, `:timelineend` | `:tl`, `:tlend` |
| Timeline (event) | `:evt`, `:event` | `:evtend`, `:eventend` | `:ev`, `:evend` |

The 17.0.0 changelog lists `:acda` as the new accordion alias; the source registers `:acd`, which is what this table
shows.

Each alias is a literal opening or closing marker that can replace the canonical one. The canonical markers are
`::::accordion`, `::::spoiler`, `::::tabs`, `:::tab`, `::::timeline` and `:::event`, each closed by the same name with
`end` appended:

```markdown
::::tabs
:::tab{label="One"}
First tab
:::tabend
::::tabsend
```

## Code changes

| Area | 15.x | 17.0.0 |
|------|------|--------|
| Package source | JavaScript | TypeScript; types in `dist/types/index.d.ts` |
| Builds | Rollup | Vite: `dist/index.esm.js`, `dist/index.cjs`, `dist/index.umd.js` |
| Styles | Tied to the package | Separate `styles/*.css` and `styles/*.scss` subpath exports |
| `marked` | 15 and earlier | `^17` (comments and embeds `>=17.0.0`) |

## Checklist

- [ ] Every `@fsegurai/marked-extended-*` package is on 17.0.0 and `marked` is on 17.
- [ ] No `:acc`, `:sp`, `:tb`, `:t`, `:tl` or `:ev` aliases remain in your content.
- [ ] Each package's stylesheet is imported.
- [ ] Pages that use tabs, timeline, accordion or spoiler render as before.

## Next step

- [What's new in 17.0.0](../help/whats-new.md)
