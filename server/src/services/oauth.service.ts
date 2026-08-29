
import { google } from 'googleapis';
import { prisma } from '../config/prisma';
import { ErrorHandler } from '../utils/ErrorHandler';

const PROVIDER_CATALOG: Array<{ key: string; label: string; dbProviders: string[] }> = [
    { key: 'gmail', label: 'Gmail', dbProviders: ['gmail'] },
    { key: 'calendar', label: 'Calendar', dbProviders: ['calendar'] },
    { key: 'docs', label: 'Docs', dbProviders: ['gdocs'] },
    { key: 'sheets', label: 'Sheets', dbProviders: ['gsheets'] },
    { key: 'drive', label: 'Drive', dbProviders: ['gdrive'] },
    { key: 'slack', label: 'Slack', dbProviders: ['slack'] },
    { key: 'notion', label: 'Notion', dbProviders: ['notion'] },
];

const BASE_URL = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`;

const getGoogleDriveAuthUrl = async (data: { userId: string }) => {
    const { userId } = data;
    const client_id = process.env.GOOGLE_DRIVE_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_DRIVE_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_DRIVE_REDIRECT_URI || `${BASE_URL}/api/v1/tool/drive/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google OAuth2 environment variables missing', 500);
    }
    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        state: userId,
        scope: [
            'https://www.googleapis.com/auth/drive'
        ]
    });
    return { url: authUrl };
};

const googleDriveOAuthCallback = async (data: { code: string; userId: string }) => {
    const { code, userId } = data;
    if (!userId) throw new ErrorHandler('Missing userId', 400);
    if (!code) throw new ErrorHandler('Missing code', 400);
    const client_id = process.env.GOOGLE_DRIVE_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_DRIVE_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_DRIVE_REDIRECT_URI || `${BASE_URL}/api/v1/tool/drive/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Save tokens to DB (upsert)
    const tokenRecord = await prisma.oAuthToken.upsert({
        where: { userId_provider: { userId, provider: 'gdrive' } },
        update: {
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
        create: {
            userId,
            provider: 'gdrive',
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
    });
    return { token: tokenRecord };
};

const getGoogleGmailAuthUrl = async (data: { userId: string }) => {
    const { userId } = data;
    const client_id = process.env.GOOGLE_GMAIL_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_GMAIL_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_GMAIL_REDIRECT_URI || `${BASE_URL}/api/v1/tool/gmail/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Gmail OAuth2 environment variables missing', 500);
    }
    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        state: userId,
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ]
    });
    return { url: authUrl };
};

const googleGmailOAuthCallback = async (data: { code: string; userId: string }) => {
    const { code, userId } = data;
    if (!userId) throw new ErrorHandler('Missing userId', 400);
    if (!code) throw new ErrorHandler('Missing code', 400);
    const client_id = process.env.GOOGLE_GMAIL_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_GMAIL_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_GMAIL_REDIRECT_URI || `${BASE_URL}/api/v1/tool/gmail/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Gmail OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Save tokens to DB (upsert)
    const tokenRecord = await prisma.oAuthToken.upsert({
        where: { userId_provider: { userId, provider: 'gmail' } },
        update: {
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
        create: {
            userId,
            provider: 'gmail',
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
    });
    return { token: tokenRecord };
};

const getGoogleCalendarAuthUrl = async (data: { userId: string }) => {
    const { userId } = data;
    const client_id = process.env.GOOGLE_CALENDAR_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_CALENDAR_REDIRECT_URI || `${BASE_URL}/api/v1/tool/calendar/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google OAuth2 environment variables missing', 500);
    }
    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        state: userId,
        scope: [
            'https://www.googleapis.com/auth/calendar'
        ]
    });
    return { url: authUrl };
};

const googleCalendarOAuthCallback = async (data: { code: string; userId: string }) => {
    const { code, userId } = data;
    if (!userId) throw new ErrorHandler('Missing userId', 400);
    if (!code) throw new ErrorHandler('Missing code', 400);
    const client_id = process.env.GOOGLE_CALENDAR_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_CALENDAR_REDIRECT_URI || `${BASE_URL}/api/v1/tool/calendar/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Save tokens to DB (upsert)
    const tokenRecord = await prisma.oAuthToken.upsert({
        where: { userId_provider: { userId, provider: 'calendar' } },
        update: {
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
        create: {
            userId,
            provider: 'calendar',
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
    });
    return { token: tokenRecord };
};

const getGoogleDocsAuthUrl = async (data: { userId: string }) => {
    const { userId } = data;
    const client_id = process.env.GOOGLE_DOCS_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_DOCS_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_DOCS_REDIRECT_URI || `${BASE_URL}/api/v1/tool/docs/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Docs OAuth2 environment variables missing', 500);
    }
    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        state: userId,
        scope: [
            'https://www.googleapis.com/auth/documents'
        ]
    });
    return { url: authUrl };
};

