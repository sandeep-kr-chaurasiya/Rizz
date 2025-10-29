const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: token required', success: false });
  }

  // support 'Bearer <token>' and raw token
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: token required', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: invalid token', success: false });
  }
};

module.exports = isAuthenticated;
