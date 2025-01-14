export function renderCodePreview({
  prefixId,
  title,
  code,
  extraData,
  elementType = 'code', // Default to 'code', could be 'image', 'text', etc.
  template,
  codeLanguage,
}) {
  const previewId = `${prefixId}${Math.random().toString(36).substring(2, 9)}`;

  const previewLanguageCode = codeLanguage ? `language-${codeLanguage}` : 'language-plaintext';

  // Handle the different types of preview content
  let previewContent = '';

  if (elementType === 'code') {
    previewContent = `<pre><code class="${previewLanguageCode}">${code}</code></pre>`;
  } else if (elementType === 'image') {
    previewContent = `<img src="${code}" alt="${title}" class="preview-img expanded-img"/>`;
  } else if (elementType === 'text') {
    previewContent = `<p class="expanded-text">${code}</p>`;
  }

  // Ensure the extraData is handled properly (if provided)
  extraData = extraData ? `<div class="extra-data">${extraData}</div>` : '';

  // Return the template with all placeholders replaced
  return template
    .replace(/{previewId}/g, previewId)
    .replace(/{title}/g, title)
    .replace(/{previewContent}/g, previewContent)
    .replace(/{extraData}/g, extraData);
}
