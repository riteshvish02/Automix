import { google } from "googleapis";
import { getValidGoogleOAuthClient } from "./googleAuth.service";

export const getGoogleCalendarClient = async (userId: string) => {
  const auth = await getValidGoogleOAuthClient(userId, "calendar");
  return {
    calendar: google.calendar({
      version: "v3",
      auth,
    }),
    auth,
  };
};
