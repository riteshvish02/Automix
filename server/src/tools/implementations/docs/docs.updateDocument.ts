import { getGoogleDocsClient } from "../../providers/google/googleDocs.client";

interface UpdateGoogleDocInput {
  userId: string;
  documentId: string;
  requests: any[]; // Google Docs API requests array
}

export const docsUpdateDocument = async ({ userId, documentId, requests }: UpdateGoogleDocInput) => {
  const { docs } = await getGoogleDocsClient(userId);
  const res = await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests
    }
  });
  return { result: res.data };
};
