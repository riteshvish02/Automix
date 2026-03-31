import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";

interface ListDocsArgs {
  userId: string;
  pageSize?: number;
  pageToken?: string;
}

export async function docsListDocuments({ userId, pageSize = 10, pageToken }: ListDocsArgs) {
  const { drive } = await getGoogleDriveClient(userId);
  const res = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.document' and trashed=false",
    pageSize,
    pageToken,
    fields: "nextPageToken, files(id, name, createdTime, modifiedTime)"
  });
  return {
    documents: res.data.files,
    nextPageToken: res.data.nextPageToken || null
  };
}
