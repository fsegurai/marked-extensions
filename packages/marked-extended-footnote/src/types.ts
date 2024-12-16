import type { Token } from 'marked';

/**
 * Represents the options for the `markedFootnote` function.
 */
export interface Options {
  /**
   * The prefix ID for footnotes.
   *
   * @default 'fnref-'
   */
  prefixId?: string

  /**
   * The description of footnotes, used by `aria-labeledby` attribute.
   *
   * @default 'Footnotes'
   */
  description?: string

  /**
   * If set to `true`, it will place footnote reference in square brackets, like this:
   * `[1]`.
   *
   * @default false
   */
  refMarkers?: boolean
}

/**
 * Represents a collection of footnotes.
 */
export interface Footnotes {
  type: 'footnotes'
  raw: string
  rawItems: Footnote[]
  items: Footnote[]
}

/**
 * Represents a single footnote.
 */
export interface Footnote {
  type: 'footnote'
  raw: string
  label: string
  refs: FootnoteRef[]
  content: Token[]
}

/**
 * Represents a reference to a footnote.
 */
export interface FootnoteRef {
  type: 'footnoteRef'
  raw: string
  id: string
  label: string
}

export interface LexerTokens {
  hasFootnotes: boolean
  tokens: Token[]
}