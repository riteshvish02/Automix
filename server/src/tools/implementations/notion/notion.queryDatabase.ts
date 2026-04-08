import { notionRequest } from "../../providers/notion/notion.client";
import { resolveNotionId } from "./notion.resolve";

interface NotionQueryDatabaseInput {
  userId: string;
  databaseId?: string;
  databaseName?: string;
  pageSize?: number;
  startCursor?: string;
}

export const notionQueryDatabase = async ({
  userId,
  databaseId,
  databaseName,
  pageSize = 10,
  startCursor,
}: NotionQueryDatabaseInput) => {
  const resolvedDatabaseId = await resolveNotionId({
    userId,
    object: "database",
    id: databaseId,
    name: databaseName,
  });

  const res = await notionRequest<{
    results?: any[];
    next_cursor?: string | null;
    has_more?: boolean;
  }>(userId, `/databases/${resolvedDatabaseId}/query`, {
    method: "POST",
    body: JSON.stringify({
      page_size: pageSize,
      start_cursor: startCursor,
    }),
  });

  return {
    pages:
      res.results?.map((page: any) => ({
        id: page.id,
        url: page.url,
        lastEditedTime: page.last_edited_time,
        properties: page.properties,
      })) || [],
    nextCursor: res.next_cursor || null,
    hasMore: Boolean(res.has_more),
  };
};
