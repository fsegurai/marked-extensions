'use strict';

import { DEFAULT_TEMPLATE } from './constants.js';

/**
 * Render the preview content for a code block.
 * @param prefixId - The prefix for the preview ID.
 * @param title - The title of the preview.
 * @param code - The raw content of the preview.
 * @param subTitle - The extra data to include in the preview.
 * @param template - The template for the preview.
 * @param marked - The marked instance for rendering the content.
 * @returns {string} - The HTML content of the code preview.
 */
export function renderCodePreview(
  { prefixId, title = '', code = '', subTitle = '', template = DEFAULT_TEMPLATE },
  marked,
) {
  // Validate the input values
  if (typeof prefixId !== 'string' || !prefixId) {
    throw new Error('prefixId is required and must be a non-empty string');
  }

  if (typeof title !== 'string' || typeof subTitle !== 'string' || typeof code !== 'string') {
    throw new Error('title, subTitle, and code must be strings');
  }

  let customTitle = title || '',
    customSubTitle = subTitle || '',
    markedCode = marked && code ? marked(code) : code ?? '';

  // Unique ID for the preview element
  const previewId = `${prefixId}${Math.random().toString(36).substring(2, 9)}`;

  // Check if the template is provided
  if (template === DEFAULT_TEMPLATE) {
    // Custom title for the preview (if provided)
    customTitle = title ? `<summary><span class="preview-title">${title}</span></summary>` : '';

    // Custom subtitle for the preview (if provided)
    customSubTitle = subTitle ? `<span class="preview-subtitle">${subTitle}</span>` : '';

    // Render the Markdown content inside the preview
    markedCode = marked && code ? `<div class="preview-content">${marked(code)}</div>` : code;
  }

  // Return the template with all placeholders replaced
  return template
    .replace(/{previewId}/g, previewId)
    .replace(/{customTitle}/g, customTitle)
    .replace(/{markedCode}/g, markedCode)
    .replace(/{customSubTitle}/g, customSubTitle);
}
