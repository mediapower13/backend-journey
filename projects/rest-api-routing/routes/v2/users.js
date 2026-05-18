const express = require('express');
const { createMemoryStore } = require('../../lib/memoryStore');
const { NotFoundError, ValidationError } = require('../../errors/AppError');

const router = express.Router();
const users = createMemoryStore([
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'editor' }
]);

router.get('/', (req, res) => {
  res.json({ version: 'v2', count: users.list().length, data: users.list() });
});

router.get('/:id', (req, res, next) => {
  const user = users.get(req.params.id);
  if (!user) return next(new NotFoundError('User not found'));
  res.json({ version: 'v2', data: user, links: { self: `/api/v2/users/${user.id}` } });
});

router.post('/', (req, res, next) => {
  const { name, email, role = 'member' } = req.body;
  if (!name || !email) return next(new ValidationError('name and email are required'));
  const created = users.create({ name, email, role });
  res.status(201).json({ version: 'v2', data: created });
});

router.put('/:id', (req, res, next) => {
  const updated = users.update(req.params.id, req.body);
  if (!updated) return next(new NotFoundError('User not found'));
  res.json({ version: 'v2', data: updated });
});

router.delete('/:id', (req, res, next) => {
  const removed = users.remove(req.params.id);
  if (!removed) return next(new NotFoundError('User not found'));
  res.status(204).send();
});

module.exports = router;
