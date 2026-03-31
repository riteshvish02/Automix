import { getGoogleSheetsClient } from "../../providers/google/googleSheets.client";

interface GetSpreadsheetArgs {
  userId: string;
  spreadsheetId: string;
}

export async function sheetsGetSpreadsheet({ userId, spreadsheetId }: GetSpreadsheetArgs) {
  const { sheets } = await getGoogleSheetsClient(userId);
  const res = await sheets.spreadsheets.get({
    spreadsheetId
  });
  return res.data;
}
