const { trimWhitespace } = require('../sanitizers');

function validateUserRegistration(req, res, next) {
  const { email, password, name, age } = req.body;
  const errors = {};

  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
    errors.password = 'Password must contain uppercase, number, and special character';
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (age !== undefined && age !== null) {
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
      errors.age = 'Age must be between 0 and 150';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  req.body = trimWhitespace(req.body);
  next();
}

function validateBlogPost(req, res, next) {
  const { title, content, category, tags } = req.body;
  const errors = {};
  const validCategories = ['tech', 'lifestyle', 'travel', 'food', 'other'];

  if (!title || typeof title !== 'string' || title.trim().length < 3 || title.trim().length > 200) {
    errors.title = 'Title must be between 3 and 200 characters';
  }

  if (!content || typeof content !== 'string' || content.trim().length < 10 || content.trim().length > 5000) {
    errors.content = 'Content must be between 10 and 5000 characters';
  }

  if (!category || !validCategories.includes(category)) {
    errors.category = `Category must be one of: ${validCategories.join(', ')}`;
  }

  if (tags) {
    if (!Array.isArray(tags)) {
      errors.tags = 'Tags must be an array';
    } else if (tags.length > 10) {
      errors.tags = 'Maximum 10 tags allowed';
    } else if (!tags.every(tag => typeof tag === 'string' && tag.length > 0)) {
      errors.tags = 'All tags must be non-empty strings';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  req.body = trimWhitespace(req.body);
  next();
}

module.exports = { validateUserRegistration, validateBlogPost };
