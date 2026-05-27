const express = require('express');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'Validation & Sanitization System',
    endpoints: {
      users: '/users',
      posts: '/posts'
    }
  });
});

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
