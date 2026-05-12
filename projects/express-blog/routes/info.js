const express = require('express');
const router = express.Router();

router.get('/whoami', (req, res) => {
  res.json({ ip: req.ip, headers: req.headers, cookies: req.cookies });
});

module.exports = router;
