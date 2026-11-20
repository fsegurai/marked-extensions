---
label: Spoiler
description: Hidden content from ```spoiler fenced blocks, revealed on hover, with particles and a style element that the factory adds to the page in the browser.
order: 4
tags: [ "extensions", "spoiler" ]
keywords: [ "hidden content", "reveal", "particles", "spoiler fence", "hover" ]
---

# Spoiler

`@fsegurai/marked-extended-spoiler` (15.0.0) hides Markdown behind an overlay. In the browser, a timer adds animated
particles and the hover reveal styles after rendering. Version 15.1.2 uses a fenced block; the 15.9 line replaced it
with a `::::spoiler` directive.

## Quick path

```bash
npm install @fsegurai/marked-extended-spoiler marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';

marked.use(markedExtendedSpoiler({}, marked));
```

## Syntax

````markdown
```spoiler title="Ending"
The butler did it.
```
````

| Part | Rule |
|------|------|
| Opening | ```` ``` ```` at the start of a line, an optional single space, then `spoiler`. |
| `title="…"` | Optional overlay text, inserted without escaping; the value cannot contain `"`. |
| Content | Every line up to the first line that starts with ```` ``` ````. |

## Options

`markedExtendedSpoiler(options = {}, markedInstance = null)`

| Argument / option | Type | Default | Description |
|-------------------|------|---------|-------------|
| `prefixId` | `string` | `'spoiler-'` | Prefix of the generated id (prefix plus 7 random characters). |
| `animationDuration` | `string` | `'2s'` | Transition duration in the injected styles. |
| `template` | `string` | built-in template | Custom HTML with `{spoilerId}`, `{markedCode}` and `{customTitle}` placeholders. A custom template disables particles and the injected styles. |
| `customizeToken` | `function` | none | Never applied: `walkTokens` checks for the type `spoilerEffect`, but tokens have the type `spoiler`. |
| `markedInstance` | object with `parse` | `null` | Second argument. Content is rendered with `markedInstance.parse(code)`; pass `marked` or a `new Marked()` instance. Without it, the content is inserted as raw text. |

The README also lists `title` and `marked` as options. `title` is the fence attribute and `marked` is the second
argument; the factory does not read them from `options`.

## Rendered HTML

```html
<div id="spoiler-1b98aui" class="spoiler-container">
  <div class="spoiler-content" style="opacity: 0;">
    <p>The butler did it.</p>
  </div>
  <div class="spoiler-overlay" style="position: absolute; …; pointer-events: none;">
    <span>Ending</span>
  </div>
  <!-- Particles effect container -->
  <div class="spoiler-particles"></div>
</div>
```

The content carries an inline `opacity: 0`. Only the `<style>` added in the browser reveals it on hover.

## Browser behavior

| Item | Behavior |
|------|----------|
| Timer | With the default template, rendering schedules `setTimeout(…, 0)` that runs `createParticles`. Without `document` it returns. |
| Particles | Adds 15 `div.particle` elements with random size, position and delay to `.spoiler-particles`. |
| Styles | Appends one `<style>` per spoiler to `document.head` with the hover reveal, layout and `particle-animation` keyframes, scoped to the spoiler id. It is never removed. |
| Missing element | If the spoiler HTML is not in the document when the timer runs, `getElementById` returns `null` and the timer throws. |

On the server, or with a custom template, no styles are added and the content stays at `opacity: 0` until you add
your own CSS.

## Next step

- [Tables](tables.md)
