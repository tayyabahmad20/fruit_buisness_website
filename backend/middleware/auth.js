const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET env variable is not set. Using a generated fallback for this run. Set JWT_SECRET in production!');
}
const JWT_SECRET = process.env.JWT_SECRET || require('crypto').randomBytes(64).toString('hex');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, JWT_SECRET };
