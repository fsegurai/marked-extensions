/**
 * Returns an extension object for parsing inline footnote references.
 */
export function createFootnoteRef(prefixId, refMarkers = false) {
  let order = 0;

  return {
    name: 'footnoteRef',
    level: 'inline',
    tokenizer(src) {
      const match = /^\[\^([^\]\n]+)]/.exec(src);

      if (match) {
        const [raw, label] = match;
        const footnotes = this.lexer.tokens[0];
        const rawFootnote = footnotes.rawItems.find(item => item.label === label);

        if (!rawFootnote) return;

        const footnote = footnotes.items.find(item => item.label === label);

        const ref = {
          type: 'footnoteRef',
          raw,
          id: '',
          label,
        };

        if (footnote) {
          ref.id = footnote.refs[0].id;
          footnote.refs.push(ref);
        } else {
          order++;
          ref.id = String(order);
          rawFootnote.refs.push(ref);
          footnotes.items.push(rawFootnote);
        }

        return ref;
      }
    },
    renderer({ id, label }) {
      order = 0; // reset order
      const encodedLabel = encodeURIComponent(label);

      return `<sup><a id="${prefixId}ref-${encodedLabel}" href="#${
        prefixId + encodedLabel
      }" data-${prefixId}ref aria-describedby="${prefixId}label">${refMarkers ? `[${id}]` : id}</a></sup>`;
    },
  };
}
