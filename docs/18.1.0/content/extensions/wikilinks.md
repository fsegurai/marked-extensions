---
label: Wikilinks
description: Wiki links with targets, headings, aliases and block references, resolved by your callback, with a safe-href allow-list and escaped output.
order: 18
tags: [ "extensions", "wikilinks" ]
keywords: [ "wiki links", "backlinks", "resolve", "block references", "notes" ]
badge: New
badgeColor: green
---

# Wikilinks

`@fsegurai/marked-extended-wikilinks` adds wiki links: `[[Page]]`, `[[Page|alias]]`, `[[Page#Heading]]`,
`[[Page#Heading|alias]]` and, optionally, block references `[[Page#^block]]`. A `resolve` callback decides where each
link points; links it does not know render as unresolved. It needs no browser runtime.

## Quick path

```bash
npm install @fsegurai/marked-extended-wikilinks marked
```

```js
import { marked } from 'marked';
import markedExtendedWikilinks from '@fsegurai/marked-extended-wikilinks';
import '@fsegurai/marked-extended-wikilinks/styles/wikilinks.css'; // optional

const pages = new Map([['getting started', '/docs/getting-started']]);
marked.use(markedExtendedWikilinks({
  resolve: (target) => {
    const href = pages.get(target.toLowerCase());
    return href ? { href } : null;
  },
}));

marked.parse('See [[Getting Started#Install|the install guide]].');
// <p>See <a class="mx-wikilinks-link" href="/docs/getting-started#install">the install guide</a>.</p>
```

## Syntax

| Markdown | Calls `resolve` with | Text shown | Fragment |
|----------|----------------------|------------|----------|
| `[[Page]]` | `('Page')` | `Page` | none |
| `[[Page\|alias]]` | `('Page')` | `alias` | none |
| `[[Page#Heading]]` | `('Page', 'Heading')` | `Page#Heading` | `#heading` |
| `[[Page#Heading\|alias]]` | `('Page', 'Heading')` | `alias` | `#heading` |
| `[[#Heading]]` | `('', 'Heading')` | `Heading` | `#heading` |
| `[[Page#^block]]` (`blockRefs`) | `('Page', undefined, 'block')` | `Page#^block` | `#^block` |

The first `|` starts the alias and the first `#` the heading. A link must fit on one line and contain no `[` or `]`.
Blank links (`[[ ]]`, `[[#]]`), links inside code and links inside a Markdown link's text stay as written.

## Resolving links

`resolve(target, heading?, block?)` returns `{ href, title? }` for a link it knows, or `null`. When `href` has no `#`,
the heading slug (or the `^block` id) is appended; return an href with its own fragment to choose it yourself. For a
same-page `[[#Heading]]`, return `{ href: '' }` to get `href="#heading"`.

```js
marked.use(markedExtendedWikilinks({
  blockRefs: true,
  resolve: (target, heading, block) => {
    if (!target) return { href: '' }; // same page
    const page = notes.findByTitle(target);
    return page ? { href: `/notes/${encodeURIComponent(page.id)}`, title: page.title } : null;
  },
}));
```

Following a link (client-side routing, scrolling to the heading, checking that a heading exists) is the host's job.

## Options

`markedExtendedWikilinks(options?: WikilinksOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `resolve` | `(target, heading?, block?, context?) => { href, title? } \| { unresolved: true, title? } \| null \| undefined` | none (every link unresolved) | Maps a link to its URL. `context` is `{ source, scope }` (the parsed Markdown and the renderer's `this`); `{ unresolved: true, title }` renders a known-missing link with that title. |
| `slugger` | `(heading: string) => string` | core `createSlugger`, a fresh one per link | Heading text → fragment. |
| `unresolvedClass` | `string` | `'mx-wikilinks--unresolved'` | `class` of an unresolved link. |
| `blockRefs` | `boolean \| { pattern?, trim? }` | `false` | Read `[[Page#^block]]` as a block reference: fragment `#^block`, `block` passed to `resolve`. `true` accepts ids matching `/^[A-Za-z0-9_-]+$/`, untrimmed; an object sets the `pattern` and whether to `trim`. |
| `inLinks` | `boolean` | `false` | Also read wiki links inside a Markdown link's text; they render as `<span class="mx-wikilinks-link">` (no nested `<a>`). |
| `emptyLinks` | `boolean` | `false` | Also read `[[#]]`, `[[ ]]` and `[[\|x]]` as same-page links (`resolve` gets `''`). |
| `labels` | `Partial<WikilinksLabels>` | `defaultWikilinksLabels` | User-visible strings, see below. |

### Labels

Labels are shallow-merged over the frozen `defaultWikilinksLabels`. Values are plain text: HTML-escaped, never
templates.

| Key | Default | Used for |
|-----|---------|----------|
| `unresolved` | `'Unresolved link'` | `title` of an unresolved link; `''` renders no title. |

### Exported constants and helpers

| Export | Value |
|--------|-------|
| `WIKILINKS_TOKEN_TYPE` | `'wikilink'` |
| `WIKILINKS_SAFE_PROTOCOLS` | `['http:', 'https:', 'mailto:']` (frozen) |
| `defaultWikilinksLabels` | `{ unresolved: 'Unresolved link' }` (frozen) |
| `parseWikilink(inner)` | Splits `target#heading\|alias` into `{ target, heading, label }`. |
| `isSafeWikilinkHref(href)` | Whether an href is relative or uses an allowed scheme. |

## Rendered HTML

```html
<a class="mx-wikilinks-link" href="/notes/plan#install" title="Plan">Plan#Install</a>
<span class="mx-wikilinks--unresolved" title="Unresolved link">Missing page</span>
```

### Sanitizer notes

The output is only `<a>` with `class`, `href`, `title` and `<span>` with `class`, `title`, so Angular's
`SecurityContext.HTML` keeps it unchanged. There is no `unsafeHtml` option and no runtime.

- The link text, alias, `title`, class and href are HTML-escaped.
- An href whose scheme is not `http:`, `https:` or `mailto:` (`javascript:`, `data:`, `vbscript:`, `file:`, …)
  renders the link as unresolved, even when `resolve` returns it. Whitespace and control characters are ignored when
  reading the scheme, as browsers do.
- The default slugger refuses ids that clobber globals (`__proto__`, `constructor`, …).

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-wikilinks/styles/wikilinks.css` | Optional base styles (also `wikilinks.scss`). |

### CSS classes

| Class | Element |
|-------|---------|
| `mx-wikilinks-link` | Resolved link `<a>`. |
| `mx-wikilinks--unresolved` | Unresolved link `<span>` (`unresolvedClass`). |

### CSS custom properties

| Property | Default |
|----------|---------|
| `--mx-wikilinks-color` | `inherit` |
| `--mx-wikilinks-decoration` | `underline dotted` |
| `--mx-wikilinks-unresolved-color` | `#d33` |
| `--mx-wikilinks-unresolved-decoration` | `underline dashed` |
| `--mx-wikilinks-unresolved-cursor` | `help` |

## Next step

- [Table of contents](toc.md)
