const express = require('express');
const { createMemoryStore } = require('../../lib/memoryStore');
const { NotFoundError, ValidationError } = require('../../errors/AppError');

const router = express.Router();
const comments = createMemoryStore([
  { id: 1, postId: 1, body: 'Great post!' },
  { id: 2, postId: 1, body: 'Thanks for sharing.' }
]);

router.get('/', (req, res) => {
  const { postId } = req.query;
  const results = postId ? comments.list().filter(comment => String(comment.postId) === String(postId)) : comments.list();
  res.json(results);
});

router.get('/:id', (req, res, next) => {
  const comment = comments.get(req.params.id);
  if (!comment) return next(new NotFoundError('Comment not found'));
  res.json(comment);
});

router.post('/', (req, res, next) => {
  const { postId, body } = req.body;
  if (!postId || !body) return next(new ValidationError('postId and body are required'));
  const created = comments.create({ postId, body });
  res.status(201).json(created);
});

router.put('/:id', (req, res, next) => {
  const updated = comments.update(req.params.id, req.body);
  if (!updated) return next(new NotFoundError('Comment not found'));
  res.json(updated);
});

router.delete('/:id', (req, res, next) => {
  const removed = comments.remove(req.params.id);
  if (!removed) return next(new NotFoundError('Comment not found'));
  res.status(204).send();
});

module.exports = router;
