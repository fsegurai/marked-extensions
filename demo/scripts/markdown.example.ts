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
    2. Item 2
2. Alphabetic
    a. Item 1
    b. Item 2
3. Roman
    i. Item 1
    ii. Item 2
    
## Task lists

- [x] Task 1
- [ ] Task 2
- [ ] Task 3
- [x] Task 4

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
