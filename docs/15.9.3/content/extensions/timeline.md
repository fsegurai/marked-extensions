---
label: Timeline
description: Chronological timelines from ::::timeline blocks with :::event items, locale-formatted dates, active events and per-block styles.
order: 8
tags: [ "extensions", "timeline" ]
keywords: [ "events", "chronology", "dateFormat", "tl alias", "customClass" ]
---

# Timeline

`@fsegurai/marked-extended-timeline` (15.0.1), new in the 15.9 line, renders a `::::timeline` block of `:::event`
items as a vertical timeline. Each timeline is followed by its own `<style>` element.

## Quick path

```bash
npm install @fsegurai/marked-extended-timeline marked@^15
```

```js
import { marked } from 'marked';
import markedExtendedTimeline from '@fsegurai/marked-extended-timeline';

marked.use(markedExtendedTimeline({ dateFormat: (d) => d.toISOString().slice(0, 10) }));
```

## Syntax

```markdown
::::timeline
:::event{date="2025-01-15"}
### Project kickoff
Planning starts.
:::eventend

:::event{date="Q2 2025" active="true" customClass="milestone"}
### Beta
:::eventend
::::timelineend
```

| Block | Opening | Closing | Aliases |
|-------|---------|---------|---------|
| Container | `::::timeline` (alone on its line) | `::::timelineend` | `:tl`, `:timeline` / `:tlend`, `:timelineend` |
| Event | `:::event{…}` | `:::eventend` | `:ev`, `:event` / `:evend`, `:eventend` |

Events require `{…}`. The container takes no properties and timelines cannot be nested in each other.

| Event property | Default | Description |
|----------------|---------|-------------|
| `date` | `""` | Date text. A value that `new Date()` can parse is formatted; anything else is shown as written. Empty dates become `Event 0`, `Event 1`, … |
| `active` | `"false"` | `"true"` adds the `active` class and `aria-selected="true"`. |
| `customClass` | `""` | Extra class on the event element. |

## Options

`markedExtendedTimeline(options?: TimelineOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timelineClass` | `string` | `'marked-extended-timeline-container'` | Class of the outer element. |
| `eventClass` | `string` | `'marked-extended-timeline-event'` | Class of each event. |
| `dateFormat` | `((date: Date) => string) \| null` | `null` | Formatter for parseable dates; `null` uses `toLocaleDateString()`. |
| `customizeToken` | `(token) => void` | `null` | Called for each timeline token in `walkTokens`. |

There is no `template` or `injectStyles` option in 15.9.3.

## Rendered HTML

```html
<div id="timeline-container-1" class="marked-extended-timeline-container">
  <div class="marked-extended-timeline-container">
    <div class="marked-extended-timeline-event milestone active" id="timeline-container-1-event-1" aria-selected="true">
      <div class="marked-extended-timeline-date">Q2 2025</div>
      <div class="marked-extended-timeline-content">…</div>
    </div>
  </div>
</div>
<style>/* rules scoped to #timeline-container-1 .marked-extended-timeline-container */</style>
```

The inner element always has the class `marked-extended-timeline-container`, and the scoped style targets it, so a
custom `timelineClass` only changes the outer element. Container ids come from a module-level counter. Default date
formatting depends on the runtime locale and time zone. Event content is parsed with the global `marked.parse`.

## Browser behavior

None beyond the `<style>` element in the HTML.

## Next step

- [Typographic](typographic.md)
