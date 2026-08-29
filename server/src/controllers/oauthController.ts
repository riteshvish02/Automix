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

const getClientUrls = () =>
    (process.env.CLIENT_URLS || 'http://localhost:5173')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

const buildOAuthRedirectUrl = (
    provider: string,
    success: boolean,
    message?: string,
    returnTo?: string
) => {
    const clientUrls = getClientUrls();
    const defaultOrigin = clientUrls[0] || 'http://localhost:5173';

    let url: URL;
    if (returnTo) {
        try {
            // If returnTo is a full absolute URL, use it directly (but only if origin is allowed)
            const parsed = new URL(returnTo);
            if (clientUrls.includes(parsed.origin)) {
                url = parsed;
            } else {
                // disallow unknown origins, fall back to default
                url = new URL('/', defaultOrigin);
            }
        } catch (e) {
            // not a full URL - treat as an origin
            const origin = returnTo.split('?')[0];
            if (clientUrls.includes(origin)) {
                url = new URL('/', origin);
            } else {
                url = new URL('/', defaultOrigin);
            }
        }
    } else {
        url = new URL('/', defaultOrigin);
    }

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
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('drive', true, 'Google Drive connected successfully.', returnTo));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Drive connection failed.';
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('drive', false, message, returnTo));
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
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('gmail', true, 'Google Gmail connected successfully.', returnTo));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Gmail connection failed.';
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('gmail', false, message, returnTo));
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
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('calendar', true, 'Google Calendar connected successfully.', returnTo));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Calendar connection failed.';
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('calendar', false, message, returnTo));
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
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('docs', true, 'Google Docs connected successfully.', returnTo));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Docs connection failed.';
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('docs', false, message, returnTo));
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
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('sheets', true, 'Google Sheets connected successfully.', returnTo));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Google Sheets connection failed.';
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('sheets', false, message, returnTo));
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
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('slack', true, 'Slack connected successfully.', returnTo));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Slack connection failed.';
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('slack', false, message, returnTo));
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
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('notion', true, 'Notion connected successfully.', returnTo));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Notion connection failed.';
        const returnTo = typeof req.query.return_to === 'string' ? req.query.return_to : undefined;
        return res.redirect(buildOAuthRedirectUrl('notion', false, message, returnTo));
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