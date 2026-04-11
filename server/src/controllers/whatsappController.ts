import { Request, Response } from 'express';
import { whatsappService } from '../services';
import { ErrorHandler } from '../utils/ErrorHandler';
import { catchAsyncError} from '../utils/catchAsync';

/**
 * Initialize WhatsApp connection - returns QR code
 * GET /v1/tool/whatsapp/connect
 */
export const initiateWhatsAppConnect = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  
  if (!userId) {
    throw new ErrorHandler('User not authenticated', 401);
  }

  const result = await whatsappService.initWhatsAppConnection(userId);
  
  res.json({
    data: result,
    message: 'WhatsApp connection initiated',
  });
});

/**
 * Get WhatsApp connection status
 * GET /v1/tool/whatsapp/status
 */
export const getWhatsAppStatus = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  
  if (!userId) {
    throw new ErrorHandler('User not authenticated', 401);
  }

  const status = await whatsappService.getWhatsAppStatus(userId);
  
  res.json({
    data: status,
    message: 'WhatsApp status retrieved',
  });
});

/**
 * Send a message via WhatsApp
 * POST /v1/tool/whatsapp/send
 */
export const sendWhatsAppMsg = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const { phoneNumber, message } = req.body;

  if (!userId) {
    throw new ErrorHandler('User not authenticated', 401);
  }

  if (!phoneNumber || !message) {
    throw new ErrorHandler('Missing phoneNumber or message', 400);
  }

  const result = await whatsappService.sendWhatsAppMessage(userId, phoneNumber, message);

  if (!result.success) {
    throw new ErrorHandler(result.error || 'Failed to send message', 400);
  }

  res.json({
    data: result,
    message: 'Message sent successfully',
  });
});

/**
 * Get WhatsApp chats for a user
 * GET /v1/tool/whatsapp/chats
 */
export const getWhatsAppChats = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  if (!userId) {
    throw new ErrorHandler('User not authenticated', 401);
  }

  const chats = await whatsappService.getWhatsAppChats(userId);

  res.json({
    data: { chats },
    message: 'Chats retrieved',
  });
});

/**
 * Disconnect WhatsApp
 * POST /v1/tool/whatsapp/disconnect
 */
export const disconnectWhatsApp = catchAsyncError(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  if (!userId) {
    throw new ErrorHandler('User not authenticated', 401);
  }

  const result = await whatsappService.disconnectWhatsApp(userId);

  res.json({
    data: result,
    message: 'WhatsApp disconnected',
  });
});

export default {
  initiateWhatsAppConnect,
  getWhatsAppStatus,
  sendWhatsAppMsg,
  getWhatsAppChats,
  disconnectWhatsApp,
};
