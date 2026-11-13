---
label: Help
description: Release notes, answers to frequent questions, fixes for common table problems, and links to the changelog and issue tracker for 15.0.0.
order: 6
tags: [ "help", "support" ]
keywords: [ "faq", "troubleshooting", "changelog", "issues" ]
breadcrumbTitle: Help
---

# Help

| Page | Use it when |
|------|-------------|
| [FAQ](faq.md) | You have a question about compatibility or the package contents. |
| [Troubleshooting](troubleshooting.md) | A table renders differently than expected. |
| [What's New in 15.0.0](whats-new.md) | You want the release notes of this version. |

## Project resources

| Resource | Link |
|----------|------|
| Changelog | [CHANGELOG.md](https://github.com/fsegurai/marked-extensions/blob/main/CHANGELOG.md) (added to the repository after 15.0.0) |
| Issues | [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues) |
| Demo | [fsegurai.github.io/marked-extensions](https://fsegurai.github.io/marked-extensions) |

## Contributing in short

1. Clone the repository and run `npm install` (15.0.0 uses npm workspaces).
2. `npm start` serves the demo with Rollup on port 8000; `npm run build:packages` builds the package.
3. Run the Jest suite with `npm run test:packages`.
4. Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages; the release
   workflow derives the next version from them.
