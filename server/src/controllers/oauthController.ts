import { Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsync';
import { successResponse } from '../utils';
import { oauthService } from '../services';
import { ErrorHandler } from '../utils/ErrorHandler';

const getUserIdFromRequest = (req: Request): string | undefined => {
    const user = (req as any).user as
        | { userId?: string; id?: string; sub?: string }
        | undefined;

    return user?.userId || user?.id || user?.sub;
};

const requireUserId = (candidate?: string) => {
    if (!candidate || !candidate.trim()) {
        throw new ErrorHandler('Missing userId', 400);
    }

    return candidate;
};

const getFrontendUrl = () => {
    const clientUrls = (process.env.CLIENT_URLS || 'http://localhost:5173')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    return clientUrls[0] || 'http://localhost:5173';
};

const buildOAuthRedirectUrl = (provider: string, success: boolean, message?: string) => {
    const url = new URL('/', getFrontendUrl());
    url.searchParams.set('oauth', success ? 'success' : 'error');
    url.searchParams.set('provider', provider);

    if (message) {
        url.searchParams.set('message', message);
    }

    return url.toString();
};

const getGoogleDriveAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getGoogleDriveAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleDriveOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const userId = requireUserId((req.query.state as string) || getUserIdFromRequest(req));
        await oauthService.googleDriveOAuthCallback({ code, userId });
        return res.redirect(buildOAuthRedirectUrl('drive', true, 'Google Drive connected successfully.'));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Drive connection failed.';
        return res.redirect(buildOAuthRedirectUrl('drive', false, message));
    }
});

const getGoogleGmailAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getGoogleGmailAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleGmailOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const userId = requireUserId((req.query.state as string) || getUserIdFromRequest(req));
        await oauthService.googleGmailOAuthCallback({ code, userId });
        return res.redirect(buildOAuthRedirectUrl('gmail', true, 'Google Gmail connected successfully.'));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Gmail connection failed.';
        return res.redirect(buildOAuthRedirectUrl('gmail', false, message));
    }
});

const getGoogleCalendarAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getGoogleCalendarAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleCalendarOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const userId = requireUserId((req.query.state as string) || getUserIdFromRequest(req));
        await oauthService.googleCalendarOAuthCallback({ code, userId });
        return res.redirect(buildOAuthRedirectUrl('calendar', true, 'Google Calendar connected successfully.'));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Calendar connection failed.';
        return res.redirect(buildOAuthRedirectUrl('calendar', false, message));
    }
});

const getGoogleDocsAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getGoogleDocsAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleDocsOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const userId = requireUserId((req.query.state as string) || getUserIdFromRequest(req));
        await oauthService.googleDocsOAuthCallback({ code, userId });
        return res.redirect(buildOAuthRedirectUrl('docs', true, 'Google Docs connected successfully.'));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Docs connection failed.';
        return res.redirect(buildOAuthRedirectUrl('docs', false, message));
    }
});

const getGoogleSheetsAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getGoogleSheetsAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const googleSheetsOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const userId = requireUserId((req.query.state as string) || getUserIdFromRequest(req));
        await oauthService.googleSheetsOAuthCallback({ code, userId });
        return res.redirect(buildOAuthRedirectUrl('sheets', true, 'Google Sheets connected successfully.'));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Sheets connection failed.';
        return res.redirect(buildOAuthRedirectUrl('sheets', false, message));
    }
});

const getSlackAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getSlackAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const slackOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const userId = requireUserId((req.query.state as string) || getUserIdFromRequest(req));
        await oauthService.slackOAuthCallback({ code, userId });
        return res.redirect(buildOAuthRedirectUrl('slack', true, 'Slack connected successfully.'));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Slack connection failed.';
        return res.redirect(buildOAuthRedirectUrl('slack', false, message));
    }
});

const getNotionAuthUrl = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getNotionAuthUrl({ userId });
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

const notionOAuthCallback = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const userId = requireUserId((req.query.state as string) || getUserIdFromRequest(req));
        await oauthService.notionOAuthCallback({ code, userId });
        return res.redirect(buildOAuthRedirectUrl('notion', true, 'Notion connected successfully.'));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Notion connection failed.';
        return res.redirect(buildOAuthRedirectUrl('notion', false, message));
    }
});

const getOAuthConnections = catchAsyncError(async (req: Request, res: Response) => {
    const userId = requireUserId(getUserIdFromRequest(req));
    const response = await oauthService.getOAuthConnections({ userId });
    successResponse.data = response;
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
    slackOAuthCallback,
    getNotionAuthUrl,
    notionOAuthCallback,
    getOAuthConnections
};