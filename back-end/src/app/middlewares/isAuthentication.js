const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../../constants');

async function isAuthentication(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ').length === 2
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.verify(token, JWT_SECRET);
    if (data) {
      req.email = data.email;
      req.userId = data.accountId;
      req.isAdmin = data.isAdmin;
      req.name = data.name;
    }
    return next();
  }
  res.status(401).json({ message: 'Authorization header is required' });
}

module.exports = { isAuthentication };
