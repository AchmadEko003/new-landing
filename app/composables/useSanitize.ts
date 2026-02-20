import DOMPurify from "dompurify"

export const useSanitize = () => {
  const sanitizeHtml = (html: string): string => {
    if (!html) return ''

    if (import.meta.client) {
      // Configure DOMPurify to allow table elements
      const config = {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'i', 'b', 'u', 'span', 'div',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li',
          'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
          'a', 'img'
        ],
        ALLOWED_ATTR: [
          'style', 'class', 'href', 'target', 'rel', 'width', 'height',
          'data-row', 'colspan', 'rowspan', 'src', 'alt', 'title'
        ],
        ALLOWED_STYLES: {
          '*': {
            'background-color': [/.*/],
            'color': [/.*/],
            'text-align': [/.*/],
            'font-weight': [/.*/],
            'font-style': [/.*/],
            'text-decoration': [/.*/]
          }
        }
      }
      return DOMPurify.sanitize(html, config)
    }

    return html
  }

  return {
    sanitizeHtml
  }
}
