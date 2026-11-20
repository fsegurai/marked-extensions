import { describe, expect, mock, test } from 'bun:test';
import type {
  AttachAllHandle,
  AttachAllOptions,
  AttachAllRoot,
  AttachAllRuntimeName,
} from '@fsegurai/marked-extended-bundle';
import { createAttachAll, RUNTIME_NAMES } from '../../../packages/bundle/src/attach-all';
import { ALL_RUNTIMES_OFF, createRuntimeAttacher } from './attach-runtimes';

/**
 * A stub `attachAll` with the bundle's isolation: each enabled runtime in
 * `failing` fails its attach (reported to `onError`, the others still attach).
 */
function stubAttachAll(failing: Set<AttachAllRuntimeName>) {
  const calls: AttachAllOptions[] = [];
  const handles: { refresh: ReturnType<typeof mock>; dispose: ReturnType<typeof mock> }[] = [];
  const attachAll = mock((_root: unknown, options: AttachAllOptions = {}): AttachAllHandle => {
    calls.push(options);
    for (const name of RUNTIME_NAMES) {
      if (options[name] !== false && failing.has(name)) options.onError?.(new Error(`${name} boom`), name);
    }
    const handle = { refresh: mock(() => {}), dispose: mock(() => {}) };
    handles.push(handle);
    return handle;
  });
  return { attachAll, calls, handles };
}

const root = () => ({}) as HTMLElement;
const enabled = (options: AttachAllOptions) => RUNTIME_NAMES.filter((name) => options[name] !== false);

