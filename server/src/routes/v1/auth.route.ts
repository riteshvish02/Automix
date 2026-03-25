import { Router } from 'express';
import {authController }from '../../controllers';
import  {authMiddleware } from '../../middlewares';
const   router = Router();

router.post('/create',authController.createUser);
router.post('/login', authController.loginUser);

router.get('/profile', authMiddleware.checkAuth, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

export default router;
