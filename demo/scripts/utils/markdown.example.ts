const mdSample = `# Markdown Extended Code Preview

\`\`\` ecp preview title="Code Sample 📄" extraData="This is a javascript sample" codeLanguage="javascript"
const foo = 'bar';

console.log(foo);
\`\`\`

\`\`\` ecp preview title="Image Sample" extraData="Image sample"  elementType="image"
https://imgs.search.brave.com/FEvHxi-_YFY__gKQNDl1QSKSpFvPu2-yvEn8evGo_F0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzUwLzEzLzQw/LzM2MF9GXzUwMTM0/MDY5X29FU1pkQXJB/WHUzdmtvaXhUZHRk/QWZ2Uk5qMGZ1Vm1a/LmpwZw
\`\`\`

\`\`\` ecp preview title="Text Sample" elementType="text"
Hello, World!
\`\`\`

---

# Markdown Extended Footnotes

This is an inline footnote reference[^1].

[^1]: This is the footnote.

This is a block footnote reference[^2].

[^2]:
    This is the block footnote.
    It can contain multiple lines.

---

# Markdown Extended Tables

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

---

# Markdown Extended Lists

## Ordered lists

1. Item 1
2. Item 2
    1. Item 2.1
    2. Item 2.2
        1. Item 2.2.1
        2. Item 2.2.2
    3. Item 2.3
3. Item 3

## Ordered lists with different types

1. Numeric
    1. Item 1
2. Alphabetic
    a. Item 1
3. Roman
    i. Item 1
    ii. Item 2

## Task lists

- [x] Task 1
- [ ] Task 2
- [x] Task 3

## Mixed lists

1. Item 1
    - Subitem 1
    - Subitem 2
2. Item 2
    - Subitem 1
    - Subitem 2
        1. Subsubitem 1
        2. Subsubitem 2
    - Subitem 3
        - [x] Task 4
3. Item 3
    a. item 3a
        I.  sub item I
        II. sub item II
    e. item 3e

---

# Markdown Extended Typography

He said, -- \\"A 'simple' sentence. . .\\" --- unknown

(omega) - (alpha) - (beta)

Copyright (C^) 2024. All rights reserved.

---
`;

export default mdSample;
