import { Router } from 'express';
import auth from './auth.route';
import tool from './tool.route';
import agent from './agent.route';
const router = Router();



router.use('/auth', auth);
router.use('/tool', tool);
router.use('/agent', agent);


export default router;