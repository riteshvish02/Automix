import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";

interface SearchDocsArgs {
  userId: string;
  query: string;
  pageSize?: number;
}

export async function docsSearchDocuments({ userId, query, pageSize = 10 }: SearchDocsArgs) {
  const { drive } = await getGoogleDriveClient(userId);
  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.document' and trashed=false and name contains '${query}'`,
    pageSize,
    fields: "files(id, name, createdTime, modifiedTime)"
  });
  return {
    documents: res.data.files
  };
}
