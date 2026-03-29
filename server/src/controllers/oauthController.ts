

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

export default {
    getGoogleDriveAuthUrl,
    googleDriveOAuthCallback,
    getGoogleGmailAuthUrl,
    googleGmailOAuthCallback,
    getGoogleCalendarAuthUrl,
    googleCalendarOAuthCallback
};