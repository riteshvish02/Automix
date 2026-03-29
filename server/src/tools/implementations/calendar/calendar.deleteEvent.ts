import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface DeleteCalendarEventInput {
  userId: string;
  eventId: string;
  calendarId?: string;
}

export const calendarDeleteEvent = async ({
  userId,
  eventId,
  calendarId = 'primary',
}: DeleteCalendarEventInput) => {
  const { calendar } = await getGoogleCalendarClient(userId);
  await calendar.events.delete({
    calendarId,
    eventId,
  });
  return { success: true };
};
