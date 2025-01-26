const mdSample = `# Markdown Extended Code Preview

\`\`\` preview title="Code Preview 📄" subTitle="This is a javascript sample"
  \`\`\` javascript
  const foo = 'bar';
  
  console.log(foo);
  \`\`\`
\`\`\`

\`\`\` preview title="Image Preview" subTitle="Image sample"
![Test image](https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "test image")
\`\`\`

\`\`\` preview title="Text Preview"
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

# Markdown Extended Spoiler

## Text Spoiler

\`\`\` spoiler title="Hover on text"
This is a hidden code block that will only appear on hover. Some text later it will be all over again and again, so be sure that it will work
\`\`\`

## Image Spoiler

\`\`\` spoiler title="Hover on image"
![Test image](https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "test image")
\`\`\`

## Code Spoiler

\`\`\` spoiler title="Hover on code"
  \`\`\` javascript
  const foo = 'bar';
  
  console.log(foo);
  \`\`\`
\`\`\`

---

# Markdown Extended Typography

He said, -- \\"A 'simple' sentence. . .\\" --- unknown

(omega) - (alpha) - (beta)

Copyright (C^) 2024. All rights reserved.

---
`;

export default mdSample;