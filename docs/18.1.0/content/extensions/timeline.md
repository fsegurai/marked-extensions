---
label: Timeline
description: Chronological timelines from fenced timeline blocks, with date ranges, active events, groups, collapsible events, milestone and group-by-year modes.
order: 15
tags: [ "extensions", "timeline" ]
keywords: [ "chronology", "roadmap", "events", "milestone", "attachTimeline", "locale", "timeZone" ]
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
| `date` | Event date. Without it the event shows `labels.untitledEvent` plus its number (`Event 1`), never parsed as a date. |
| `startDate`, `endDate` | Date range. |
| `active` | Highlight the event. |
| `collapsible` | Hide the content behind a toggle (runtime). |
| `group` | Group header. |
| `icon` | Marker icon. |
| `subtitle` | Short title under the date. |

## Options

`markedExtendedTimeline(options?: TimelineOptions): MarkedExtension`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timelineClass` | `string` | `'mx-timeline'` | Container class. |
| `eventClass` | `string` | `'mx-timeline-event'` | Event class. |
| `dateFormat` | `((date: Date, context: DateFormatContext) => string) \| null` | `null` | Formats parsed dates; the result is inserted unescaped. Default: `toLocaleDateString(locale, { timeZone })`. |
| `locale` | `string` | `undefined` (runtime default) | Locale of the default formatting. Set it when server and browser both render. |
| `timeZone` | `string` | `undefined` (host zone) | IANA zone of date-time values. Date-only values always keep their calendar date. |
| `labels` | `Partial<TimelineLabels>` | `defaultTimelineLabels` | User-visible strings, see below. |
| `maxEvents` | `number` | `200` | Maximum events per timeline; extra events are hidden with a warning. |
| `showRange` | `boolean` | `false` | Range bars for events with an `endDate`. |
| `template` | `string \| null` | `null` | Container template (`{timelineClass}`, `{content}`, `{eventCount}`, `{timelineContainerId}`, `{tokenClasses}`). |
| `customizeToken` | `(token: TimelineToken) => void \| null` | `null` | Mutates each timeline token. |
| `unsafeHtml` | `boolean` | `false` | Emit the 18.0 markup (`id`, `data-group-index`, `<button>`). |

`DateFormatContext` is `{ raw, dateOnly, locale, timeZone }`. A date-only value (`2024-03-01`) is UTC midnight and
its `context.timeZone` is `'UTC'`: format it in that zone to keep its calendar date.

### Labels

Labels are shallow-merged over the frozen `defaultTimelineLabels`. Values are plain text: HTML-escaped, never templates.

| Key | Default | Used for |
|-----|---------|----------|
| `anchor` | `'Event Link'` | `aria-label` of each event's `#` anchor. |
| `toggleDetails` | `'Toggle event details'` | `aria-label` of the collapse control. |
| `empty` | `'No timeline content found'` | Message of a timeline without events. |
| `untitledEvent` | `'Event'` | Text of an event without `date`, followed by its number. |
| `unknownGroup` | `'Unknown'` | `groupByYear` group of an event whose year is unknown. |

### Exported constants

| Constant | Value |
|----------|-------|
| `defaultTimelineLabels` | The default render labels (frozen). |
| `defaultTimelineRuntimeLabels` | `{ copied: '✓' }` (frozen), the runtime labels. |

## Rendered HTML

```html
<div class="mx-timeline mx-timeline-id-timeline-container-1x2y3z">
  <div class="mx-timeline-group-header mx-timeline-groupIndex-0">2024</div>
  <div class="mx-timeline-event mx-is-active mx-timeline--collapsible mx-timeline-id-timeline-container-1x2y3z-event-1"
       aria-current="date">
    <span class="mx-timeline-event-icon" aria-hidden="true">🚀</span>
    <div class="mx-timeline-date">…</div>
    <span class="mx-timeline-collapse-btn" role="button" tabindex="0" aria-label="Toggle event details" aria-expanded="false">
      <span class="mx-timeline-collapse-icon" aria-hidden="true">▶</span>
    </span>
    <div class="mx-timeline-content">
      <a href="#timeline-container-1x2y3z-event-1" class="mx-timeline-anchor" aria-label="Event Link">#</a>
      <div class="mx-timeline-collapse-content" aria-expanded="false">…</div>
    </div>
  </div>
</div>
```

Container ids are content hashes with an occurrence suffix for identical timelines.

### Sanitizer notes

Ids and the group index are class tokens and the collapse control is a `span[role=button]`, so Angular's
`SecurityContext.HTML` keeps the default markup unchanged. `unsafeHtml: true` emits `id` attributes,
`data-group-index` and a `<button>`, which a sanitizer strips. A custom `dateFormat` result is inserted unescaped.

## Runtime

`attachTimeline(root, options?)` returns a dispose function. Collapse and anchors are delegated on `root`; reveal is
per element, so call `attachTimeline.refresh(root)` after a re-render or pass `observe: true`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `reveal` | `boolean` | `true` | Fade events in when scrolled into view (skipped for reduced motion). |
| `copyAnchorLinks` | `boolean` | `true` | The `#` anchor copies the event link. |
| `updateHash` | `boolean` | `false` | `history.pushState` on anchor clicks. |
| `followInitialHash` | `boolean` | `true` | Highlight the event named by `location.hash` on attach. |
| `highlightDelay` | `number` | `100` | Delay in ms before that highlight. |
| `labels` | `Partial<TimelineRuntimeLabels>` | `{ copied: '✓' }` | Text the `#` anchor shows briefly after a copy. |
| `observe` | `boolean` | `false` | Refresh after the children of `root` change. |

