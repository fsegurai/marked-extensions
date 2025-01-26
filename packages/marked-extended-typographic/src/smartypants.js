import { customReplacements } from './custom-replacements.js';

const tags_to_skip = /<(\/?)(?:pre|code|kbd|script|math)[^>]*>/i;

/**
 * Validate the type of the attribute and normalize it to a string
 * @param attr {string|number} Attribute
 * @return {string|*} Normalized attribute
 */
const attrType = attr => {
  return typeof attr === 'number' ? attr.toString() : String(attr).replace(/\s/g, '');
};

const SmartyPants = (text = '', attr = '1') => {
  // Normalize the attr input
  attr = attrType(attr);

  // Initialize flags
  const options = {
    quotes: 0,
    backticks: 0,
    dashes: 0,
    ellipses: 0,
    stupefy: 0,
    convert_quot: 0,
  };

  // Parse the attribute settings
  const parseAttr = attr => {
    const configMap = {
      0: () => {
        /* Do nothing */
      },
      1: () => {
        options.quotes = 1;
        options.backticks = 1;
        options.dashes = 1;
        options.ellipses = 1;
      },
      2: () => {
        options.quotes = 1;
        options.backticks = 1;
        options.dashes = 2;
        options.ellipses = 1;
      },
      3: () => {
        options.quotes = 1;
        options.backticks = 1;
        options.dashes = 3;
        options.ellipses = 1;
      },
      '-1': () => {
        options.stupefy = 1;
      }, // Special "stupefy" mode
    };

    // If attr is one of the predefined values, execute the associated function
    if (configMap[attr]) {
      configMap[attr]();
    } else {
      // For custom attributes (q, b, d, etc.), set respective flags
      for (const c of attr) {
        switch (c) {
          case 'q':
            options.quotes = 1;
            break;
          case 'b':
            options.backticks = 1;
            break;
          case 'B':
            options.backticks = 2;
            break;
          case 'd':
            options.dashes = 1;
            break;
          case 'D':
            options.dashes = 2;
            break;
          case 'i':
            options.dashes = 3;
            break;
          case 'e':
            options.ellipses = 1;
            break;
          case 'w':
            options.convert_quot = 1;
            break;
        }
      }
    }
  };

  parseAttr(attr);

  const tokens = _tokenize(text);
  let result = '';
  let in_pre = false;
  let prev_token_last_char = '';

  // Process each token
  tokens.forEach(cur_token => {
    if (cur_token[0] === 'tag') {
      result += cur_token[1];
      const matched = tags_to_skip.exec(cur_token[1]);
      if (matched) in_pre = matched[1] !== '/';
    } else {
      let t = cur_token[1];
      const last_char = t.slice(-1); // Last char before processing

      if (!in_pre) {
        t = ProcessEscapes(t);

        if (options.convert_quot) {
          t = t.replace(/$quot;/g, '"');
        }

        // Apply custom replacements
        for (const [key, value] of Object.entries(customReplacements)) {
          t = t.replace(new RegExp(key, 'g'), value);
        }

        // Handle dashes
        if (options.dashes) {
          switch (options.dashes) {
            case 1:
              t = EducateDashes(t);
              break;
            case 2:
              t = EducateDashesOldSchool(t);
              break;
            case 3:
              t = EducateDashesOldSchoolInverted(t);
              break;
          }
        }

        // Handle ellipses
        if (options.ellipses) t = EducateEllipses(t);

        // Handle backticks
        if (options.backticks) {
          t = EducateBackticks(t);
          if (options.backticks === 2) t = EducateSingleBackticks(t);
        }

        // Handle quotes
        if (options.quotes) {
          t =
            t === '\''
              ? /\S/.test(prev_token_last_char)
                ? '&#8217;'
                : '&#8216;'
              : t === '"'
                ? /\S/.test(prev_token_last_char)
                  ? '&#8221;'
                  : '&#8220;'
                : EducateQuotes(t);
        }

        // Special "stupefy" mode
        if (options.stupefy) t = StupefyEntities(t);
      }

      prev_token_last_char = last_char;
      result += t;
    }
  });

  return result;
};

