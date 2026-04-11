import { Router } from 'express';
import {toolController, whatsappController} from '../../controllers';
import  {authMiddleware } from '../../middlewares';
import { runToolManually } from '../check';
const  router = Router();

router.get('/drive/oauth', authMiddleware.checkAuth, toolController.getGoogleDriveAuthUrl);
router.get('/drive/oauth/callback', toolController.googleDriveOAuthCallback);

router.get('/gmail/oauth', authMiddleware.checkAuth, toolController.getGoogleGmailAuthUrl);
router.get('/gmail/oauth/callback', toolController.googleGmailOAuthCallback);

router.get('/calendar/oauth', authMiddleware.checkAuth, toolController.getGoogleCalendarAuthUrl);
router.get('/calendar/oauth/callback', toolController.googleCalendarOAuthCallback);

router.get('/docs/oauth', authMiddleware.checkAuth, toolController.getGoogleDocsAuthUrl);
router.get('/docs/oauth/callback', toolController.googleDocsOAuthCallback);

router.get('/sheets/oauth', authMiddleware.checkAuth, toolController.getGoogleSheetsAuthUrl);
router.get('/sheets/oauth/callback', toolController.googleSheetsOAuthCallback);

router.get('/slack/oauth', authMiddleware.checkAuth, toolController.getSlackAuthUrl);
router.get('/slack/oauth/callback', toolController.slackOAuthCallback);

router.get('/notion/oauth', authMiddleware.checkAuth, toolController.getNotionAuthUrl);
router.get('/notion/oauth/callback', toolController.notionOAuthCallback);

router.get('/oauth-tokens', authMiddleware.checkAuth, toolController.getOAuthConnections);

// WhatsApp routes
router.get('/whatsapp/connect', authMiddleware.checkAuth, whatsappController.initiateWhatsAppConnect);
router.get('/whatsapp/status', authMiddleware.checkAuth, whatsappController.getWhatsAppStatus);
router.post('/whatsapp/send', authMiddleware.checkAuth, whatsappController.sendWhatsAppMsg);
router.get('/whatsapp/chats', authMiddleware.checkAuth, whatsappController.getWhatsAppChats);
router.post('/whatsapp/disconnect', authMiddleware.checkAuth, whatsappController.disconnectWhatsApp);

router.post("/run", authMiddleware.checkAuth, runToolManually);

export default router;
