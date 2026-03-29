import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";

interface SearchDriveFilesInput {
  userId: string;
  query: string;
  pageSize?: number;
}

export const driveSearchFiles = async ({
  userId,
  query,
  pageSize = 10,
}: SearchDriveFilesInput) => {
  const { drive } = await getGoogleDriveClient(userId);

  const res = await drive.files.list({
    q: `name contains '${query}' and trashed = false`,
    pageSize,
    fields: "files(id, name, mimeType, modifiedTime, size, webViewLink)",
    orderBy: "modifiedTime desc",
  });

  return {
    files:
      res.data.files?.map((file: any) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        modifiedTime: file.modifiedTime,
        size: file.size,
        webViewLink: file.webViewLink,
      })) || [],
  };
};