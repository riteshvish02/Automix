import { ErrorHandler } from "../../../utils/ErrorHandler";
import { getValidNotionAccessToken } from "./notionAuth.service";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = process.env.NOTION_API_VERSION || "2022-06-28";

export const notionRequest = async <T>(
  userId: string,
  path: string,
  init: RequestInit = {}
): Promise<T> => {
  const token = await getValidNotionAccessToken(userId);

  const response = await fetch(`${NOTION_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const payload = (await response.json()) as {
    message?: string;
    code?: string;
    [key: string]: unknown;
  };

  if (!response.ok) {
    const message =
      typeof payload.message === "string"
        ? payload.message
        : "Notion API request failed";

    throw new ErrorHandler(
      `Notion API error (${response.status}${payload.code ? `:${String(payload.code)}` : ""}): ${message}`,
      response.status
    );
  }

  return payload as T;
};
