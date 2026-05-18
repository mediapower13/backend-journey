const express = require('express');
const { createMemoryStore } = require('../../lib/memoryStore');
const { NotFoundError, ValidationError } = require('../../errors/AppError');

const router = express.Router();
const comments = createMemoryStore([
  { id: 1, postId: 1, body: 'Great post!', author: 'Guest' },
  { id: 2, postId: 1, body: 'Thanks for sharing.', author: 'Admin' }
]);

router.get('/', (req, res) => {
  const { postId } = req.query;
  const filtered = postId ? comments.list().filter(comment => String(comment.postId) === String(postId)) : comments.list();
  res.json({ version: 'v2', data: filtered });
});

router.get('/:id', (req, res, next) => {
  const comment = comments.get(req.params.id);
  if (!comment) return next(new NotFoundError('Comment not found'));
  res.json({ version: 'v2', data: comment });
});

router.post('/', (req, res, next) => {
  const { postId, body, author = 'Guest' } = req.body;
  if (!postId || !body) return next(new ValidationError('postId and body are required'));
  const created = comments.create({ postId, body, author });
  res.status(201).json({ version: 'v2', data: created });
});

router.put('/:id', (req, res, next) => {
  const updated = comments.update(req.params.id, req.body);
  if (!updated) return next(new NotFoundError('Comment not found'));
  res.json({ version: 'v2', data: updated });
});

router.delete('/:id', (req, res, next) => {
  const removed = comments.remove(req.params.id);
  if (!removed) return next(new NotFoundError('Comment not found'));
  res.status(204).send();
});

module.exports = router;
