import { getGoogleSheetsClient } from "../../providers/google/googleSheets.client";

interface CreateSpreadsheetArgs {
  userId: string;
  title: string;
}

export async function sheetsCreateSpreadsheet({ userId, title }: CreateSpreadsheetArgs) {
  const { sheets } = await getGoogleSheetsClient(userId);
  const res = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title }
    }
  });
  return { spreadsheetId: res.data.spreadsheetId, url: res.data.spreadsheetUrl };
}
