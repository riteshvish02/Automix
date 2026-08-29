import { prisma } from "../../../config/prisma";
import { ErrorHandler } from "../../../utils/ErrorHandler";

const getNotionEnv = () => {
  const BASE_URL = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`;
  const clientId = process.env.NOTION_CLIENT_ID;
  const clientSecret = process.env.NOTION_CLIENT_SECRET;
  const redirectUri = process.env.NOTION_REDIRECT_URI || `${BASE_URL}/api/v1/tool/notion/oauth/callback`;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new ErrorHandler("Notion OAuth environment variables missing", 500);
  }

  return { clientId, clientSecret, redirectUri };
};

const refreshNotionAccessToken = async (refreshToken: string) => {
  const { clientId, clientSecret } = getNotionEnv();

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://api.notion.com/v1/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const payload = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error?: string;
  };

  if (!response.ok || !payload.access_token) {
    throw new ErrorHandler(
      `Failed to refresh Notion token: ${payload.error || "unknown_error"}`,
      401
    );
  }

  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: payload.expires_in
      ? new Date(Date.now() + payload.expires_in * 1000)
      : null,
  };
};

export const getValidNotionAccessToken = async (userId: string) => {
  const tokenRecord = await prisma.oAuthToken.findUnique({
    where: {
      userId_provider: {
        userId,
        provider: "notion",
      },
    },
  });

  if (!tokenRecord?.accessToken) {
    throw new ErrorHandler(
      "No Notion OAuth token found. Connect Notion first via /api/v1/tool/notion/oauth",
      404
    );
  }

  const isExpired =
    Boolean(tokenRecord.expiresAt) && tokenRecord.expiresAt!.getTime() <= Date.now();

  if (!isExpired) {
    return tokenRecord.accessToken;
  }

  if (!tokenRecord.refreshToken) {
    throw new ErrorHandler(
      "Notion access token expired and no refresh token available. Reconnect Notion.",
      401
    );
  }

  const refreshed = await refreshNotionAccessToken(tokenRecord.refreshToken);

  await prisma.oAuthToken.update({
    where: {
      userId_provider: {
        userId,
        provider: "notion",
      },
    },
    data: {
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken || tokenRecord.refreshToken,
      expiresAt: refreshed.expiresAt,
    },
  });

  return refreshed.accessToken;
};
