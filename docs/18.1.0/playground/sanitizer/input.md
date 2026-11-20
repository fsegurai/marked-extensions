# Sanitized output

> [!TIP]
> Nothing below needs `id`, `style`, `data-*`, `<svg>` or `<input>` to work.

````tabs
label: First
---
Tabs switch after sanitizing.

---
label: Second
---
State lives in `class`, `aria-*`, `role` and `hidden`.
````

```spoiler
title: Click to reveal
---
Spoilers toggle too.
```

A footnote[^1] and a [[Glossary]] link.

<img src="x" onerror="alert('xss')"> <a href="javascript:alert(1)">bad link</a>

[^1]: The back link still works.
