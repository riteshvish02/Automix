import { getGoogleCalendarClient } from "../../providers/google/googleCalendar.client";

interface CreateMeetEventInput {
  userId: string;
  calendarId?: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime: string; timeZone?: string };
  end: { dateTime: string; timeZone?: string };
  attendees?: Array<{ email: string }>;
}

export const calendarCreateMeetEvent = async ({
  userId,
  calendarId = 'primary',
  summary,
  description,
  location,
  start,
  end,
  attendees = []
}: CreateMeetEventInput) => {
  const { calendar } = await getGoogleCalendarClient(userId);
  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      location,
      start,
      end,
      attendees,
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(2),
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      }
    },
    conferenceDataVersion: 1
  });
  return {
    event: res.data,
    meetLink: res.data.conferenceData?.entryPoints?.find(e => e.entryPointType === "video")?.uri || null
  };
};
