---
label: Timeline
description: Chronological timelines from ::::timeline / :::event blocks, with dated events and an active marker.
order: 12
tags: [ "extensions", "timeline" ]
keywords: [ "chronology", "roadmap", "events", "dateFormat" ]
---

# Timeline

`@fsegurai/marked-extended-timeline` renders a `::::timeline` block of `:::event` items as a list of dated events. It
is render-only: it needs no browser runtime and injects no scripts or styles.

## Quick path

```bash
npm install @fsegurai/marked-extended-timeline marked@^17
```

```js
import { marked } from 'marked';
import markedExtendedTimeline from '@fsegurai/marked-extended-timeline';
import '@fsegurai/marked-extended-timeline/styles/timeline.css';

marked.use(markedExtendedTimeline());
```

## Syntax

```markdown
::::timeline
:::event{date="2024-01-15" active="true"}
Project **started**.
:::eventend

:::event{date="2024-03-01"}
First release.
:::eventend
::::timelineend
```

| Element | Forms |
|---------|-------|
| Container | `::::timeline` … `::::timelineend` (aliases `:timeline` / `:tml` … `:timelineend` / `:tmlend`) |
| Event | `:::event{…}` … `:::eventend` (aliases `:event` / `:evt` … `:eventend` / `:evtend`) |

The `{…}` property block is required on every event and must follow the tag directly.

| Event property | Effect |
|----------------|--------|
| `date="…"` | Display date. Defaults to `Event <n>`. |
| `active="true"` | Adds `active` and `aria-selected="true"`. |

Valid dates are formatted with `dateFormat` or `toLocaleDateString()`; invalid ones are shown as written (not escaped).
There are no ranges, groups, icons, subtitles, collapsible events or block-level properties in 17.

## Options

`markedExtendedTimeline(options?: TimelineOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timelineClass` | `string` | `'marked-extended-timeline-container'` | Container class. |
| `eventClass` | `string` | `'marked-extended-timeline-event'` | Event class. |
| `dateFormat` | `((date: Date) => string) \| null` | `null` | Date formatter. Its output is not escaped. |
| `template` | `string \| null` | `null` | Container template with `{timelineContainerId}`, `{timelineClass}`, `{content}`. |
| `customizeToken` | `(token: TimelineToken) => void \| null` | `null` | Mutates each timeline token in `walkTokens`. |

## Rendered HTML

```html
<div id="timeline-container-1" class="marked-extended-timeline-container">
  <div class="marked-extended-timeline-event active" id="timeline-container-1-event-0" aria-selected="true">
    <div class="marked-extended-timeline-date">1/15/2024</div>
    <div class="marked-extended-timeline-content">
      <p>Project <strong>started</strong>.</p>
    </div>
  </div>
</div>
```

Container ids come from a counter that is never reset, so they keep increasing across `marked.parse` calls.

## Runtime

None. The package exports only the default `markedExtendedTimeline` factory and the types `TimelineOptions`,
`TimelineToken`, `TimelineItem`, `TimelineMeta` and `TimelineRendererOptions`.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-timeline/styles/timeline.css` | Structure. |
| `@fsegurai/marked-extended-timeline/styles/timeline-theme.css` | Optional theme. |

SCSS sources are exported at the same paths with `.scss`. See [Styling](../guides/styling.md).

## Next step

- [Combining extensions](../guides/combining-extensions.md)
- [Upgrading from 15](../guides/upgrading-from-15.md)
