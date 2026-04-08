import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { messagesController } from "../../controllers";

const router = Router();

router.get("/", authMiddleware.checkAuth, messagesController.getAllMessages);
router.get("/stats/overview", authMiddleware.checkAuth, messagesController.getMessageStats);
router.get("/:messageId", authMiddleware.checkAuth, messagesController.getSingleMessage);
router.get("/role/:role", authMiddleware.checkAuth, messagesController.getMessagesByRole);
router.get("/tool/:toolName", authMiddleware.checkAuth, messagesController.getMessagesByTool);
router.post("/search", authMiddleware.checkAuth, messagesController.searchMessages);

export default router;
