import { google } from "googleapis";
import {prisma} from "../../../config/prisma";
import { ErrorHandler } from "../../../utils/ErrorHandler";

type Provider = "gdrive" | "gmail" | "calendar";

const getGoogleEnv = (provider: Provider) => {
  if (provider === "gdrive") {
    return {
      clientId: process.env.GOOGLE_DRIVE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET!,
      redirectUri: process.env.GOOGLE_DRIVE_REDIRECT_URI!,
    };
  }

  if (provider === "gmail") {
    return {
      clientId: process.env.GOOGLE_GMAIL_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_GMAIL_CLIENT_SECRET!,
      redirectUri: process.env.GOOGLE_GMAIL_REDIRECT_URI!,
    };
  }

  if (provider === "calendar") {
    return {
      clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET!,
      redirectUri: process.env.GOOGLE_CALENDAR_REDIRECT_URI!,
    };
  }

  throw new ErrorHandler(`Unsupported provider: ${provider}`, 400);
};


export const getValidGoogleOAuthClient = async (
  userId: string,
  provider: Provider
) => {
  const tokenRecord = await prisma.oAuthToken.findUnique({
    where: {
      userId_provider: {
        userId,
        provider,
      },
    },
  });

  if (!tokenRecord) {
    console.error(`[OAuth] No token found for userId=${userId}, provider=${provider}`);
    throw new ErrorHandler(
      `No OAuth token found for provider "${provider}"`,
      404
    );
  }

  const { clientId, clientSecret, redirectUri } = getGoogleEnv(provider);

  console.log(`[OAuth] Using credentials for userId=${userId}, provider=${provider}`);
  console.log(`[OAuth] accessToken: ${tokenRecord.accessToken}`);
  console.log(`[OAuth] refreshToken: ${tokenRecord.refreshToken}`);
  console.log(`[OAuth] expiresAt: ${tokenRecord.expiresAt}`);

  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  oAuth2Client.setCredentials({
    access_token: tokenRecord.accessToken,
    refresh_token: tokenRecord.refreshToken || undefined,
    expiry_date: tokenRecord.expiresAt?.getTime(),
  });

  const isExpired =
    !tokenRecord.expiresAt || tokenRecord.expiresAt.getTime() <= Date.now();

  if (isExpired) {
    console.warn(`[OAuth] Access token expired for userId=${userId}, provider=${provider}`);
    if (tokenRecord.refreshToken) {
      try {
        const { credentials } = await oAuth2Client.refreshAccessToken();
        console.log(`[OAuth] Refreshed credentials:`, credentials);
        oAuth2Client.setCredentials(credentials);
        await prisma.oAuthToken.update({
          where: {
            userId_provider: {
              userId,
              provider,
            },
          },
          data: {
            accessToken: credentials.access_token || tokenRecord.accessToken,
            refreshToken: credentials.refresh_token || tokenRecord.refreshToken,
            expiresAt: credentials.expiry_date
              ? new Date(credentials.expiry_date)
              : tokenRecord.expiresAt,
          },
        });
      } catch (err) {
        console.error(`[OAuth] Failed to refresh access token for userId=${userId}, provider=${provider}`, err);
        throw new ErrorHandler("Failed to refresh Google OAuth token. Please re-authenticate.", 401);
      }
    } else {
      console.error(`[OAuth] No refresh token available for userId=${userId}, provider=${provider}`);
      throw new ErrorHandler("No refresh token available. Please re-authenticate your Google account.", 401);
    }
  }

  return oAuth2Client;
};