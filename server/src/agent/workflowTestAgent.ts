import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { ErrorHandler } from "../utils/ErrorHandler";
import { LANGCHAIN_TOOLS } from "./adapters/langchainTools";
import { runWithAgentContext } from "./context/agentRunContext";
import conversationService from "../services/conversation.service";
import { prisma } from "../config/prisma";

type AgentRunInput = {
  prompt: string;
  userId: string;
  conversationId?: string;
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
  conversationId,
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

  // Create or use existing conversation
  let convoId: string = conversationId || "";
  if (!convoId) {
    const newConversation = await (prisma as any).conversation.create({
      data: {
        userId,
        title: prompt.substring(0, 100),
      },
    });
    convoId = newConversation.id;
  }

  // Save user message to conversation
  await conversationService.saveMessage({
    conversationId: convoId,
    role: "user",
    content: prompt,
  });

  const modelName = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10);

  const contextWindow = await conversationService.buildContextWindow(convoId, 10);
  const recentMessagesWithoutCurrentPrompt = contextWindow.recentMessages.filter(
    (m: any, index: number, arr: any[]) => {
      const isLast = index === arr.length - 1;
      return !(isLast && m.role === "user" && m.content === prompt);
    }
  );

  let contextualPrompt =
    `[Context] Current date is ${currentDate}. ` +
    "Interpret relative dates like today/tomorrow from this date unless user explicitly gives another date.";

  if (contextWindow.summary) {
    contextualPrompt += `\n\n[Conversation Summary]\n${contextWindow.summary}`;
    contextualPrompt += `\n[Summarized Message Count]\n${contextWindow.totalHistoricalMessages}`;
  }

  if (recentMessagesWithoutCurrentPrompt.length > 0) {
    const recentHistory = recentMessagesWithoutCurrentPrompt
      .map((m: any) => `[${String(m.role).toUpperCase()}] ${m.content}`)
      .join("\n");
    contextualPrompt += `\n\n[Recent Messages]\n${recentHistory}`;
  }

  contextualPrompt += `\n\n[User Request]\n${prompt}`;

  const agent = getOrCreateAgent(modelName);

  const result = await runWithAgentContext(
    {
      userId,
      originalPrompt: prompt,
      conversationId: convoId,
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

  // Save assistant response to conversation
  await conversationService.saveMessage({
    conversationId: convoId,
    role: "assistant",
    content: answer || "",
  });

  // Check if summary should be triggered (every 20 user+assistant messages)
  const allMessages = await conversationService.getConversationMessages(convoId);
  const shouldSummarize = allMessages.length > 0 && allMessages.length % 40 === 0;

  if (shouldSummarize) {
    // Simple summary: concatenate last 5 exchanges
    const recentForSummary = await conversationService.getRecentMessages(convoId, 10);
    const summaryText = recentForSummary
      .map((m: any) => `${m.role}: ${m.content.substring(0, 200)}`)
      .join("\n");

    await conversationService.saveSummary({
      conversationId: convoId,
      summary: summaryText,
      messageCount: allMessages.length,
    });
  }

  return {
    answer,
    result: includeTrace ? result : undefined,
    model: modelName,
    conversationId: convoId,
    messageCount: allMessages.length,
  };
};
