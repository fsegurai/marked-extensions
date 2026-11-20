---
label: Help
description: Release notes, answers to frequent questions, fixes for common problems, and links to the changelog and issue tracker for 15.9.4.
order: 6
tags: [ "help", "support" ]
keywords: [ "faq", "troubleshooting", "changelog", "issues" ]
breadcrumbTitle: Help
---

# Help

| Page | Use it when |
|------|-------------|
| [FAQ](faq.md) | You have a question about compatibility, syntax or behavior. |
| [Troubleshooting](troubleshooting.md) | Something renders or behaves differently than expected. |
| [What's New in 15.9.4](whats-new.md) | You want the release notes of this version. |

## Project resources

| Resource | Link |
|----------|------|
| Changelog | [CHANGELOG.md](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md) |
| Upgrade guide | [Upgrading from 15.9.3](../guides/upgrading-from-15.9.3.md) |
| Issues | [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues) |
| Demo | [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions) |

## Contributing in short

1. Clone the repository and run `bun install` (the README recommends Bun).
2. `bun start` serves the demo with Rollup at `http://[::1]:8000`; `bun run build:packages` builds every package.
3. Run the Jest suite with `bun run test:packages`.
4. Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.
