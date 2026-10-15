---
label: Browser Behavior
description: Which 15.1.3 extension creates DOM elements and styles after rendering, when that code throws, and what it means for SSR, frameworks and sanitizers.
order: 1
tags: [ "guides", "browser" ]
keywords: [ "setTimeout", "particles", "document.head", "side effects", "ssr" ]
---

# Browser Behavior

Five of the six extensions only produce HTML. The spoiler is the exception: each spoiler rendered with the default
template schedules a timer that changes the live DOM.

## Quick path

| You render with | Works | Watch out |
|-----------------|-------|-----------|
| `container.innerHTML = marked.parse(md)` in the same task | every extension, including spoiler particles and reveal | one `<style>` per spoiler accumulates in `document.head` |
| HTML inserted later (async render, virtual DOM commit after a timer) | everything except spoiler | the spoiler timer throws because the element is not found |
| Server-side rendering | every extension's HTML | spoiler content stays hidden (`opacity: 0`) without your own CSS |

## Per extension

| Extension | What runs | Globals |
|-----------|-----------|---------|
| spoiler | `setTimeout(…, 0)` per spoiler: finds the element by id, adds 15 particle `<div>`s and appends one `<style>` to `document.head`. Skipped when `document` is undefined or a custom `template` is set. | none |
| code preview | Nothing; open and close is native `<details>`. | none |
| footnote, lists, tables | Nothing. | none |
| typographic | Nothing in the browser; it rewrites the final HTML in a `postprocess` hook. | none |

## Known limits

| Limit | Effect |
|-------|--------|
| Spoiler styles accumulate | Every render adds new `<style>` elements; re-rendering a page never removes the old ones. |
| Spoiler needs the DOM in time | `document.getElementById(spoilerId)` must find the element when the timer fires. |
| Content Security Policy | The spoiler creates `<style>` elements from script, which `style-src` must allow. |
| Unescaped titles | Code preview and spoiler titles are inserted into the HTML without escaping. Render only trusted Markdown. |

## Next step

- [Styling](styling.md)
