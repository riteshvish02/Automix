import { ErrorHandler } from "../../../utils/ErrorHandler";
import { getValidSlackAccessToken } from "../../providers/slack/slackAuth.service";

interface SlackPostMessageInput {
  userId: string;
  channel: string;
  text: string;
}

export const slackPostMessage = async ({
  userId,
  channel,
  text,
}: SlackPostMessageInput) => {
  const token = await getValidSlackAccessToken(userId);

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel,
      text,
    }),
  });

  const payload = (await response.json()) as {
    ok: boolean;
    error?: string;
    ts?: string;
    channel?: string;
    message?: {
      text?: string;
    };
  };

  if (!payload.ok) {
    throw new ErrorHandler(
      `Slack post message failed: ${payload.error || "unknown_error"}`,
      400
    );
  }

  return {
    ok: true,
    channel: payload.channel,
    ts: payload.ts,
    text: payload.message?.text,
  };
};