import { marked } from 'marked';
import markedExtendedTypographic from '../src/index.js';

describe('markedExtendedTypographic', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('Greek Letters', () => {
    marked.use(markedExtendedTypographic());
    expect(marked('(alpha) (beta) (gamma)')).toMatchInlineSnapshot(`
    "<p>α β γ</p>
    "
    `);
  });

  test('Quotes Around Them', () => {
    marked.use(markedExtendedTypographic());
    expect(marked('"**test**"')).toMatchInlineSnapshot(`
    "<p>&quot;<strong>test</strong>&quot;</p>
    "
    `);
  });

  test('Simple Sentence', () => {
    marked.use(markedExtendedTypographic());
    expect(marked('# He said, -- "A \'simple\' sentence. . ." --- unknown'))
      .toMatchInlineSnapshot(`
    "<h1>He said, &#8211; &quot;A &#39;simple&#39; sentence&#8230;&quot; &#8212; unknown</h1>
    "
    `);
  });

  test('Leaves CodeSpan', () => {
    marked.use(markedExtendedTypographic());
    expect(marked('`He said, -- "A \'simple\' sentence. . ." --- unknown`')).toMatchInlineSnapshot(`
    "<p><code>He said, -- &quot;A &#39;simple&#39; sentence. . .&quot; --- unknown</code></p>
    "
    `);
  });

  test('Leaves Code Block', () => {
    marked.use(markedExtendedTypographic());
    expect(marked('```\nHe said, -- "A \'simple\' sentence. . ." --- unknown\n```')).toMatchInlineSnapshot(`
    "<pre><code>He said, -- &quot;A &#39;simple&#39; sentence. . .&quot; --- unknown
    </code></pre>
    "
    `);
  });

  test('Supports Config', () => {
    marked.use(
      markedExtendedTypographic({
        config: 1,
      }),
    );
    expect(marked('# He said, -- "A \'simple\' sentence. . ." --- unknown'))
      .toMatchInlineSnapshot(`
    "<h1>He said, &#8212; &quot;A &#39;simple&#39; sentence&#8230;&quot; &#8212;- unknown</h1>
    "
    `);
  });
});
