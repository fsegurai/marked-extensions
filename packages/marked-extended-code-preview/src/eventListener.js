export const expandPanel = () => {
  const expandButtons = document.querySelectorAll('.expand-btn');

  expandButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the content panel (closest .code-preview-card is the parent of this button)
      const codePreviewCard = button.closest('.code-preview-card');
      if (!codePreviewCard) return; // Early return if no .code-preview-card found

      const panelContent = codePreviewCard.querySelector('.code-preview-content');
      if (!panelContent) return; // Early return if no .code-preview-content found

      const fullContent = panelContent.querySelector('.full-content');
      if (!fullContent) return; // Early return if no .full-content found

      // Check if the content is currently collapsed (initial state)
      const isCollapsed = fullContent.classList.contains('collapsed');

      // Toggle the collapsed state based on whether it's collapsed or expanded
      fullContent.classList.toggle('collapsed', !isCollapsed); // Collapse if expanded
      panelContent.classList.toggle('collapsed', !isCollapsed); // Collapse the content container

      // Toggle aria-expanded attribute for accessibility
      button.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false'); // Correctly toggle aria-expanded

      // Update the expand icon based on the expanded state
      const expandIcon = button.querySelector('.expand-icon');
      if (expandIcon) {
        expandIcon.textContent = !isCollapsed ? '▼' : '▲'; // Use ▲ for expanded and ▼ for collapsed
      }
    });
  });
};