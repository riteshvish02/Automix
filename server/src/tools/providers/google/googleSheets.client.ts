import { google } from "googleapis";
import { getValidGoogleOAuthClient } from "./googleAuth.service";

export const getGoogleSheetsClient = async (userId: string) => {
  const auth = await getValidGoogleOAuthClient(userId, "gsheets");
  return {
    sheets: google.sheets({ version: "v4", auth }),
    auth,
  };
};
