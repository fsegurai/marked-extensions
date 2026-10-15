---
label: Timeline
description: Chronological timelines from fenced timeline blocks, with date ranges, active events, groups, collapsible events, milestone and group-by-year modes.
order: 12
tags: [ "extensions", "timeline" ]
keywords: [ "chronology", "roadmap", "events", "milestone", "initAllTimelineInteractions" ]
---

# Timeline

`@fsegurai/marked-extended-timeline` renders a fenced `timeline` block as a list of dated events. The HTML is static
and injects no scripts or styles. Collapse toggles, anchor highlighting, copy-link and the reveal animation need the
exported `initTimeline*` helpers, which you call yourself.

## Quick path

```bash
npm install @fsegurai/marked-extended-timeline marked@^18
```

```js
import { marked } from 'marked';
import markedExtendedTimeline, { initAllTimelineInteractions } from '@fsegurai/marked-extended-timeline';
import '@fsegurai/marked-extended-timeline/styles/timeline.css';

marked.use(markedExtendedTimeline());
container.innerHTML = marked.parse(markdown);
initAllTimelineInteractions(container);
```

## Syntax

Timeline properties come before the first `---`. Each event follows a `---`: its `key: value` lines, a blank line,
then Markdown content.

````markdown
```timeline
groupByYear: "true"
---
date: "2024-01-15"
subtitle: "Kick-off"
icon: 🚀
active: true

Project **started**.
---
date: "2024-03-01"
endDate: "2024-06-30"
collapsible: true

Details shown by the collapse toggle.
```
````

Start the block with `---` when you have no timeline properties: everything before the first `---` is read as
timeline properties, not as an event. Values may be wrapped in `"` or `'`.

| Timeline property | Effect |
|-------------------|--------|
| `showRange: "true"` | Overrides the `showRange` option for this block. |
| `milestone: "true"` | Condensed mode: adds `timeline-milestone`; event content is not rendered. |
| `groupByYear: "true"` | Events without a `group` are grouped by the year of `date` (`Unknown` if unparseable). |

| Event property | Effect |
|----------------|--------|
| `date` | Display date. Defaults to `Event <n>`. |
| `endDate` | Shown as `<date> — <endDate>`; with `showRange`, adds `timeline-has-range`. |
| `startDate` | Parsed and stored on the token; not used in the rendered HTML. |
| `active` | `true`, `1` or `yes`: adds `active` and `aria-current="date"`. |
| `collapsible` | `true`, `1` or `yes`: wraps content in a collapse region with a toggle button. |
| `group` | Consecutive events with the same group share a `timeline-group-header`. |
| `icon` | Up to 2 characters render as text; longer values render as an `<img src>`. |
| `subtitle` | Line under the date. |

Valid dates are formatted with `dateFormat` or `toLocaleDateString()`; invalid ones are shown as escaped text.

## Options

`markedExtendedTimeline(options?: TimelineOptions)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timelineClass` | `string` | `'marked-extended-timeline-container'` | Container class. |
| `eventClass` | `string` | `'marked-extended-timeline-event'` | Event class. The collapse helper only finds the default class. |
| `dateFormat` | `((date: Date) => string) \| null` | `null` | Date formatter. Its output is not escaped. |
| `template` | `string \| null` | `null` | Container template with `{timelineContainerId}`, `{timelineClass}`, `{content}`, `{eventCount}`. |
| `customizeToken` | `(token: TimelineToken) => void \| null` | `null` | Mutates each timeline token in `walkTokens`. |
| `maxEvents` | `number` | `200` | Events past this limit are dropped with a console warning. |
| `showRange` | `boolean` | `false` | Add `timeline-has-range` to events with an `endDate`. |

Note: the 18 README says extra events are "hidden"; the source drops them from the token.

## Rendered HTML

```html
<div id="timeline-container-1" class="marked-extended-timeline-container">
  <div class="timeline-group-header" data-group-index="0">2024</div>
  <div class="marked-extended-timeline-event active  " id="timeline-container-1-event-0" aria-current="date">
    <span class="timeline-event-icon" aria-hidden="true">🚀</span>
    <div class="marked-extended-timeline-date">1/15/2024</div>
    <div class="marked-extended-timeline-subtitle">Kick-off</div>
    <div class="marked-extended-timeline-content">
      <a href="#timeline-container-1-event-0" class="timeline-anchor" aria-label="Event Link">#</a>
      <p>Project <strong>started</strong>.</p>
    </div>
  </div>
</div>
```

A collapsible event adds `timeline-collapsible`, a `button.timeline-collapse-btn` and wraps the content in
`div.timeline-collapse-content[aria-expanded="false"]`. Container ids come from a counter that is never reset, so they
keep increasing across `marked.parse` calls.

## Runtime

Nothing runs automatically. All helpers are named exports.

| Function | Effect |
|----------|--------|
| `initTimelineCollapse(target = document)` | One delegated `click` listener for `.timeline-collapse-btn`; toggles `aria-expanded` and dispatches `timeline:collapse` (`detail: { id, expanded }`, bubbles). |
| `initTimelineReveal(container?)` | `IntersectionObserver` that sets `--reveal-visible: 1` on events. Skipped under `prefers-reduced-motion`. |
| `initTimelineAnchors()` | Highlights the event in `location.hash` (`timeline-anchor-highlight`, 2 s) and listens to `hashchange` on `window`. |
| `initTimelineAnchorsClicks(container?)` | Clicking `.timeline-anchor` copies its URL to the clipboard and shows `✓`. |
| `initAllTimelineInteractions(container?)` | Runs all four. |
| `destroyTimelineCollapse(target?)`, `destroyTimelineReveal()`, `destroyTimelineAnchorsClicks()`, `destroyAllTimelineInteractions()` | Remove listeners and observers. The `hashchange` listener is never removed. |

See [Browser behavior](../guides/browser-behavior.md).

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-timeline/styles/timeline.css` | Structure. |
| `@fsegurai/marked-extended-timeline/styles/timeline-theme.css` | Optional theme, including groups, milestones, ranges and highlights. |

SCSS sources are exported at the same paths with `.scss`.

## Next step

- [Upgrading from 17](../guides/upgrading-from-17.md) (the syntax changed from `::::timeline` to a fenced block)
- [Combining extensions](../guides/combining-extensions.md)