describe('demo createRuntimeAttacher', () => {
  test('ALL_RUNTIMES_OFF lists every bundle runtime', () => {
    expect(Object.keys(ALL_RUNTIMES_OFF).sort()).toEqual([...RUNTIME_NAMES].sort());
  });

  test('attaches once per root with the given options, then only refreshes', () => {
    const stub = stubAttachAll(new Set());
    const onError = mock(() => {});
    const attach = createRuntimeAttacher(stub.attachAll, { code: { syncByLabel: true } }, onError);
    const a = root();
    attach(a);
    attach(a);
    attach(a);
    expect(stub.attachAll).toHaveBeenCalledTimes(1);
    expect(stub.calls[0]!.code).toEqual({ syncByLabel: true });
    expect(stub.handles[0]!.refresh).toHaveBeenCalledTimes(2);
    attach(root());
    expect(stub.attachAll).toHaveBeenCalledTimes(2);
    expect(onError).not.toHaveBeenCalled();
  });

  test('a runtime that failed to attach is retried alone on the next render, until it attaches', () => {
    const failing = new Set<AttachAllRuntimeName>(['kanban']);
    const stub = stubAttachAll(failing);
    const onError = mock(() => {});
    const kanban = { columns: 3 } as AttachAllOptions['kanban'];
    const attach = createRuntimeAttacher(stub.attachAll, { kanban, footnote: { scrollOffset: 80 } }, onError);
    const a = root();
    attach(a);
    expect(onError).toHaveBeenCalledTimes(1);
    expect((onError.mock.calls[0] as unknown[])[1]).toBe('kanban');

    attach(a); // still failing: retried alone, with its configured options
    expect(stub.attachAll).toHaveBeenCalledTimes(2);
    expect(enabled(stub.calls[1]!)).toEqual(['kanban']);
    expect(stub.calls[1]!.kanban).toBe(kanban);
    expect(stub.handles[0]!.refresh).toHaveBeenCalledTimes(1);
    expect(stub.handles[1]!.dispose).toHaveBeenCalledTimes(1); // the failed retry's handle is not kept

    failing.clear();
    attach(a); // attaches now
    expect(stub.attachAll).toHaveBeenCalledTimes(3);
    expect(enabled(stub.calls[2]!)).toEqual(['kanban']);

    attach(a); // nothing left to retry: every handle is only refreshed
    expect(stub.attachAll).toHaveBeenCalledTimes(3);
    expect(stub.handles.map((handle) => handle.refresh.mock.calls.length)).toEqual([3, 0, 1]);
    expect(stub.handles.map((handle) => handle.dispose.mock.calls.length)).toEqual([0, 1, 0]);
    expect(onError).toHaveBeenCalledTimes(2);
  });

  test('a runtime that keeps failing does not pile up handles: only the first handle is refreshed', () => {
    const stub = stubAttachAll(new Set<AttachAllRuntimeName>(['embeds']));
    const attach = createRuntimeAttacher(stub.attachAll, {}, () => {});
    const a = root();
    const renders = 20;
    for (let i = 0; i < renders; i++) attach(a);
    expect(stub.attachAll).toHaveBeenCalledTimes(renders);
    const [first, ...retries] = stub.handles;
    expect(first!.refresh).toHaveBeenCalledTimes(renders - 1);
    expect(retries.every((handle) => handle.dispose.mock.calls.length === 1)).toBe(true);
    expect(retries.every((handle) => handle.refresh.mock.calls.length === 0)).toBe(true);
    attach.dispose(a);
    expect(first!.dispose).toHaveBeenCalledTimes(1);
  });

  test('a throwing attachAll is reported and attached again on the next render', () => {
    const stub = stubAttachAll(new Set());
    const boom = new Error('attachAll boom');
    let throwing = true;
    const attachAll = mock((r: AttachAllRoot, options?: AttachAllOptions): AttachAllHandle => {
      if (throwing) throw boom;
      return stub.attachAll(r, options);
    });
    const onError = mock(() => {});
    const attach = createRuntimeAttacher(attachAll, { code: { syncByLabel: true } }, onError);
    const a = root();
    expect(() => attach(a)).not.toThrow();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0] as unknown[]).toEqual([boom, undefined]);

    throwing = false;
    attach(a); // retried: every runtime of the failed attempt, with its options
    expect(attachAll).toHaveBeenCalledTimes(2);
    expect(enabled(stub.calls[0]!).sort()).toEqual([...RUNTIME_NAMES].sort());
    expect(stub.calls[0]!.code).toEqual({ syncByLabel: true });

    attach(a); // attached: only refreshed
    expect(attachAll).toHaveBeenCalledTimes(2);
    expect(stub.handles[0]!.refresh).toHaveBeenCalledTimes(1);
  });

  test('a partial attach that throws keeps its handle: dispose detaches the runtimes that attached', () => {
    // The bundle's real throw shape: kanban fails, the caller's onError throws, so
    // attachAll throws an AggregateError carrying the handle of the attached runtimes.
    const log: string[] = [];
    const failing = new Set<string>(['kanban']);
    const fake = (name: string) =>
      Object.assign(
        () => {
          if (failing.has(name)) throw new Error(`${name} boom`);
          log.push(`attach:${name}`);
          return () => log.push(`dispose:${name}`);
        },
        { refresh: () => true },
      );
    const realAttachAll = createAttachAll(
      Object.fromEntries(RUNTIME_NAMES.map((name) => [name, fake(name)])) as Record<
        AttachAllRuntimeName,
        ReturnType<typeof fake>
      >,
    ) as (root: AttachAllRoot, options?: AttachAllOptions) => AttachAllHandle;
    const attachAll = mock(realAttachAll);
    let throwing = true;
    // Throws only for a named runtime error (inside the bundle's onError), not for the rethrown AggregateError.
    const onError = mock((error: unknown, runtime: AttachAllRuntimeName | undefined) => {
      if (throwing && runtime) throw error;
    });
    const attach = createRuntimeAttacher(attachAll, {}, onError);
    const a = root();
    expect(() => attach(a)).not.toThrow();
    expect(log.filter((entry) => entry.startsWith('attach:'))).toHaveLength(RUNTIME_NAMES.length - 1);

    throwing = false;
    failing.clear();
    attach(a); // only kanban is retried
    expect(attachAll).toHaveBeenCalledTimes(2);
    expect(enabled(attachAll.mock.calls[1]![1]!)).toEqual(['kanban']);

    attach.dispose(a);
    const disposed = log.filter((entry) => entry.startsWith('dispose:')).map((entry) => entry.slice(8));
    expect(disposed.sort()).toEqual([...RUNTIME_NAMES].sort());
  });

  test('a throwing refresh is reported and does not stop the other refreshes', () => {
    const failing = new Set<AttachAllRuntimeName>(['tabs']);
    const stub = stubAttachAll(failing);
    const onError = mock(() => {});
    const attach = createRuntimeAttacher(stub.attachAll, {}, onError);
    const a = root();
    attach(a); // tabs fails
    failing.clear();
    attach(a); // tabs retried and attached: a second handle
    expect(stub.handles).toHaveLength(2);
    const boom = new Error('refresh boom');
    stub.handles[0]!.refresh.mockImplementation(() => {
      throw boom;
    });
    expect(() => attach(a)).not.toThrow();
    expect(stub.handles[1]!.refresh).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls.at(-1) as unknown[]).toEqual([boom, undefined]);
  });

  test('a throwing refresh does not skip the pending retry of a failed runtime', () => {
    const failing = new Set<AttachAllRuntimeName>(['slide']);
    const stub = stubAttachAll(failing);
    const attach = createRuntimeAttacher(stub.attachAll, {}, () => {});
    const a = root();
    attach(a); // slide fails
    stub.handles[0]!.refresh.mockImplementation(() => {
      throw new Error('refresh boom');
    });
    failing.clear();
    attach(a);
    expect(stub.attachAll).toHaveBeenCalledTimes(2);
    expect(enabled(stub.calls[1]!)).toEqual(['slide']);
  });

  test('a failed refresh is reported, not retried as an attach', () => {
    const stub = stubAttachAll(new Set());
    const onError = mock(() => {});
    const attach = createRuntimeAttacher(stub.attachAll, {}, onError);
    const a = root();
    attach(a);
    // The bundle reports refresh errors through the same onError.
    stub.handles[0]!.refresh.mockImplementation(() => stub.calls[0]!.onError?.(new Error('refresh boom'), 'tabs'));
    attach(a);
    attach(a);
    expect(onError).toHaveBeenCalledTimes(2);
    expect(stub.attachAll).toHaveBeenCalledTimes(1);
  });

  test('dispose disposes every handle of the root once', () => {
    const stub = stubAttachAll(new Set<AttachAllRuntimeName>(['slide']));
    const attach = createRuntimeAttacher(stub.attachAll, {}, () => {});
    const a = root();
    attach(a);
    attach(a); // the retry fails too: its handle is disposed at once
    attach.dispose(a);
    attach.dispose(a);
    expect(stub.handles.map((handle) => handle.dispose.mock.calls.length)).toEqual([1, 1]);
    attach(a); // a disposed root attaches from scratch
    expect(stub.attachAll).toHaveBeenCalledTimes(3);
  });
});
