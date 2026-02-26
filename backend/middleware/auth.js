const jwt = require('jsonwebtoken');

// Middleware to verify JWT token on protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects: Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    req.user = verified; // Attach decoded payload (userId) to request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
