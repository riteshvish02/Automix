import { google } from "googleapis";
import { getValidGoogleOAuthClient } from "./googleAuth.service";

export const getGmailClient = async (userId: string) => {
  const auth = await getValidGoogleOAuthClient(userId, "gmail");

  return google.gmail({
    version: "v1",
    auth,
  });
};