const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');  // Install 'jsonwebtoken' if not already installed
const User = require('../models/user');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

  const expiresIn = '1h';
  return jwt.sign({ user }, secretKey, { expiresIn });
};

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

