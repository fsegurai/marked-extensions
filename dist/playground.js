import { m as marked, a as markedHighlight, p as prismjs, C as ClipboardJS } from './prism-typescript-CeYlmQQ9.js';

const mdSample = ` # Markdown Extended Tables

## Column Spanning

| H1      | H2      | H3      |
|---------|---------|---------|
| This cell spans 3 columns |||

## Row Spanning

| H1           | H2      |
|--------------|---------|
| This cell    | Cell A  |
| spans three ^| Cell B  |
| rows        ^| Cell C  |

## Multi-row headers

| This header spans two   || Header A |
| columns *and* two rows ^|| Header B |
|-------------|------------|----------|
| Cell A      | Cell B     | Cell C   |
`;

function markedExtendedTables() {
  return {
    extensions: [
      {
        name: 'spanTable',
        level: 'block', // Is this a block-level or inline-level tokenizer?
        start(src) {
          return src.match(/^\n *([^\n ].*\|.*)\n/)?.index;
        }, // Hint to Marked.js to stop and check for a match
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tokenizer(src, tokens) {
          // const regex = this.tokenizer.rules.block.table;
          const regex = new RegExp(
            '^ *([^\\n ].*\\|.*\\n(?: *[^\\s].*\\n)*?)' // Header
              + ' {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?' // Align
              + '(?:\\n((?:(?! *\\n| {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})' // Cells
              + '(?:\\n+|$)| {0,3}#{1,6} | {0,3}>| {4}[^\\n]| {0,3}(?:`{3,}'
              + '(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n| {0,3}(?:[*+-]|1[.)]) |'
              + '<\\/?(?:address|article|aside|base|basefont|blockquote|body|'
              + 'caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?: +|\\n|\\/?>)|<(?:script|pre|style|textarea|!--)).*(?:\\n|$))*)\\n*|$)',
          ); // Cells
          const cap = regex.exec(src);

          if (cap) {
            const item = {
              type: 'spanTable',
              header: cap[1].replace(/\n$/, '').split('\n'),
              align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              rows: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
            };

            // Get first header row to determine how many columns
            item.header[0] = splitCells(item.header[0]);

            const colCount = item.header[0].reduce((length, header) => {
              return length + header.colspan;
            }, 0);

            if (colCount === item.align.length) {
              item.raw = cap[0];

              let i, j, k, row;

              // Get alignment row (:---:)
              let l = item.align.length;

              for (i = 0; i < l; i++) {
                if (/^ *-+: *$/.test(item.align[i])) {
                  item.align[i] = 'right';
                } else if (/^ *:-+: *$/.test(item.align[i])) {
                  item.align[i] = 'center';
                } else if (/^ *:-+ *$/.test(item.align[i])) {
                  item.align[i] = 'left';
                } else {
                  item.align[i] = null;
                }
              }

              // Get any remaining header rows
              l = item.header.length;
              for (i = 1; i < l; i++) {
                item.header[i] = splitCells(
                  item.header[i],
                  colCount,
                  item.header[i - 1],
                );
              }

              // Get main table cells
              l = item.rows.length;
              for (i = 0; i < l; i++) {
                item.rows[i] = splitCells(
                  item.rows[i],
                  colCount,
                  item.rows[i - 1],
                );
              }

              // header child tokens
              l = item.header.length;
              for (j = 0; j < l; j++) {
                row = item.header[j];
                for (k = 0; k < row.length; k++) {
                  row[k].tokens = [];
                  this.lexer.inline(row[k].text, row[k].tokens);
                }
              }

              // cell child tokens
              l = item.rows.length;
              for (j = 0; j < l; j++) {
                row = item.rows[j];
                for (k = 0; k < row.length; k++) {
                  row[k].tokens = [];
                  this.lexer.inline(row[k].text, row[k].tokens);
                }
              }
              return item;
            }
          }
        },
        renderer(token) {
          let i, j, row, cell, col, text;
          let output = '<table>';
          output += '<thead>';
          for (i = 0; i < token.header.length; i++) {
            row = token.header[i];
            let col = 0;
            output += '<tr>';
            for (j = 0; j < row.length; j++) {
              cell = row[j];
              text = this.parser.parseInline(cell.tokens);
              output += getTableCell(text, cell, 'th', token.align[col]);
              col += cell.colspan;
            }
            output += '</tr>';
          }
          output += '</thead>';
          if (token.rows.length) {
            output += '<tbody>';
            for (i = 0; i < token.rows.length; i++) {
              row = token.rows[i];
              col = 0;
              output += '<tr>';
              for (j = 0; j < row.length; j++) {
                cell = row[j];
                text = this.parser.parseInline(cell.tokens);
                output += getTableCell(text, cell, 'td', token.align[col]);
                col += cell.colspan;
              }
              output += '</tr>';
            }
            output += '</tbody>';
          }
          output += '</table>';
          return output;
        },
      },
    ],
  };
}

