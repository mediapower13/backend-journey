const express = require('express');
const { createMemoryStore } = require('../../lib/memoryStore');
const { NotFoundError, ValidationError } = require('../../errors/AppError');

const router = express.Router();
const posts = createMemoryStore([
  { id: 1, title: 'Hello REST', content: 'First post', authorId: 1 },
  { id: 2, title: 'Advanced Routing', content: 'Router modules', authorId: 2 }
]);

router.get('/', (req, res) => {
  res.json(posts.list());
});

router.get('/:id', (req, res, next) => {
  const post = posts.get(req.params.id);
  if (!post) return next(new NotFoundError('Post not found'));
  res.json(post);
});

router.post('/', (req, res, next) => {
  const { title, content, authorId } = req.body;
  if (!title || !content) return next(new ValidationError('title and content are required'));
  const created = posts.create({ title, content, authorId: authorId || null });
  res.status(201).json(created);
});

router.patch('/:id', (req, res, next) => {
  const updated = posts.update(req.params.id, req.body);
  if (!updated) return next(new NotFoundError('Post not found'));
  res.json(updated);
});

router.delete('/:id', (req, res, next) => {
  const removed = posts.remove(req.params.id);
  if (!removed) return next(new NotFoundError('Post not found'));
  res.status(204).send();
});

module.exports = router;
