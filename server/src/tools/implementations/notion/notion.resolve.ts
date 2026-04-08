import { ErrorHandler } from "../../../utils/ErrorHandler";
import { notionRequest } from "../../providers/notion/notion.client";

type NotionObjectType = "page" | "database";

const getPlainText = (items: any[] | undefined) => {
  if (!Array.isArray(items)) {
    return "";
  }

  return items
    .map((item) => item?.plain_text || item?.text?.content || "")
    .join("")
    .trim();
};

const getPageTitle = (page: any) => {
  const properties = page?.properties || {};
  for (const value of Object.values(properties) as any[]) {
    if (value?.type === "title") {
      return getPlainText(value?.title);
    }
  }
  return "";
};

const getNotionObjectTitle = (item: any) => {
  if (item?.object === "database") {
    return getPlainText(item?.title);
  }

  if (item?.object === "page") {
    return getPageTitle(item);
  }

  return "";
};

const scoreCandidate = (query: string, title: string) => {
  const q = query.toLowerCase().trim();
  const t = title.toLowerCase().trim();

  if (!t) {
    return 0;
  }
  if (t === q) {
    return 100;
  }
  if (t.startsWith(q)) {
    return 80;
  }
  if (t.includes(q)) {
    return 60;
  }
  return 10;
};

const parseIdOrUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const u = new URL(trimmed);
      const last = u.pathname.split("/").filter(Boolean).pop() || "";
      return last.split("?")[0].split("#")[0];
    }
  } catch {
    return trimmed;
  }

  return trimmed;
};

export const resolveNotionId = async ({
  userId,
  object,
  id,
  name,
}: {
  userId: string;
  object: NotionObjectType;
  id?: string;
  name?: string;
}) => {
  if (id?.trim()) {
    return parseIdOrUrl(id);
  }

  if (!name?.trim()) {
    throw new ErrorHandler(
      `Provide either ${object}Id or ${object}Name`,
      400
    );
  }

  const search = await notionRequest<{
    results?: any[];
  }>(userId, "/search", {
    method: "POST",
    body: JSON.stringify({
      query: name,
      page_size: 10,
      filter: {
        property: "object",
        value: object,
      },
    }),
  });

  const candidates = (search.results || []).map((item: any) => ({
    id: item.id,
    title: getNotionObjectTitle(item),
    score: scoreCandidate(name, getNotionObjectTitle(item)),
  }));

  if (candidates.length === 0) {
    throw new ErrorHandler(
      `No Notion ${object} found for name: ${name}`,
      404
    );
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0].id;
};
