import { calendar_v3 } from "googleapis";
import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface SearchCalendarEventsArgs {
  userId: string;
  calendarId?: string;
  query?: string; // search in summary or description
  timeMin?: string;
  timeMax?: string;
  maxResults?: number;
}

export async function calendarSearchEvents({
  userId,
  calendarId = "primary",
  query,
  timeMin,
  timeMax,
  maxResults = 10
}: SearchCalendarEventsArgs) {
  const { calendar } = await getGoogleCalendarClient(userId);
  const params: calendar_v3.Params$Resource$Events$List = {
    calendarId,
    maxResults,
    singleEvents: true,
    orderBy: "startTime",
    q: query,
    timeMin,
    timeMax
  };
  // Remove undefined params (fix TS7053 error)
  Object.keys(params).forEach(key => ((params as any)[key] === undefined) && delete (params as any)[key]);
  const res = await calendar.events.list(params);
  return {
    events: res.data.items
  };
}
