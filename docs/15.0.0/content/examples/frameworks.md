---
label: Frameworks
description: React, Vue and Angular components that render tables with the 15.0.0 extension registered once at module level.
order: 2
tags: [ "examples", "frameworks" ]
keywords: [ "react", "vue", "angular", "innerHTML", "v-html" ]
---

# Frameworks

Register the extension once, at module level, then bind the HTML with the framework's raw-HTML binding. The output is
plain table markup, so framework sanitizers keep it.

```ts
// markdown.ts
import { marked } from 'marked';
import markedExtendedTables from '@fsegurai/marked-extended-tables';

marked.use(markedExtendedTables());

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
import { Component, computed, input } from '@angular/core';
import { marked } from './markdown';

@Component({
  selector: 'app-markdown',
  template: `<div [innerHTML]="html()"></div>`,
})
export class MarkdownComponent {
  readonly source = input.required<string>();
  readonly html = computed(() => marked.parse(this.source()) as string);
}
```

## Next step

- [Tables](../extensions/tables.md)
