const express = require('express');

const { apiV1Router } = require('./routes/v1');
const { apiV2Router } = require('./routes/v2');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ name: 'REST API Design & Advanced Routing', versions: ['/api/v1', '/api/v2'] });
});

app.use('/api/v1', apiV1Router);
app.use('/api/v2', apiV2Router);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
