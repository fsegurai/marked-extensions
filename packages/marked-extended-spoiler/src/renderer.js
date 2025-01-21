'use strict';

import { createParticles } from './particles.js'; // Import the particles function

/**
 * Render the spoiler content with hover effect.
 * @param title - The title of the spoiler.
 * @param code - The raw content of the spoiler.
 * @param animationDuration - The duration of the animation.
 * @param marked - The marked instance for rendering the content.
 * @returns {string} The HTML content of the spoiler.
 */
export function renderSpoiler({ title, code, animationDuration }, marked) {
  // Unique ID for the spoiler
  const spoilerId = `spoiler-${Math.random().toString(36).substring(2, 9)}`;

  // Custom title for the spoiler (if provided)
  const customTitle = title ? `<span>${title}</span>` : '';

  const markedCode = marked ? marked(code) : code;

  // Wrap the spoiler content inside a div that hides the content by default
  const spoilerHtml = `
    <div id="${spoilerId}" class="spoiler-container">
      <div class="spoiler-content" style="opacity: 0;">
        ${markedCode}
      </div>
      <div class="spoiler-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; pointer-events: none;">
        ${customTitle}
      </div>

      <!-- Particles effect container -->
      <div class="spoiler-particles"></div>
    </div>
  `;

  // Call the particles.js function to create particles dynamically
  setTimeout(() => createParticles(spoilerId, animationDuration), 0); // Wait until the DOM is ready

  return spoilerHtml;
}
