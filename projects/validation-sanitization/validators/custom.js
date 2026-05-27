function createUniqueEmailValidator(store) {
  return function isUniqueEmail(value) {
    const existing = store.findByEmail(value);
    return !existing;
  };
}

function isAdult(value, minAge = 18) {
  const age = Number(value);
  return age >= minAge;
}

function isValidCategory(value, allowedCategories) {
  return allowedCategories.includes(value);
}

function isValidTags(value) {
  if (!Array.isArray(value)) return false;
  return value.length > 0 && value.length <= 10 && value.every(tag => typeof tag === 'string' && tag.length > 0 && tag.length <= 50);
}

function isContentLength(value, minLength = 10, maxLength = 5000) {
  const len = String(value).length;
  return len >= minLength && len <= maxLength;
}

function isTitleLength(value, minLength = 3, maxLength = 200) {
  const len = String(value).length;
  return len >= minLength && len <= maxLength;
}

module.exports = {
  createUniqueEmailValidator,
  isAdult,
  isValidCategory,
  isValidTags,
  isContentLength,
  isTitleLength
};
