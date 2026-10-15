# Release notes

> [!NOTE]
> Version 18 requires **marked 18**. Update both packages together.

> [!TIP] Faster builds
> Register every extension once, then call `marked.parse` as often as you need.

> [!IMPORTANT]
> Alerts can hold any Markdown:
>
> - lists
> - `inline code`
> - [links](https://marked.js.org)

> [!WARNING] {icon=🎯} Breaking change
> The `[!TYPE]` marker must be written in upper case.

> [!CAUTION]
> Built-in icons are inline `<svg>` elements. A strict HTML sanitizer may remove them; use a text or emoji `icon` if you sanitize.

> [!HINT] Custom variant
> `[!HINT]` is not built in: it is added with the `variants` option in `main.js`.

> [!UNKNOWN]
> An unknown marker stays a plain blockquote, because `defaultVariant` is not set.
