import { beforeEach, describe, expect, test } from 'bun:test';
import { Marked } from 'marked';
import { installDom, mount } from '../../../packages/.helper/testing/dom';
import markedExtendedKanban, { attachKanban } from '../../../packages/kanban/src/index';
import { syncKanbanMoves } from './kanban-sync';

const C = 'marked-extended-kanban';
const SOURCE = '```kanban\n## To Do\n- Task A\n- Task B\n\n## Done\n- Task C\n```';
const MOVED = '```kanban\n## To Do\n- Task B\n\n## Done\n- Task C\n- Task A\n```';

const render = (md: string) => new Marked({ async: false }).use(markedExtendedKanban()).parse(md) as string;
const lists = (root: ParentNode) => [...root.querySelectorAll<HTMLElement>(`.${C}-column-tasks`)];
const drag = (el: Element, type: string) => el.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

/** Drags the first card of the first column to the end of the second (default, sanitizer-safe markup). */
function moveFirstCard(root: HTMLElement) {
  const [todo, done] = lists(root);
  drag(todo!.querySelector(`.${C}-task`)!, 'dragstart');
  drag(done!, 'drop');
}

describe('demo syncKanbanMoves', () => {
  beforeEach(() => installDom());

  test('rewrites the source for a move in the default markup (no detail.raw)', async () => {
    const root = mount(render(SOURCE));
    let source = SOURCE;
    const writes: string[] = [];
    const detach = attachKanban(root);
    const stop = syncKanbanMoves(root, {
      get: () => source,
      set: (md) => {
        source = md;
        writes.push(md);
      },
    });
    moveFirstCard(root);
    expect(writes).toHaveLength(0); // deferred until every listener has run
    await tick();
    expect(writes).toEqual([MOVED]);
    stop();
    detach();
  });

  test('a move cancelled by a later listener (document) leaves the source unchanged', async () => {
    const root = mount(render(SOURCE));
    let source = SOURCE;
    const detach = attachKanban(root);
    const stop = syncKanbanMoves(root, { get: () => source, set: (md) => (source = md) });
    const cancel = (event: Event) => event.preventDefault();
    root.ownerDocument.addEventListener('marked-extended:kanban:move', cancel);
    try {
      moveFirstCard(root);
      await tick();
      expect(source).toBe(SOURCE);
      expect(lists(root)[0]!.querySelectorAll(`.${C}-task`)).toHaveLength(2);
    } finally {
      root.ownerDocument.removeEventListener('marked-extended:kanban:move', cancel);
      stop();
      detach();
    }
  });

  test('stop() removes the listener', async () => {
    const root = mount(render(SOURCE));
    let source = SOURCE;
    const detach = attachKanban(root);
    syncKanbanMoves(root, { get: () => source, set: (md) => (source = md) })();
    moveFirstCard(root);
    await tick();
    expect(source).toBe(SOURCE);
    detach();
  });
});
