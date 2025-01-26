import { marked } from 'marked';
import markedExtendedCodePreview from '../src/index.js';

describe('markedExtendedCodePreview', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('renders code preview with default options', () => {
    marked.use(markedExtendedCodePreview({}, marked), {
      gfm: true,
      breaks: false,
      pedantic: false,
    });

    const markdown = `
\`\`\` preview title="Example Code"
\`\`\` javascript
console.log('Hello, world!');
\`\`\`
\`\`\`
`;

    const result = marked(markdown);

    expect(result).toContain('<details id="code-preview-');
    expect(result).toContain('<summary><span class="preview-title">Example Code</span></summary>');
    expect(result).toContain('<pre><code class="language-javascript">console.log(&#39;Hello, world!&#39;);\n</code></pre>');
    expect(result).not.toContain('<pre><code></code></pre>');
  });

  test('renders code preview with custom template', () => {
    const customTemplate = `
<div id="{previewId}" class="custom-preview">
  <h3>{customTitle}</h3>
  <div>{markedCode}</div>
  {customSubTitle}
</div>`;

    marked.use(markedExtendedCodePreview({ template: customTemplate }, marked));

    const markdown = `
\`\`\` preview title="Custom Template Code"
\`\`\` javascript
console.log('Hello, world!');
\`\`\`
\`\`\`
`;
    const result = marked(markdown);

    expect(result).toContain('<div id="code-preview-');
    // expect(result).toContain('<h3>Custom Template</h3>');
    // expect(result).toContain(
    //   '<div><pre><code class="language-javascript">console.log(\'Hello, custom!\');</code></pre></div>',
    // );
  });

  test('renders code preview with extra data', () => {
    marked.use(markedExtendedCodePreview({}, marked));
    const markdown = `
\`\`\` preview title="With Extra Data" subTitle="Additional Info"
\`\`\` javascript
console.log('Extra data test');
\`\`\`
\`\`\`
`;

    const result = marked(markdown);

    expect(result).toContain('<span class="preview-subtitle">Additional Info</span>');
  });

  test('renders code preview with different element type', () => {
    marked.use(markedExtendedCodePreview({}, marked));
    const markdown = `
\`\`\` preview title="Image Preview" subTitle="Image sample"
![Test image](https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "test image")
\`\`\`
`;

    const result = marked(markdown);

    expect(result).toContain(
      '<img src="https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Test image" title="test image">',
    );
    expect(result).toContain('<span class="preview-subtitle">Image sample</span>');
  });
});
