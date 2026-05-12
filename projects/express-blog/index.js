const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { logger } = require('./middleware/logger');
const { timer } = require('./middleware/timer');
const { requireAuth } = require('./middleware/auth');
const { errorHandler } = require('./middleware/error');

const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Custom middleware
app.use(logger);
app.use(timer);

// Routes
app.use('/posts', postsRouter);

// Error handler (should be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express blog listening on ${PORT}`));

module.exports = app;
