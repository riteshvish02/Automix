import { ErrorHandler } from "../../../utils/ErrorHandler";
import { notionRequest } from "../../providers/notion/notion.client";
import { resolveNotionId } from "./notion.resolve";

interface NotionAppendBlockChildrenInput {
  userId: string;
  blockId?: string;
  pageName?: string;
  content: string;
}

export const notionAppendBlockChildren = async ({
  userId,
  blockId,
  pageName,
  content,
}: NotionAppendBlockChildrenInput) => {
  if (!content?.trim()) {
    throw new ErrorHandler("content is required", 400);
  }

  const resolvedBlockId = await resolveNotionId({
    userId,
    object: "page",
    id: blockId,
    name: pageName,
  });

  const res = await notionRequest<{
    results?: any[];
  }>(userId, `/blocks/${resolvedBlockId}/children`, {
    method: "PATCH",
    body: JSON.stringify({
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content,
                },
              },
            ],
          },
        },
      ],
    }),
  });

  return {
    appendedCount: res.results?.length || 0,
    appendedBlocks: res.results || [],
  };
};
