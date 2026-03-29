import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface UpdateCalendarEventInput {
  userId: string;
  eventId: string;
  calendarId?: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: { dateTime: string; timeZone?: string };
  end?: { dateTime: string; timeZone?: string };
}

export const calendarUpdateEvent = async ({
  userId,
  eventId,
  calendarId = 'primary',
  summary,
  description,
  location,
  start,
  end,
}: UpdateCalendarEventInput) => {
  const { calendar } = await getGoogleCalendarClient(userId);
  const res = await calendar.events.patch({
    calendarId,
    eventId,
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
