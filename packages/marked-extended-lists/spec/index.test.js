import { marked } from 'marked'
import markedMoreLists from '../src/index.js'

function cleanHtml(html) {
  return html
    .replace(/([^\n\s])</g, '$1\n<')
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim()
}

describe('marked-more-lists', () => {
  const exampleMarkdown = `
look at the following list:
  
1. item 1
2. item 2
    a. item 2a
        I. sub item I
        II. sub item II
    e. item 2e
        i) sub item i
        iv) sub item iv
7. item 7
    B) item B
    D) item D
8. item 8
    - foo
    - bar
`

  const expectedResult = `
<p>look at the following list:</p>
<ol>
  <li>item 1</li>
  <li>item 2
    <ol type="a">
      <li>item 2a
        <ol type="I">
          <li>sub item I</li>
          <li>sub item II</li>
        </ol>
      </li>
      <li value="5">item 2e
        <ol type="i">
          <li>sub item i</li>
          <li value="4">sub item iv</li>
        </ol>
      </li>
    </ol>
  </li>
  <li value="7">item 7
      <ol type="A">
        <li value="2">item B</li>
        <li value="4">item D</li>
      </ol>
  </li>
  <li>item 8
      <ul>
        <li>foo</li>
        <li>bar</li>
      </ul>
  </li>
</ol>`

  beforeEach(() => {
    marked.setOptions(marked.getDefaults())
  })

  test('with extension', () => {
    marked.use(markedMoreLists())

    const result = marked(exampleMarkdown)
    expect(cleanHtml(result)).toBe(cleanHtml(expectedResult))
  })

  test('without this extension', () => {
    const result = marked(exampleMarkdown)
    expect(cleanHtml(result)).not.toBe(cleanHtml(expectedResult))
  })
})
