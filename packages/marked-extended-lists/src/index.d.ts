import type { MarkedExtension } from 'marked'

/**
 * Adds support for extended lists in marked.
 * This extension adds support for the following features:
 * - Ordered lists with different types (numeric, alphabetic, roman)
 * - Task lists with checkboxes
 */
export default function markedExtendedLists(): MarkedExtension

/**
 * Token representing an extended list.
 */
export interface ExtendedListToken {
  type: 'list'
  raw: string
  ordered: boolean
  listType: '1' | 'a' | 'A' | 'i' | 'I'
  loose: boolean
  items: ExtendedListItemToken[]
}

/**
 * Token representing an item in an extended list.
 */
export interface ExtendedListItemToken {
  type: 'list_item'
  raw: string
  task: boolean
  checked: boolean
  loose: boolean
  text: string
  value: number | null
  skipped: boolean
  tokens: unknown[] // Tokens inside the list item (e.g., paragraphs, inline elements, etc.)
}

/**
 * Helper function to convert a letter to its corresponding integer value (e.g., 'a' -> 1, 'z' -> 26)
 */
export function letterToInt(letter: string): number

/**
 * Helper function to convert a Roman numeral to its corresponding integer value (e.g., 'I' -> 1, 'X' -> 10)
 */
export function romanToInt(roman: string): number

/**
 * Options for configuring the extended lists' plugin.
 */
export interface ExtendedListOptions {
  pedantic?: boolean // Whether to treat list formatting strictly (defaults to false)
  gfm?: boolean // Whether to support GitHub-flavored Markdown (task lists, etc.)
}
