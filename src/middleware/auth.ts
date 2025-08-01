import User from '../models/User';
import { Request, Response, NextFunction } from 'express';

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.headers['x-admin-username'];
  if (!username) return res.status(401).json({ error: 'Missing admin username' });

  const user = await User.findOne({ username });
  if (!user || !user.isAdmin) return res.status(403).json({ error: 'Admin access required' });

  next();
};
