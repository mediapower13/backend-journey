const express = require('express');
const path = require('path');

const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', uploadRoutes);

app.get('/', (req, res) => {
  res.json({
    name: 'File Upload & Static Assets',
    endpoints: [
      'POST /api/uploads/single',
      'POST /api/uploads/multiple',
      'POST /api/uploads/image/process',
      'POST /api/uploads/cloudinary',
      'GET /static/<filename>'
    ]
  });
});

module.exports = app;
