function isAdmin(req, res, next) {
  if (req.isAdmin) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
}

module.exports = { isAdmin };
