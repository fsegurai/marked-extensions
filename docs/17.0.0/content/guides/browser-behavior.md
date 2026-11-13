---
label: Browser Behavior
description: Which 17.0.0 extensions run code in the browser through inline scripts, inline handlers, injected scripts or document listeners, and what that means for SSR, sanitizers and innerHTML.
order: 1
tags: [ "guides", "browser" ]
keywords: [ "inline script", "onclick", "injected script", "window globals", "side effects", "ssr" ]
---

# Browser Behavior

17.0.0 exports no runtime helpers. Interactive extensions either install document-level behavior when their factory
runs in a browser, or put the behavior into the rendered HTML as inline handlers and scripts.

## Quick path

| You render with | Works | Does not work |
|-----------------|-------|---------------|
| `container.innerHTML = marked.parse(md)` | tabs, slide, kanban views, lists checkboxes, footnote scrolling | the inline `<script>` of each spoiler (browsers do not run scripts inserted with `innerHTML`) |
| A sanitizer (DOMPurify, Angular `[innerHTML]`) | static extensions | anything that relies on inline `onclick`, `<script>`, `<style>` or radio inputs |

## Per extension

| Extension | What runs | Globals and events |
|-----------|-----------|--------------------|
| accordion, alert, comments, embeds, tables, timeline | nothing; static HTML | none |
| typographic | nothing in the browser; it overrides Marked's `inlineText` tokenizer so inline text is not escaped | none |
| footnote | With `smoothScroll` (default `true`), every factory call adds a `document` click listener that scrolls to the target | none |
| tabs | Calling the factory in a browser installs a runtime once (`document` listeners, `MutationObserver` on `document.body`, optional `localStorage` persistence). Each block's HTML has a scoped `<style>`; switching is CSS-only through radio inputs. `onBeforeSwitch` / `onAfterSwitch` are accepted but never called | `window.__markedExtendedTabsRuntimeReady__`, `window.initMarkedExtendedTabs`; `tab-switched` event |
| kanban | View buttons carry inline `onclick` handlers; each board has a `<script type="application/json">` with its views | none |
| lists | With `interactiveCheckboxes`, each checkbox has an inline `onclick` that calls `window.markedListsCallback` | `window.markedListsCallback`, `window.markedListsCallbacks` (set when `onCheckboxChange` is given) |
| slide | With `injectScript: true` (default), the factory appends `<script id="marked-extended-slide-script">` to `document.body` once; a later call re-runs `window.initPresentation()`. No CSP nonce option | `window.presentation`, `window.initPresentation`, `window.__presentationState__` |
| spoiler | Each spoiler's HTML carries an inline `<script>`; reveal also works through CSS `:hover` and `:focus` | none |

## Known limits

| Limit | Effect |
|-------|--------|
| Slide script drives one deck | Only the first `.marked-extended-slide-presentation` on the page is navigated. |
| Spoiler script under `innerHTML` | The inline script does not run; spoilers still reveal on hover and focus through CSS. |
| Footnote listeners accumulate | Each `markedExtendedFootnote()` call adds another `document` listener; create the extension once. |
| Content Security Policy | Inline `onclick` handlers and inline scripts need `'unsafe-inline'` (or hashes) in `script-src`. |

## Server-side rendering

Browser access in tabs, slide, footnote and lists checks `typeof window` / `typeof document` first, so imports and
`marked.parse` run on the server. The behavior that the factories install (tabs runtime, slide script, footnote
listener) is then missing in the browser unless the factory also runs there.

## Next step

- [Styling and theming](styling.md)
