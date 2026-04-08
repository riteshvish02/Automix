import { prisma } from "../config/prisma";

const db = prisma as any;

export const trackToolExecution = async ({
  userId,
  toolName,
  success,
  duration,
  errorType,
  errorMessage,
}: {
  userId: string;
  toolName: string;
  success: boolean;
  duration: number;
  errorType?: string;
  errorMessage?: string;
}) => {
  const key = { userId, toolName };

  const existing = await db.toolMetric.findUnique({
    where: { userId_toolName: key },
  });

  if (!existing) {
    return db.toolMetric.create({
      data: {
        userId,
        toolName,
        successCount: success ? 1 : 0,
        failureCount: success ? 0 : 1,
        totalDuration: duration,
        avgDuration: duration,
        lastErrorType: errorType,
        lastErrorMsg: errorMessage,
      },
    });
  }

  const newSuccessCount = existing.successCount + (success ? 1 : 0);
  const newFailureCount = existing.failureCount + (success ? 0 : 1);
  const newTotalDuration = existing.totalDuration + duration;
  const newAvgDuration =
    newTotalDuration / (newSuccessCount + newFailureCount);

  return db.toolMetric.update({
    where: { userId_toolName: key },
    data: {
      successCount: newSuccessCount,
      failureCount: newFailureCount,
      totalDuration: newTotalDuration,
      avgDuration: newAvgDuration,
      lastErrorType: errorType || existing.lastErrorType,
      lastErrorMsg: errorMessage || existing.lastErrorMsg,
      updatedAt: new Date(),
    },
  });
};

export const getToolMetrics = async (userId: string, toolName: string) => {
  return db.toolMetric.findUnique({
    where: { userId_toolName: { userId, toolName } },
  });
};

export const getAllUserMetrics = async (userId: string) => {
  return db.toolMetric.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
};

export const getSuccessRate = async (userId: string, toolName: string) => {
  const metric = await getToolMetrics(userId, toolName);
  if (!metric) return 0;
  const total = metric.successCount + metric.failureCount;
  return total === 0 ? 0 : (metric.successCount / total) * 100;
};

export default {
  trackToolExecution,
  getToolMetrics,
  getAllUserMetrics,
  getSuccessRate,
};
