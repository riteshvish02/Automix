import { prisma } from "../config/prisma";

const db = prisma as any;

export const saveMessage = async ({
  conversationId,
  role,
  content,
  toolName,
  toolCallId,
}: {
  conversationId: string;
  role: string;
  content: string;
  toolName?: string;
  toolCallId?: string;
}) => {
  return db.message.create({
    data: {
      conversationId,
      role,
      content,
      toolName,
      toolCallId,
    },
  });
};

export const getConversationMessagesForApi = async (
  conversationId: string,
  role?: string,
  limit: number = 50,
  offset: number = 0
) => {
  const where: any = { conversationId };
  if (role) {
    where.role = role;
  }

  const messages = await db.message.findMany({
    where,
    orderBy: { createdAt: "asc" },
    take: limit,
    skip: offset,
  });

  const total = await db.message.count({ where });

  return {
    messages,
    total,
    limit,
    offset,
  };
};

export const getConversationMessages = async (conversationId: string) => {
  return db.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
};

export const listConversations = async (
  userId: string,
  limit: number = 10,
  offset: number = 0
) => {
  const conversations = await db.conversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { content: true },
      },
      summaries: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  const total = await db.conversation.count({ where: { userId } });

  const formatted = conversations.map((conv: any) => ({
    id: conv.id,
    title: conv.title || "Untitled",
    messageCount: conv.messages.length,
    firstMessage: conv.messages[0]?.content || null,
    summary: conv.summaries[0]?.summary || conv.summary || null,
    createdAt: conv.createdAt,
    updatedAt: conv.updatedAt,
  }));

  return {
    conversations: formatted,
    total,
    limit,
    offset,
  };
};

export const getConversation = async (conversationId: string, userId: string) => {
  const conversation = await db.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        select: {
          id: true,
          role: true,
          content: true,
          toolName: true,
          createdAt: true,
        },
      },
      summaries: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!conversation || (conversation as any).userId !== userId) {
    return null;
  }

  const totalMessages = await db.message.count({ where: { conversationId } });

  return {
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    latestSummary: (conversation as any).summaries[0] || null,
    messages: conversation.messages,
    totalMessages,
  };
};

export const isConversationOwnedByUser = async (
  conversationId: string,
  userId: string
) => {
  const conversation = await db.conversation.findUnique({
    where: { id: conversationId },
    select: { userId: true },
  });

  return Boolean(conversation && conversation.userId === userId);
};

export const getRecentMessages = async (
  conversationId: string,
  limit: number = 20
) => {
  const messages = await db.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return messages.reverse();
};

export const saveSummary = async ({
  conversationId,
  summary,
  messageCount,
}: {
  conversationId: string;
  summary: string;
  messageCount: number;
}) => {
  // Save summary to ConversationSummary table
  await db.conversationSummary.create({
    data: {
      conversationId,
      summary,
      messageCount,
    },
  });

  // Also update Conversation.summary field
  return db.conversation.update({
    where: { id: conversationId },
    data: { summary },
  });
};

export const getLatestSummary = async (conversationId: string) => {
  return db.conversationSummary.findFirst({
    where: { conversationId },
    orderBy: { createdAt: "desc" },
  });
};

export const buildContextWindow = async (
  conversationId: string,
  recentMessageLimit: number = 10
) => {
  const [recent, latestSummary] = await Promise.all([
    getRecentMessages(conversationId, recentMessageLimit),
    getLatestSummary(conversationId),
  ]);

  return {
    recentMessages: recent,
    summary: latestSummary?.summary || null,
    totalHistoricalMessages: latestSummary?.messageCount || 0,
  };
};

export default {
  saveMessage,
  getConversationMessages,
  getConversationMessagesForApi,
  getRecentMessages,
  saveSummary,
  getLatestSummary,
  buildContextWindow,
  listConversations,
  getConversation,
  isConversationOwnedByUser,
};
