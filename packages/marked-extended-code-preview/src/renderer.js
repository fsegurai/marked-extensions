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

  // return template
  //   .replace(/{previewId}/g, previewId)
  //   .replace(/{title}/g, title)
  //   .replace(/{icon}/g, elementType === 'image' ? '🖼️' : elementType === 'text' ? '📃' : '📄')
  //   .replace(/{previewContent}/g, elementType === 'code' ? `<pre><code>${code}</code></pre>` : elementType === 'image' ? `<img src="${code}" alt="${title}" class="preview-img expanded-img"/>` : elementType === 'text' ? `<p class="expanded-text">${code}</p>` : '')
  //   .replace(/{extraData}/g, extraData);

  const previewLanguageCode = codeLanguage ? `language-${codeLanguage}` : 'language-plaintext';

  // Handle the different types of preview content
  let previewContent = '';
  let icon = '📄'; // Default icon for code preview

  if (elementType === 'code') {
    previewContent = `<pre><code class="${previewLanguageCode}">${code}</code></pre>`;
    icon = '📄'; // Code block icon
  } else if (elementType === 'image') {
    previewContent = `<img src="${code}" alt="${title}" class="preview-img expanded-img"/>`;
    icon = '🖼️'; // Image block icon
  } else if (elementType === 'text') {
    previewContent = `<p class="expanded-text">${code}</p>`;
    icon = '📃'; // Text block icon
  }

  // Ensure the extraData is handled properly (if provided)
  extraData = extraData ? `<div class="extra-data">${extraData}</div>` : '';

  // Return the template with all placeholders replaced
  return template
    .replace(/{previewId}/g, previewId)
    .replace(/{title}/g, title)
    .replace(/{icon}/g, icon)
    .replace(/{previewContent}/g, previewContent)
    .replace(/{extraData}/g, extraData);
}
