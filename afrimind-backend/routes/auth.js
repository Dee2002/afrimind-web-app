const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

/* Register route */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, 'secret');
    res.status(201).json({ message: 'User registered', token });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

/* Login route */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token });
});

module.exports = router;
