---
label: Frameworks
description: React, Vue and Angular components that bind 18.0.0 HTML, create the extensions once, run the spoiler and timeline helpers after render and clean up on destroy.
order: 2
tags: [ "examples", "frameworks" ]
keywords: [ "react", "vue", "angular", "innerHTML", "v-html" ]
---

# Frameworks

The pattern is the same in every framework:

1. Create the `Marked` instance **once**, at module level (several factories install document-level behavior).
2. Bind the HTML with the framework's raw-HTML binding. 18.0.0 markup needs `id`, `data-*`, inline `style`,
   `<style>` and `<input>`, so render only trusted Markdown and do not let a sanitizer strip those.
3. After each render, call the helpers you use; clean up on destroy.

```ts
// markdown.ts
import { Marked } from 'marked';
import {
  markedExtendedAlert,
  markedExtendedSpoiler,
  markedExtendedTabs,
  markedExtendedTimeline,
} from '@fsegurai/marked-extended-bundle';

export const marked = new Marked().use(
  markedExtendedAlert(),
  markedExtendedSpoiler(),
  markedExtendedTabs(),
  markedExtendedTimeline(),
);
```

## React

```tsx
import { useEffect, useRef } from 'react';
import { destroyAllTimelineInteractions, initAllTimelineInteractions, initSpoilers } from '@fsegurai/marked-extended-bundle';

export function Markdown({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initSpoilers();
    initAllTimelineInteractions(ref.current!);
    return () => destroyAllTimelineInteractions();
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
```

## Vue

```vue
<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { destroyAllTimelineInteractions, initAllTimelineInteractions, initSpoilers } from '@fsegurai/marked-extended-bundle';

const props = defineProps<{ html: string }>();
const root = ref<HTMLElement>();

const setup = () => {
  initSpoilers();
  initAllTimelineInteractions(root.value!);
};

onMounted(setup);
watch(() => props.html, async () => {
  await nextTick();
  setup();
});
onBeforeUnmount(destroyAllTimelineInteractions);
</script>

<template>
  <div ref="root" v-html="html" />
</template>
```

## Angular

Angular's `[innerHTML]` sanitizer removes `<style>`, `<input>`, inline `style` and `id`-based behavior, which breaks
tabs and spoiler colors. For trusted content, bypass it explicitly:

```ts
import { afterNextRender, Component, computed, DestroyRef, ElementRef, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { destroyAllTimelineInteractions, initAllTimelineInteractions, initSpoilers } from '@fsegurai/marked-extended-bundle';

@Component({
  selector: 'app-markdown',
  template: `<div [innerHTML]="safeHtml()"></div>`,
})
export class MarkdownComponent {
  readonly html = input.required<string>();
  private readonly sanitizer = inject(DomSanitizer);
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly safeHtml = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.html()));

  constructor() {
    afterNextRender(() => {
      initSpoilers();
      initAllTimelineInteractions(this.host.nativeElement);
    });
    inject(DestroyRef).onDestroy(() => destroyAllTimelineInteractions());
  }
}
```

## Server-side rendering

`marked.parse` runs on the server: browser access is guarded. Call the `init*` and `enable*` helpers only in the
browser, and remember that the tabs runtime and the slide script are installed when the factory runs in a browser.
See [Browser Behavior](../guides/browser-behavior.md).

## Next step

- [Editable content](editable-content.md)
