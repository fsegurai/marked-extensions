---
label: Troubleshooting
description: Fixes for 15.1.3 spoiler and code preview content shown as raw text, spoiler errors and invisible content, ignored options and inert typographic quotes.
order: 2
tags: [ "help", "troubleshooting" ]
keywords: [ "not working", "raw markdown", "spoiler error", "debugging", "smart quotes" ]
---

# Troubleshooting

Find the symptom, apply the fix.

| Symptom | Cause | Fix |
|---------|-------|-----|
| Spoiler or code preview shows `**raw**` Markdown | No `markedInstance` was passed | `markedExtendedSpoiler({}, marked)`, `markedExtendedCodePreview({}, marked)`. |
| `markedInstance is not a function` | A `new Marked()` instance was passed to code preview | Pass the callable `marked` export. |
| `Cannot read properties of null (reading 'querySelector')` in a timer | The spoiler HTML was not in the DOM when its timer ran | Insert the HTML synchronously after `marked.parse`. |
| Spoiler content never appears | No injected styles: SSR, a custom `template`, or the timer failed | Add CSS that sets `.spoiler-content` to `opacity: 1` on hover. |
| A ```` ```preview ```` block ends too early | A nested fence at the start of a line closes it | Indent the inner fence. |
| ```` ```preview title="" ```` renders as a code block | Empty attribute values do not match | Omit the attribute or give it a value. |
| A ```` ```preview ```` with `subTitle` first renders as a code block | `subTitle` must come after `title` | Write `title="…" subTitle="…"` in that order. |
| Spoiler `customizeToken` does nothing | `walkTokens` checks a token type that never occurs | Not supported in 15.1.3. |
| Footnote reference stays as `[^id]` | No definition with that label | Add `[^id]: …`. |
| Quotes stay straight | Marked escapes quotes before the typographic hook runs | Not fixable with options in 15.1.3. |
| `(->)` or `(<<)` is not replaced | `<` and `>` are escaped before the hook runs | Use the Unicode character directly. |
| `c.`, `v.`, `x.`, `l.` or `i.` start a Roman list | Roman markers are checked before letters | Use another letter or a numeric list. |
| `import { letterToInt } from '@fsegurai/marked-extended-lists'` fails | Declared in the types but not exported | Not available in 15.1.3. |

## Still stuck?

Open an issue at [github.com/fsegurai/marked-extensions/issues](https://github.com/fsegurai/marked-extensions/issues)
with the Markdown, the options and the package versions.
