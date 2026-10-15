# Configuring the "renderer"

Every extension registers on the same `marked` instance[^instance]... and the page below uses five of them --
alerts, accordions, tabs, footnotes and typography (:check:).

> [!TIP] Before you start
> Typographic turns "straight quotes" into curly ones, `--` into a dash and `...` into an ellipsis.
> Code spans such as `"this"` are left alone.

````accordion
title: Step 1 -- install the packages
expanded: true
---
> [!NOTE]
> Pick your package manager.

```tabs
label: npm

`npm install marked@^18 @fsegurai/marked-extended-alert`

---

label: bun

`bun add marked@^18 @fsegurai/marked-extended-alert`
```
````

````accordion
title: Step 2 -- register the extensions
---
Call `marked.use(...)` once^[Tabs and footnotes install document-level listeners when their factory runs.]
and pass every extension to it.

> [!WARNING]
> Footnote definitions are parsed with the global `marked`, so register footnotes on it[^global].
````

Shortcodes: (:alpha:) (:->:) (:beta:), (:infinity:) and (:TM^:).

[^instance]: A `new Marked()` instance keeps the extensions local to it.
[^global]: See the **Footnote** page of the docs.
