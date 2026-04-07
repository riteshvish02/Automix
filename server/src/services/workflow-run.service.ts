import { prisma } from "../config/prisma";

export type WorkflowRunStatus = "planned" | "running" | "success" | "failed" | "cancelled";
export type WorkflowStepType = "plan" | "execute" | "validate" | "finalize";
export type WorkflowStepStatus = "planned" | "running" | "success" | "failed" | "skipped";

const workflowDb = prisma as any;

const getNextCheckpointSequence = async (runId: string) => {
  const latest = await workflowDb.workflowCheckpoint.findFirst({
    where: { runId },
    orderBy: { sequence: "desc" },
    select: { sequence: true },
  });

  return (latest?.sequence || 0) + 1;
};

const createCheckpoint = async ({
  runId,
  workflowStepId,
  snapshot,
}: {
  runId: string;
  workflowStepId?: string;
  snapshot: Record<string, any>;
}) => {
  const sequence = await getNextCheckpointSequence(runId);

  await workflowDb.workflowCheckpoint.create({
    data: {
      runId,
      workflowStepId,
      sequence,
      snapshot,
    },
  });
};

const createRun = async ({
  userId,
  conversationId,
  prompt,
  model,
  maxSteps,
  metadata,
}: {
  userId: string;
  conversationId?: string;
  prompt: string;
  model?: string;
  maxSteps?: number;
  metadata?: Record<string, any>;
}) => {
  const run = await workflowDb.workflowRun.create({
    data: {
      userId,
      conversationId,
      prompt,
      model,
      maxSteps,
      metadata,
      status: "planned",
    },
  });

  await createCheckpoint({
    runId: run.id,
    snapshot: {
      stage: "run_created",
      status: "planned",
    },
  });

  return run;
};

const updateRunStatus = async ({
  runId,
  status,
  finalAnswer,
  errorClass,
  errorMessage,
  metadata,
}: {
  runId: string;
  status: WorkflowRunStatus;
  finalAnswer?: string;
  errorClass?: string;
  errorMessage?: string;
  metadata?: Record<string, any>;
}) => {
  const now = new Date();
  const run = await workflowDb.workflowRun.update({
    where: { id: runId },
    data: {
      status,
      startedAt: status === "running" ? now : undefined,
      endedAt: ["success", "failed", "cancelled"].includes(status) ? now : undefined,
      finalAnswer,
      errorClass,
      errorMessage,
      metadata,
    },
  });

  await createCheckpoint({
    runId,
    snapshot: {
      stage: "run_status_update",
      status,
      endedAt: run.endedAt,
      errorClass,
    },
  });

  return run;
};

const createStep = async ({
  runId,
  stepId,
  stepType,
  toolName,
  input,
  retryCount = 0,
}: {
  runId: string;
  stepId: string;
  stepType: WorkflowStepType;
  toolName?: string;
  input?: Record<string, any>;
  retryCount?: number;
}) => {
  const step = await workflowDb.workflowStep.create({
    data: {
      runId,
      stepId,
      stepType,
      status: "running",
      startedAt: new Date(),
      toolName,
      input,
      retryCount,
    },
  });

  await createCheckpoint({
    runId,
    workflowStepId: step.id,
    snapshot: {
      stage: "step_started",
      stepId,
      stepType,
      toolName,
      retryCount,
    },
  });

  return step;
};

const completeStep = async ({
  stepDbId,
  runId,
  output,
}: {
  stepDbId: string;
  runId: string;
  output?: Record<string, any>;
}) => {
  const step = await workflowDb.workflowStep.update({
    where: { id: stepDbId },
    data: {
      status: "success",
      endedAt: new Date(),
      output,
    },
  });

  await createCheckpoint({
    runId,
    workflowStepId: step.id,
    snapshot: {
      stage: "step_completed",
      stepId: step.stepId,
      status: "success",
    },
  });

  return step;
};

const failStep = async ({
  stepDbId,
  runId,
  errorClass,
  errorMessage,
  output,
}: {
  stepDbId: string;
  runId: string;
  errorClass?: string;
  errorMessage?: string;
  output?: Record<string, any>;
}) => {
  const step = await workflowDb.workflowStep.update({
    where: { id: stepDbId },
    data: {
      status: "failed",
      endedAt: new Date(),
      errorClass,
      errorMessage,
      output,
    },
  });

  await createCheckpoint({
    runId,
    workflowStepId: step.id,
    snapshot: {
      stage: "step_failed",
      stepId: step.stepId,
      status: "failed",
      errorClass,
    },
  });

  return step;
};

const addEvent = async ({
  runId,
  workflowStepId,
  eventType,
  payload,
}: {
  runId: string;
  workflowStepId?: string;
  eventType: string;
  payload?: Record<string, any>;
}) => {
  return workflowDb.workflowEvent.create({
    data: {
      runId,
      workflowStepId,
      eventType,
      payload,
    },
  });
};

const addRunMessage = async ({
  runId,
  role,
  content,
  toolName,
  toolCallId,
  metadata,
}: {
  runId: string;
  role: string;
  content: string;
  toolName?: string;
  toolCallId?: string;
  metadata?: Record<string, any>;
}) => {
  return workflowDb.runMessage.create({
    data: {
      runId,
      role,
      content,
      toolName,
      toolCallId,
      metadata,
    },
  });
};

const listRunSteps = async (runId: string) => {
  return workflowDb.workflowStep.findMany({
    where: { runId },
    orderBy: { createdAt: "asc" },
    select: {
      stepId: true,
      stepType: true,
      status: true,
      toolName: true,
      retryCount: true,
    },
  });
};

export default {
  createRun,
  updateRunStatus,
  createStep,
  completeStep,
  failStep,
  addEvent,
  addRunMessage,
  listRunSteps,
};
