---
label: Help
description: Release notes, answers to frequent questions, fixes for common problems, and links to the changelog and issue tracker for 15.1.3.
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
| [What's New in 15.1.3](whats-new.md) | You want the release notes of this version. |

## Project resources

| Resource | Link |
|----------|------|
| Changelog | [CHANGELOG.md](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md) (added to the repository after 15.1.3) |
| Upgrade guide | [Upgrading from 15.0](../guides/upgrading-from-15.0.md) |
| Issues | [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues) |
| Demo | [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions) |

## Contributing in short

1. Clone the repository and run `bun install` (the README recommends Bun).
2. `bun start` serves the demo with Rollup on port 8000; `bun run build:packages` builds every package.
3. Run the Jest suite with `bun run test:packages`.
4. Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages; the release
   workflow derives the next version from them.
