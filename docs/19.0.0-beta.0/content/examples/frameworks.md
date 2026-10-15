---
label: Frameworks
description: React, Vue and Angular components that bind the rendered HTML, attach the runtimes after render, refresh on change and dispose on destroy.
order: 2
tags: [ "examples", "frameworks" ]
keywords: [ "react", "vue", "angular", "innerHTML", "v-html", "ssr" ]
---

# Frameworks

The pattern is the same in every framework:

1. Render Markdown to HTML with your `Marked` instance.
2. Bind it with the framework's HTML binding (sanitized bindings are fine: the markup survives them).
3. Attach after the first render, refresh after each change, dispose on destroy.

## React

```tsx
import { useEffect, useRef } from 'react';
import { attachAll } from '@fsegurai/marked-extended-bundle';

export function Markdown({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = attachAll(ref.current!);
    return () => handle.dispose();
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
```

## Vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
import { attachAll, type AttachAllHandle } from '@fsegurai/marked-extended-bundle';

const props = defineProps<{ html: string }>();
const root = ref<HTMLElement>();
let handle: AttachAllHandle | undefined;

onMounted(() => (handle = attachAll(root.value!)));
watch(() => props.html, async () => {
  await nextTick();
  handle?.refresh();
});
onBeforeUnmount(() => handle?.dispose());
</script>

<template>
  <div ref="root" v-html="html" />
</template>
```

## Angular

The default markup survives Angular's sanitizer, so `[innerHTML]` works without `bypassSecurityTrustHtml`.

```ts
import { afterNextRender, Component, DestroyRef, ElementRef, inject, input, effect } from '@angular/core';
import { attachAll, type AttachAllHandle } from '@fsegurai/marked-extended-bundle';

@Component({
  selector: 'app-markdown',
  template: `<div [innerHTML]="html()"></div>`,
})
export class MarkdownComponent {
  readonly html = input.required<string>();
  private readonly host = inject(ElementRef<HTMLElement>);
  private handle?: AttachAllHandle;

  constructor() {
    afterNextRender(() => (this.handle = attachAll(this.host.nativeElement)));
    effect(() => {
      this.html();
      queueMicrotask(() => this.handle?.refresh());
    });
    inject(DestroyRef).onDestroy(() => this.handle?.dispose());
  }
}
```

`attachAll` is safe to import on the server, and `afterNextRender` never runs there. A `withMarkedExtended` adapter
for ngx-markdown is planned, not released.

## Single runtime

With one package, use its runtime directly. The returned function is the cleanup:

```tsx
useEffect(() => attachCode(ref.current!, { observe: true }), []);
```

## Server-side rendering

Parsing on the server is safe: no package touches `document` or `window` at import or parse time, and ids are
content hashes, so the hydrated HTML matches. Only call `attachX` / `attachAll` in the browser.

## Next step

- [Runtime contract](../guides/runtime-contract.md)
