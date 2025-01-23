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
export function renderCodePreview({ prefixId, title, code, subTitle, template }, marked) {
  // Unique ID for the preview element
  const previewId = `${prefixId}${Math.random().toString(36).substring(2, 9)}`;

  // Custom title for the preview (if provided)
  const customTitle = title ? `<summary><span class="preview-title">${title}</span></summary>` : '';

  // Custom subtitle for the preview (if provided)
  const customSubTitle = subTitle ? `<span class="preview-subtitle">${subTitle}</span>` : '';

  // Render the Markdown content inside the preview
  const markedCode = marked && code ? `<div class="preview-content">${marked(code)}</div>` : code;

  // Check if the template is provided
  if (template === null || template === undefined) template = DEFAULT_TEMPLATE;

  // Return the template with all placeholders replaced
  return template
    .replace(/{previewId}/g, previewId)
    .replace(/{customTitle}/g, customTitle)
    .replace(/{markedCode}/g, markedCode)
    .replace(/{customSubTitle}/g, customSubTitle);
}
