import { Router } from 'express';
import auth from './auth.route';
import tool from './tool.route';
import agent from './agent.route';
import observability from './observability.route';
import conversations from './conversations.route';
import metrics from './metrics.route';
import messages from './messages.route';
const router = Router();



router.use('/auth', auth);
router.use('/tool', tool);
router.use('/agent', agent);
router.use('/observability', observability);
router.use('/conversations', conversations);
router.use('/metrics', metrics);
router.use('/messages', messages);


export default router;