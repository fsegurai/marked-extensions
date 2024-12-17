/**
 * The default code preview template.
 */
export const DEFAULT_TEMPLATE = `
<div id="{previewId}" class="code-preview-card">
  <!-- Panel Header -->
  <div class="panel-header">
    <div class="preview-header-content">
      <span class="preview-text">{title}</span>
      <span class="preview-icon">{icon}</span>
    </div>
    <button class="expand-btn" aria-expanded="false" aria-controls="{previewId}-content">
      <span class="expand-icon">▼</span>
    </button>
  </div>
  
  <!-- Panel Body -->
  <div id="{previewId}-content" class="code-preview-content">
    <div class="full-content collapsed-content collapsed">
      <div class="code-full-content">
        {previewContent}
      </div>
      <div class="extra-data">{extraData}</div>
    </div>
  </div>
</div>
`;