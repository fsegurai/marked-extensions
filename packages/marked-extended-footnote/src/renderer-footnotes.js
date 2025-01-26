/**
 * Returns an extension object for rendering the list of footnotes.
 */
export function createFootnotes(prefixId) {
  return {
    name: 'footnotes',
    renderer({ raw, items = [] }) {
      if (items.length === 0) return '';

      const footnotesItemsHTML = items.reduce((acc, { label, content, refs }) => {
        const encodedLabel = encodeURIComponent(label);
        const parsedContent = this.parser.parse(content).trimEnd();
        const isEndsWithP = parsedContent.endsWith('</p>');

        let footnoteItem = `<li id="${prefixId + encodedLabel}">\n`;
        footnoteItem += isEndsWithP ? parsedContent.replace(/<\/p>$/, '') : parsedContent;

        refs.forEach((_, i) => {
          footnoteItem += ` <a href="#${prefixId}ref-${encodedLabel}" data-${prefixId}backref aria-label="Back to reference ${label}">${
            i > 0 ? `↩<sup>${i + 1}</sup>` : '↩'
          }</a>`;
        });

        footnoteItem += isEndsWithP ? '</p>\n' : '\n';
        footnoteItem += '</li>\n';

        return acc + footnoteItem;
      }, '');
      return `<section class="footnotes" data-footnotes>\n<h2 id="${prefixId}label" class="sr-only">${raw.trimEnd()}</h2>\n<ol>\n${footnotesItemsHTML}</ol>\n</section>\n`;
    },
  };
}
