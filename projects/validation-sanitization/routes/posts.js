const express = require('express');
const { validateBlogPost } = require('../middleware/validators');
const { escapeHtml } = require('../sanitizers');
const { postStore } = require('../stores');

const router = express.Router();

router.post('/', validateBlogPost, (req, res) => {
  const { title, content, category, tags = [] } = req.body;

  const post = postStore.create({
    title: escapeHtml(title.trim()),
    content: escapeHtml(content.trim()),
    category,
    tags: tags.map(tag => escapeHtml(tag.trim())),
    published: false
  });

  res.status(201).json({ post });
});

router.get('/', (req, res) => {
  const posts = postStore.getAll();
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const post = postStore.getById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

router.patch('/:id', validateBlogPost, (req, res) => {
  const sanitized = {
    title: escapeHtml(req.body.title.trim()),
    content: escapeHtml(req.body.content.trim()),
    category: req.body.category,
    tags: req.body.tags.map(tag => escapeHtml(tag.trim()))
  };

  const updated = postStore.update(req.params.id, sanitized);
  if (!updated) return res.status(404).json({ error: 'Post not found' });
  res.json({ post: updated });
});

router.delete('/:id', (req, res) => {
  const removed = postStore.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Post not found' });
  res.status(204).send();
});

module.exports = router;
