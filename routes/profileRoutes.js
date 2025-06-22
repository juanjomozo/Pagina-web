import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { user: req.user });
});

export default router;