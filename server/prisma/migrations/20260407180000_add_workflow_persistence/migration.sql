-- Create enums for workflow run and step lifecycle
CREATE TYPE "WorkflowRunStatus" AS ENUM ('planned', 'running', 'success', 'failed', 'cancelled');
CREATE TYPE "WorkflowStepType" AS ENUM ('plan', 'execute', 'validate', 'finalize');
CREATE TYPE "WorkflowStepStatus" AS ENUM ('planned', 'running', 'success', 'failed', 'skipped');

-- Workflow run root record
CREATE TABLE "WorkflowRun" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "conversationId" TEXT,
  "prompt" TEXT NOT NULL,
  "status" "WorkflowRunStatus" NOT NULL DEFAULT 'planned',
  "model" TEXT,
  "maxSteps" INTEGER,
  "startedAt" TIMESTAMP(3),
  "endedAt" TIMESTAMP(3),
  "finalAnswer" TEXT,
  "errorClass" TEXT,
  "errorMessage" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "WorkflowRun_pkey" PRIMARY KEY ("id")
);

-- Individual run step records
CREATE TABLE "WorkflowStep" (
  "id" TEXT NOT NULL,
  "runId" TEXT NOT NULL,
  "stepId" TEXT NOT NULL,
  "stepType" "WorkflowStepType" NOT NULL,
  "status" "WorkflowStepStatus" NOT NULL DEFAULT 'planned',
  "toolName" TEXT,
  "input" JSONB,
  "output" JSONB,
  "errorClass" TEXT,
  "errorMessage" TEXT,
  "retryCount" INTEGER NOT NULL DEFAULT 0,
  "startedAt" TIMESTAMP(3),
  "endedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "WorkflowStep_pkey" PRIMARY KEY ("id")
);

-- Append-only events
CREATE TABLE "WorkflowEvent" (
  "id" TEXT NOT NULL,
  "runId" TEXT NOT NULL,
  "workflowStepId" TEXT,
  "eventType" TEXT NOT NULL,
  "payload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "WorkflowEvent_pkey" PRIMARY KEY ("id")
);

-- Checkpoint snapshots used for future resume support
CREATE TABLE "WorkflowCheckpoint" (
  "id" TEXT NOT NULL,
  "runId" TEXT NOT NULL,
  "workflowStepId" TEXT,
  "sequence" INTEGER NOT NULL,
  "snapshot" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "WorkflowCheckpoint_pkey" PRIMARY KEY ("id")
);

-- Raw message log for later summary/context building
CREATE TABLE "RunMessage" (
  "id" TEXT NOT NULL,
  "runId" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "toolName" TEXT,
  "toolCallId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "RunMessage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WorkflowStep_runId_stepId_key" ON "WorkflowStep"("runId", "stepId");
CREATE UNIQUE INDEX "WorkflowCheckpoint_runId_sequence_key" ON "WorkflowCheckpoint"("runId", "sequence");

CREATE INDEX "WorkflowRun_userId_createdAt_idx" ON "WorkflowRun"("userId", "createdAt");
CREATE INDEX "WorkflowRun_conversationId_idx" ON "WorkflowRun"("conversationId");
CREATE INDEX "WorkflowRun_status_idx" ON "WorkflowRun"("status");
CREATE INDEX "WorkflowStep_runId_createdAt_idx" ON "WorkflowStep"("runId", "createdAt");
CREATE INDEX "WorkflowStep_status_idx" ON "WorkflowStep"("status");
CREATE INDEX "WorkflowEvent_runId_createdAt_idx" ON "WorkflowEvent"("runId", "createdAt");
CREATE INDEX "WorkflowEvent_workflowStepId_idx" ON "WorkflowEvent"("workflowStepId");
CREATE INDEX "WorkflowEvent_eventType_idx" ON "WorkflowEvent"("eventType");
CREATE INDEX "WorkflowCheckpoint_runId_createdAt_idx" ON "WorkflowCheckpoint"("runId", "createdAt");
CREATE INDEX "WorkflowCheckpoint_workflowStepId_idx" ON "WorkflowCheckpoint"("workflowStepId");
CREATE INDEX "RunMessage_runId_createdAt_idx" ON "RunMessage"("runId", "createdAt");
CREATE INDEX "RunMessage_role_idx" ON "RunMessage"("role");

ALTER TABLE "WorkflowRun"
  ADD CONSTRAINT "WorkflowRun_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WorkflowRun"
  ADD CONSTRAINT "WorkflowRun_conversationId_fkey"
  FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "WorkflowStep"
  ADD CONSTRAINT "WorkflowStep_runId_fkey"
  FOREIGN KEY ("runId") REFERENCES "WorkflowRun"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WorkflowEvent"
  ADD CONSTRAINT "WorkflowEvent_runId_fkey"
  FOREIGN KEY ("runId") REFERENCES "WorkflowRun"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WorkflowEvent"
  ADD CONSTRAINT "WorkflowEvent_workflowStepId_fkey"
  FOREIGN KEY ("workflowStepId") REFERENCES "WorkflowStep"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "WorkflowCheckpoint"
  ADD CONSTRAINT "WorkflowCheckpoint_runId_fkey"
  FOREIGN KEY ("runId") REFERENCES "WorkflowRun"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WorkflowCheckpoint"
  ADD CONSTRAINT "WorkflowCheckpoint_workflowStepId_fkey"
  FOREIGN KEY ("workflowStepId") REFERENCES "WorkflowStep"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "RunMessage"
  ADD CONSTRAINT "RunMessage_runId_fkey"
  FOREIGN KEY ("runId") REFERENCES "WorkflowRun"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
