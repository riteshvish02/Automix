import { Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsync";
import { ErrorHandler } from "../utils/ErrorHandler";
import { successResponse } from "../utils";
import conversationService from "../services/conversation.service";

const listConversations = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { limit = 10, offset = 0 } = req.query;

    const result = await conversationService.listConversations(
      userId,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    successResponse.data = result;
    return res.status(200).json(successResponse);
  }
);

const getConversation = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { conversationId } = req.params as { conversationId: string };

    const conversation = await conversationService.getConversation(
      conversationId,
      userId
    );

    if (!conversation) {
      throw new ErrorHandler("Conversation not found", 404);
    }

    successResponse.data = conversation;
    return res.status(200).json(successResponse);
  }
);

const getConversationContext = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { conversationId } = req.params as { conversationId: string };

    const isOwner = await conversationService.isConversationOwnedByUser(
      conversationId,
      userId
    );
    if (!isOwner) {
      throw new ErrorHandler("Conversation not found", 404);
    }

    const context = await conversationService.buildContextWindow(conversationId);

    if (!context) {
      throw new ErrorHandler("Conversation not found", 404);
    }

    successResponse.data = context;
    return res.status(200).json(successResponse);
  }
);

const getConversationSummary = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { conversationId } = req.params as { conversationId: string };

    const isOwner = await conversationService.isConversationOwnedByUser(
      conversationId,
      userId
    );
    if (!isOwner) {
      throw new ErrorHandler("Conversation not found", 404);
    }

    const conversation =
      await conversationService.getLatestSummary(conversationId);

    if (!conversation) {
      throw new ErrorHandler("Conversation not found", 404);
    }

    successResponse.data = {
      conversationId,
      summary: conversation.summary,
      messageCount: conversation.messageCount,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
    return res.status(200).json(successResponse);
  }
);

const getConversationMessages = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { conversationId } = req.params as { conversationId: string };
    const { role, limit = 50, offset = 0 } = req.query;

    const isOwner = await conversationService.isConversationOwnedByUser(
      conversationId,
      userId
    );
    if (!isOwner) {
      throw new ErrorHandler("Conversation not found", 404);
    }

    const messages = await conversationService.getConversationMessagesForApi(
      conversationId,
      role as string | undefined,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    successResponse.data = messages;
    return res.status(200).json(successResponse);
  }
);

export default {
  listConversations,
  getConversation,
  getConversationContext,
  getConversationSummary,
  getConversationMessages,
};
