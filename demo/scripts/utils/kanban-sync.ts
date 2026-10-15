import type { KanbanMoveDetail } from '../../../packages/bundle/src/index';
import { applyMoveToMarkdown } from '../../../packages/bundle/src/index';

/** Where the playground keeps its markdown source. */
export interface MarkdownSource {
  get(): string;
  /** Called with the rewritten source after a move that happened. */
  set(markdown: string): void;
}

/**
 * Keeps the markdown source in sync with Kanban card moves inside `root`.
 *
 * `marked-extended:kanban:move` is dispatched before the card moves and is
 * cancelable, so the source is rewritten in a microtask, once every listener
 * (including later ones on `document` or `window`) has run, and only when the
 * move was not cancelled. `applyMoveToMarkdown` locates the card by its
 * ordinals, so the default markup (no `detail.raw`) works.
 * @returns A function that removes the listener.
 */
export function syncKanbanMoves(root: HTMLElement, source: MarkdownSource): () => void {
  const onMove = (event: Event) => {
    const detail = (event as CustomEvent<KanbanMoveDetail>).detail;
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      const current = source.get();
      const updated = applyMoveToMarkdown(current, detail);
      if (updated !== current) source.set(updated);
    });
  };
  root.addEventListener('marked-extended:kanban:move', onMove);
  return () => root.removeEventListener('marked-extended:kanban:move', onMove);
}
