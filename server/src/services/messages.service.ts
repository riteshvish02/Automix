import { prisma } from "../config/prisma";

const db = prisma as any;

const getAllMessages = async (
  userId: string,
  limit: number = 50,
  offset: number = 0,
  role?: string,
  toolName?: string
) => {
  const where: any = {
    conversation: {
      userId,
    },
  };

  if (role) {
    where.role = role;
  }

  if (toolName) {
    where.toolName = toolName;
  }

  const messages = await db.message.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      conversation: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  const total = await db.message.count({ where });

  const formatted = messages.map((msg: any) => ({
    id: msg.id,
    role: msg.role,
    content: msg.content.substring(0, 500),
    contentLength: msg.content.length,
    toolName: msg.toolName || null,
    conversationId: msg.conversationId,
    conversationTitle: msg.conversation.title,
    createdAt: msg.createdAt,
  }));

  return {
    messages: formatted,
    total,
    limit,
    offset,
    totalPages: Math.ceil(total / limit),
  };
};

const getSingleMessage = async (messageId: string, userId: string) => {
  const message = await db.message.findUnique({
    where: { id: messageId },
    include: {
      conversation: {
        select: {
          id: true,
          title: true,
          userId: true,
        },
      },
    },
  });

  if (!message || (message.conversation as any).userId !== userId) {
    return null;
  }

  return {
    id: message.id,
    role: message.role,
    content: message.content,
    toolName: message.toolName,
    conversationId: message.conversationId,
    conversationTitle: (message.conversation as any).title,
    createdAt: message.createdAt,
    contentStats: {
      length: message.content.length,
      wordCount: message.content.split(/\s+/).length,
      isJson: (() => {
        try {
          JSON.parse(message.content);
          return true;
        } catch {
          return false;
        }
      })(),
    },
  };
};

const getMessagesByRole = async (
  userId: string,
  role: string,
  limit: number = 50,
  offset: number = 0
) => {
  const messages = await db.message.findMany({
    where: {
      role,
      conversation: {
        userId,
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      conversation: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  const total = await db.message.count({
    where: {
      role,
      conversation: {
        userId,
      },
    },
  });

  const formatted = messages.map((msg: any) => ({
    id: msg.id,
    role: msg.role,
    content: msg.content.substring(0, 500),
    contentLength: msg.content.length,
    toolName: msg.toolName || null,
    conversationId: msg.conversationId,
    conversationTitle: msg.conversation.title,
    createdAt: msg.createdAt,
  }));

  return {
    role,
    messages: formatted,
    total,
    limit,
    offset,
  };
};

const getMessagesByTool = async (
  userId: string,
  toolName: string,
  limit: number = 50,
  offset: number = 0
) => {
  const messages = await db.message.findMany({
    where: {
      toolName,
      conversation: {
        userId,
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      conversation: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  const total = await db.message.count({
    where: {
      toolName,
      conversation: {
        userId,
      },
    },
  });

  const formatted = messages.map((msg: any) => ({
    id: msg.id,
    role: msg.role,
    content: msg.content.substring(0, 500),
    contentLength: msg.content.length,
    toolName: msg.toolName,
    conversationId: msg.conversationId,
    conversationTitle: msg.conversation.title,
    createdAt: msg.createdAt,
  }));

  return {
    toolName,
    messages: formatted,
    total,
    limit,
    offset,
  };
};

const getMessageStats = async (userId: string) => {
  const [totalMessages, messagesByRole, messagesByTool] = await Promise.all([
    db.message.count({
      where: {
        conversation: {
          userId,
        },
      },
    }),
    db.message.groupBy({
      by: ["role"],
      where: {
        conversation: {
          userId,
        },
      },
      _count: {
        role: true,
      },
    }),
    db.message.groupBy({
      by: ["toolName"],
      where: {
        conversation: {
          userId,
        },
        toolName: {
          not: null,
        },
      },
      _count: {
        toolName: true,
      },
    }),
  ]);

  const roleBreakdown = messagesByRole.reduce((acc: any, item: any) => {
    acc[item.role] = item._count.role;
    return acc;
  }, {});

  const toolBreakdown = messagesByTool.reduce((acc: any, item: any) => {
    acc[item.toolName || "N/A"] = item._count.toolName;
    return acc;
  }, {});

  return {
    totalMessages,
    roleBreakdown,
    toolBreakdown,
  };
};

const searchMessages = async (
  userId: string,
  query: string,
  limit: number = 20,
  offset: number = 0
) => {
  if (!query || query.trim().length === 0) {
    return null;
  }

  const messages = await db.$queryRaw`
    SELECT m.*, c.title as "conversationTitle"
    FROM "Message" m
    JOIN "Conversation" c ON m."conversationId" = c.id
    WHERE c."userId" = ${userId}
    AND m.content ILIKE ${"%" + query + "%"}
    ORDER BY m."createdAt" DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const totalResult = await db.$queryRaw`
    SELECT COUNT(*) as count
    FROM "Message" m
    JOIN "Conversation" c ON m."conversationId" = c.id
    WHERE c."userId" = ${userId}
    AND m.content ILIKE ${"%" + query + "%"}
  `;

  const total = (totalResult[0] as any)?.count || 0;

  const formatted = (messages as any[]).map((msg: any) => ({
    id: msg.id,
    role: msg.role,
    content: msg.content.substring(0, 200),
    contentLength: msg.content.length,
    toolName: msg.toolName || null,
    conversationId: msg.conversationId,
    conversationTitle: msg.conversationTitle,
    createdAt: msg.createdAt,
  }));

  return {
    query,
    results: formatted,
    total,
    limit,
    offset,
  };
};

export default {
  getAllMessages,
  getSingleMessage,
  getMessagesByRole,
  getMessagesByTool,
  getMessageStats,
  searchMessages,
};
