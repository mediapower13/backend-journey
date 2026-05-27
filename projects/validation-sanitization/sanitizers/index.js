function sanitizeString(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '');
}

function escapeHtml(value) {
  if (typeof value !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return value.replace(/[&<>"']/g, char => map[char]);
}

function normalizeEmail(value) {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase();
}

function trimWhitespace(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        result[key] = value.trim();
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

function sanitizeObject(obj) {
  return trimWhitespace(obj);
}

module.exports = {
  sanitizeString,
  escapeHtml,
  normalizeEmail,
  trimWhitespace,
  sanitizeObject
};
