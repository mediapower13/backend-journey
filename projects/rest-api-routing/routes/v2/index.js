const express = require('express');

const usersRouter = require('./users');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');

const apiV2Router = express.Router();

apiV2Router.get('/', (req, res) => {
  res.json({ version: 'v2', resources: ['/users', '/posts', '/comments'], note: 'Expanded response shapes and metadata' });
});

apiV2Router.use('/users', usersRouter);
apiV2Router.use('/posts', postsRouter);
apiV2Router.use('/comments', commentsRouter);

module.exports = { apiV2Router };