const SmartQuotes = (text = '', attr = '1') => {
  // Normalize the 'attr' value to string and remove spaces if any
  attr = attrType(attr);

  // If 'attr' is '0', do nothing and return the text immediately
  if (attr === '0') return text;

  // Special case: if text ends with a quote preceded by an HTML tag, add space for context
  let addExtraSpace = false;
  if (/>['"]$/.test(text)) {
    addExtraSpace = true;
    text = text + ' '; // Add space for quote education context
  }

  // Tokenize the text (assuming _tokenize is defined elsewhere)
  const tokens = _tokenize(text);
  let result = '';
  let inPreTag = false; // To track whether we're inside <pre>, <code>, etc.
  let prevTokenLastChar = ''; // To remember the last character of the previous token for context

  // Process each token
  for (const curToken of tokens) {
    if (curToken[0] === 'tag') {
      // If it's an HTML tag, handle it
      result += curToken[1];

      // Check if we're inside <pre>, <code>, or similar tags
      const matched = tags_to_skip.exec(curToken[1]);
      if (matched) inPreTag = matched[1] === '/'; // If it's a closing tag, set inPreTag to false
    } else {
      // Regular text token
      let tokenText = curToken[1];
      const lastChar = tokenText.charAt(tokenText.length - 1);

      if (!inPreTag) {
        // Process escapes in the text
        tokenText = ProcessEscapes(tokenText);

        // Special handling for single-character quotes
        tokenText =
          tokenText === '\''
            ? /\S/.test(prevTokenLastChar)
              ? '&#8217;'
              : '&#8216;'
            : tokenText === '"'
              ? /\S/.test(prevTokenLastChar)
                ? '&#8221;'
                : '&#8220;'
              : EducateQuotes(tokenText);
      }

      // Update the context for the next token
      prevTokenLastChar = lastChar;

      // Add the processed token text to the result
      result += tokenText;
    }
  }

  // If we added an extra space at the end, remove it
  if (addExtraSpace) result = result.replace(/ $/, '');

  return result;
};

const SmartDashes = (text = '', attr = '1') => {
  // Default to EducateDashes for dash education
  let dashSubRef = EducateDashes;

  // Normalize 'attr' to a string and remove spaces
  attr = attrType(attr);

  // Handle special attributes
  if (attr === '0') return text; // Do nothing
  if (attr === '2') dashSubRef = EducateDashesOldSchool; // Use old smart dash shortcuts: "--" for en, "---" for em
  if (attr === '3') dashSubRef = EducateDashesOldSchoolInverted; // Inverse of 2: "--" for em, "---" for en

  // Tokenize the input text
  const tokens = _tokenize(text);
  const result = []; // Use an array to collect the result

  // Track whether we are inside <pre> or <code> tags
  let insidePreTag = false;

  // Process each token
  for (const curToken of tokens) {
    if (curToken[0] === 'tag') {
      // Handle HTML tags
      result.push(curToken[1]);

      // Check if we're inside a <pre> or <code> tag
      const matched = tags_to_skip.exec(curToken[1]);
      if (matched) insidePreTag = matched[1] !== '/'; // If it's not a closing tag, we're inside
    } else {
      let tokenText = curToken[1];

      if (!insidePreTag) {
        tokenText = ProcessEscapes(tokenText); // Process escape sequences
        tokenText = dashSubRef(tokenText); // Apply dash education
      }

      // Add the processed token to the result
      result.push(tokenText);
    }
  }

  // Join the result array into a single string and return it
  return result.join('');
};

const SmartEllipses = (text = '', attr = '1') => {
  // Normalize 'attr' to a string and remove spaces
  attr = attrType(attr);

  // If 'attr' is '0', do nothing and return the text unchanged
  if (attr === '0') return text;

  // Tokenize the input text
  const tokens = _tokenize(text);
  const result = []; // Use an array to collect the result

  // Track whether we are inside <pre> or <code> tags
  let insidePreTag = false;

  // Process each token
  for (const curToken of tokens) {
    if (curToken[0] === 'tag') {
      // Handle HTML tags
      result.push(curToken[1]);

      // Check if we're inside a <pre> or <code> tag
      const matched = tags_to_skip.exec(curToken[1]);
      if (matched) insidePreTag = matched[1] !== '/'; // If it's not a closing tag, we're inside
    } else {
      let tokenText = curToken[1];

      if (!insidePreTag) {
        tokenText = ProcessEscapes(tokenText); // Process escape sequences
        tokenText = EducateEllipses(tokenText); // Apply ellipsis education
      }

      // Add the processed token to the result
      result.push(tokenText);
    }
  }

  // Join the result array into a single string and return it
  return result.join('');
};

/**
 * @param {string} str String
 * @return {string} The string, with "educated" curly quote HTML entities.
 *
 * Example input:  "Isn't this fun?"
 * Example output: &#8220;Isn&#8217;t this fun?&#8221;
 */
const EducateQuotes = str => {
  /**
   * Make our own "punctuation" character class, because the POSIX-style
   * [:PUNCT:] is only available in Perl 5.6 or later:
   *
   * JavaScript don't have punctuation class neither.
   */
  const punct_class = '[!"#\$\%\'()*+,-./:;<=>?\@\[\\\]\^_`{|}~]'; // eslint-disable-line no-useless-escape
  /**
   * Special case if the very first character is a quote
   * followed by punctuation at a non-word-break. Close the quotes by brute force:
   */
  str = str.replace(new RegExp(`^'(?=${punct_class}\\B)`), '&#8217;');
  str = str.replace(new RegExp(`^"(?=${punct_class}\\B)`), '&#8221;');
  /**
   * Special case for double sets of quotes, e.g.:
   *   <p>He said, "'Quoted' words in a larger quote."</p>
   */
  str = str.replace(/"'(?=\w)/, '&#8220;&#8216;');
  str = str.replace(/'"(?=\w)/, '&#8216;&#8220;');
  /**
   * Special case for decade abbreviations (the '80s):
   */
  str = str.replace(/'(?=\d\d)/, '&#8217;');
  const close_class = '[^\\ \\t\\r\\n\\[\\{\\(\\-]';
  const not_close_class = '[\\ \\t\\r\\n\\[\\{\\(\\-]';
  const dec_dashes = '&#8211;|&#8212;';
  /**
   * Get most opening single quotes:
   * s {
   *     (
   *         \s          |   # a whitespace char, or
   *         &nbsp;      |   # a non-breaking space entity, or
   *         --          |   # dashes, or
   *         &[mn]dash;  |   # named dash entities
   *         $dec_dashes |   # or decimal entities
   *         &\#x201[34];    # or hex
   *     )
   *     '                   # the quote
   *     (?=\w)              # followed by a word character
   * } {$1&#8216;}xg;
   */
  str = str.replace(new RegExp(`(\\s|&nbsp;|--|&[mn]dash;|${dec_dashes}|&#x201[34])'(?=\\w)`, 'g'), '\$1&#8216;'); // eslint-disable-line no-useless-escape
  /**
   * Single closing quotes:
   * s {
   *     ($close_class)?
   *     '
   *     (?(1)|          # If $1 captured, then do nothing;
   *       (?=\s | s\b)  # otherwise, positive lookahead for a whitespace
   *     )               # char or an 's' at a word ending position. This
   *                     # is a special case to handle something like:
   *                     # "<i>Custer</i>'s Last Stand."
   * } {$1&#8217;}xgi;
   */
  str = str.replace(new RegExp(`(${close_class})'`, 'g'), '\$1&#8217;'); // eslint-disable-line no-useless-escape
  str = str.replace(new RegExp(`(${not_close_class}?)'(?=\\s|s\\b)`, 'g'), '\$1&#8217;'); // eslint-disable-line no-useless-escape
  /**
   * Any remaining single quotes should be opening ones:
   */
  str = str.replace(/'/g, '&#8216;');
  /**
   * Get most opening double quotes:
   * s {
   *     (
   *         \s          |   # a whitespace char, or
   *         &nbsp;      |   # a non-breaking space entity, or
   *         --          |   # dashes, or
   *         &[mn]dash;  |   # named dash entities
   *         $dec_dashes |   # or decimal entities
   *         &\#x201[34];    # or hex
   *     )
   *     "                   # the quote
   *     (?=\w)              # followed by a word character
   * } {$1&#8220;}xg;
   */
  str = str.replace(new RegExp(`(\\s|&nbsp;|--|&[mn]dash;|${dec_dashes}|&#x201[34])"(?=\\w)`, 'g'), '\$1&#8220;'); // eslint-disable-line no-useless-escape
  /**
   * Double closing quotes:
   * s {
   *     ($close_class)?
   *     "
   *     (?(1)|(?=\s))   # If $1 captured, then do nothing;
   *                        # if not, then make sure the next char is whitespace.
   * } {$1&#8221;}xg;
   */
  str = str.replace(new RegExp(`(${close_class})"`, 'g'), '\$1&#8221;'); // eslint-disable-line no-useless-escape
  str = str.replace(new RegExp(`(${not_close_class}?)"(?=\\s)`, 'g'), '\$1&#8221;'); // eslint-disable-line no-useless-escape
  /**
   * Any remaining quotes should be opening ones.
   */
  str = str.replace(/"/g, '&#8220;');
  return str;
};

/**
 * @param {string} str String
 * @return {string} The string, with ``backticks'' -style double quotes
 *                  translated into HTML curly quote entities.
 *
 * Example input:  ``Isn't this fun?''
 * Example output: &#8220;Isn't this fun?&#8221;
 */
const EducateBackticks = str => str.replace(/``/g, '&#8220;').replace(/''/g, '&#8221;');

/**
 * @param {string} str String
 * @return {string} The string, with `backticks' -style single quotes
 *                  translated into HTML curly quote entities.
 *
 * Example input:  `Isn't this fun?'
 * Example output: &#8216;Isn&#8217;t this fun?&#8217;
 */
const EducateSingleBackticks = str => str.replace(/`/g, '&#8216;').replace(/'/g, '&#8217;');

/**
 * @param {string} str String
 * @return {string} The string, with each instance of "--" translated to
 *                  an em-dash HTML entity.
 */
const EducateDashes = str => str.replace(/--/g, '&#8212;');

/**
 * @param {string} str String
 * @return {string} The string, with each instance of "--" translated to
 *                  an en-dash HTML entity, and each "---" translated to
 *                  an em-dash HTML entity.
 */
const EducateDashesOldSchool = str => str.replace(/---/g, '&#8212;').replace(/--/g, '&#8211;');

/**
 * @param {string} str String
 * @return {string} The string, with each instance of "--" translated to
 *                  an em-dash HTML entity, and each "---" translated to
 *                  an en-dash HTML entity. Two reasons why: First, unlike the
 *                  en- and em-dash syntax supported by
 *                  EducateDashesOldSchool(), it's compatible with existing
 *                  entries written before SmartyPants 1.1, back when "--" was
 *                  only used for em-dashes.  Second, em-dashes are more
 *                  common than en-dashes, and so it sort of makes sense that
 *                  the shortcut should be shorter to type. (Thanks to Aaron
 *                  Swartz for the idea.)
 */
const EducateDashesOldSchoolInverted = str => str.replace(/---/g, '&#8211;').replace(/--/g, '&#8212;');

/**
 * @param {string} str String
 * @return {string} The string, with each instance of "..." translated to
 *                  an ellipsis HTML entity. Also converts the case where
 *                  there are spaces between the dots.
 *
 * Example input:  Huh...?
 * Example output: Huh&#8230;?
 */
const EducateEllipses = str => str.replace(/\.\.\./g, '&#8230;').replace(/\. \. \./g, '&#8230;');

/**
 * @param {string} str String
 * @return {string} The string, with each SmartyPants HTML entity translated to
 *                  its ASCII counterpart.
 *
 * Example input:  &#8220;Hello &#8212; world.&#8221;
 * Example output: "Hello -- world."
 */
const StupefyEntities = str => {
  const entityMap = {
    '&#8211;': '-',
    '&#8212;': '--',
    '&#8216;': '\'',
    '&#8217;': '\'',
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '...',
  };

  return Object.keys(entityMap).reduce((acc, entity) => {
    return acc.replace(new RegExp(entity, 'g'), entityMap[entity]);
  }, str);
};

/**
 * @return {string} The string, with each SmartyPants HTML entity translated to
 *                  UTF-8 characters.
 *
 * Example input:  “Hello &#8217; world.”
 * Example output: "Hello — world."
 * @param text
 * @param attr
 */
const EducateEntities = (text, attr = '1') => {
  let do_quotes;
  let do_backticks;
  let do_dashes;
  let do_ellipses;
  // var do_stupefy:number;
  attr = attrType(attr);

  if (attr === '0') return text; // Do nothing

  if (attr === '1') {
    // Do everything, turn all options on.
    do_quotes = 1;
    do_backticks = 1;
    do_dashes = 1;
    do_ellipses = 1;
  }

  if (attr === '2') {
    // Do everything, turn all options on, use old school dash shorthand.
    do_quotes = 1;
    do_backticks = 1;
    do_dashes = 3;
    do_ellipses = 1;
  }

  if (attr === '3') {
    // Do everything, turn all options on, use inverted old school dash shorthand.
    do_quotes = 1;
    do_backticks = 1;
    do_dashes = 3;
    do_ellipses = 1;
    // } else if (attr === '-1') {
    //   // Special "stupefy" mode.
    //   do_stupefy = 1;
  } else {
    for (const c of attr) {
      if (c === 'q') {
        do_quotes = 1;
      }
      if (c === 'b') {
        do_backticks = 1;
      }
      if (c === 'B') {
        do_backticks = 2;
      }
      if (c === 'd') {
        do_dashes = 1;
      }
      if (c === 'D') {
        do_dashes = 2;
      }
      if (c === 'i') {
        do_dashes = 3;
      }
      if (c === 'e') {
        do_ellipses = 1;
      }
    }
  }

  if (do_dashes) {
    text = text.replace(/&#8211;/g, '\u2013'); // en-dash
    text = text.replace(/&#8212;/g, '\u2014'); // em-dash
  }

  if (do_quotes || do_backticks) {
    text = text.replace(/&#8216;/g, '\u2018'); // open single quote
    text = text.replace(/&#8217;/g, '\u2019'); // close single quote
    text = text.replace(/&#8220;/g, '\u201c'); // open double quote
    text = text.replace(/&#8221;/g, '\u201d'); // close double quote
  }

  if (do_ellipses) text = text.replace(/&#8230;/g, '\u2026'); // ellipsis

  return text;
};

/**
 * @param {string} str String
 * @return {string} The string, with each SmartyPants UTF-8 chars translated to
 *                  its ASCII counterpart.
 *
 * Example input:  &#8220;Hello &#8212; world.&#8221;
 * Example output: "Hello -- world."
 */
const StupifyUTF8Char = str => {
  str = str.replace(/\u2013/g, '-'); // en-dash
  str = str.replace(/\u2014/g, '--'); // em-dash
  str = str.replace(/\u2018/g, '\''); // open single quote
  str = str.replace(/\u2019/g, '\''); // close single quote
  str = str.replace(/\u201c/g, '"'); // open double quote
  str = str.replace(/\u201d/g, '"'); // close double quote
  str = str.replace(/\u2026/g, '...'); // ellipsis
  return str;
};

/**
 * @param {string} str String
 * @return {string} string, with after processing the following backslash
 *                  escape sequences. This is useful if you want to force a "dumb"
 *                  quote or other character to appear.
 *
 *                  Escape  Value
 *                  ------  -----
 *                  \\      &#92;
 *                  \"      &#34;
 *                  \'      &#39;
 *                  \.      &#46;
 *                  \-      &#45;
 *                  \`      &#96;
 *
 */
const ProcessEscapes = str => {
  str = str.replace(/\\\\/g, '&#92;');
  str = str.replace(/\\"/g, '&#34;');
  str = str.replace(/\\'/g, '&#39;');
  str = str.replace(/\\\./g, '&#46;');
  str = str.replace(/\\-/g, '&#45;');
  str = str.replace(/\\`/g, '&#96;');
  return str;
};

/**
 * @param {string} str String containing HTML markup.
 * @return {Array<token>} Reference to an array of the tokens comprising the input
 *                        string. Each token is either a tag (possibly with nested,
 *                        tags contained therein, such as <a href="<MTFoo>">, or a
 *                        run of text between tags. Each element of the array is a
 *                        two-element array; the first is either 'tag' or 'text';
 *                        the second is the actual value.
 *
 * Based on the _tokenize() subroutine from Brad Choate's MTRegex plugin.
 *     <http://www.bradchoate.com/past/mtregex.php>
 */
const _tokenize = str => {
  const tokens = [];
  const match = /<!--[\s\S]*?-->|<\?.*?\?>|<[^>]*>/g;
  let pos = 0;
  let matched;

  while ((matched = match.exec(str))) {
    if (pos < matched.index) tokens.push(['text', str.substring(pos, matched.index)]);

    tokens.push(['tag', matched[0]]);
    pos = match.lastIndex;
  }

  if (pos < str.length) tokens.push(['text', str.substring(pos)]);

  return tokens;
};

const smartypantsu = (text = '', attr = '1') => {
  const str = SmartyPants(text, attr);
  attr = attrType(attr);

  return attr === '-1' ? StupifyUTF8Char(str) : EducateEntities(str, attr);
};

export { SmartyPants as smartypants };
export { SmartQuotes as smartquotes };
export { SmartDashes as smartdashes };
export { SmartEllipses as smartellipses };
export { smartypantsu };
export default SmartyPants;
