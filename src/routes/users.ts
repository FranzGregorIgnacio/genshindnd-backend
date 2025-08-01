import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { requireAdmin } from '../middleware/auth';

const router = express.Router();

// GET all users (admin only)
router.get('/', requireAdmin, async (_, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// GET one user (admin or self)
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create user (register)
router.post('/', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ error: 'Username or email already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, username, password: hashedPassword });
    res.status(201).json({ message: 'User created', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});


// PUT update user
router.put('/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
});

// DELETE user (admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
});

// PATCH promote to admin (admin only)
router.patch('/:id/promote', requireAdmin, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: `${user.username} is now an admin.` });
});

export default router;
