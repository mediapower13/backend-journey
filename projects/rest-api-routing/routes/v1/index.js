const express = require('express');

const usersRouter = require('./users');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');

const apiV1Router = express.Router();

apiV1Router.get('/', (req, res) => {
  res.json({ version: 'v1', resources: ['/users', '/posts', '/comments'] });
});

apiV1Router.use('/users', usersRouter);
apiV1Router.use('/posts', postsRouter);
apiV1Router.use('/comments', commentsRouter);

module.exports = { apiV1Router };
