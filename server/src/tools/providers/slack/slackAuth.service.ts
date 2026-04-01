import { prisma } from "../../../config/prisma";
import { ErrorHandler } from "../../../utils/ErrorHandler";

export const getValidSlackAccessToken = async (userId: string) => {
  const tokenRecord = await prisma.oAuthToken.findUnique({
    where: {
      userId_provider: {
        userId,
        provider: "slack",
      },
    },
  });

  if (!tokenRecord?.accessToken) {
    throw new ErrorHandler(
      'No Slack OAuth token found. Connect Slack first via /api/v1/tool/slack/oauth',
      404
    );
  }

  return tokenRecord.accessToken;
};