import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { metricsController } from "../../controllers";

const router = Router();

router.get("/", authMiddleware.checkAuth, metricsController.getAllMetrics);
router.get("/dashboard/overview", authMiddleware.checkAuth, metricsController.getDashboardOverview);
router.get("/:toolName", authMiddleware.checkAuth, metricsController.getToolMetrics);

export default router;
