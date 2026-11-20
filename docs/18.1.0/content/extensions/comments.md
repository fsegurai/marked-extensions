---
label: Comments
description: Inline and block review comments with author, type, status, priority, threading, visibility filters, labels and locale-aware dates.
order: 4
tags: [ "extensions", "comments" ]
keywords: [ "annotations", "review notes", "threads", "replyTo", "attachComments" ]
---

# Comments

`@fsegurai/marked-extended-comments` adds inline comments (`:::comment{…}…:::`) and fenced `comments` blocks with
metadata, threads (`replyTo`) and parse-time filters.

## Install

```bash
npm install @fsegurai/marked-extended-comments marked
```

## Usage

```js
import { marked } from 'marked';
import markedExtendedComments, { attachComments } from '@fsegurai/marked-extended-comments';
import '@fsegurai/marked-extended-comments/styles/comments.css';

marked.use(markedExtendedComments());
container.innerHTML = marked.parse(markdown);
const dispose = attachComments(container); // optional: data-* restoration and reply links
```

## Syntax

### Inline

```markdown
This is :::comment{author="Alice" type="question"}important text::: to review.
```

Properties go inside `{…}` as `key="value"` pairs.

### Block

````markdown
```comments
author: Team Lead
date: 2026-02-17
type: review
status: open
priority: high
tags: milestone,urgent
id: review-1
---
Block content with full **Markdown**.
```

```comments
author: Alice
replyTo: review-1
---
A reply, grouped under its parent.
```
````

| Key | Allowed values | Description |
|-----|----------------|-------------|
| `author` | text | Author name. |
| `date` | text | Date shown in the metadata. A date-only value (`2026-02-17`) keeps its calendar date in every time zone. |
| `type` | `note`, `question`, `suggestion`, `issue`, `internal`, `review`, `todo` | Comment type (default `defaultType`). |
| `visibility` | `public`, `private`, `dev-only`, `editors-only` | Visibility (default `defaultVisibility`). |
| `status` | `open`, `resolved`, `archived` | Status. Resolved comments are hidden unless `showResolvedComments`. |
| `priority` | `low`, `medium`, `high` | Priority. |
| `tags` | comma-separated | Tags. |
| `id` | text | Stable id; otherwise a content hash with `prefixId`. |
| `replyTo` | an id | Parent comment for threading. |
| `class` | classes | Extra classes (block only). |
| `data-*` | text | Custom data values (block only); restored by the runtime only when allowed. |

Values outside the allowed lists are clamped. Unknown keys are ignored.

## Options

`markedExtendedComments(options?: CommentsOptions)` (`CommentOptions` is a deprecated alias).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'mx-comments'` | Root class; parts and modifiers follow it. |
| `prefixId` | `string` | `'comment'` | Prefix of generated ids. |
| `showComments` | `boolean` | `true` | Render comments at all. |
| `enableInlineComments` | `boolean` | `true` | Parse inline comments. |
| `enableBlockComments` | `boolean` | `true` | Parse block comments. |
| `showMetadata` | `boolean` | `true` | Show author, date, status… |
| `showResolvedComments` | `boolean` | `false` | Render resolved comments. |
| `defaultType` | `CommentType` | `'note'` | Type when none is given. |
| `defaultVisibility` | `CommentVisibility` | `'public'` | Visibility when none is given. |
| `visibilityFilter` | `CommentVisibility[]` | `[]` | Only render these visibilities. |
| `typeFilter` | `CommentType[]` | `[]` | Only render these types. |
| `inlineTemplate` | `string` | built-in | Custom inline template (supports `{tokenClasses}`). |
| `blockTemplate` | `string` | built-in | Custom block template (supports `{tokenClasses}`). |
| `customizeToken` | `(token) => void` | none | Mutates each comment token. |
| `onVisibilityChange` | `(commentId, visible) => void` | none | Parse-time callback, once per comment and parse. |
| `onStatusChange` | `(commentId, status) => void` | none | Parse-time callback for comments with a status. |
| `labels` | `Partial<CommentsLabels> \| () => Partial<CommentsLabels>` | `defaultCommentsLabels` | User-visible strings, shallow-merged and HTML-escaped. A function is read at each parse. |
| `locale` | `string` | `'en-US'` | Locale of the metadata dates. |
| `timeZone` | `string` | host time zone | IANA zone of date-time values; date-only values always keep their calendar date. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-comment-*`, inline `<svg>`). |

`labels` keys:

