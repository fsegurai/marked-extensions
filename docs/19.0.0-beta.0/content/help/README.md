---
label: Help
description: Answers to frequent questions, fixes for common problems, and links to the changelog, contribution guide and issue tracker.
order: 6
tags: [ "help", "support" ]
keywords: [ "faq", "troubleshooting", "changelog", "contributing" ]
breadcrumbTitle: Help
---

# Help

| Page | Use it when |
|------|-------------|
| [FAQ](faq.md) | You have a question about choices, compatibility or behavior. |
| [Troubleshooting](troubleshooting.md) | Something renders or behaves differently than expected. |

## Project resources

| Resource | Link |
|----------|------|
| Changelog | [CHANGELOG.md](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md) |
| Migration guide | [Migrating to 19](../guides/migration-19.md) |
| Contributing | [CONTRIBUTING.md](https://github.com/fsegurai/marked-extensions/blob/main/CONTRIBUTING.md) |
| Issues | [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues) |
| Demo | [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions) |

## Contributing in short

1. Use Node.js 24 and Bun 1.4 or newer. Clone the repository and run `bun install`.
2. `bun run start` serves the demo in watch mode; `bun run build:packages` builds the packages.
3. Before pushing, run the required checks: `bun test`, `bunx biome check --diagnostic-level=error .`,
   `bun run type-check`, `bun run check:ssr-imports`, `bun run build`, `bun run check:ssr-imports:dist` and
   `bun run check:dist`.
4. Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `docs:`…) and open
   a pull request; the full guide is in `CONTRIBUTING.md`.
