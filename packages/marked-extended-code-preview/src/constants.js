/**
 * The default code preview template.
 */
export const DEFAULT_TEMPLATE = `
<details id="{previewId}" name="{title}" class="code-preview-card">
  <summary>
    <span class="preview-text">{title}</span>
  </summary>
  <p class="preview-content">
    {previewContent}
  </p>
  {extraData}
</details>
`;