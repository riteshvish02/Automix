import { Router } from 'express';
import {toolController} from '../../controllers';
import  {authMiddleware } from '../../middlewares';
import { runToolManually } from '../check';
const  router = Router();

router.get('/drive/oauth', authMiddleware.checkAuth, toolController.getGoogleDriveAuthUrl);
router.get('/drive/oauth/callback', authMiddleware.checkAuth, toolController.googleDriveOAuthCallback);

router.get('/gmail/oauth', authMiddleware.checkAuth, toolController.getGoogleGmailAuthUrl);
router.get('/gmail/oauth/callback', authMiddleware.checkAuth, toolController.googleGmailOAuthCallback);

router.get('/calendar/oauth', authMiddleware.checkAuth, toolController.getGoogleCalendarAuthUrl);
router.get('/calendar/oauth/callback', authMiddleware.checkAuth, toolController.googleCalendarOAuthCallback);

router.get('/docs/oauth', authMiddleware.checkAuth, toolController.getGoogleDocsAuthUrl);
router.get('/docs/oauth/callback', authMiddleware.checkAuth, toolController.googleDocsOAuthCallback);

router.get('/sheets/oauth', authMiddleware.checkAuth, toolController.getGoogleSheetsAuthUrl);
router.get('/sheets/oauth/callback', authMiddleware.checkAuth, toolController.googleSheetsOAuthCallback);

router.post("/run", authMiddleware.checkAuth, runToolManually);

export default router;
