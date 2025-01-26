/**
 * The default code preview template.
 */
export const DEFAULT_TEMPLATE = `
<div id="{spoilerId}" class="spoiler-container">
  <div class="spoiler-content" style="opacity: 0;">
    {markedCode}
  </div>
  <div class="spoiler-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; pointer-events: none;">
    {customTitle}
  </div>
  <!-- Particles effect container -->
  <div class="spoiler-particles"></div>
</div>
`;