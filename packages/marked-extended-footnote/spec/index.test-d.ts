import { marked } from 'marked';
import markedExtendedFootnotes from '../src/index.js';

describe('markedExtendedFootnotes', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('Single Footnote', () => {
    marked.use(markedExtendedFootnotes());
    expect(marked('Here is a footnote reference[^1].\n\n[^1]: Here is the footnote.')).toMatchInlineSnapshot(`
    "<p>Here is a footnote reference<sup><a id="fnref-ref-1" href="#fnref-1" data-fnref-ref aria-describedby="fnref-label">1</a></sup>.</p>
    <section class="footnotes" data-footnotes>
    <h2 id="fnref-label" class="sr-only">Footnotes</h2>
    <ol>
    <li id="fnref-1">
    <p>Here is the footnote. <a href="#fnref-ref-1" data-fnref-backref aria-label="Back to reference 1">↩</a></p>
    </li>
    </ol>
    </section>
    "
    `);
  });

  test('Multiple Footnotes', () => {
    marked.use(markedExtendedFootnotes());
    expect(marked('Footnote 1[^1] and footnote 2[^2].\n\n[^1]: First footnote.\n[^2]: Second footnote.'))
      .toMatchInlineSnapshot(`
    "<p>Footnote 1<sup><a id="fnref-ref-1" href="#fnref-1" data-fnref-ref aria-describedby="fnref-label">1</a></sup> and footnote 2<sup><a id="fnref-ref-2" href="#fnref-2" data-fnref-ref aria-describedby="fnref-label">2</a></sup>.</p>
    <section class="footnotes" data-footnotes>
    <h2 id="fnref-label" class="sr-only">Footnotes</h2>
    <ol>
    <li id="fnref-1">
    <p>First footnote. <a href="#fnref-ref-1" data-fnref-backref aria-label="Back to reference 1">↩</a></p>
    </li>
    <li id="fnref-2">
    <p>Second footnote. <a href="#fnref-ref-2" data-fnref-backref aria-label="Back to reference 2">↩</a></p>
    </li>
    </ol>
    </section>
    "
    `);
  });

  test('Footnote with Markdown', () => {
    marked.use(markedExtendedFootnotes());
    expect(marked('Footnote with **bold** text[^1].\n\n[^1]: This is a footnote with **bold** text.'))
      .toMatchInlineSnapshot(`
    "<p>Footnote with <strong>bold</strong> text<sup><a id="fnref-ref-1" href="#fnref-1" data-fnref-ref aria-describedby="fnref-label">1</a></sup>.</p>
    <section class="footnotes">
    <ol>
    <li id="fnref-1">
    <p>This is a footnote with <strong>bold</strong> text. <a href="#fnref-ref-1" data-fnref-backref aria-label="Back to reference 1">↩</a></p>
    </li>
    </ol>
    </section>
    "
    `);
  });

  test('Footnote in List', () => {
    marked.use(markedExtendedFootnotes());
    expect(marked('1. Item one[^1]\n2. Item two[^2]\n\n[^1]: Footnote for item one.\n[^2]: Footnote for item two.'))
      .toMatchInlineSnapshot(`
    "<ol>
    <li>Item one<sup><a id="fnref-ref-1" href="#fnref-1" data-fnref-ref aria-describedby="fnref-label">1</a></sup></li>
    <li>Item two<sup><a id="fnref-ref-2" href="#fnref-2" data-fnref-ref aria-describedby="fnref-label">2</a></sup></li>
    </ol>
    <section class="footnotes" data-footnotes>
    <h2 id="fnref-label" class="sr-only">Footnotes</h2>
    <ol>
    <li id="fnref-1">
    <p>Footnote for item one. <a href="#fnref-ref-1" data-fnref-backref aria-label="Back to reference 1">↩</a></p>
    </li>
    <li id="fnref-2">
    <p>Footnote for item two. <a href="#fnref-ref-2" data-fnref-backref aria-label="Back to reference 2">↩</a></p>
    </li>
    </ol>
    </section>
    "
    `);
  });

  test('Footnote with Link', () => {
    marked.use(markedExtendedFootnotes());
    expect(
      marked(
        'Footnote with a [link](https://example.com)[^1].\n\n[^1]: This is a footnote with a [link](https://example.com).',
      ),
    ).toMatchInlineSnapshot(`
    "<p>Footnote with a <a href="https://example.com">link</a><sup><a id="fnref-ref-1" href="#fnref-1" data-fnref-ref aria-describedby="fnref-label">1</a></sup>.</p>
    <section class="footnotes" data-footnotes>
    <h2 id="fnref-label" class="sr-only">Footnotes</h2>
    <ol>
    <li id="fnref-1">
    <p>This is a footnote with a <a href="https://example.com">link</a>. <a href="#fnref-ref-1" data-fnref-backref aria-label="Back to reference 1">↩</a></p>
    </li>
    </ol>
    </section>
    "
    `);
  });
});
