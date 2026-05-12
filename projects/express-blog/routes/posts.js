const express = require('express');
const router = express.Router();

const posts = require('../data/posts');
const { requireAuth } = require('../middleware/auth');

// GET /posts - list
router.get('/', (req, res) => {
  const all = posts.getAll();
  res.json(all);
});

// GET /posts/:id
router.get('/:id', (req, res) => {
  const p = posts.get(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// POST /posts - create (protected)
router.post('/', requireAuth, (req, res) => {
  const body = req.body;
  if (!body || !body.title) return res.status(400).json({ error: 'Invalid' });
  const created = posts.create({ title: body.title, content: body.content || '' });
  res.status(201).json(created);
});

// PUT /posts/:id - update (protected)
router.put('/:id', requireAuth, (req, res) => {
  const updated = posts.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// DELETE /posts/:id - delete (protected)
router.delete('/:id', requireAuth, (req, res) => {
  const removed = posts.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Not found' });
  res.json(removed);
});

module.exports = router;
