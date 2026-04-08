import { Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsync";
import { ErrorHandler } from "../utils/ErrorHandler";
import { successResponse } from "../utils";
import messagesService from "../services/messages.service";

const getAllMessages = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId as string;
  const { limit = 50, offset = 0, role, toolName } = req.query;

  const result = await messagesService.getAllMessages(
    userId,
    parseInt(limit as string),
    parseInt(offset as string),
    role as string | undefined,
    toolName as string | undefined
  );

  successResponse.data = result;
  return res.status(200).json(successResponse);
});

const getSingleMessage = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { messageId } = req.params as { messageId: string };

    const message = await messagesService.getSingleMessage(messageId, userId);

    if (!message) {
      throw new ErrorHandler("Message not found or unauthorized", 404);
    }

    successResponse.data = message;
    return res.status(200).json(successResponse);
  }
);

const getMessagesByRole = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { role } = req.params as { role: string };
    const { limit = 50, offset = 0 } = req.query;

    const result = await messagesService.getMessagesByRole(
      userId,
      role,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    successResponse.data = result;
    return res.status(200).json(successResponse);
  }
);

const getMessagesByTool = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { toolName } = req.params as { toolName: string };
    const { limit = 50, offset = 0 } = req.query;

    const result = await messagesService.getMessagesByTool(
      userId,
      toolName,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    successResponse.data = result;
    return res.status(200).json(successResponse);
  }
);

const getMessageStats = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;

    const result = await messagesService.getMessageStats(userId);

    successResponse.data = result;
    return res.status(200).json(successResponse);
  }
);

const searchMessages = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId as string;
    const { query, limit = 20, offset = 0 } = req.body;

    const result = await messagesService.searchMessages(
      userId,
      query,
      parseInt(limit),
      parseInt(offset)
    );

    if (!result) {
      throw new ErrorHandler("Search query required", 400);
    }

    successResponse.data = result;
    return res.status(200).json(successResponse);
  }
);

export default {
  getAllMessages,
  getSingleMessage,
  getMessagesByRole,
  getMessagesByTool,
  getMessageStats,
  searchMessages,
};
