/**
 * DEMO ONLY — not part of any package.
 *
 * `?sanitize=1` renders the demo through the Angular `SecurityContext.HTML`
 * sanitizer emulation used by the package conformance specs, bound to the
 * browser's own `DOMParser`. It shows that the default (sanitizer-safe) markup
 * and the runtimes keep working when the HTML is inserted the way Angular's
 * `[innerHTML]` binding would leave it.
 *
 * Dependency on test infrastructure (deliberate, one emulation for specs and
 * demo): this module imports `packages/.helper/testing/angular-sanitizer-core.ts`
 * by relative path. That file must stay DOM-agnostic and free of jsdom/Node
 * imports; moving or renaming it breaks `bun run build:demo`.
 */
import { createAngularSanitizer, describeStripped } from '../../../packages/.helper/testing/angular-sanitizer-core';

const { sanitizeLikeAngular } = createAngularSanitizer(() => ({ parser: new DOMParser(), Node }));

/** `true` when the page URL has `?sanitize=1`. */
export const isSanitizedPreview = (): boolean => new URLSearchParams(window.location.search).get('sanitize') === '1';

/**
 * Sanitizes `html` like Angular and logs what was stripped (as info: author HTML
 * in the sample, such as inline styles, is expected to be stripped).
 */
export function sanitizeForPreview(html: string): string {
  const result = sanitizeLikeAngular(html);
  if (result.stripped.length > 0) {
    console.info(
      `[demo] ?sanitize=1 stripped ${result.stripped.length} item(s):`,
      result.stripped.map(describeStripped),
    );
  }
  return result.html;
}
