import { Router } from 'express';
import {toolController} from '../../controllers';
import  {authMiddleware } from '../../middlewares';
const  router = Router();

router.get('/drive/oauth',authMiddleware.checkAuth, toolController.getGoogleDriveAuthUrl);
router.get('/drive/oauth/callback',authMiddleware.checkAuth, toolController.googleDriveOAuthCallback);

export default router;
