// middleware/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
