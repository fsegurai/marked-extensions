/**
 * DEMO ONLY: attaches the package runtimes to a rendered container through the
 * bundle's `attachAll`, once per container.
 *
 * - First render of a container: `attachAll(root, options)`.
 * - Later renders (every playground keystroke): `handle.refresh()` only, so
 *   listeners are not re-created and one-shot effects (the timeline's
 *   initial-hash highlight) are not replayed, except by a retry, which attaches
 *   the retried runtime with its original options.
 * - A runtime whose attach failed is retried on the next render, alone (every
 *   other runtime is passed `false`), with its configured options, until it
 *   attaches. A retry whose runtimes all failed again has its handle disposed at
 *   once, so a runtime that keeps failing holds no extra handles. A failed
 *   refresh is not a retry: the runtime stays attached and is refreshed again.
 * - A synchronous throw from `attachAll` that carries a `handle` (a partial
 *   attach) keeps that handle and marks only the runtimes the error names as
 *   failed; any other throw marks every runtime of that attempt as failed
 *   (retried next render). A throwing `refresh`/`dispose` never stops the
 *   other handles or the pending retries.
 * - Every error goes to `onError`, with the runtime's name when `attachAll`
 *   reported it, `undefined` when something threw; one failing runtime never
 *   stops the others (`attachAll` isolates them).
 */
import {
  type AttachAllError,
  type AttachAllHandle,
  type AttachAllOptions,
  type AttachAllRoot,
  type AttachAllRuntimeName,
  RUNTIME_NAMES,
} from '@fsegurai/marked-extended-bundle';

type AttachAll = (root: AttachAllRoot, options?: AttachAllOptions) => AttachAllHandle;
type RuntimeOptions = Omit<AttachAllOptions, 'onError'>;

/** Every runtime switched off; a retry switches on only the ones that failed. */
export const ALL_RUNTIMES_OFF = Object.fromEntries(RUNTIME_NAMES.map((name) => [name, false])) as Record<
  AttachAllRuntimeName,
  false
>;

export interface RuntimeAttacher {
  /** Call after each render of `root`. */
  (root: HTMLElement): void;
  /** Disposes every runtime attached to `root`. Safe to call more than once. */
  dispose(root: HTMLElement): void;
}

interface RootState {
  handles: AttachAllHandle[];
  /** Runtimes whose last attach failed: attached again on the next render. */
  failed: AttachAllRuntimeName[];
}

/**
 * @param attachAll - The bundle's `attachAll` (injected so specs can stub it).
 * @param options - Per-runtime options, as `attachAll` takes them.
 * @param onError - Receives every attach, refresh and dispose error; `runtime`
 *   is `undefined` when `attachAll` or a handle threw instead of reporting.
 */
export function createRuntimeAttacher(
  attachAll: AttachAll,
  options: RuntimeOptions,
  onError: (error: unknown, runtime: AttachAllRuntimeName | undefined) => void,
): RuntimeAttacher {
  const roots = new WeakMap<HTMLElement, RootState>();

  /** Runs `action`, reporting a synchronous throw to `onError` (no runtime name). */
  const guard = (action: () => void) => {
    try {
      action();
    } catch (error) {
      onError(error, undefined);
    }
  };

  /**
   * Attaches `runtimeOptions` to `root`, recording which runtimes failed. The
   * handle is kept only when at least one runtime attached; otherwise it is
   * disposed, so a runtime that keeps failing never piles up handles. A throwing
   * `attachAll` whose error carries a `handle` (a partial attach) keeps that
   * handle and marks only the runtimes it names in `runtimes` as failed; any other
   * throw marks every runtime it was asked to attach as failed.
   */
  const attach = (root: HTMLElement, state: RootState, runtimeOptions: AttachAllOptions) => {
    const wanted = RUNTIME_NAMES.filter((runtime) => runtimeOptions[runtime] !== false);
    const failed: AttachAllRuntimeName[] = [];
    let attaching = true;
    let handle: AttachAllHandle;
    try {
      handle = attachAll(root, {
        ...runtimeOptions,
        onError: (error, runtime) => {
          if (attaching) failed.push(runtime);
          onError(error, runtime);
        },
      });
    } catch (error) {
      onError(error, undefined);
      const partial = error as AttachAllError | undefined;
      if (!partial?.handle) {
        state.failed.push(...wanted);
        return;
      }
      // Runtimes are idempotent per root: dropping this handle would leak the ones that attached.
      handle = partial.handle;
      for (const runtime of partial.runtimes ?? []) if (!failed.includes(runtime)) failed.push(runtime);
    } finally {
      attaching = false;
    }
    state.failed.push(...failed);
    if (wanted.some((runtime) => !failed.includes(runtime))) state.handles.push(handle);
    else guard(() => handle.dispose());
  };

  const attachRuntimes = ((root: HTMLElement) => {
    const state = roots.get(root);
    if (!state) {
      const created: RootState = { handles: [], failed: [] };
      roots.set(root, created);
      attach(root, created, options);
      return;
    }
    for (const handle of state.handles) guard(() => handle.refresh());
    if (state.failed.length === 0) return;
    const retry: AttachAllOptions = { ...ALL_RUNTIMES_OFF };
    for (const runtime of state.failed.splice(0)) Object.assign(retry, { [runtime]: options[runtime] });
    attach(root, state, retry);
  }) as RuntimeAttacher;

  attachRuntimes.dispose = (root: HTMLElement) => {
    const state = roots.get(root);
    roots.delete(root); // a second call finds nothing: nothing is disposed twice
    for (const handle of state?.handles ?? []) guard(() => handle.dispose());
  };

  return attachRuntimes;
}
