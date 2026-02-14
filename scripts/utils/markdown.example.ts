const mdSample = `# Markdown Extended Accordion

::::accordion{title="Click to expand" expanded="true"}
This is the content inside the accordion.

- You can include **bold text**
- Or _italic text_
- Or even [links](https://example.com)
::::accordionend

::::accordion{title="Code Preview"}
  \`\`\` javascript
  const foo = 'bar';
  
  console.log(foo);
  \`\`\`
::::accordionend

::::accordion{title="Image Preview"}
![Test image](https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "test image")
::::accordionend

::::accordion{title="Another Section" level="2" class="important"}
This is another section with a different heading level and custom class.
::::accordionend

::::accordion{title="📦 Click to reveal nested content"}

This accordion demonstrates **nested extension rendering**!

> [!NOTE]
> 📝 This is a NOTE alert **inside** an accordion!
> 
> You can put **any markdown** here, including:
> - Lists with **bold** and *italic*
> - [Links](https://example.com)
> - Code: \`const x = 42;\`
> - Other extensions

> [!WARNING]
> ⚠️ This is a WARNING alert, also nested!
> \`\`\`js
> console.log("Hi");
> \`\`\`

Regular content after alerts with **formatting**.

::::accordionend

---

# Markdown Extended Alert

> [!IMPORTANT]
> This is an important alert.

> [!WARNING]
> This is a warning alert.

---

# Markdown Extended Comments

## Inline Comments

This text has :::comment{author="Alice" type="note"}a simple note::: embedded.

Here's a question: :::comment{type="question" author="Bob"}should we use the v2 API here?:::

This needs :::comment{type="issue" author="Charlie"}verification - data seems outdated::: checking.

A suggestion: :::comment{type="suggestion"}consider using async/await instead:::

## Block Comments

::::comment{author="Dana" type="review" status="open" priority="high"}
This paragraph needs **fact-checking**.

**Action items:**
- Verify statistics with Q4 2025 data
- Add source citations
- Review technical accuracy
::::commentend

::::comment{type="internal" visibility="dev-only"}
**Developer Note:**

TODO: Update this section after API v2 is released.

Implementation notes:
- Use the new \`/api/v2/data\` endpoint
- Add error handling for rate limits
::::commentend

::::comment{author="Editor" type="suggestion"}
Consider adding a visual diagram here to illustrate the concept.

Suggested tools:
- Mermaid.js for diagrams
- PlantUML for architecture
::::commentend

::::comment{type="todo" author="Project Manager" tags="urgent,milestone"}
**Sprint deliverables:**

- [ ] Complete feature documentation
- [ ] Add code examples
- [ ] Review with team
- [ ] Update changelog

*Deadline: End of sprint*
::::commentend

::::comment{author="Frank" type="question" status="resolved"}
~~Should we include the legacy API documentation?~~

**Resolution:** No, legacy API is deprecated and will be removed in v3.0
::::commentend

---

# Markdown Extended Footnotes

This is a paragraph with a footnote reference[^1].

Here's another paragraph with a footnote[^4].

This statement needs a citation[^source].

This needs further explanation[^explanation].

This has an important caveat[^note].

## Custom Footnotes Section

[footnotes]

## Additional Content

This content appears after the footnotes.

[^1]: This is the first footnote.
[^4]: This is the second footnote with **bold** text.
[^source]: Smith, J. (2023). Research findings.
[^explanation]: This refers to the process described in section 2.1.
[^note]: Only applies under specific conditions.

---

# Markdown Extended Embeds

## YouTube Videos

::::embed{title="Sample Video" aspectRatio="16:9"}
https://www.youtube.com/watch?v=FP808MiJUcM
::::embedend

::::embed{title="With Autoplay & Muted" autoplay="true" muted="true"}
https://www.youtube.com/watch?v=gVI1eVoxlbM
::::embedend

## Code Embeds

::::embed{title="CodePen Demo" theme="dark"}
https://codepen.io/akm2/pen/rHIsa
::::embedend

::::embed{title="CodeSandbox Project"}
https://codesandbox.io/s/react-new
::::embedend

## Music & Audio

::::embed{title="Spotify Playlist"}
https://open.spotify.com/playlist/20oEapsvrcByHkKm7ItgPK
::::embedend

## Design & Diagrams

::::embed{title="Figma Design" aspectRatio="16:9"}
https://www.figma.com/design/hpl7Cqz381vfKoFB71rAI8/koxopa1055-s-team-library?node-id=1-2&m=dev&t=5tAjp3TPMrekcdlD-1
::::embedend

::::embed{title="Excalidraw Sketch" aspectRatio="16:9"}
//https://excalidraw.com/#json=AQRBYxElNFGoS1X961AEX,SYtmM2MuluQpt37iZAU6wg
::::embedend

::::embed{provider="drawio" title="System Architecture - Draw.io" aspectRatio="4:3"}
https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&title=diagram
::::embedend

---

# Marked Extended Kanban

:::kanban{view="board"}

:::column{label="📋 To Do" color="#6c757d"}
- Implement user authentication
  OAuth2 integration needed
  #backend #security

- Design dashboard UI
  Follow Material Design guidelines
  #frontend #design

- Write API documentation
  Include code examples
  #documentation
:::columnend

:::column{label="🔄 In Progress" color="#0dcaf0"}
- Database migration script
  PostgreSQL to MongoDB
  #backend #database

- User profile page
  Add avatar upload functionality
  #frontend
:::columnend

:::column{label="✅ Done" color="#198754"}
- Setup CI/CD pipeline
  GitHub Actions configured
  #devops

- Code review process
  PR templates created
  #process
:::columnend

:::kanbanend

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

# Markdown Extended Tabs

::::tabs
:::tab{label="JS Code" icon="♻️"}
\`\`\`js
console.log("Hello from JS");
\`\`\`
:::tabend

:::tab{label="Python Code" icon="🐍"}
\`\`\`python
print("Hello from Python")
\`\`\`
:::tabend

:::tab{label="Image"}
![Test image](https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "test image")

You can also include a brief description or caption here.
:::tabend

:::tab{label="Text"}
Some text here.
:::tabend
::::tabsend

---

# Markdown Extended Timeline

::::timeline
:::event{date="2023-01-15"}
# Product Launch
Initial release of our software with the following features:
- User authentication
- Basic dashboard
- File uploads
:::eventend

:::event{date="2023-03-20"}
# Version 1.1
## Feature Updates
Added new capabilities and fixed several bugs:

\`\`\`js
// New API endpoint example
app.get('/api/v1.1/stats', (req, res) => {
  return res.json({ uptime: '99.9%', users: 1250 });
});
\`\`\`
:::eventend

:::event{date="2023-06-10" active="true"}
# Version 2.0
Major architecture overhaul with improved performance:

1. Migrated to microservices
2. Implemented Redis caching
3. Added real-time notifications
:::eventend

:::event{date="2023-12-01"}
# Year End Update
Planning for next year's roadmap
:::eventend
::::timelineend

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

---

# Markdown Extended Spoiler

## Text Spoiler

::::spoiler{title="Hover on text" theme="info"}
This is a hidden code block that will only appear on hover. Some text later it will be all over again and again, so be sure that it will work
::::spoilerend

## Image Spoiler

::::spoiler{title="Hover on image"}
![Test image](https://plus.unsplash.com/premium_photo-1669829646756-083a328c0abb?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "test image")
::::spoilerend

## Code Spoiler

::::spoiler{title="Hover on code"}
  \`\`\` javascript
  const foo = 'bar';
  
  console.log(foo);
  \`\`\`
::::spoilerend

---

# Markdown Extended Typography

He said, (--) \\"A 'simple' sentence. . .\\" (---) unknown

(Omega) - (alpha) - (beta) (--) (smile) (--) (check) (---) (pi)

Copyright (C^) 2026. All rights reserved.

---
`;

export default mdSample;
