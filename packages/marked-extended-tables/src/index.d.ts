import type { MarkedExtension } from 'marked';

/**
 * Adds support for extended tables in marked.
 * This extension adds support for the following features:
 * - Spanning rows and columns
 * - Alignment of columns
 * - Custom table cell rendering
 * - Custom table header rendering
 * - Custom table row rendering
 */
export default function markedExtendedTables(): MarkedExtension;

/**
 * Extension options for the spanTable extension
 */
interface SpanTableOptions {
  // Define any specific options for your extension if needed
  // For example, you can add an option to enable/disable a feature
  // or to customize the output of the extension

  /**
   * Whether to render the table with thead and tbody tags
   */
  useTheadTbody?: boolean
  useTfoot?: boolean
}

/**
 * A row in the table, consisting of multiple cells
 */
export type TableRow = TableCell[]

/**
 * Adds support for spanTable in marked.
 *
 * @param options Options for the extension
 * @returns A {@link marked.MarkedExtension | MarkedExtension} to be passed
 *     to {@link marked.use | `marked.use()`}
 */
export function spanTable(options?: SpanTableOptions): MarkedExtension

/**
 * Token representing a spanTable
 */
export interface SpanTableToken {
  type: 'spanTable'
  header: TableRow[]
  align: (string | null)[]
  rows: TableRow[]
  raw: string
}

/**
 * A cell in the table
 */
export interface TableCell {
  rowspan: number
  colspan: number
  text: string
  tokens?: unknown[]
  rowSpanTarget?: TableCell
}

/**
 * Returns the HTML string for a table cell
 *
 * @param text The text content of the cell
 * @param cell The table cell object
 * @param type The type of the cell ('th' or 'td')
 * @param align The alignment of the cell (can be null)
 * @returns The HTML string for the cell
 */
export function getTableCell(
  text: string,
  cell: TableCell,
  type: 'th' | 'td',
  align: string | null
): string

/**
 * Splits a table row string into individual table cells
 *
 * @param tableRow The table row string
 * @param count The number of columns in the table
 * @param prevRow The previous row (for rowspan calculation)
 * @returns An array of table cells
 */
export function splitCells(
  tableRow: string,
  count: number,
  prevRow?: TableRow
): TableRow
