import { google } from "googleapis";
import { getValidGoogleOAuthClient } from "./googleAuth.service";

export const getGoogleDriveClient = async (userId: string) => {
  const auth = await getValidGoogleOAuthClient(userId, "gdrive");
  return {
    drive: google.drive({
      version: "v3",
      auth,
    }),
    auth,
  };
};