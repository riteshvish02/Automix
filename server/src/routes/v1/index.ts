import { Router } from 'express';
import auth from './auth.route';
import tool from './tool.route';
const router = Router();

router.use('/auth', auth);
router.use('/tool', tool);

export default router;