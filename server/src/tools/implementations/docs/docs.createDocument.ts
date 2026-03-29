import { getGoogleDocsClient } from "../../providers/google/googleDocs.client";

interface CreateGoogleDocInput {
  userId: string;
  title: string;
}

export const docsCreateDocument = async ({ userId, title }: CreateGoogleDocInput) => {
  const { docs } = await getGoogleDocsClient(userId);
  const res = await docs.documents.create({
    requestBody: {
      title
    }
  });
  return { documentId: res.data.documentId, document: res.data };
};