| Key | Default | Used for |
|-----|---------|----------|
| `author` | `'Author:'` | Metadata and tooltip label before the author. |
| `date` | `'Date:'` | Metadata and tooltip label before the date. |
| `tags` | `'Tags:'` | Metadata label before the tags. |
| `priority` | `'Priority:'` | Metadata label before the priority. |
| `inReplyTo` | `'↩ In reply to'` | Reply link text, before the parent's name. |
| `possessiveSuffix` | `"'s"` | Appended to the parent's author in the reply link (`Alice's Note`). |
| `commentBy` | `'Comment by'` | Block `aria-label` before the author. |
| `comment` | `'comment'` | Anonymous block `aria-label` (`Note comment`) and a typeless parent. |
| `inlineComment` | `'Comment'` | Inline `aria-label` prefix (`Comment: <text>`). |
| `note`, `question`, `suggestion`, `issue`, `internal`, `review`, `todo` | `'Note'`, `'Question'`, `'Suggestion'`, `'Issue'`, `'Internal'`, `'Review'`, `'To Do'` | Type labels. |

## Rendered HTML

```html
<aside class="mx-comments mx-comments--block mx-comments--type-review mx-comments--status-open mx-comments--priority-high mx-comments-id-…"
       role="complementary" aria-label="Review comment">
  <div class="mx-comments-main">
    <div class="mx-comments-header">
      <span class="mx-comments-icon" aria-hidden="true"><span class="mx-comments-glyph mx-comments-icon-review"></span></span>
      <span class="mx-comments-label">Review</span>
      <div class="mx-comments-metadata"><span class="mx-comments-author">Author: Alice</span></div>
    </div>
    <div class="mx-comments-body">…</div>
  </div>
  <div class="mx-comments-thread"><div class="mx-comments-replies">…</div></div>
</aside>
```

Inline comments render a `<span class="mx-comments mx-comments--inline …" role="note">` with `mx-comments-content` and
`mx-comments-indicator`.

## Sanitizer notes

The default markup survives Angular's `SecurityContext.HTML`: the id and metadata move into class tokens and the type
icons are CSS masks. `unsafeHtml: true` emits the 18.0 markup instead.

| `unsafeHtml: true` (18.0) | Default |
|---------------------------|---------|
| `id="comment-x1y2"` | `mx-comments-id-comment-x1y2` |
| `data-comment-type`, `-status`, `-visibility`, `-author`, `-date` | `mx-comments-type-…`, `mx-comments-status-…`, … |
| `data-reply-to="parent"` | `mx-comments-replyTo-parent` (the reply link keeps `href="#parent"`) |
| `data-ticket="T-42"` | `mx-comments-dataTicket-T-42` |
| type `<svg>` icon | `<span class="mx-comments-glyph mx-comments-icon-note"></span>` |

## CSS classes

| Class | Purpose | Type |
|-------|---------|------|
| `mx-comments` | Comment root. | Both |
| `mx-comments--inline`, `mx-comments--block` | Inline or block comment. | Both |
| `mx-comments--type-<type>`, `mx-comments--status-<status>` | Type and status modifiers. | Both |
| `mx-comments--visibility-<visibility>` | Non-public visibility. | Both |
| `mx-comments--priority-<priority>`, `mx-comments--reply` | Priority and reply modifiers. | Block |
| `mx-comments-content`, `mx-comments-indicator` | Commented text and its icon. | Inline |
| `mx-comments-main`, `mx-comments-header`, `mx-comments-icon`, `mx-comments-label` | Header parts. | Block |
| `mx-comments-metadata`, `mx-comments-author`, `mx-comments-date`, `mx-comments-tags`, `mx-comments-priority` | Metadata line and items. | Block |
| `mx-comments-body`, `mx-comments-reply-link`, `mx-comments-thread`, `mx-comments-replies` | Body, reply link and thread. | Block |
| `mx-comments-glyph` | Type icon (CSS mask, or `<svg>` with `unsafeHtml`). | Both |
| `mx-is-hidden` | Hides a comment (add it yourself). | Both |
| `mx-comments-icon-<type>`, `mx-comments-id-<id>`, `mx-comments-<key>-<value>` | Class tokens. | Both |

## CSS custom properties

All optional, with fallbacks; `comments-theme.css` declares the defaults on `:root` and switches under `body.dark`.

| Area | Properties |
|------|------------|
| Layout | `--mx-comments-block-margin`, `--mx-comments-header-gap`, `--mx-comments-metadata-gap`, `--mx-comments-replies-gap`, `--mx-comments-thread-padding`, `--mx-comments-divider-gap`, `--mx-comments-transition` |
| Icons | `--mx-comments-glyph-size`, `--mx-comments-glyph-size-header`, `--mx-comments-glyph-size-indicator`, `--mx-comments-icon` |
| Inline | `--mx-comments-inline-padding`, `--mx-comments-inline-radius`, `--mx-comments-inline-border-width`, `--mx-comments-inline-border-style`, `--mx-comments-inline-default-bg`, `--mx-comments-inline-default-border`, `--mx-comments-inline-default-hover-bg`, `--mx-comments-inline-default-hover-border` |
| Block | `--mx-comments-block-padding`, `--mx-comments-block-radius`, `--mx-comments-block-border-width`, `--mx-comments-block-bg`, `--mx-comments-surface`, `--mx-comments-body-color`, `--mx-comments-link-color` |
| Header | `--mx-comments-header-border-color`, `--mx-comments-header-font-size`, `--mx-comments-header-font-weight`, `--mx-comments-type-letter-spacing`, `--mx-comments-type-transform`, `--mx-comments-metadata-color` |
| Types | `--mx-comments-<type>-color`, `--mx-comments-<type>-inline-bg`, `--mx-comments-<type>-inline-border`, `--mx-comments-<type>-block-bg`, `--mx-comments-accent` (accent of the current type, set per `mx-comments--type-<type>`; was `--comment-accent`) |
| States | `--mx-comments-resolved-opacity`, `--mx-comments-archived-opacity`, `--mx-comments-private-opacity`, `--mx-comments-priority-high-bg`, `--mx-comments-priority-medium-bg`, `--mx-comments-priority-header-margin`, `--mx-comments-priority-header-padding`, `--mx-comments-priority-header-radius` |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-comments/styles/comments.css` | Structure and type icons. |
| `@fsegurai/marked-extended-comments/styles/comments-theme.css` | Optional theme. |

