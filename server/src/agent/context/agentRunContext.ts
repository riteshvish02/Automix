import { AsyncLocalStorage } from "async_hooks";
import { ErrorHandler } from "../../utils/ErrorHandler";

type AgentRunContextValue = {
  userId: string;
  originalPrompt: string;
  runId: string;
  stepCounter: number;
};

const agentRunContextStorage = new AsyncLocalStorage<AgentRunContextValue>();

export const runWithAgentContext = async <T>(
  context: AgentRunContextValue,
  work: () => Promise<T>
) => {
  return agentRunContextStorage.run(context, work);
};

export const getAgentContext = () => {
  const context = agentRunContextStorage.getStore();
  if (!context) {
    throw new ErrorHandler("Agent context not available", 500);
  }
  return context;
};

export const nextAgentStepId = () => {
  const context = getAgentContext();
  context.stepCounter += 1;
  return `step-${String(context.stepCounter).padStart(3, "0")}`;
};
