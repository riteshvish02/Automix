import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares";
import { catchAsyncError } from "../../utils/catchAsync";
import metricsService from "../../services/metrics.service";
import conversationService from "../../services/conversation.service";

const router = Router();

// Get all tool metrics for current user
router.get(
  "/metrics",
  authMiddleware.checkAuth,
  catchAsyncError(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const metrics = await metricsService.getAllUserMetrics(userId);

    return res.status(200).json({
      success: true,
      data: {
        metrics,
        toolCount: metrics.length,
        totalExecutions: metrics.reduce(
          (sum: number, m: any) => sum + m.successCount + m.failureCount,
          0
        ),
        avgSuccessRate: metrics.length
          ? metrics.reduce((sum: number, m: any) => {
              const total = m.successCount + m.failureCount;
              return sum + (total === 0 ? 0 : (m.successCount / total) * 100);
            }, 0) / metrics.length
          : 0,
      },
    });
  })
);

// Get context window for a conversation (for future context building)
router.get(
  "/conversations/:conversationId/context",
  authMiddleware.checkAuth,
  catchAsyncError(async (req: Request, res: Response) => {
    const { conversationId } = req.params as { conversationId: string };
    const contextWindow = await conversationService.buildContextWindow(
      conversationId,
      10
    );

    return res.status(200).json({
      success: true,
      data: contextWindow,
    });
  })
);

export default router;
