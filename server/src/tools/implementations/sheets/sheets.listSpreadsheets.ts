import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";

interface ListSheetsArgs {
  userId: string;
  pageSize?: number;
  pageToken?: string;
}

export async function sheetsListSpreadsheets({ userId, pageSize = 10, pageToken }: ListSheetsArgs) {
  const { drive } = await getGoogleDriveClient(userId);
  const res = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
    pageSize,
    pageToken,
    fields: "nextPageToken, files(id, name, createdTime, modifiedTime)"
  });
  return {
    spreadsheets: res.data.files,
    nextPageToken: res.data.nextPageToken || null
  };
}
