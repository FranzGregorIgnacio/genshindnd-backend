import express from 'express';
import Character from '../models/Character';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

// GET all characters for current user
router.get('/', verifyToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const chars = await Character.find({ owner: req.user.id });
    res.json(chars);
  } catch {
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// POST create new character
router.post('/', verifyToken, async (req, res) => {
  const { name, vision, weapon, backstory } = req.body;
  if (!name || !vision) return res.status(400).json({ error: 'Name and vision required' });
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const newChar = await Character.create({ 
      name, vision, weapon, backstory, owner: req.user.id 
    });
    res.status(201).json(newChar);
  } catch {
    res.status(500).json({ error: 'Failed to create character' });
  }
});

// PUT update character
router.put('/:id', verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const updated = await Character.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const deleted = await Character.findOneAndDelete({ 
      _id: req.params.id, owner: req.user.id 
    });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Character deleted' });
  } catch {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
