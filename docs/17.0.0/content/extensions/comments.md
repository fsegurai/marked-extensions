---
label: Comments
description: Inline and ::::comment block review comments with author, type, status, priority and visibility metadata.
order: 3
tags: [ "extensions", "comments" ]
keywords: [ "annotations", "review notes", "commentend" ]
---

# Comments

`@fsegurai/marked-extended-comments` adds inline comments (`:::comment{…}…:::`) and block comments
(`::::comment{…}` … `::::commentend`) with metadata. It needs no browser JavaScript. Its peer range is
`marked >=17.0.0`.

## Quick path

```bash
npm install @fsegurai/marked-extended-comments marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedComments from '@fsegurai/marked-extended-comments';
import '@fsegurai/marked-extended-comments/styles/comments.css';

marked.use(markedExtendedComments());
```

## Syntax

```markdown
This is :::comment{author="Alice" type="question"}important text::: to review.

::::comment{author="Bob" type="review" status="open" priority="high"}
Block content with full **Markdown**.
::::commentend
```

Properties go inside the optional `{…}` as `key="value"`, `key='value'` or `key=value`. The inline text cannot contain
a `:` and is inserted as written (no Markdown).

| Property | Values | Description |
|----------|--------|-------------|
| `author` | text | Author name. |
| `date` | text | Shown in the metadata, formatted with `toLocaleDateString('en-US')` when parseable. |
| `type` | `note`, `question`, `suggestion`, `issue`, `internal`, `review`, `todo` | Comment type (default `defaultType`). |
| `visibility` | `public`, `private`, `dev-only`, `editors-only` | Adds `-visibility-<value>` unless `public`. |
| `status` | `open`, `resolved`, `archived` | Status (default `open`). Resolved comments are hidden unless `showResolvedComments`. |
| `priority` | `low`, `medium`, `high` | Priority; `low` is not shown in the metadata. |
| `tags` | text | Shown as written. |
| `id` | text | Element id; otherwise `<prefixId>-<timestamp>-<counter>`. |
| `className` | class | Replaces the base class for this comment. |
| `replyTo` | an id | Block only. Stored on the token but not rendered: 17 has no threading or reply link. |

Values are not validated, and author, date, tags and inline text are inserted without HTML escaping. Sanitize the
output if the Markdown is untrusted.

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
| `visibilityFilter` | `CommentVisibility[]` | none | Declared in the types but **not applied** by the 17 renderers. |
| `typeFilter` | `CommentType[]` | none | Declared in the types but **not applied** by the 17 renderers. |
| `inlineTemplate` | `string` | built-in | Custom inline template. |
| `blockTemplate` | `string` | built-in | Custom block template. |
| `customizeToken` | `(token) => void` | none | Mutates each comment token. |
| `onVisibilityChange` | `(commentId, visible) => void` | none | Parse-time callback, once per comment. |
| `onStatusChange` | `(commentId, status) => void` | none | Parse-time callback, block comments only. |

The callbacks receive `meta.id` or a fresh `<prefixId>-<timestamp>` value, which does not match the rendered id when no
`id` is set. A hidden inline comment renders its text only; a hidden block comment renders nothing.

Exported types: `CommentOptions`, `CommentMeta`, `CommentType`, `CommentVisibility`, `CommentStatus`,
`InlineCommentToken`, `BlockCommentToken`.

## Rendered HTML

```html
<aside class="marked-extended-comment marked-extended-comment-block marked-extended-comment-type-review marked-extended-comment-status-open  marked-extended-comment-priority-high"
       id="comment-1760000000000-1" data-comment-type="review" data-comment-status="open" data-comment-visibility="public"
       data-comment-author="Bob" data-comment-date="" role="complementary" aria-label="Comment by Bob">
  <div class="marked-extended-comment-header">
    <span class="marked-extended-comment-icon" aria-hidden="true"><svg class="comment-icon">…</svg></span>
    <span class="marked-extended-comment-type-label">Review</span>
    <div class="marked-extended-comment-metadata">…</div>
  </div>
  <div class="marked-extended-comment-body">…</div>
</aside>
```

Inline comments render a `<span role="note">` with the same `data-comment-*` attributes, a `title` tooltip and an icon
indicator. Type icons are inline `<svg>` elements; a strict sanitizer may remove them.

## Browser behavior

None. The package exports no runtime functions, injects no `<script>` or `<style>`, and dispatches no events.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-comments/styles/comments.css` | Structural styles. |
| `@fsegurai/marked-extended-comments/styles/comments-theme.css` | Optional theme. |

SCSS sources are exported under the same paths with `.scss`.

## Next step

- [Styling and theming](../guides/styling.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
- [Embeds](embeds.md)
