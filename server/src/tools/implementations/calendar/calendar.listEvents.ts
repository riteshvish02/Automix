import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface ListCalendarEventsInput {
  userId: string;
  calendarId?: string;
  timeMin?: string; // ISO string
  timeMax?: string; // ISO string
  maxResults?: number;
}

export const calendarListEvents = async ({
  userId,
  calendarId = 'primary',
  timeMin,
  timeMax,
  maxResults = 10,
}: ListCalendarEventsInput) => {
  const { calendar } = await getGoogleCalendarClient(userId);
  const res = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    maxResults,
    singleEvents: true,
    orderBy: 'startTime',
  });
  return {
    events: res.data.items?.map(event => ({
      id: event.id,
      summary: event.summary,
      start: event.start,
      end: event.end,
      description: event.description,
      location: event.location,
      htmlLink: event.htmlLink,
    })) || [],
  };
};
