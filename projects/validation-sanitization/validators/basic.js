function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function isStrongPassword(value) {
  return value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value);
}

function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

function isPhoneNumber(value) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
}

function isAge(value) {
  const age = Number(value);
  return !isNaN(age) && age >= 0 && age <= 150;
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  isEmail,
  isStrongPassword,
  isRequired,
  isPhoneNumber,
  isAge,
  isValidUrl
};
