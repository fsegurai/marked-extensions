---
label: Timeline
description: Chronological timelines from fenced timeline blocks, with date ranges, active events, groups, collapsible events, milestone and group-by-year modes.
order: 13
tags: [ "extensions", "timeline" ]
keywords: [ "chronology", "roadmap", "events", "milestone", "attachTimeline" ]
---

# Timeline

`@fsegurai/marked-extended-timeline` renders a fenced `timeline` block as a list of dated events. The optional
runtime adds collapse, anchor links, the initial-hash highlight and a reveal animation.

## Quick path

```bash
npm install @fsegurai/marked-extended-timeline marked
```

```js
import { marked } from 'marked';
import markedExtendedTimeline, { attachTimeline } from '@fsegurai/marked-extended-timeline';
import '@fsegurai/marked-extended-timeline/styles/timeline.css';

marked.use(markedExtendedTimeline());
container.innerHTML = marked.parse(markdown);
const dispose = attachTimeline(container);
```

## Syntax

Optional timeline properties come before the first `---`. Each event starts after a `---` with its properties, a blank
line, then Markdown content.

````markdown
```timeline
groupByYear: "true"
---
date: "2024-01-15"
subtitle: "Kick-off"

## First event
Content with **Markdown**.

---
date: "2024-03-01"
endDate: "2024-06-30"
active: "true"
collapsible: "true"
group: "Build"
icon: "🚀"

## Long sprint
Hidden until expanded.
```
````

| Timeline key | Description |
|--------------|-------------|
| `showRange` | `"true"` draws a bar between start and end dates (overrides the option). |
| `milestone` | `"true"` renders a condensed view: marker, date and subtitle only. |
| `groupByYear` | `"true"` groups events by year; an explicit `group` wins. |

| Event key | Description |
|-----------|-------------|
| `date` | Event date; defaults to `Event <n>`. |
| `startDate`, `endDate` | Date range. |
| `active` | Highlight the event. |
| `collapsible` | Hide the content behind a toggle (runtime). |
| `group` | Group header. |
| `icon` | Marker icon. |
| `subtitle` | Short title under the date. |

## Options

`markedExtendedTimeline(options?: TimelineOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timelineClass` | `string` | `'marked-extended-timeline-container'` | Container class. |
| `eventClass` | `string` | `'marked-extended-timeline-event'` | Event class. |
| `dateFormat` | `((date: Date) => string) \| null` | `null` | Formats parsed dates. |
| `maxEvents` | `number` | `200` | Maximum events per timeline. |
| `showRange` | `boolean` | `false` | Range bars for events with an `endDate`. |
| `template` | `string \| null` | `null` | Container template (`{timelineClass}`, `{content}`, `{eventCount}`, `{timelineContainerId}`, `{tokenClasses}`). |
| `customizeToken` | `(token: TimelineToken) => void \| null` | `null` | Mutates each timeline token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-group-index`, `<button>`). |

## Rendered HTML

```html
<div class="marked-extended-timeline-container mx-timeline-id-timeline-container-…">
  …events with mx-timeline-id-… tokens and a <span role="button" tabindex="0"> collapse control…
</div>
```

Container ids are content hashes with an occurrence suffix for identical timelines. `data-group-index` became
`mx-timeline-groupIndex-…`.

## Runtime

`attachTimeline(root, options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `reveal` | `boolean` | `true` | Fade events in when scrolled into view (skipped for reduced motion). |
| `copyAnchorLinks` | `boolean` | `true` | The `#` anchor copies the event link. |
| `updateHash` | `boolean` | `false` | `history.pushState` on anchor clicks. |
| `followInitialHash` | `boolean` | `true` | Highlight the event named by `location.hash` on attach. |
| `highlightDelay` | `number` | `100` | Delay in ms before that highlight. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

| Event | Detail |
|-------|--------|
| `marked-extended:timeline:collapse` | `{ id, expanded }` (was `timeline:collapse`) |
| `marked-extended:timeline:anchor` | `{ id }` |

The 18.0 `initTimeline*` and `destroy*` functions were removed.

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-timeline/styles/timeline.css` | Structure. |
| `@fsegurai/marked-extended-timeline/styles/timeline-theme.css` | Optional theme. |

## Next step

- [Runtime contract](../guides/runtime-contract.md)
