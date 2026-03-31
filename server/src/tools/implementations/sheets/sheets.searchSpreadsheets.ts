import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";

interface SearchSheetsArgs {
  userId: string;
  query: string;
  pageSize?: number;
}

export async function sheetsSearchSpreadsheets({ userId, query, pageSize = 10 }: SearchSheetsArgs) {
  const { drive } = await getGoogleDriveClient(userId);
  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.spreadsheet' and trashed=false and name contains '${query}'`,
    pageSize,
    fields: "files(id, name, createdTime, modifiedTime)"
  });
  return {
    spreadsheets: res.data.files
  };
}