const googleDocsOAuthCallback = async (data: { code: string; userId: string }) => {
    const { code, userId } = data;
    if (!userId) throw new ErrorHandler('Missing userId', 400);
    if (!code) throw new ErrorHandler('Missing code', 400);
    const client_id = process.env.GOOGLE_DOCS_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_DOCS_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_DOCS_REDIRECT_URI || `${BASE_URL}/api/v1/tool/docs/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Docs OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Save tokens to DB (upsert)
    const tokenRecord = await prisma.oAuthToken.upsert({
        where: { userId_provider: { userId, provider: 'gdocs' } },
        update: {
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
        create: {
            userId,
            provider: 'gdocs',
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
    });
    return { token: tokenRecord };
};

// --- Google Sheets OAuth ---
const getGoogleSheetsAuthUrl = async (data: { userId: string }) => {
    const { userId } = data;
    const client_id = process.env.GOOGLE_SHEETS_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_SHEETS_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_SHEETS_REDIRECT_URI || `${BASE_URL}/api/v1/tool/sheets/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Sheets OAuth2 environment variables missing', 500);
    }
    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        state: userId,
        scope: [
            'https://www.googleapis.com/auth/spreadsheets'
        ]
    });
    return { url: authUrl };
};

const googleSheetsOAuthCallback = async (data: { code: string; userId: string }) => {
    const { code, userId } = data;
    if (!userId) throw new ErrorHandler('Missing userId', 400);
    if (!code) throw new ErrorHandler('Missing code', 400);
    const client_id = process.env.GOOGLE_SHEETS_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_SHEETS_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_SHEETS_REDIRECT_URI || `${BASE_URL}/api/v1/tool/sheets/oauth/callback`;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Sheets OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Save tokens to DB (upsert)
    const tokenRecord = await prisma.oAuthToken.upsert({
        where: { userId_provider: { userId, provider: 'gsheets' } },
        update: {
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
        create: {
            userId,
            provider: 'gsheets',
            accessToken: tokens.access_token || '',
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        },
    });
    return { token: tokenRecord };
};

const getSlackAuthUrl = async (data: { userId: string }) => {
    const { userId } = data;
    const client_id = process.env.SLACK_CLIENT_ID!;
    const redirect_uri = process.env.SLACK_REDIRECT_URI || `${BASE_URL}/api/v1/tool/slack/oauth/callback`;

    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }

    if (!client_id || !redirect_uri) {
        throw new ErrorHandler('Slack OAuth environment variables missing', 500);
    }

    const scope = [
        'channels:read',
        'channels:history',
        'chat:write',
        'chat:write.public',
        'users:read',
    ].join(',');

    const authUrl = `https://slack.com/oauth/v2/authorize?client_id=${encodeURIComponent(client_id)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(userId)}`;
    return { url: authUrl };
};

