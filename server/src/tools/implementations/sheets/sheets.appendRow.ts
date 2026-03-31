import { getGoogleSheetsClient } from "../../providers/google/googleSheets.client";

interface AppendRowArgs {
  userId: string;
  spreadsheetId: string;
  range: string; // e.g. "Sheet1!A1"
  values: any[][]; // 2D array for rows/columns
}

export async function sheetsAppendRow({ userId, spreadsheetId, range, values }: AppendRowArgs) {
  const { sheets } = await getGoogleSheetsClient(userId);
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values
    }
  });
  return res.data;
}
