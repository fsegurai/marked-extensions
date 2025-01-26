import { marked } from 'marked';
import markedExtendedSpoiler from '../src/index.js';

describe('markedExtendedSpoiler', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
    marked.use(
      markedExtendedSpoiler({}, marked),
      {
        gfm: true,
        breaks: false,
        pedantic: false,
      },
    );
  });

  it('should render spoiler text correctly', () => {
    const markdown = `
\`\`\` spoiler title="Hover on text"
This is a hidden text
\`\`\`
  `;

    const result = marked(markdown);

    expect(result).toContain('<div id="spoiler-');
    expect(result).toContain('class="spoiler-container"');
    expect(result).toContain('<span>Hover on text</span>');
    expect(result).toContain('This is a hidden text');
  });

  it('should render spoiler image correctly', () => {
    const markdown = `
\`\`\` spoiler title="Hover on image"
![Test image](https://example.com/image.jpg)
\`\`\`
  `;

    const result = marked(markdown);

    expect(result).toContain('<div id="spoiler-');
    expect(result).toContain('class="spoiler-container"');
    expect(result).toContain('<span>Hover on image</span>');
    expect(result).toContain('<img src="https://example.com/image.jpg" alt="Test image">');
  });

  it('should render spoiler code block correctly', () => {
    const markdown = `
\`\`\` spoiler title="Hover on code"
  \`\`\` javascript
    const foo = 'bar';

    console.log(foo);
  \`\`\`
\`\`\`
`;

    const result = marked(markdown);

    expect(result).toContain('<div id="spoiler-');
    expect(result).toContain('class="spoiler-container"');
    expect(result).toContain('<span>Hover on code</span>');
    expect(result).toMatch(/<pre><code class="language-javascript">.*const foo = &#39;bar&#39;;.*console\.log\(foo\);.*<\/code><\/pre>/s);
  });
});