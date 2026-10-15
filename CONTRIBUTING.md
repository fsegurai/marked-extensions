# 🙌 Contributing to marked-extensions

Thanks for your interest in improving the **marked-extensions** project! Whether it's fixing bugs, improving documentation, or suggesting new features—your help is welcome 🙏

---

## 🚀 Getting Started

> **Requirements**
> Ensure you're using **Node.js v24.x** and **Bun v1.4.x** or higher.

### 1. Clone the Repository

```bash
git clone https://github.com/fsegurai/marked-extensions.git
cd marked-extensions
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Build the Library

```bash
bun run build:packages
```

### 4. Start Development Server

```bash
bun run start
```

This will start the demo in watch mode for development.

---

## 🧪 Running Tests

To run the full test suite:

```bash
bun test
```

### ✅ Required Checks

CI runs these on every pull request. Run them locally before pushing:

```bash
bun test                                      # every spec
bunx biome check --diagnostic-level=error .   # lint and format
bun run type-check                            # sources and specs of every package
bun run check:ssr-imports                     # no DOM access at import or factory time
bun run build                                 # packages and demo
bun run check:ssr-imports:dist                # same check on the built packages
bun run check:dist                            # export targets exist; no built file or .d.ts imports core
```

The build copies `LICENSE` into every package folder; delete those copies before committing.

### 🐞 Debug Mode

If you encounter issues, run tests in verbose mode for detailed output:

```bash
bun test --verbose
```

---

## 🧼 Linting

> Linting is enforced as part of the CI pipeline. Please ensure your code is clean before pushing:

```bash
bun run lint
bun run format:audit   # Read-only check (Biome, covers lint + format)
```

You can also lint specific parts:
- Demo: `bun run lint:demo`
- Packages: `bun run lint:packages`

Run `bun run lint:fix` to auto-fix formatting issues before committing (it is the same command as `format`).

**Git hooks (Husky)** are installed automatically via the `prepare` script on `bun install`:
- `pre-commit` runs `bun run lint:fix` and re-stages your files, so fixes land inside the commit.
- `pre-push` runs `bun run format:audit` as a read-only gate that blocks the push if anything is dirty.
- Bypass with `git commit -n` / `git push -n` (or `HUSKY=0` for everything).

---

## 📦 Working with Extensions

This project uses a monorepo structure with individual extension packages in the `packages/` directory. Each extension
has its own:

- `package.json` - Package configuration
- `README.md` - Extension-specific documentation
- `src/index.ts` - Main extension export
- `src/utils.ts` - Extension utilities (if needed)

### Adding a New Extension

1. Create a new folder in `packages/` with your extension name.
2. Copy the structure from an existing extension, including `vite.config.ts` (`createLibraryConfig`), `tsconfig.json`
   and `tsconfig.spec.json`.
3. Add the metadata in `package.json`: version from `versions.json`, `"marked": "^18"` as a peer dependency,
   `"files": ["dist"]` and an `exports` map with `types` conditions.
4. Write `README.custom.md`; the `README.md` is generated.

Every package follows the 19 runtime contract (see [AGENTS.md](./AGENTS.md#runtime-contract-rules-for-every-package)
and [MIGRATION-19.md](./MIGRATION-19.md)):

- **Sanitizer-safe default markup**, with the rich markup, if any, behind `unsafeHtml: true`.
- **A conformance spec** (`spec/sanitizer.spec.ts`) that checks the output with `expectSanitizerSafe` and runs the
  runtime on the sanitized output.
- **Interactive behaviour in a runtime** built with `defineRuntime` from `@fsegurai/marked-extended-core`:
  `attachX(root, options?) => dispose`, scoped to `root`, idempotent, with events named
  `marked-extended:<pkg>:<event>`. Add it to the bundle's `attachAll`.
- **No DOM access** when the module is imported or the extension is created, and no `window` globals.
- **Deterministic ids**: `hashId` plus a per-parse occurrence index, never module counters or `Math.random`.
- **Core is bundled**: do not list it in `dependencies`, and keep core imports out of the public `.d.ts` files.
- Add the package to `.github/labeler.yml`, `.github/reviewers.yml` and the issue templates.

### Post Build Steps

Once you've finished working on your extension, run the following to build and verify your changes (shared helpers
live in `packages/core`; `generate:helpers` only re-syncs legacy per-package copies of `markdown-utils.ts`, and no
package carries one any more):

```bash
bun run generate:bundle  # adds your extension to the @fsegurai/marked-extended-bundle re-exports
bun run generate:readme  # regenerates every package's README.md, including the extensions table (a second run must change nothing)
bun run version:update   # applies versions.json (the source of truth) to every package.json and refreshes bun.lock
```

---

## ✍️ Commit Message Convention

This project follows **[Conventional Commits](https://www.conventionalcommits.org/)**.

| Type        | Description                           |
|-------------|---------------------------------------|
| `feat:`     | New feature                           |
| `fix:`      | Bug fix                               |
| `docs:`     | Documentation only changes            |
| `refactor:` | Code refactoring (no behavior change) |
| `test:`     | Adding or fixing tests                |
| `chore:`    | Maintenance tasks, build config       |
| `del:`      | File or code removal                  |

Example:

```bash
git commit -m "feat: add new markdown extension for spoilers"
```

---

## 🔀 Submitting a Pull Request

Please follow these steps to ensure a smooth review:

1. **Merge** the latest changes from `main` into your branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git merge main
   ```

2. Make sure all tests pass:
   ```bash
   bun test
   ```

3. Build and verify your changes (see [Required Checks](#-required-checks)):
   ```bash
   bun run build
   bun run type-check
   bun run check:ssr-imports:dist
   bun run check:dist
   ```

4. If you've added functionality:
    - Include **unit tests**.
    - Update the **README.md** or relevant documentation.
    - Add extension previews if applicable.

5. Reference any related issues in your PR comment:
   > Example: _"Closes #12"_

6. Ensure your PR title follows the **conventional commit** format.

---

## 🐛 Reporting Bugs

When submitting a bug report, please include:

- A **clear description** of the issue.
- The **expected vs actual behavior**.
- A **minimal reproducible example** (CodeSandbox or StackBlitz is ideal).
- Details about:
    - Browser(s) and OS
    - Node and Bun versions
    - Marked Extension version
    - Which extension is affected

---

## 💬 Need Help?

Open a [discussion](https://github.com/fsegurai/marked-extensions/discussions)
or [create an issue](https://github.com/fsegurai/marked-extensions/issues) and we'll do our best to assist!

---

Thanks for contributing to marked-extensions! ✨
