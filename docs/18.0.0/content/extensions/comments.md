---
label: Comments
description: Inline and fenced block review comments with author, type, status, priority, reply threads and parse-time visibility filters.
order: 3
tags: [ "extensions", "comments" ]
keywords: [ "annotations", "review notes", "threads", "replyTo" ]
---

# Comments

`@fsegurai/marked-extended-comments` adds inline comments (`:::comment{…}…:::`) and fenced `comments` blocks with
metadata, reply threads (`replyTo`) and parse-time filters. It needs no browser JavaScript. Its peer range is
`marked >=17.0.0`.

## Quick path

```bash
npm install @fsegurai/marked-extended-comments marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedComments from '@fsegurai/marked-extended-comments';
import '@fsegurai/marked-extended-comments/styles/comments.css';

marked.use(markedExtendedComments());
```

## Syntax

### Inline

```markdown
This is :::comment{author="Alice" type="question"}important text::: to review.
```

Properties go inside the optional `{…}` as `key="value"`, `key='value'` or `key=value`. The text is escaped and shown
as plain text (no Markdown). Inline keys: `author`, `date`, `type`, `visibility`, `status`, `priority`, `tags`, `id`,
`className` (replaces the base class for this comment).

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
A reply, rendered nested under its parent.
```
````

| Key | Allowed values | Description |
|-----|----------------|-------------|
| `author` | text | Author name (escaped). |
| `date` | text | Shown in the metadata, formatted with `toLocaleDateString('en-US')` when parseable. |
| `type` | `note`, `question`, `suggestion`, `issue`, `internal`, `review`, `todo` | Comment type (default `defaultType`). |
| `visibility` | `public`, `private`, `dev-only`, `editors-only` | Visibility (default `defaultVisibility`). |
| `status` | `open`, `resolved`, `archived` | Status (default `open`). Resolved comments are hidden unless `showResolvedComments`. |
| `priority` | `low`, `medium`, `high` | Priority; `low` is not shown in the metadata. |
| `tags` | text | Shown as written (escaped). |
| `id` | text | Stable id; otherwise `<prefixId>-<content hash>`. |
| `replyTo` | an id | Parent comment for threading (block only). |
| `class` | classes | Extra classes (block only). |
| `data-*` | text | Emitted as `data-*` attributes (block only). |

Values outside the allowed lists fall back to the default. Unknown keys are ignored. A reply is nested in its parent
when the parent is a visible block comment in the same document; orphans and cycles render on their own.

## Options

`markedExtendedComments(options?: CommentOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-comment'` | CSS class prefix. |
| `prefixId` | `string` | `'comment'` | Prefix of generated ids. |
| `showComments` | `boolean` | `true` | Render comments at all. |
| `enableInlineComments` | `boolean` | `true` | Render inline comments. |
| `enableBlockComments` | `boolean` | `true` | Render block comments. |
| `showMetadata` | `boolean` | `true` | Show author, date, tags and priority in blocks. |
| `showResolvedComments` | `boolean` | `false` | Render resolved comments. |
| `defaultType` | `CommentType` | `'note'` | Type when none is given. |
| `defaultVisibility` | `CommentVisibility` | `'public'` | Visibility when none is given. |
| `visibilityFilter` | `CommentVisibility[]` | none | Only render these visibilities. |
| `typeFilter` | `CommentType[]` | none | Only render these types. |
| `inlineTemplate` | `string` | built-in | Custom inline template. |
| `blockTemplate` | `string` | built-in | Custom block template. |
| `customizeToken` | `(token) => void` | none | Mutates each comment token. |
| `onVisibilityChange` | `(commentId, visible) => void` | none | Parse-time callback, once per comment. |
| `onStatusChange` | `(commentId, status) => void` | none | Parse-time callback; fires for every comment, since `status` defaults to `open`. |

A hidden inline comment renders its text only; a hidden block comment renders nothing.

Exported types: `CommentOptions`, `CommentMeta`, `CommentType`, `CommentVisibility`, `CommentStatus`,
`CommentPriority`, `InlineCommentToken`, `BlockCommentToken`.

## Rendered HTML

```html
<aside class="marked-extended-comment marked-extended-comment-block marked-extended-comment-type-review marked-extended-comment-status-open  marked-extended-comment-priority-high"
       id="review-1" data-comment-type="review" data-comment-status="open" data-comment-visibility="public"
       data-comment-author="Team Lead" data-comment-date="2026-02-17" role="complementary" aria-label="Comment by Team Lead">
  <div class="comment-content">
    <div class="marked-extended-comment-header">
      <span class="marked-extended-comment-icon" aria-hidden="true"><svg class="comment-icon">…</svg></span>
      <span class="marked-extended-comment-type-label">Review</span>
      <div class="marked-extended-comment-metadata">…</div>
    </div>
    <div class="marked-extended-comment-body">…</div>
  </div>
  <div class="comment-replies"><div class="marked-extended-comment-replies">…</div></div>
</aside>
```

A reply gets the extra class `-reply`, `data-reply-to="…"` and a plain anchor
`<a class="marked-extended-comment-reply-link" href="#review-1">↩ In reply to Team Lead's Review</a>`. Inline comments
render a `<span role="note">` with the same `data-comment-*` attributes, a `title` tooltip and an icon indicator.
Type icons are inline `<svg>` elements; a strict sanitizer may remove them and the `data-*` attributes.

## Browser behavior

None. The package exports no runtime functions, injects no `<script>` or `<style>`, and dispatches no events. Reply
links are ordinary `#id` anchors.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-comments/styles/comments.css` | Structural styles. |
| `@fsegurai/marked-extended-comments/styles/comments-theme.css` | Optional theme. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Styling and theming](../guides/styling.md)
- [Upgrading from 17](../guides/upgrading-from-17.md)
- [Embeds](embeds.md)
