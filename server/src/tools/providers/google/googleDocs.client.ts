import { google } from 'googleapis';
import { prisma } from '../../../config/prisma';
import { ErrorHandler } from '../../../utils/ErrorHandler';

export const getGoogleDocsClient = async (userId: string) => {
  // Get token from DB
  const token = await prisma.oAuthToken.findUnique({
    where: { userId_provider: { userId, provider: 'gdocs' } }
  });
  if (!token || !token.accessToken) {
    throw new ErrorHandler('Google Docs token not found for user', 401);
  }
  const BASE_URL = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`;
  const client_id = process.env.GOOGLE_DOCS_CLIENT_ID!;
  const client_secret = process.env.GOOGLE_DOCS_CLIENT_SECRET!;
  const redirect_uri = process.env.GOOGLE_DOCS_REDIRECT_URI || `${BASE_URL}/api/v1/tool/docs/oauth/callback`;
  if (!client_id || !client_secret || !redirect_uri) {
    throw new ErrorHandler('Google Docs OAuth2 environment variables missing', 500);
  }
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
  oAuth2Client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken
  });
  const docs = google.docs({ version: 'v1', auth: oAuth2Client });
  return { docs };
};
