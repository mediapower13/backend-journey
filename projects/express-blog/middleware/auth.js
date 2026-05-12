function requireAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (!apiKey || apiKey !== 'secret') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

module.exports = { requireAuth };
