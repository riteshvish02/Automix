import { notionRequest } from "../../providers/notion/notion.client";
import { resolveNotionId } from "./notion.resolve";

interface NotionGetPageInput {
  userId: string;
  pageId?: string;
  pageName?: string;
}

export const notionGetPage = async ({ userId, pageId, pageName }: NotionGetPageInput) => {
  const resolvedPageId = await resolveNotionId({
    userId,
    object: "page",
    id: pageId,
    name: pageName,
  });

  const page = await notionRequest<any>(userId, `/pages/${resolvedPageId}`, {
    method: "GET",
  });

  return {
    id: page.id,
    url: page.url,
    archived: page.archived,
    inTrash: page.in_trash,
    lastEditedTime: page.last_edited_time,
    parent: page.parent,
    properties: page.properties,
  };
};
