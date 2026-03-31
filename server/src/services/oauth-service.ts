
import { google } from 'googleapis';
import { prisma } from '../config/prisma';
import { ErrorHandler } from '../utils/ErrorHandler';

const getGoogleDriveAuthUrl = async (data: { }) => {
    const client_id = process.env.GOOGLE_DRIVE_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_DRIVE_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_DRIVE_REDIRECT_URI!;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
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
    const redirect_uri = process.env.GOOGLE_DRIVE_REDIRECT_URI!;
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

const getGoogleGmailAuthUrl = async (data: { }) => {
    const client_id = process.env.GOOGLE_GMAIL_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_GMAIL_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_GMAIL_REDIRECT_URI!;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Gmail OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
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
    const redirect_uri = process.env.GOOGLE_GMAIL_REDIRECT_URI!;
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

const getGoogleCalendarAuthUrl = async (data: { }) => {
    const client_id = process.env.GOOGLE_CALENDAR_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_CALENDAR_REDIRECT_URI!;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
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
    const redirect_uri = process.env.GOOGLE_CALENDAR_REDIRECT_URI!;
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

const getGoogleDocsAuthUrl = async (data: { }) => {
    const client_id = process.env.GOOGLE_DOCS_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_DOCS_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_DOCS_REDIRECT_URI!;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Docs OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
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
    const redirect_uri = process.env.GOOGLE_DOCS_REDIRECT_URI!;
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
const getGoogleSheetsAuthUrl = async (data: { }) => {
    const client_id = process.env.GOOGLE_SHEETS_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_SHEETS_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_SHEETS_REDIRECT_URI!;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google Sheets OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
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
    const redirect_uri = process.env.GOOGLE_SHEETS_REDIRECT_URI!;
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
    googleSheetsOAuthCallback
};




