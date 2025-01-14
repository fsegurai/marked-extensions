import { marked } from 'marked';
import markedExtendedCodePreview from '../src/index.js';

describe('markedExtendedCodePreview', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('renders code preview with default options', () => {
    marked.use(
      markedExtendedCodePreview(),
      {
        gfm: true,
        breaks: false,
        pedantic: false,
      },
    );

    const markdown = `
\`\`\` ecp preview title="Example Code" codeLanguage="javascript"
console.log('Hello, world!');
\`\`\`
`;

    const result = marked(markdown);

    expect(result).toContain('<details id="code-preview-');
    expect(result).toContain('<span class="preview-text">Example Code</span>');
    expect(result).toContain('<pre><code class="language-javascript">console.log(\'Hello, world!\');</code></pre>');
  });

  test('renders code preview with custom template', () => {
    const customTemplate = `
    <div id="{previewId}" class="custom-preview">
      <h3>{title}</h3>
      <div>{previewContent}</div>
      {extraData}
    </div>
    `;
    marked.use(markedExtendedCodePreview({ template: customTemplate }));
    const markdown = `
\`\`\` ecp preview title="Custom Template" codeLanguage="javascript"
console.log('Hello, custom!');
\`\`\`
`;
    const result = marked(markdown);

    expect(result).toContain('<div id="code-preview-');
    expect(result).toContain('<h3>Custom Template</h3>');
    expect(result).toContain('<div><pre><code class="language-javascript">console.log(\'Hello, custom!\');</code></pre></div>');
  });

  test('renders code preview with extra data', () => {
    marked.use(markedExtendedCodePreview());
    const markdown = `
\`\`\` ecp preview title="With Extra Data" extraData="Additional Info" codeLanguage="javascript"
console.log('Extra data test');
\`\`\`
`;

    const result = marked(markdown);

    expect(result).toContain('<div class="extra-data">Additional Info</div>');
  });

  test('renders code preview with different element type', () => {
    marked.use(markedExtendedCodePreview());
    const markdown = `
\`\`\` ecp preview title="Image Preview" elementType="image"
https://example.com/image.png
\`\`\`
`;

    const result = marked(markdown);
    
    expect(result).toContain('<img src="https://example.com/image.png" alt="Image Preview" class="preview-img expanded-img"/>');
  });
});