## Runtime

`attachComments(root, options?)` returns a `dispose` function.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowedDataAttributes` | `readonly string[]` | `[]` | Custom `data-*` names (case-insensitive) restored from `mx-comments-data*` tokens. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

- Always restores `data-comment-*` and `data-reply-to` from the class tokens. Custom `data-*` attributes are restored
  only for names in `allowedDataAttributes`: content can write class tokens by hand, so restoring every token would
  let it forge attributes other scripts trust (`data-line`, `data-full-src`).
- Restored attributes are per element: call `attachComments.refresh(root)` after a re-render, or use `observe`.
- Reply links scroll to the parent inside `root` only.
- Event: `marked-extended:comments:navigate` with `detail: { id, from }`, dispatched on the target comment.

```js
attachComments(container, { allowedDataAttributes: ['data-ticket'] });
```

## Exported constants

| Export | Value |
|--------|-------|
| `COMMENT_TYPES` | `note`, `question`, `suggestion`, `issue`, `internal`, `review`, `todo` |
| `COMMENT_STATUSES` | `open`, `resolved`, `archived` |
| `COMMENT_VISIBILITIES` | `public`, `private`, `dev-only`, `editors-only` |
| `COMMENT_PRIORITIES` | `low`, `medium`, `high` |
| `defaultCommentsLabels` | Frozen English labels (see the `labels` table). |

## Changes in 18.1.0

- `CommentOptions` renamed `CommentsOptions` (the old name is a deprecated alias).
- Classes renamed: `marked-extended-comment*` → `mx-comments`, `mx-comments--<modifier>`, `mx-comments-<part>`;
  `comment-content` → `mx-comments-main`, `comment-replies` → `mx-comments-thread`, `comment-icon` →
  `mx-comments-glyph`, `hidden` → `mx-is-hidden`. `className` defaults to `'mx-comments'`.
- Custom properties renamed from `--marked-comments-*` to `--mx-comments-*`, and `--comment-accent` to
  `--mx-comments-accent`.
- `attachComments` restores custom `data-*` attributes only when listed in `allowedDataAttributes`.
- Labels are HTML-escaped; new `labels`, `locale` and `timeZone` options; date-only values keep their calendar date.
- New exports: `COMMENT_TYPES`, `COMMENT_STATUSES`, `COMMENT_VISIBILITIES`, `COMMENT_PRIORITIES`, `defaultCommentsLabels`.
- `labels` also takes a function, read at each parse.
- `comments-theme` derives its surface, text, border, radius and type colors from the `--mx-*` base tokens when they
  are set on `:root`.

## Next step

- [Runtime contract](../guides/runtime-contract.md)
