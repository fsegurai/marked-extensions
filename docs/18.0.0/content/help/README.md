---
label: Help
description: Release notes, answers to frequent questions, fixes for common problems, and links to the changelog, contribution guide and issue tracker for 18.0.0.
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
| [What's New in 18.0.0](whats-new.md) | You want the release notes of this version. |

## Project resources

| Resource | Link |
|----------|------|
| Changelog | [CHANGELOG.md](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md) |
| Upgrade guide | [Upgrading from 17](../guides/upgrading-from-17.md) |
| Contributing | [CONTRIBUTING.md](https://github.com/fsegurai/marked-extensions/blob/main/CONTRIBUTING.md) |
| Issues | [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues) |
| Demo | [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions) |

## Contributing in short

1. Use Node.js 24 and Bun 1.4 or newer (root `engines`). Clone the repository and run `bun install`.
2. `bun run start` serves the demo with Vite; `bun run build:packages` builds every package.
3. Before pushing, run `bun run test` and `bun run lint:check` (Biome). Husky runs lint and format hooks on commit
   and push.
4. Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and open a pull request; the full guide
   is in `CONTRIBUTING.md`.
