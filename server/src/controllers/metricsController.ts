import { Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsync";
import { successResponse } from "../utils";
import metricsService from "../services/metrics.service";

const getAllMetrics = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId as string;

  const metrics = await metricsService.getAllUserMetrics(userId);

  successResponse.data = {
    totalTools: metrics.length,
    tools: metrics.map((m: any) => ({
      toolName: m.toolName,
      successCount: m.successCount,
      failureCount: m.failureCount,
      successRate: metricsService.getSuccessRate(m.successCount, m.failureCount),
      avgDuration: Number(m.avgDuration).toFixed(2),
      totalDuration: Number(m.totalDuration).toFixed(2),
      lastErrorType: m.lastErrorType,
      lastErrorMsg: m.lastErrorMsg,
      lastUpdated: m.updatedAt,
    })),
  };

  return res.status(200).json(successResponse);
});

const getToolMetrics = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId as string;
  const { toolName } = req.params as { toolName: string };

  const metrics = await metricsService.getToolMetrics(userId, toolName);

  successResponse.data = {
    toolName,
    ...metrics,
    successRate: metricsService.getSuccessRate(
      (metrics as any).successCount,
      (metrics as any).failureCount
    ),
  };

  return res.status(200).json(successResponse);
});

const getDashboardOverview = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;

    const allMetrics = await metricsService.getAllUserMetrics(userId);
    const topTools = allMetrics
      .sort(
        (a: any, b: any) =>
          (b.successCount + b.failureCount) - (a.successCount + a.failureCount)
      )
      .slice(0, 5);

    successResponse.data = {
      summary: {
        totalToolExecutions: allMetrics.reduce(
          (sum: number, m: any) => sum + m.successCount + m.failureCount,
          0
        ),
        totalSuccesses: allMetrics.reduce(
          (sum: number, m: any) => sum + m.successCount,
          0
        ),
        totalFailures: allMetrics.reduce(
          (sum: number, m: any) => sum + m.failureCount,
          0
        ),
        overallSuccessRate: (
          (allMetrics.reduce((sum: number, m: any) => sum + m.successCount, 0) /
            (allMetrics.reduce(
              (sum: number, m: any) => sum + m.successCount + m.failureCount,
              0
            ) || 1)) *
          100
        ).toFixed(2),
        distinctTools: allMetrics.length,
      },
      topTools: topTools.map((m: any) => ({
        toolName: m.toolName,
        executions: m.successCount + m.failureCount,
        successRate: metricsService.getSuccessRate(
          m.successCount,
          m.failureCount
        ),
      })),
    };

    return res.status(200).json(successResponse);
  }
);

export default {
  getAllMetrics,
  getToolMetrics,
  getDashboardOverview,
};
