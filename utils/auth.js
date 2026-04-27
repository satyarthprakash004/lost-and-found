const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key_123';

/**
 * Middleware to protect routes.
 * Interview Explanation: "This function acts as a security guard. 
 * It checks the 'token' cookie. If it's valid, it lets the request through."
 */
const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Please login to perform this action' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user and attach to the request object
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

const optionalProtect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (user) {
      req.user = user;
    }
    next();
  } catch (err) {
    next();
  }
};

module.exports = { protect, optionalProtect };
