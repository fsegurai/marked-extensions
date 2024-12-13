function letterToInt(letter) {
  return letter.toLowerCase().charCodeAt(0) - 96
}

function romanToInt(roman) {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }

  roman = roman.toUpperCase()
  let total = 0

  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]]
    const next = romanMap[roman[i + 1]]

    total += next && current < next ? -current : current
  }

  return total
}

const romanUpper = '(?:C|XC|L?X{0,3}(?:IX|IV|V?I{0,3}))'
const romanLower = '(?:c|xc|l?x{0,3}(?:ix|iv|v?i{0,3}))'
const bulletPattern = `(?:[*+-]|(?:\\d{1,9}|[a-zA-Z]|${romanUpper}|${romanLower})[.)]))`
const rule = `^( {0,3}${bulletPattern}([ \\t][^\\n]+?)?(?:\\n|$)`

export default function () {
  return {
    tokenizer: {
      list(src) {
        let cap = new RegExp(rule).exec(src)

        if (!cap) return null

        const bullet = cap[1].trim()
        const isOrdered = bullet !== '*' && bullet !== '-' && bullet !== '+'
        let bull
        let type = ''
        let expectedValue = 1

        // Detect list type (Roman, alphabetic, numeric)
        if (isOrdered) {
          if (bullet.match(new RegExp(`^${romanUpper}[.)]$`))) {
            type = 'I'
            bull = `${romanUpper}\\${bullet.slice(-1)}`
          } else if (bullet.match(new RegExp(`^${romanLower}[.)]$`))) {
            type = 'i'
            bull = `${romanLower}\\${bullet.slice(-1)}`
          } else if (bullet.match(/^[a-z][.)]$/)) {
            type = 'a'
            bull = `[a-z]\\${bullet.slice(-1)}`
          } else if (bullet.match(/^[A-Z][.)]$/)) {
            type = 'A'
            bull = `[A-Z]\\${bullet.slice(-1)}`
          } else {
            type = '1'
            bull = `\\d{1,9}\\${bullet.slice(-1)}`
          }
        } else {
          bull = this.options.pedantic ? bullet : '[*+-]'
        }

        const list = {
          type: 'list',
          raw: '',
          ordered: isOrdered,
          listType: type,
          loose: false,
          items: []
        }

        // Get next list item
        const itemRegex = new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`)
        let endsWithBlankLine = false
        // Check if current bullet point can start a new List Item
        while (src) {
          let raw = ''
          let itemContents = ''
          let endEarly = false

          if (!(cap = itemRegex.exec(src))) break

          raw = cap[0]
          const bullet = cap[1].trim()
          src = src.substring(raw.length)

          let line = cap[2].split('\n', 1)[0].replace(/^\t+/, t => ' '.repeat(3 * t.length))
          let nextLine = src.split('\n', 1)[0]
          let blankLine = !line.trim()

          let indent = 0
          if (this.options.pedantic) {
            indent = 2
            itemContents = line.trimStart()
          } else if (blankLine) {
            indent = cap[1].length + 1
          } else {
            indent = cap[2].search(/[^ ]/) // Find first non-space char
            indent = indent > 4 ? 1 : indent // Treat indented code blocks (> 4 spaces) as having only 1 indent
            itemContents = line.slice(indent)
            indent += cap[1].length
          }

          if (blankLine && /^[ \t]*$/.test(nextLine)) {
            // Items begin with at most one blank line
            raw += nextLine + '\n'
            src = src.substring(nextLine.length + 1)
            endEarly = true
          }

          if (!endEarly) {
            const nextBulletRegex = new RegExp(
              `^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|(?:\\d{1,9}|[a-zA-Z]|${romanUpper}|${romanLower})[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`
            )
            const hrRegex = new RegExp(
              `^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
            )
            const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`)
            const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`)
            const htmlBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}<[a-z].*>`, 'i')

            // Check if following lines should be included in List Item
            while (src) {
              const rawLine = src.split('\n', 1)[0]
              let nextLineWithoutTabs = rawLine.replace(/\t/g, '    ')

              if (
                fencesBeginRegex.test(nextLineWithoutTabs) ||
                headingBeginRegex.test(nextLineWithoutTabs) ||
                htmlBeginRegex.test(nextLineWithoutTabs) ||
                nextBulletRegex.test(nextLineWithoutTabs) ||
                hrRegex.test(nextLineWithoutTabs)
              )
                break

              if (nextLineWithoutTabs.search(/[^ ]/) >= indent || !nextLineWithoutTabs.trim()) {
                itemContents += '\n' + nextLineWithoutTabs.slice(indent)
              } else {
                itemContents += '\n' + nextLineWithoutTabs
              }

              raw += rawLine + '\n'
              src = src.substring(rawLine.length + 1)
            }
          }

          if (!list.loose) {
            // If the previous item ended with a blank line, the list is loose
            if (endsWithBlankLine) {
              list.loose = true
            } else if (/\n[ \t]*\n[ \t]*$/.test(raw)) {
              endsWithBlankLine = true
            }
          }

          let isTask = null
          let isChecked = false
          // Check for task list items
          if (this.options.gfm) {
            isTask = /^\[[ xX]] /.exec(itemContents)
            if (isTask) {
              isChecked = isTask[0] !== '[ ] '
              itemContents = itemContents.replace(/^\[[ xX]] +/, '')
            }
          }

          let value = null
          if (!isOrdered) {
            // Do nothing for unordered lists
          } else if (type === '1') {
            value = parseInt(bullet.slice(0, -1), 10)
          } else if (type === 'a' || type === 'A') {
            value = letterToInt(bullet.slice(0, -1))
          } else if (type === 'i' || type === 'I') {
            value = romanToInt(bullet.slice(0, -1))
          }

          list.items.push({
            type: 'list_item',
            raw,
            task: !!isTask,
            checked: isChecked,
            loose: false,
            text: itemContents,
            value,
            skipped: isOrdered && value !== expectedValue,
            tokens: []
          })

          expectedValue = value + 1
          list.raw += raw
        }

        // Trim trailing newline from last item
        list.items[list.items.length - 1].raw = list.items[list.items.length - 1].raw.trimEnd()
        list.items[list.items.length - 1].text = list.items[list.items.length - 1].text.trimEnd()
        list.raw = list.raw.trimEnd()

        // Handle child tokens
        for (let i = 0; i < list.items.length; i++) {
          this.lexer.state.top = false
          list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, [])
        }

        // Mark list as loose if needed
        if (list.loose) {
          for (let i = 0; i < list.items.length; i++) {
            list.items[i].loose = true
          }
        }

        return list
      }
    },
    renderer: {
      list(token) {
        const ordered = token.ordered
        const listType = token.listType
        let body = ''

        // Render list items
        for (let j = 0; j < token.items.length; j++) {
          body += this.listitem(token.items[j])
        }

        const type = ordered ? 'ol' : 'ul'
        const typeAttr = ordered && listType !== '1' ? ` type="${listType}"` : ''
        return `<${type}${typeAttr}>\n${body}</${type}>\n`
      },
      listitem(item) {
        let itemBody = ''
        if (item.task) {
          const checkbox = this.checkbox({ checked: !!item.checked })
          if (item.loose) {
            if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
              item.tokens[0].text = checkbox + ' ' + item.tokens[0].text
              if (
                item.tokens[0].tokens &&
                item.tokens[0].tokens.length > 0 &&
                item.tokens[0].tokens[0].type === 'text'
              ) {
                item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text
              }
            } else {
              item.tokens.unshift({
                type: 'text',
                raw: checkbox + ' ',
                text: checkbox + ' '
              })
            }
          } else {
            itemBody += checkbox + ' '
          }
        }

        itemBody += this.parser.parse(item.tokens, !!item.loose)

        const valueAttr = item.skipped ? ' value="' + item.value + '"' : ''

        return `<li${valueAttr}>${itemBody}</li>\n`
      }
    }
  }
}
