---
label: Frameworks
description: React, Vue and Angular components that bind 17.0.0 HTML, create the extensions once and account for inline scripts and handlers.
order: 2
tags: [ "examples", "frameworks" ]
keywords: [ "react", "vue", "angular", "innerHTML", "v-html" ]
---

# Frameworks

17.0.0 has no helpers to call after rendering, so a component only renders and binds the HTML:

1. Create the `Marked` instance **once**, at module level (tabs, slide and footnote install document-level behavior
   when their factory runs).
2. Bind the HTML with the framework's raw-HTML binding. The markup uses inline `onclick`, `<style>`, `<input>`, `id`
   and `data-*`, so render only trusted Markdown and do not let a sanitizer strip those.

```ts
// markdown.ts
import { Marked } from 'marked';
import { markedExtendedAlert, markedExtendedTables, markedExtendedTabs } from '@fsegurai/marked-extended-bundle';

export const marked = new Marked().use(markedExtendedAlert(), markedExtendedTables(), markedExtendedTabs());
```

## React

```tsx
import { marked } from './markdown';

export function Markdown({ source }: { source: string }) {
  return <div dangerouslySetInnerHTML={{ __html: marked.parse(source) as string }} />;
}
```

## Vue

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { marked } from './markdown';

const props = defineProps<{ source: string }>();
const html = computed(() => marked.parse(props.source) as string);
</script>

<template>
  <div v-html="html" />
</template>
```

## Angular

Angular's `[innerHTML]` sanitizer removes `<style>`, `<input>` and inline handlers, which breaks tabs, kanban views
and checkbox callbacks. For trusted content, bypass it explicitly:

```ts
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from './markdown';

@Component({
  selector: 'app-markdown',
  template: `<div [innerHTML]="html()"></div>`,
})
export class MarkdownComponent {
  readonly source = input.required<string>();
  private readonly sanitizer = inject(DomSanitizer);
  readonly html = computed(() => this.sanitizer.bypassSecurityTrustHtml(marked.parse(this.source()) as string));
}
```

## Limits

- Spoiler's inline `<script>` never runs through these bindings; spoilers still reveal on hover and focus.
- Parsing on the server works (browser access is guarded), but then the tabs runtime and slide script exist only if
  the factory also runs in the browser. See [Browser Behavior](../guides/browser-behavior.md).

## Next step

- [Presentation](presentation.md)
