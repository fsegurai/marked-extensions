/**
 * Returns an extension object for parsing footnote definitions.
 */
export function createFootnote(lexer, description) {
  const footnotes = {
    type: 'footnotes',
    raw: description,
    rawItems: [],
    items: [],
  };

  return {
    name: 'footnote',
    level: 'block',
    childTokens: ['content'],
    tokenizer(src) {
      if (!lexer.hasFootnotes) {
        this.lexer.tokens.push(footnotes);

        lexer.tokens = this.lexer.tokens;
        lexer.hasFootnotes = true;

        // always begin with empty items
        footnotes.rawItems = [];
        footnotes.items = [];
      }

      const match =
        /^\[\^([^\]\n]+)]:(?:[ \t]+|\n*?|$)([^\n]*?(?:\n|$)(?:\n*? {4,}[^\n]*)*)/.exec(
          src,
        );

      if (match) {
        const [raw, label, text = ''] = match;
        const content = text.split('\n').map(line => line.replace(/^(?: {4}|\t)/, '')).join('\n');
        const contentLastLine = content.trimEnd().split('\n').pop();
        const adjustedContent = content + (contentLastLine && /^[ \t]*?[>\-*] |`{3,}$|^[ \t]*?[|].+[|]$/.test(contentLastLine) ? '\n\n' : '');

        const token = {
          type: 'footnote',
          raw,
          label,
          refs: [],
          content: this.lexer.blockTokens(adjustedContent),
        };

        footnotes.rawItems.push(token);

        return token;
      }
    },
    renderer() {
      return '';
    },
  };
}