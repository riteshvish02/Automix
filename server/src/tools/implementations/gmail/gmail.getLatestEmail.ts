import { gmail_v1 } from "googleapis";
import { getGmailClient } from "../../providers/google/gmail.client";
import { ErrorHandler } from "../../../utils/ErrorHandler";

interface GmailGetLatestEmailInput {
  userId: string;
  query?: string;
  labelIds?: string[];
}

const getHeader = (
  headers: gmail_v1.Schema$MessagePartHeader[] | undefined,
  key: string
) => {
  return headers?.find((h) => h.name?.toLowerCase() === key.toLowerCase())?.value;
};

export const gmailGetLatestEmail = async ({
  userId,
  query,
  labelIds,
}: GmailGetLatestEmailInput) => {
  const gmail = await getGmailClient(userId);

  const listRes = await gmail.users.messages.list({
    userId: "me",
    q: query,
    labelIds,
    maxResults: 1,
  });

  const latest = listRes.data.messages?.[0];
  if (!latest?.id) {
    throw new ErrorHandler("No email found for the given filters", 404);
  }

  const msgRes = await gmail.users.messages.get({
    userId: "me",
    id: latest.id,
    format: "metadata",
    metadataHeaders: ["From", "To", "Subject", "Date"],
  });

  const msg = msgRes.data;
  const headers = msg.payload?.headers;

  return {
    id: msg.id,
    threadId: msg.threadId,
    snippet: msg.snippet,
    internalDate: msg.internalDate,
    from: getHeader(headers, "From"),
    to: getHeader(headers, "To"),
    subject: getHeader(headers, "Subject"),
    date: getHeader(headers, "Date"),
    labelIds: msg.labelIds,
  };
};