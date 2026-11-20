# One palette, every extension

Seven extensions, one set of `--mx-*` tokens. Pick a preset or a color: alerts, tabs, tables, task boxes, the
timeline, the spoiler and the footnotes[^tokens] restyle together.

> [!TIP]
> Tip alerts read `--mx-success`, notes `--mx-accent`, and every alert its text and border from `--mx-text` and
> `--mx-border`.

> [!WARNING]
> `--mx-warning` here, `--mx-danger` below.

> [!CAUTION]
> A component property you set (`--mx-alert-caution-color`) still wins over the base token.

````tabs
label: Tasks
---
- [x] Map the base tokens
- [ ] Restyle every theme
- [ ] Ship 18.1.0

---
label: Why

Each theme declares its component properties on `:root` as `var(--mx-accent, <its default>)`.
````

| Token | Read by |
|-------|---------|
| `--mx-text` | alert, tables, tabs, timeline |
| `--mx-surface` | tables, tabs, timeline |
| `--mx-border` | alert, tables, tabs, timeline |
| `--mx-accent` | alert, footnote, lists, spoiler, tabs, timeline |

````timeline
---
date: "2026-10-09"

# Beta 0
Sanitizer-safe markup.

---
date: "2026-11-19"
active: "true"

# 18.1.0
Base design tokens.
````

```spoiler
title: Where do I set them?
---
On `:root`: the themes resolve them there (and under `body.dark`), so a token set on a wrapper
element would not reach the component properties.
```

[^tokens]: The footnote section reads `--mx-surface-muted` and `--mx-accent`.
