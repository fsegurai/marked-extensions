---
label: Frameworks
description: React, Vue and Angular components that render 15.9.3 HTML, register the extensions once on the default marked export and account for per-block styles.
order: 2
tags: [ "examples", "frameworks" ]
keywords: [ "react", "vue", "angular", "innerHTML", "v-html" ]
---

# Frameworks

15.9.3 has no helpers to call after rendering, so a component only renders and binds the HTML:

1. Register the extensions **once**, at module level, on the default `marked` export. Inner content of accordion,
   spoiler, tabs, timeline and footnote is parsed with that global instance.
2. Bind the HTML with the framework's raw-HTML binding. Tabs need their `<style>` and radio `<input>`s, so render only
   trusted Markdown and do not let a sanitizer strip them.

```ts
// markdown.ts
import { marked } from 'marked';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedTabs from '@fsegurai/marked-extended-tabs';

marked.use(markedExtendedAlert(), markedExtendedTables(), markedExtendedTabs());

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

Angular's `[innerHTML]` sanitizer removes `<style>` and `<input>`, which strips the accordion, spoiler, tabs and
timeline styles and breaks tab switching. For trusted
content, bypass it explicitly:

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
- With server-side rendering, per-block styles survive because they are part of the HTML; only the alert stylesheet
  needs the factory to run in the browser. See [Browser Behavior](../guides/browser-behavior.md).

## Next step

- [Extensions catalog](../extensions/README.md)
