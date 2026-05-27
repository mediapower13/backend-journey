const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Validation & Sanitization server listening on ${port}`);
});

module.exports = app;