const slackOAuthCallback = async (data: { code: string; userId: string }) => {
    const { code, userId } = data;
    if (!userId) throw new ErrorHandler('Missing userId', 400);
    if (!code) throw new ErrorHandler('Missing code', 400);

    const client_id = process.env.SLACK_CLIENT_ID!;
    const client_secret = process.env.SLACK_CLIENT_SECRET!;
    const redirect_uri = process.env.SLACK_REDIRECT_URI || `${BASE_URL}/api/v1/tool/slack/oauth/callback`;

    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Slack OAuth environment variables missing', 500);
    }

    const response = await fetch('https://slack.com/api/oauth.v2.access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code,
            client_id,
            client_secret,
            redirect_uri,
        }).toString(),
    });

    const payload = await response.json() as {
        ok: boolean;
        error?: string;
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
        authed_user?: {
            access_token?: string;
            refresh_token?: string;
            expires_in?: number;
            id?: string;
        };
        team?: {
            id?: string;
            name?: string;
        };
    };

    if (!payload.ok) {
        throw new ErrorHandler(`Slack OAuth failed: ${payload.error || 'unknown_error'}`, 400);
    }

    // Use bot token first because requested scopes are defined in `scope`.
    const accessToken = payload.access_token || payload.authed_user?.access_token;
    if (!accessToken) {
        throw new ErrorHandler('Slack OAuth did not return an access token', 400);
    }

    const refreshToken = payload.refresh_token || payload.authed_user?.refresh_token;
    const expiresIn = payload.expires_in || payload.authed_user?.expires_in;
    const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;

    const tokenRecord = await prisma.oAuthToken.upsert({
        where: { userId_provider: { userId, provider: 'slack' } },
        update: {
            accessToken,
            refreshToken,
            expiresAt,
        },
        create: {
            userId,
            provider: 'slack',
            accessToken,
            refreshToken,
            expiresAt,
        },
    });

    return {
        token: tokenRecord,
        team: payload.team,
        slackUserId: payload.authed_user?.id,
    };
};

const getNotionAuthUrl = async (data: { userId: string }) => {
    const { userId } = data;
    const client_id = process.env.NOTION_CLIENT_ID!;
    const redirect_uri = process.env.NOTION_REDIRECT_URI || `${BASE_URL}/api/v1/tool/notion/oauth/callback`;

    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }

    if (!client_id || !redirect_uri) {
        throw new ErrorHandler('Notion OAuth environment variables missing', 500);
    }

    const authUrl = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${encodeURIComponent(client_id)}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(userId)}`;
    return { url: authUrl };
};

const notionOAuthCallback = async (data: { code: string; userId: string }) => {
    const { code, userId } = data;
    if (!userId) throw new ErrorHandler('Missing userId', 400);
    if (!code) throw new ErrorHandler('Missing code', 400);

    const client_id = process.env.NOTION_CLIENT_ID!;
    const client_secret = process.env.NOTION_CLIENT_SECRET!;
    const redirect_uri = process.env.NOTION_REDIRECT_URI || `${BASE_URL}/api/v1/tool/notion/oauth/callback`;

    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Notion OAuth environment variables missing', 500);
    }

    const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const response = await fetch('https://api.notion.com/v1/oauth/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri,
        }),
    });

    const payload = await response.json() as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
        workspace_name?: string;
        workspace_id?: string;
        owner?: unknown;
        bot_id?: string;
        error?: string;
    };

    if (!response.ok || !payload.access_token) {
        throw new ErrorHandler(`Notion OAuth failed: ${payload.error || 'unknown_error'}`, 400);
    }

    const expiresAt = payload.expires_in
        ? new Date(Date.now() + payload.expires_in * 1000)
        : null;

    const tokenRecord = await prisma.oAuthToken.upsert({
        where: { userId_provider: { userId, provider: 'notion' } },
        update: {
            accessToken: payload.access_token,
            refreshToken: payload.refresh_token,
            expiresAt,
        },
        create: {
            userId,
            provider: 'notion',
            accessToken: payload.access_token,
            refreshToken: payload.refresh_token,
            expiresAt,
        },
    });

    return {
        token: tokenRecord,
        workspace: {
            id: payload.workspace_id,
            name: payload.workspace_name,
        },
        botId: payload.bot_id,
    };
};

const getOAuthConnections = async (data: { userId: string }) => {
    const { userId } = data;

    if (!userId) {
        throw new ErrorHandler('Missing userId', 400);
    }

    const tokens = await prisma.oAuthToken.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
    });

    const now = Date.now();
    const providers = PROVIDER_CATALOG.map((provider) => {
        const token = tokens.find((item) => provider.dbProviders.includes(item.provider));
        const expiresAt = token?.expiresAt || null;
        const isExpired = expiresAt ? expiresAt.getTime() <= now : false;

        return {
            key: provider.key,
            label: provider.label,
            connected: Boolean(token?.accessToken),
            providerInDb: token?.provider || null,
            isExpired,
            expiresAt: expiresAt ? expiresAt.toISOString() : null,
            updatedAt: token?.updatedAt ? token.updatedAt.toISOString() : null,
        };
    });

    const connectedCount = providers.filter((provider) => provider.connected).length;

    return {
        providers,
        connectedCount,
        totalProviders: providers.length,
    };
};

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




