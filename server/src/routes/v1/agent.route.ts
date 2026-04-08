import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares";
import { catchAsyncError } from "../../utils/catchAsync";
import { runWorkflowTestAgent } from "../../agent/workflowTestAgent";

const router = Router();

router.post(
  "/query",
  authMiddleware.checkAuth,
  catchAsyncError(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { prompt, conversationId, maxSteps, includeTrace } = req.body || {};

    const result = await runWorkflowTestAgent({
      prompt,
      userId,
      conversationId,
      maxSteps,
      includeTrace,
    });

    return res.status(200).json({
      success: true,
      result,
    });
  })
);

export default router;
