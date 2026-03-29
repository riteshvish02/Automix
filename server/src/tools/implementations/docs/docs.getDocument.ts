import { getGoogleDocsClient } from "../../providers/google/googleDocs.client";

interface GetGoogleDocInput {
  userId: string;
  documentId: string;
}

export const docsGetDocument = async ({ userId, documentId }: GetGoogleDocInput) => {
  const { docs } = await getGoogleDocsClient(userId);
  const res = await docs.documents.get({
    documentId
  });
  return { document: res.data };
};
