const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Secret key for signing the token (In interview: "This is a secret only the server knows")
const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key_123';

// REGISTER route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, phone });
    
    res.status(201).json({ message: 'Registration successful! You can now login.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 2. Check password (using the method we created in the Model)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 3. Create a "Token" (Interview: "Like a digital entry pass")
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // 4. Send token in a Cookie (Interview: "So the browser remembers the user")
    res.cookie('token', token, {
      httpOnly: true, // Security: Script cannot access this cookie
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGOUT route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Check if user is logged in (for frontend)
router.get('/me', async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
