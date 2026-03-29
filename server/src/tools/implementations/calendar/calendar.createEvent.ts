import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface CreateCalendarEventInput {
  userId: string;
  calendarId?: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime: string; timeZone?: string };
  end: { dateTime: string; timeZone?: string };
}

export const calendarCreateEvent = async ({
  userId,
  calendarId = 'primary',
  summary,
  description,
  location,
  start,
  end,
}: CreateCalendarEventInput) => {
  const { calendar } = await getGoogleCalendarClient(userId);
  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      location,
      start,
      end,
    },
  });
  return {
    event: res.data,
  };
};
