import { afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { installDom } from '../../../packages/.helper/testing/dom';
import { isSanitizedPreview, sanitizeForPreview } from './sanitized-preview';

/** The global `DOMParser` before this file's tests (other spec files share the process). */
const ORIGINAL_DOM_PARSER = Object.getOwnPropertyDescriptor(globalThis, 'DOMParser');

/** The demo's `?sanitize=1` path, in the browser globals it uses (`DOMParser`, `Node`, `location`). */
describe('demo sanitized preview', () => {
  let window: Window & typeof globalThis;
  // `installDom` does not install `DOMParser`; this spec does, and puts back what was there after each test.
  let previous: PropertyDescriptor | undefined;
  beforeEach(() => {
    window = installDom();
    previous = Object.getOwnPropertyDescriptor(globalThis, 'DOMParser');
    Object.defineProperty(globalThis, 'DOMParser', { value: window.DOMParser, writable: true, configurable: true });
  });
  afterEach(() => {
    if (previous) Object.defineProperty(globalThis, 'DOMParser', previous);
    else delete (globalThis as { DOMParser?: unknown }).DOMParser;
  });

  test('is on only with ?sanitize=1', () => {
    expect(isSanitizedPreview()).toBe(false);
    window.history.replaceState(null, '', '/playground.html?sanitize=1');
    expect(isSanitizedPreview()).toBe(true);
    window.history.replaceState(null, '', '/playground.html?sanitize=0');
    expect(isSanitizedPreview()).toBe(false);
  });

  test('strips what Angular would strip, keeps sanitizer-safe markup, and logs what it stripped', () => {
    const info = spyOn(console, 'info').mockImplementation(() => {});
    const html = sanitizeForPreview(
      '<div class="mx-tabs" role="tablist" aria-label="x" style="color:red" data-x="1"><script>alert(1)</script>ok</div>',
    );
    expect(html).toBe('<div class="mx-tabs" role="tablist" aria-label="x">ok</div>');
    expect(info).toHaveBeenCalledTimes(1);
    info.mockRestore();
  });
});

describe('demo sanitized preview: cleanup', () => {
  test('the global DOMParser is back to what it was before this file', () => {
    expect(Object.getOwnPropertyDescriptor(globalThis, 'DOMParser')).toEqual(ORIGINAL_DOM_PARSER);
  });
});
