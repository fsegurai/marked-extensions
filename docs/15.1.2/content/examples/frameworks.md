---
label: Frameworks
description: React, Vue and Angular components that render 15.1.2 HTML, register the extensions once and account for the spoiler's post-render timer.
order: 2
tags: [ "examples", "frameworks" ]
keywords: [ "react", "vue", "angular", "innerHTML", "v-html" ]
---

# Frameworks

A component only renders and binds the HTML:

1. Register the extensions **once**, at module level, and pass `marked` to code preview and spoiler.
2. Bind the HTML with the framework's raw-HTML binding, and render only trusted Markdown (titles are not escaped).

```ts
// markdown.ts
import { marked } from 'marked';
import markedExtendedFootnote from '@fsegurai/marked-extended-footnote';
import markedExtendedSpoiler from '@fsegurai/marked-extended-spoiler';
import markedExtendedTables from '@fsegurai/marked-extended-tables';

marked.use(markedExtendedFootnote(), markedExtendedTables(), markedExtendedSpoiler({}, marked));

export { marked };
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

Angular's sanitizer would strip the spoiler's inline `style` attributes, so the example bypasses it for trusted
content.

## Limits

- The spoiler's timer runs once, right after `marked.parse`. The framework must have committed the HTML to the DOM by
  then; otherwise the timer throws and that spoiler gets no particles or reveal styles. Test spoilers in your
  framework, or provide your own spoiler CSS.
- Each re-render adds new spoiler `<style>` elements to `document.head`.
- With server-side rendering no spoiler styles are created. See [Browser Behavior](../guides/browser-behavior.md).

## Next step

- [Extensions catalog](../extensions/README.md)
