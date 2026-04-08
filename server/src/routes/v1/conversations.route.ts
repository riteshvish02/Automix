import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { conversationController } from "../../controllers";

const router = Router();

router.get("/", authMiddleware.checkAuth, conversationController.listConversations);
router.get("/:conversationId", authMiddleware.checkAuth, conversationController.getConversation);
router.get("/:conversationId/context", authMiddleware.checkAuth, conversationController.getConversationContext);
router.get("/:conversationId/summary", authMiddleware.checkAuth, conversationController.getConversationSummary);
router.get("/:conversationId/messages", authMiddleware.checkAuth, conversationController.getConversationMessages);

export default router;
