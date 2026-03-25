import { Router } from 'express';
import {toolController} from '../../controllers';
import  {authMiddleware } from '../../middlewares';
const  router = Router();

router.get('/drive/oauth',authMiddleware.checkAuth, toolController.getGoogleDocsAuthUrl);
router.get('/drive/oauth/callback',authMiddleware.checkAuth, toolController.googleDocsOAuthCallback);

export default router;
