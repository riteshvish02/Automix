import { ErrorHandler } from "../../../utils/ErrorHandler";
import { notionRequest } from "../../providers/notion/notion.client";
import { resolveNotionId } from "./notion.resolve";

interface NotionCreatePageInput {
  userId: string;
  title: string;
  parentPageId?: string;
  parentDatabaseId?: string;
  parentPageName?: string;
  parentDatabaseName?: string;
  titleProperty?: string;
  content?: string;
}

export const notionCreatePage = async ({
  userId,
  title,
  parentPageId,
  parentDatabaseId,
  parentPageName,
  parentDatabaseName,
  titleProperty = "Name",
  content,
}: NotionCreatePageInput) => {
  if (!title?.trim()) {
    throw new ErrorHandler("title is required", 400);
  }

  if (!parentPageId && !parentDatabaseId && !parentPageName && !parentDatabaseName) {
    throw new ErrorHandler(
      "Provide parentPageId/parentPageName or parentDatabaseId/parentDatabaseName",
      400
    );
  }

  const resolvedParentDatabaseId = await resolveNotionId({
    userId,
    object: "database",
    id: parentDatabaseId,
    name: parentDatabaseName,
  }).catch(() => undefined);

  const resolvedParentPageId = resolvedParentDatabaseId
    ? undefined
    : await resolveNotionId({
        userId,
        object: "page",
        id: parentPageId,
        name: parentPageName,
      }).catch(() => undefined);

  if (!resolvedParentDatabaseId && !resolvedParentPageId) {
    throw new ErrorHandler(
      "Unable to resolve parent page/database. Provide a valid parent id or name.",
      400
    );
  }

  const parent = resolvedParentDatabaseId
    ? { database_id: resolvedParentDatabaseId }
    : { page_id: resolvedParentPageId };

  const properties = resolvedParentDatabaseId
    ? {
        [titleProperty]: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      }
    : {
        title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      };

  const children = content?.trim()
    ? [
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
      ]
    : undefined;

  const page = await notionRequest<any>(userId, "/pages", {
    method: "POST",
    body: JSON.stringify({
      parent,
      properties,
      children,
    }),
  });

  return {
    id: page.id,
    url: page.url,
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
  };
};
