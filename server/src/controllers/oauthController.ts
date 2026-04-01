import { Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsync';
import { successResponse } from '../utils';
import { oauthService } from '../services';

const getGoogleDriveAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const response = await oauthService.getGoogleDriveAuthUrl({});
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleDriveOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const userId = (req as any).user?.userId;
    const response = await oauthService.googleDriveOAuthCallback({ code, userId });
    successResponse.data = response;
    successResponse.message = 'Google Drive connected!';
    return res.status(200).json(successResponse);
});

const getGoogleGmailAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const response = await oauthService.getGoogleGmailAuthUrl({});
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleGmailOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const userId = (req as any).user?.userId;
    const response = await oauthService.googleGmailOAuthCallback({ code, userId });
    successResponse.data = response;
    successResponse.message = 'Google Gmail connected!';
    return res.status(200).json(successResponse);
});

const getGoogleCalendarAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const response = await oauthService.getGoogleCalendarAuthUrl({});
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleCalendarOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const userId = (req as any).user?.userId;
    const response = await oauthService.googleCalendarOAuthCallback({ code, userId });
    successResponse.data = response;
    successResponse.message = 'Google Calendar connected!';
    return res.status(200).json(successResponse);
});

const getGoogleDocsAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const response = await oauthService.getGoogleDocsAuthUrl({});
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleDocsOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const userId = (req as any).user?.userId;
    const response = await oauthService.googleDocsOAuthCallback({ code, userId });
    successResponse.data = response;
    successResponse.message = 'Google Docs connected!';
    return res.status(200).json(successResponse);
});

const getGoogleSheetsAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const response = await oauthService.getGoogleSheetsAuthUrl({});
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleSheetsOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const userId = (req as any).user?.userId;
    const response = await oauthService.googleSheetsOAuthCallback({ code, userId });
    successResponse.data = response;
    successResponse.message = 'Google Sheets connected!';
    return res.status(200).json(successResponse);
});

const getSlackAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const response = await oauthService.getSlackAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const slackOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const userId = ((req as any).user?.userId || req.query.state) as string;
    const response = await oauthService.slackOAuthCallback({ code, userId });
    successResponse.data = response;
    successResponse.message = 'Slack connected!';
    return res.status(200).json(successResponse);
});

export default {
    getGoogleDriveAuthUrl,
    googleDriveOAuthCallback,
    getGoogleGmailAuthUrl,
    googleGmailOAuthCallback,
    getGoogleCalendarAuthUrl,
    googleCalendarOAuthCallback,
    getGoogleDocsAuthUrl,
    googleDocsOAuthCallback,
    getGoogleSheetsAuthUrl,
    googleSheetsOAuthCallback,
    getSlackAuthUrl,
    slackOAuthCallback
};