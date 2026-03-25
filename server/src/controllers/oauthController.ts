
import { Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsync';
import { successResponse } from '../utils';
import { oauthService } from '../services';

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

export default { getGoogleDocsAuthUrl, googleDocsOAuthCallback };