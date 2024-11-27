import { m as marked, a as markedHighlight, C as ClipboardJS, p as prismjs } from './prism-typescript-CeYlmQQ9.js';

marked.use(markedHighlight({
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
    // renderer: {
    //   link({ href, title, text }) {
    //     return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    //   },
    //   heading({ tokens, depth }) {
    //     const text = this.parser.parseInline(tokens);
    //     const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    //     return `
    //             <h${depth}>
    //               <a name="${escapedText}" class="anchor" href="#${escapedText}">
    //                 <span class="header-link"></span>
    //               </a>
    //               ${text}
    //             </h${depth}>`;
    //   },
    // },
});
document.addEventListener('DOMContentLoaded', () => {
    const elMD = document.querySelector('.markdown-body');
    const readmeURL = 'https://raw.githubusercontent.com/fsegurai/marked-extensions/refs/heads/main/README.md';
    if (elMD) {
        fetch(readmeURL)
            .then(response => response.text())
            .then(text => {
            elMD.innerHTML = marked.parse(text);
            // Target every pre element and then, insert the copy button
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
        })
            .catch(error => {
            elMD.innerHTML = `
          <p>Failed to load README.md</p>
          
          <p>${error}</p>
          `;
        });
    }
});
