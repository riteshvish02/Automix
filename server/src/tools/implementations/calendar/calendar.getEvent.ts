import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface GetCalendarEventInput {
  userId: string;
  eventId: string;
  calendarId?: string;
}

export const calendarGetEvent = async ({
  userId,
  eventId,
  calendarId = 'primary',
}: GetCalendarEventInput) => {
  const { calendar } = await getGoogleCalendarClient(userId);
  const res = await calendar.events.get({
    calendarId,
    eventId,
  });
  return {
    event: res.data,
  };
};
