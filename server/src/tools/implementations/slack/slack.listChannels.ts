import { ErrorHandler } from "../../../utils/ErrorHandler";
import { getValidSlackAccessToken } from "../../providers/slack/slackAuth.service";

interface SlackListChannelsInput {
  userId: string;
  limit?: number;
  cursor?: string;
}

export const slackListChannels = async ({
  userId,
  limit = 100,
  cursor,
}: SlackListChannelsInput) => {
  const token = await getValidSlackAccessToken(userId);

  const query = new URLSearchParams({
    limit: String(limit),
    types: "public_channel",
  });

  if (cursor) {
    query.set("cursor", cursor);
  }

  const response = await fetch(
    `https://slack.com/api/conversations.list?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const payload = (await response.json()) as {
    ok: boolean;
    error?: string;
    channels?: Array<{
      id?: string;
      name?: string;
      is_channel?: boolean;
      is_private?: boolean;
    }>;
    response_metadata?: {
      next_cursor?: string;
    };
  };

  if (!payload.ok) {
    throw new ErrorHandler(
      `Slack list channels failed: ${payload.error || "unknown_error"}`,
      400
    );
  }

  return {
    channels:
      payload.channels?.map((c) => ({
        id: c.id,
        name: c.name,
        isChannel: c.is_channel,
        isPrivate: c.is_private,
      })) || [],
    nextCursor: payload.response_metadata?.next_cursor || null,
  };
};
