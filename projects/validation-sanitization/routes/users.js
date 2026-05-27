const express = require('express');
const { validateUserRegistration } = require('../middleware/validators');
const { normalizeEmail } = require('../sanitizers');
const { userStore } = require('../stores');

const router = express.Router();

router.post('/register', validateUserRegistration, (req, res) => {
  const { name, email, password, age } = req.body;
  const normalizedEmail = normalizeEmail(email);

  const existing = userStore.findByEmail(normalizedEmail);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const user = userStore.create({
    name,
    email: normalizedEmail,
    password,
    age: age ? Number(age) : null
  });

  res.status(201).json({ user });
});

router.get('/', (req, res) => {
  const users = userStore.getAll();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = userStore.getById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
