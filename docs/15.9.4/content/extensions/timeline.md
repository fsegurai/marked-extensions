---
label: Timeline
description: Chronological timelines from ::::timeline blocks with :::event items, locale-formatted dates, active events and an injected stylesheet.
order: 8
tags: [ "extensions", "timeline" ]
keywords: [ "events", "chronology", "dateFormat", "tl alias" ]
---

# Timeline

`@fsegurai/marked-extended-timeline` (15.1.0) renders a `::::timeline` block of `:::event` items as a vertical
timeline. It runs no browser code apart from injecting its stylesheet.

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

:::event{date="Q2 2025" active="true"}
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

## Options

`markedExtendedTimeline(options?: TimelineOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timelineClass` | `string` | `'marked-extended-timeline-container'` | Class of the container. |
| `eventClass` | `string` | `'marked-extended-timeline-event'` | Class of each event. |
| `dateFormat` | `((date: Date) => string) \| null` | `null` | Formatter for parseable dates; `null` uses `toLocaleDateString()`. |
| `template` | `string` | `null` | Custom container template. |
| `customizeToken` | `(token) => void` | `null` | Called for each timeline token in `walkTokens`. |
| `injectStyles` | `boolean` | `true` | Append the default stylesheet to `document.head`. |

The `@default` comments in `index.d.ts` (`'marked-extended-timeline'`, `'timeline-event'`) differ from the source
defaults listed above.

## Rendered HTML

```html
<div id="timeline-container-1" class="marked-extended-timeline-container">
  <div class="marked-extended-timeline-event " id="timeline-container-1-event-0" aria-selected="false">
    <div class="marked-extended-timeline-date">1/15/2025</div>
    <div class="marked-extended-timeline-content">…</div>
  </div>
</div>
```

Container ids come from a module-level counter. Default date formatting depends on the runtime locale and time zone.
Event content is parsed with the global `marked.parse`. Template placeholders: `{timelineContainerId}`,
`{timelineClass}`, `{eventClass}`, `{content}`.

## Browser behavior

With `injectStyles: true`, the first factory call in a browser appends `<style id="marked-extended-timeline-styles">`.
Nothing else runs.

## Next step

- [Typographic](typographic.md)
