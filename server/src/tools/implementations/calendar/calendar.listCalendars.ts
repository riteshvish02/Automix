import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface ListCalendarsInput {
  userId: string;
}

export const calendarListCalendars = async ({ userId }: ListCalendarsInput) => {
  const { calendar } = await getGoogleCalendarClient(userId);
  const res = await calendar.calendarList.list();
  return {
    calendars: res.data.items?.map(cal => ({
      id: cal.id,
      summary: cal.summary,
      description: cal.description,
      primary: cal.primary,
      accessRole: cal.accessRole,
    })) || [],
  };
};
