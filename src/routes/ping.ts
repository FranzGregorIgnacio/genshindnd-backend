import { Router } from 'express';
const router = Router();

router.get('/', (_, res) => {
  res.status(200).json({ message: 'Backend is alive', timestamp: new Date() });
});

export default router;
