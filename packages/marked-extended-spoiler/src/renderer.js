'use strict';

import { createParticles } from './particles.js'; // Import the particles function
import { DEFAULT_TEMPLATE } from './constants.js';

/**
 * Render the spoiler content with hover effect.
 * @param prefixId - The prefix for the spoiler ID.
 * @param title - The title of the spoiler.
 * @param code - The raw content of the spoiler.
 * @param animationDuration - The duration of the animation.
 * @param template - The template for the spoiler.
 * @param markedInstance - The marked instance for rendering the content.
 * @returns {string} The HTML content of the spoiler.
 */
export function renderSpoiler({ prefixId, title, code, animationDuration, template }, markedInstance) {
  // Unique ID for the spoiler
  const spoilerId = `${prefixId}${Math.random().toString(36).substring(2, 9)}`;

  // Custom title for the spoiler (if provided)
  const customTitle = title ? `<span>${title}</span>` : '';

  // Render the Markdown content inside the spoiler
  const markedCode = markedInstance && code ? markedInstance.parse(code) : code;

  // Check if the template is provided
  if(template === null || template === undefined) {
    template = DEFAULT_TEMPLATE;
    // Call the particles.js function to create particles dynamically
    setTimeout(() => createParticles(spoilerId, animationDuration), 0); // Wait until the DOM is ready
  }

  // Return the template with all placeholders replaced
  return template
    .replace(/{spoilerId}/g, spoilerId)
    .replace(/{markedCode}/g, markedCode)
    .replace(/{customTitle}/g, customTitle);
}