| Event | Dispatched on | Detail |
|-------|---------------|--------|
| `marked-extended:timeline:collapse` | the event element | `{ id, expanded }` |
| `marked-extended:timeline:anchor` | the target event element | `{ id }` |

## Styling

| File | Purpose |
|------|---------|
| `@fsegurai/marked-extended-timeline/styles/timeline.css` | Structure. |
| `@fsegurai/marked-extended-timeline/styles/timeline-theme.css` | Optional theme; reads the host's `body.light` / `body.dark`. |

### CSS classes

| Class | Element | Set by |
|-------|---------|--------|
| `mx-timeline` | Container | Renderer |
| `mx-timeline--milestone` | Container of a `milestone` timeline | Renderer |
| `mx-timeline--centered`, `mx-timeline--compact`, `mx-timeline--colorful` | Container layout variants (add them yourself) | `timeline-theme.css` |
| `mx-timeline-event` | One event | Renderer |
| `mx-timeline--collapsible`, `mx-timeline--has-range` | Event modifiers | Renderer |
| `mx-timeline-date`, `mx-timeline-subtitle`, `mx-timeline-content` | Event parts | Renderer |
| `mx-timeline-event-icon`, `mx-timeline-group-header`, `mx-timeline-anchor` | Icon, group label, `#` link | Renderer |
| `mx-timeline-collapse-btn`, `mx-timeline-collapse-icon`, `mx-timeline-collapse-content` | Collapse control and content | Renderer |
| `mx-timeline-error` | `labels.empty` message | Renderer |
| `mx-is-active` | Event with `active: true` (also `aria-current="date"`) | Renderer |
| `mx-is-highlighted`, `mx-is-copied`, `mx-is-expanded` | Highlighted event, copied anchor, expanded icon | `attachTimeline` |
| `mx-timeline-id-<id>`, `mx-timeline-groupIndex-<n>`, `mx-timeline-data<Name>-<value>` | Class tokens | Renderer |

### CSS custom properties

All are optional and have fallbacks; `timeline-theme.css` declares the defaults on `:root`.

| Area | Properties |
|------|------------|
| Layout | `--mx-timeline-margin`, `--mx-timeline-indent`, `--mx-timeline-event-gap`, `--mx-timeline-transition`, `--mx-timeline-reveal-duration`, `--mx-timeline-event-index` |
| Line | `--mx-timeline-line-color`, `--mx-timeline-line-width`, `--mx-timeline-line-style` |
| Marker | `--mx-timeline-marker-size`, `--mx-timeline-marker-bg`, `--mx-timeline-marker-border`, `--mx-timeline-marker-border-width`, `--mx-timeline-marker-shadow`, `--mx-timeline-marker-hover-shadow`, `--mx-timeline-marker-active-bg`, `--mx-timeline-marker-active-border`, `--mx-timeline-marker-active-shadow` |
| Date | `--mx-timeline-date-color`, `--mx-timeline-date-bg`, `--mx-timeline-date-font-size`, `--mx-timeline-date-font-weight`, `--mx-timeline-date-letter-spacing` |
| Content | `--mx-timeline-content-bg`, `--mx-timeline-content-color`, `--mx-timeline-content-border`, `--mx-timeline-content-radius`, `--mx-timeline-content-padding`, `--mx-timeline-content-shadow`, `--mx-timeline-content-shadow-hover`, `--mx-timeline-heading-color` |
| Accents | `--mx-timeline-accent-color`, `--mx-timeline-accent-width`, `--mx-timeline-focus-outline`, `--mx-timeline-range-color`, `--mx-timeline-icon-size`, `--mx-timeline-collapse-hover-bg` |
| Anchor | `--mx-timeline-anchor-color`, `--mx-timeline-anchor-color-hover`, `--mx-timeline-copied-color` |
| Groups | `--mx-timeline-group-bg`, `--mx-timeline-group-color`, `--mx-timeline-group-border` |
| Colorful | `--mx-timeline-color-1` … `--mx-timeline-color-4` |

## Changes in 18.1.0

- An event without `date` renders `Event N` (`labels.untitledEvent`) and is never parsed as a date.
- Date-only values (`2024`, `2024-03`, `2024-03-01`) keep their calendar date in every host time zone (before,
  `2001-01` rendered as `12/31/2000` west of UTC). New `locale` and `timeZone` options; `dateFormat` receives a
  `DateFormatContext`.
- New `labels` option (render) and runtime `labels` (`copied`), with `defaultTimelineLabels` and
  `defaultTimelineRuntimeLabels`.
- Classes move to the `mx-` convention: `marked-extended-timeline-container` → `mx-timeline`,
  `marked-extended-timeline-*` and `timeline-*` parts → `mx-timeline-*`, `timeline-milestone`/`-collapsible`/
  `-has-range`/`-centered`/`-compact`/`-colorful` → `mx-timeline--*`, `active`/`expanded` →
  `mx-is-active`/`mx-is-expanded`, `timeline-anchor-highlight`/`-copied` → `mx-is-highlighted`/`mx-is-copied`,
  `error-message` → `mx-timeline-error`, `--marked-extended-timeline-*` → `--mx-timeline-*`.

## Next step

- [Runtime contract](../guides/runtime-contract.md)
