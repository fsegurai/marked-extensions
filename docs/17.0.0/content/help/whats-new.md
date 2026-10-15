---
label: What's New in 17.0.0
description: Release notes for @fsegurai/marked-extensions 17.0.0, the TypeScript rewrite, the marked 17 peer, renamed directive aliases and five new packages.
order: 3
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "17.0.0", "breaking changes", "typescript migration", "aliases", "new extensions" ]
---

# What's New in 17.0.0

Released 2026-04-18. Every package was rewritten in TypeScript, targets `marked` 17, and ships ESM, CommonJS, UMD and
type declarations. Five packages are new.

## Breaking changes

| Area | 15.x | 17.0.0 |
|------|------|--------|
| Source language | JavaScript | TypeScript, declarations in `dist/types/index.d.ts` |
| `marked` peer | marked 15 and earlier | `^17` (comments and embeds `>=17.0.0`) |
| Directive aliases | `:acc`, `:sp`, `:tb`, `:t`, `:tl`, `:ev` and their `…end` forms | `:acd`, `:spr`, `:tbs`, `:tab`, `:tml`, `:evt` and their `…end` forms |
| Styles | Tied to the package | Imported explicitly from `styles/*.css`; not required for the extension to work |

The long aliases (`:accordion`, `:spoiler`, `:tabs`, `:timeline`, `:event` and their `…end` forms) still work. See
[Upgrading from 15](../guides/upgrading-from-15.md).

## New packages

| Package | Purpose |
|---------|---------|
| [`@fsegurai/marked-extended-bundle`](../api/bundle.md) | Re-exports every extension factory and type. |
| [`@fsegurai/marked-extended-comments`](../extensions/comments.md) | Inline and block review comments. |
| [`@fsegurai/marked-extended-embeds`](../extensions/embeds.md) | Video, audio and social embeds from a URL. |
| [`@fsegurai/marked-extended-kanban`](../extensions/kanban.md) | Kanban boards from Markdown lists. |
| [`@fsegurai/marked-extended-slide`](../extensions/slide.md) | Slide presentations. |

## Other changes

- All extensions should support nested tokens.
- Shared helper utilities across extensions.
- Fixes: tabs tokenizer type errors, typographic return paths, accordion and spoiler content parsing, util imports.
- Tests run on `bun test` instead of Jest.

## Upgrade checklist

- [ ] Install `marked@^17` and upgrade every `@fsegurai/marked-extended-*` package to 17.0.0 together.
- [ ] Replace the removed short aliases in your Markdown.
- [ ] Import each package's stylesheet explicitly.

## Tooling (contributors)

- Rollup replaced by Vite; Jest replaced by `bun test`; semantic-release removed.
- Root `package.json` declares engines `node >=22`, `bun >=1.3.0`, `npm >=10`.
- Trivy security scanning in CI.
- Full dependency list in the
  [17.0.0 changelog entry](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md).