const getTableCell = (text, cell, type, align) => {
  if (!cell.rowspan) {
    return '';
  }
  const tag =
    `<${type}`
    + `${cell.colspan > 1 ? ` colspan=${cell.colspan}` : ''}`
    + `${cell.rowspan > 1 ? ` rowspan=${cell.rowspan}` : ''}`
    + `${align ? ` align=${align}` : ''}>`;
  return `${tag + text}</${type}>\n`;
};

const splitCells = (tableRow, count, prevRow = []) => {
  const cells = [...tableRow.matchAll(/(?:[^|\\]|\\.?)+(?:\|+|$)/g)].map(
    x => x[0],
  );

  // Remove first/last cell in a row if whitespace only and no leading/trailing pipe
  if (!cells[0]?.trim()) {
    cells.shift();
  }
  if (!cells[cells.length - 1]?.trim()) {
    cells.pop();
  }

  let numCols = 0;
  let i, j, trimmedCell, prevCell, prevCols;

  for (i = 0; i < cells.length; i++) {
    trimmedCell = cells[i].split(/\|+$/)[0];
    cells[i] = {
      rowspan: 1,
      colspan: Math.max(cells[i].length - trimmedCell.length, 1),
      text: trimmedCell.trim().replace(/\\\|/g, '|'),
      // display escaped pipes as normal character
    };

    // Handle Rowspan
    if (trimmedCell.slice(-1) === '^' && prevRow.length) {
      // Find matching cell in previous row
      prevCols = 0;
      for (j = 0; j < prevRow.length; j++) {
        prevCell = prevRow[j];
        if (prevCols === numCols && prevCell.colspan === cells[i].colspan) {
          // merge into matching cell in previous row (the "target")
          cells[i].rowSpanTarget = prevCell.rowSpanTarget ?? prevCell;
          cells[i].rowSpanTarget.text += ` ${cells[i].text.slice(0, -1)}`;
          cells[i].rowSpanTarget.rowspan += 1;
          cells[i].rowspan = 0;
          break;
        }
        prevCols += prevCell.colspan;
        if (prevCols > numCols) {
          break;
        }
      }
    }

    numCols += cells[i].colspan;
  }

  // Force main cell rows to match header column count
  if (numCols > count) {
    cells.splice(count);
  } else {
    while (numCols < count) {
      cells.push({
        colspan: 1,
        text: '',
      });
      numCols += 1;
    }
  }
  return cells;
};

marked.use(markedExtendedTables(), markedHighlight({
    emptyLangClass: 'language-plaintext',
    langPrefix: 'language-',
    highlight(code, lang) {
        const language = prismjs.languages[lang] ? lang : 'plaintext';
        return prismjs.highlight(code, prismjs.languages[language], language);
    },
}), {
    gfm: true, // GitHub Flavored Markdown
    breaks: false, // Line breaks {false to allow correct rendering of katex}
    pedantic: false, // Pedantic mode
});
const mdEditor = document.querySelector('.md-editor');
const mdBody = document.querySelector('.md-body');
const mdRender = (md) => {
    if (mdBody) {
        // Render the markdown into the mdBody element
        mdBody.innerHTML = marked.parse(md);
        // Target every pre element and then, insert the copy button
        insertCopyElement();
    }
};
const insertCopyElement = () => {
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.setAttribute('data-clipboard-text', pre.textContent || '');
        button.addEventListener('click', () => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
        pre.appendChild(button);
    });
    // Initialize ClipboardJS
    new ClipboardJS('.copy-btn');
};
document.addEventListener('DOMContentLoaded', () => {
    if (mdEditor && mdBody) {
        // material design 3 - textarea auto resize
        // Insert content from the example into the textarea
        mdEditor.value = mdSample;
        mdRender(mdSample);
        // Watch the textarea for changes
        mdEditor.addEventListener('input', () => {
            mdRender(mdEditor.value || '');
        });
    }
});
