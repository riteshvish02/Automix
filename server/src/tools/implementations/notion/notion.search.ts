import { notionRequest } from "../../providers/notion/notion.client";

interface NotionSearchInput {
  userId: string;
  query?: string;
  pageSize?: number;
  startCursor?: string;
  object?: "page" | "database";
}

export const notionSearch = async ({
  userId,
  query,
  pageSize = 10,
  startCursor,
  object,
}: NotionSearchInput) => {
  const res = await notionRequest<{
    results?: any[];
    next_cursor?: string | null;
    has_more?: boolean;
  }>(userId, "/search", {
    method: "POST",
    body: JSON.stringify({
      query,
      page_size: pageSize,
      start_cursor: startCursor,
      filter: object ? { property: "object", value: object } : undefined,
    }),
  });

  return {
    results:
      res.results?.map((item: any) => ({
        id: item.id,
        object: item.object,
        url: item.url,
        lastEditedTime: item.last_edited_time,
      })) || [],
    nextCursor: res.next_cursor || null,
    hasMore: Boolean(res.has_more),
  };
};
