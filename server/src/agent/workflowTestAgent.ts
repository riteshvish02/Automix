import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { ErrorHandler } from "../utils/ErrorHandler";
import { LANGCHAIN_TOOLS } from "./adapters/langchainTools";
import { runWithAgentContext } from "./context/agentRunContext";
import workflowRunService from "../services/workflow-run.service";

type AgentRunInput = {
  prompt: string;
  userId: string;
  maxSteps?: number;
  includeTrace?: boolean;
};

const SYSTEM_PROMPT = `
You are a workflow automation agent.
Use available tools to collect facts and complete tasks.
Call multiple tools when needed.
Do not fabricate tool results.
If a tool returns an error twice in a row for the same task, stop retrying and ask the user for clarification or permission changes.
When you have enough information, provide the final answer and do not call more tools.
`;

const extractFinalText = (result: any) => {
  const messages = result?.messages;
  if (!Array.isArray(messages)) {
    return "";
  }

  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.content == null) {
      continue;
    }

    if (typeof message.content === "string") {
      return message.content;
    }

    if (Array.isArray(message.content)) {
      const text = message.content
        .map((part: any) => (typeof part?.text === "string" ? part.text : ""))
        .join("\n")
        .trim();
      if (text) {
        return text;
      }
    }
  }

  return "";
};

let cachedAgent:
  | ReturnType<typeof createAgent>
  | null = null;

const getOrCreateAgent = (modelName: string) => {
  if (cachedAgent) {
    return cachedAgent;
  }

  const model = new ChatOpenAI({
    model: modelName,
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });

  cachedAgent = createAgent({
    model,
    tools: LANGCHAIN_TOOLS,
    systemPrompt: SYSTEM_PROMPT,
  });

  return cachedAgent;
};

export const runWorkflowTestAgent = async ({
  prompt,
  userId,
  maxSteps = 12,
  includeTrace = false,
}: AgentRunInput) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new ErrorHandler("OPENAI_API_KEY is missing in environment", 500);
  }

  if (!prompt?.trim()) {
    throw new ErrorHandler("prompt is required", 400);
  }

  if (!userId) {
    throw new ErrorHandler("userId is required", 400);
  }

  const modelName = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10);
  const agent = getOrCreateAgent(modelName);
  const run = await workflowRunService.createRun({
    userId,
    prompt,
    model: modelName,
    maxSteps,
  });

  await workflowRunService.updateRunStatus({
    runId: run.id,
    status: "running",
  });

  await workflowRunService.addEvent({
    runId: run.id,
    eventType: "run_started",
    payload: { model: modelName, maxSteps },
  });

  await workflowRunService.addRunMessage({
    runId: run.id,
    role: "user",
    content: prompt,
  });

  const contextualPrompt = `[Context] Current date is ${currentDate}. Interpret relative dates like today/tomorrow from this date unless user explicitly gives another date.\n\nUser request: ${prompt}`;

  try {
    const result = await runWithAgentContext(
      {
        userId,
        originalPrompt: prompt,
        runId: run.id,
        stepCounter: 0,
      },
      async () => {
        return agent.invoke(
          {
            messages: [{ role: "user", content: contextualPrompt }],
          },
          {
            recursionLimit: maxSteps,
          }
        );
      }
    );

    const answer = extractFinalText(result);
    const finalizeStep = await workflowRunService.createStep({
      runId: run.id,
      stepId: "step-finalize",
      stepType: "finalize",
      input: { includeTrace },
    });

    await workflowRunService.addRunMessage({
      runId: run.id,
      role: "assistant",
      content: answer || "",
    });

    await workflowRunService.completeStep({
      stepDbId: finalizeStep.id,
      runId: run.id,
      output: { answerLength: answer.length },
    });

    await workflowRunService.updateRunStatus({
      runId: run.id,
      status: "success",
      finalAnswer: answer,
    });

    await workflowRunService.addEvent({
      runId: run.id,
      workflowStepId: finalizeStep.id,
      eventType: "run_completed",
      payload: { hasAnswer: Boolean(answer) },
    });

    const steps = await workflowRunService.listRunSteps(run.id);

    return {
      runId: run.id,
      status: "success",
      answer,
      result: includeTrace ? result : undefined,
      model: modelName,
      maxSteps,
      steps,
    };
  } catch (error: any) {
    await workflowRunService.updateRunStatus({
      runId: run.id,
      status: "failed",
      errorClass: error?.name || "AGENT_RUNTIME_ERROR",
      errorMessage: error?.message || "Agent execution failed",
    });

    await workflowRunService.addEvent({
      runId: run.id,
      eventType: "run_failed",
      payload: {
        errorClass: error?.name || "AGENT_RUNTIME_ERROR",
        errorMessage: error?.message || "Agent execution failed",
      },
    });

    throw error;
  }
};
