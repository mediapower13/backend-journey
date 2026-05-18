const express = require('express');
const { createMemoryStore } = require('../../lib/memoryStore');
const { NotFoundError, ValidationError } = require('../../errors/AppError');

const router = express.Router();
const users = createMemoryStore([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
]);

router.get('/', (req, res) => {
  res.json(users.list());
});

router.get('/:id', (req, res, next) => {
  const user = users.get(req.params.id);
  if (!user) return next(new NotFoundError('User not found'));
  res.json(user);
});

router.post('/', (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) return next(new ValidationError('name and email are required'));
  const created = users.create({ name, email });
  res.status(201).json(created);
});

router.put('/:id', (req, res, next) => {
  const updated = users.update(req.params.id, req.body);
  if (!updated) return next(new NotFoundError('User not found'));
  res.json(updated);
});

router.delete('/:id', (req, res, next) => {
  const removed = users.remove(req.params.id);
  if (!removed) return next(new NotFoundError('User not found'));
  res.status(204).send();
});

module.exports = router;
