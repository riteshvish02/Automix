import { getGoogleDocsClient } from "../../providers/google/googleDocs.client";
import { ErrorHandler } from "../../../utils/ErrorHandler";

interface UpdateGoogleDocInput {
  userId: string;
  documentId: string;
  requests: Array<Record<string, any> | string>;
}

export const docsUpdateDocument = async ({ userId, documentId, requests }: UpdateGoogleDocInput) => {
  if (!Array.isArray(requests) || requests.length === 0) {
    throw new ErrorHandler("requests must be a non-empty array", 400);
  }

  const normalizedRequests = requests.map((req, index) => {
    if (typeof req === "string") {
      try {
        const parsed = JSON.parse(req);
        if (!parsed || typeof parsed !== "object") {
          throw new Error();
        }
        return parsed;
      } catch {
        throw new ErrorHandler(`Invalid JSON request at requests[${index}]`, 400);
      }
    }

    if (!req || typeof req !== "object") {
      throw new ErrorHandler(`Invalid request object at requests[${index}]`, 400);
    }

    return req;
  });

  const { docs } = await getGoogleDocsClient(userId);
  const res = await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: normalizedRequests
    }
  });
  return { result: res.data };
};
