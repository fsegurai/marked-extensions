# Getting started

## Install

````tabs
label: npm
icon: 📦
active: true

```bash
npm install marked@^18 @fsegurai/marked-extended-tabs
```

---

label: pnpm
icon: 🚀

```bash
pnpm add marked@^18 @fsegurai/marked-extended-tabs
```

---

label: bun
icon: 🥟

```bash
bun add marked@^18 @fsegurai/marked-extended-tabs
```
````

Switch tabs with the mouse, or focus a label and use the arrow keys. Each switch is logged to the console.

## Frequently asked questions

The accordions share `group: faq`, so opening one closes the others.

```accordion
title: Do tabs need JavaScript?
group: faq
expanded: true
---
No. Switching is CSS-only: radio inputs plus an inline `<style>`. The runtime only adds keyboard
navigation, focus management and the switch callbacks.
```

```accordion
title: Can an accordion hold other Markdown?
group: faq
variant: tip
---
Yes, anything: **bold**, lists, tables and even other extension blocks.

1. Use a longer outer fence to nest a fenced block.
2. Close it with the same fence.
```

```accordion
title: What happens in old browsers?
group: faq
variant: warning
---
Browsers without support for `<details name>` ignore the group and let several items stay open.
```
