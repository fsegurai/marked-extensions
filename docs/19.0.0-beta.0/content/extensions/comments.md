---
label: Comments
description: Inline and block review comments with author, type, status, priority, threading and visibility filters.
order: 4
tags: [ "extensions", "comments" ]
keywords: [ "annotations", "review notes", "threads", "replyTo", "attachComments" ]
---

# Comments

`@fsegurai/marked-extended-comments` adds inline comments (`:::comment{…}…:::`) and fenced `comments` blocks with
metadata, threads (`replyTo`) and parse-time filters.

## Quick path

```bash
npm install @fsegurai/marked-extended-comments marked
```

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
| `date` | text | Date shown in the metadata. |
| `type` | `note`, `question`, `suggestion`, `issue`, `internal`, `review`, `todo` | Comment type (default `defaultType`). |
| `visibility` | `public`, `private`, `dev-only`, `editors-only` | Visibility (default `defaultVisibility`). |
| `status` | `open`, `resolved`, `archived` | Status. Resolved comments are hidden unless `showResolvedComments`. |
| `priority` | `low`, `medium`, `high` | Priority. |
| `tags` | comma-separated | Tags. |
| `id` | text | Stable id; otherwise a content hash with `prefixId`. |
| `replyTo` | an id | Parent comment for threading. |
| `class` | classes | Extra classes (block only). |
| `data-*` | text | Custom data values (block only). |

Values outside the allowed lists are clamped. Unknown keys are ignored.

## Options

`markedExtendedComments(options?: CommentOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `className` | `string` | `'marked-extended-comment'` | CSS class prefix. |
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
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-comment-*`, inline `<svg>`). |

## Rendered HTML

| 18.0 / `unsafeHtml` | 19 default |
|---------------------|------------|
| `id="comment-x1y2"` | `mx-comments-id-comment-x1y2` |
| `data-comment-type`, `-status`, `-visibility`, `-author`, `-date` | `mx-comments-type-…`, `mx-comments-status-…`, … |
| `data-reply-to="parent"` | `mx-comments-replyTo-parent` (the reply link keeps `href="#parent"`) |
| `data-ticket="T-42"` | `mx-comments-dataTicket-T-42` |
| type `<svg>` icon | `<span class="comment-icon mx-comments-icon-note"></span>` |

Main classes: `.marked-extended-comment`, `-inline`, `-block`, `-type-<type>`, `-header`, `-body`, `-metadata`.

## Runtime

`attachComments(root, options?)` takes only the shared `observe` option.

- Restores `data-comment-*`, `data-reply-to` and custom `data-*` attributes from the class tokens (per element:
  `attachComments.refresh(root)` or `observe`).
- Reply links scroll to the parent inside `root` only.
- Event: `marked-extended:comments:navigate` with `detail: { id, from }`, dispatched on the target comment.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-comments/styles/comments.css` | Structure and type icons. |
| `@fsegurai/marked-extended-comments/styles/comments-theme.css` | Optional theme. |

## Next step

- [Runtime contract](../guides/runtime-contract.md)
