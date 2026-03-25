

import { google } from 'googleapis';
import { prisma } from '../config/prisma';
import { ErrorHandler } from '../utils/ErrorHandler';

const getGoogleDocsAuthUrl = async (data: { }) => {
    const client_id = process.env.GOOGLE_DOCS_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_DOCS_CLIENT_SECRET!;
    const redirect_uri = process.env.GOOGLE_DOCS_REDIRECT_URI!;
    if (!client_id || !client_secret || !redirect_uri) {
        throw new ErrorHandler('Google OAuth2 environment variables missing', 500);
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/documents',
            'https://www.googleapis.com/auth/drive.file'
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

export default { getGoogleDocsAuthUrl, googleDocsOAuthCallback };




