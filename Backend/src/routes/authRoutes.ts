import { Router, Request, Response } from 'express';
import authController from '../controllers/authController';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/protected', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route', req: req });
});

export default router;