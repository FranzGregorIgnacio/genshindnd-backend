import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Username already exists' });

    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User created', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password)
      return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
