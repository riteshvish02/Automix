import { ToolDefinition } from "./toolTypes";
import { docsSearchDocuments } from "../implementations/docs/docs.searchDocuments";
import { sheetsSearchSpreadsheets } from "../implementations/sheets/sheets.searchSpreadsheets";
import { sheetsListSpreadsheets } from "../implementations/sheets/sheets.listSpreadsheets";
import { sheetsCreateSpreadsheet } from "../implementations/sheets/sheets.createSpreadsheet";
import { sheetsGetSpreadsheet } from "../implementations/sheets/sheets.getSpreadsheet";
import { sheetsAppendRow } from "../implementations/sheets/sheets.appendRow";
import { driveSearchFiles } from "../implementations/drive/drive.searchFiles";
import { driveDownloadFile } from "../implementations/drive/drive.downloadFile";
import { gmailSendEmail } from "../implementations/gmail/gmail.sendEmail";
import { driveCreateFile } from "../implementations/drive/drive.createFile";
import { driveGetFileContent } from "../implementations/drive/drive.getFileContent";
import { gmailSearchEmails } from "../implementations/gmail/gmail.searchEmails";
import { gmailReadEmail } from "../implementations/gmail/gmail.readEmail";
import { gmailGetLatestEmail } from "../implementations/gmail/gmail.getLatestEmail";
import { calendarUpdateEvent } from "../implementations/calendar/calendar.updateEvent";
import { calendarDeleteEvent } from "../implementations/calendar/calendar.deleteEvent";
import { calendarGetEvent } from "../implementations/calendar/calendar.getEvent";
import { calendarListCalendars } from "../implementations/calendar/calendar.listCalendars";
import { calendarCreateEvent } from "../implementations/calendar/calendar.createEvent"; 
import { calendarListEvents } from "../implementations/calendar/calendar.listEvents";
import { calendarCreateMeetEvent } from "../implementations/calendar/calendar.createMeetEvent";
import { docsCreateDocument } from "../implementations/docs/docs.createDocument";
import { docsGetDocument } from "../implementations/docs/docs.getDocument";
import { docsUpdateDocument } from "../implementations/docs/docs.updateDocument";
import { docsListDocuments } from "../implementations/docs/docs.listDocuments";
import { slackPostMessage } from "../implementations/slack/slack.postMessage";
import { slackListChannels } from "../implementations/slack/slack.listChannels";

export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
    drive_create_file: {
      name: "drive_create_file",
      description: "Upload a file to Google Drive",
      inputSchema: {
        name: { type: "string", description: "Name of the file" },
        mimeType: { type: "string", description: "MIME type of the file" },
        content: { type: "string", description: "File content as base64 or plain text" },
        parents: { type: "array", items: { type: "string" }, description: "Optional array of parent folder IDs" }
      },
      execute: async (args, ctx) => {
        // Always decode base64 for non-text files
        let fileContent: Buffer | string = args.content;
        if (args.mimeType && !args.mimeType.startsWith('text/')) {
          try { fileContent = Buffer.from(args.content, 'base64'); } catch {}
        }
        return driveCreateFile({
          userId: ctx.userId,
          name: args.name,
          mimeType: args.mimeType,
          content: fileContent,
          parents: args.parents,
        });
      },
    },

    drive_get_file_content: {
      name: "drive_get_file_content",
      description: "Get the content of a text file from Google Drive",
      inputSchema: {
        fileId: { type: "string", description: "ID of the file to get content from" }
      },
      execute: async (args, ctx) => {
        return driveGetFileContent({
          userId: ctx.userId,
          fileId: args.fileId,
        });
      },
    },

    gmail_search_emails: {
      name: "gmail_search_emails",
      description: "Search or list emails in Gmail",
      inputSchema: {
        query: { type: "string", description: "Gmail search query", nullable: true },
        maxResults: { type: "integer", description: "Maximum number of results", nullable: true },
        labelIds: { type: "array", items: { type: "string" }, description: "Optional Gmail label IDs filter (for example, INBOX)", nullable: true },
        includeDetails: { type: "boolean", description: "If true, returns from/to/subject/date metadata for each result", nullable: true }
      },
      execute: async (args, ctx) => {
        return gmailSearchEmails({
          userId: ctx.userId,
          query: args.query,
          maxResults: args.maxResults,
          labelIds: args.labelIds,
          includeDetails: args.includeDetails,
        });
      },
    },

    gmail_get_latest_email: {
      name: "gmail_get_latest_email",
      description: "Get the latest email, optionally filtered by Gmail query and labels",
      inputSchema: {
        query: { type: "string", description: "Optional Gmail query filter, for example from:ceo@company.com newer_than:7d", nullable: true },
        labelIds: { type: "array", items: { type: "string" }, description: "Optional Gmail label IDs filter (for example, INBOX)", nullable: true }
      },
      execute: async (args, ctx) => {
        return gmailGetLatestEmail({
          userId: ctx.userId,
          query: args.query,
          labelIds: args.labelIds,
        });
      },
    },

    gmail_read_email: {
      name: "gmail_read_email",
      description: "Read the content of a specific Gmail message",
      inputSchema: {
        messageId: { type: "string", description: "ID of the Gmail message to read", nullable: true },
        id: { type: "string", description: "Alias for messageId", nullable: true }
      },
      execute: async (args, ctx) => {
        return gmailReadEmail({
          userId: ctx.userId,
          messageId: args.messageId,
          id: args.id,
        });
      },
    },
  drive_search_files: {
    name: "drive_search_files",
    description: "Search files in Google Drive by name",
    inputSchema: {
      query: { type: "string", description: "Search query for file name" },
      pageSize: { type: "integer", description: "Maximum number of results", nullable: true }
    },
    execute: async (args, ctx) => {
      return driveSearchFiles({
        userId: ctx.userId,
        query: args.query,
        pageSize: args.pageSize,
      });
    },
  },

  drive_download_file: {
    name: "drive_download_file",
    description: "Download a Google Drive file and store as artifact",
    inputSchema: {
      fileId: { type: "string", description: "ID of the file to download" },
    },
    execute: async (args, ctx) => {
      return driveDownloadFile({
        userId: ctx.userId,
        fileId: args.fileId,
      });
    },
  },

  gmail_send_email: {
    name: "gmail_send_email",
    description: "Send an email with optional attachments",
    inputSchema: {
      to: { type: "array", items: { type: "string" }, description: "Recipient email addresses" },
      subject: { type: "string", description: "Email subject" },
      body: { type: "string", description: "Email body" },
      attachmentArtifactIds: { type: "array", items: { type: "string" }, description: "Optional artifact IDs for attachments", nullable: true }
    },
    execute: async (args, ctx) => {
      return gmailSendEmail({
        userId: ctx.userId,
        to: args.to,
        subject: args.subject,
        body: args.body,
        attachmentArtifactIds: args.attachmentArtifactIds,
      });
    },
  },
  calendar_list_events: {
    name: "calendar_list_events",
    description: "List upcoming events from Google Calendar.",
    inputSchema: {
      calendarId: { type: "string", description: "Calendar ID (default: primary)", nullable: true },
      timeMin: { type: "string", description: "Start time (ISO string, optional)", nullable: true },
      timeMax: { type: "string", description: "End time (ISO string, optional)", nullable: true },
      maxResults: { type: "integer", description: "Maximum number of events to return", nullable: true }
    },
    execute: async (args, ctx) => {
      return calendarListEvents({
        userId: ctx.userId,
        calendarId: args.calendarId,
        timeMin: args.timeMin,
        timeMax: args.timeMax,
        maxResults: args.maxResults,
      });
    },
  },
  calendar_create_event: {
    name: "calendar_create_event",
    description: "Create a new event in Google Calendar.",
    inputSchema: {
      calendarId: { type: "string", description: "Calendar ID (default: primary)", nullable: true },
      summary: { type: "string", description: "Event summary/title" },
      description: { type: "string", description: "Event description", nullable: true },
      location: { type: "string", description: "Event location", nullable: true },
      start: { type: "object", description: "Start time object (dateTime, timeZone)", properties: { dateTime: { type: "string" }, timeZone: { type: "string", nullable: true } } },
      end: { type: "object", description: "End time object (dateTime, timeZone)", properties: { dateTime: { type: "string" }, timeZone: { type: "string", nullable: true } } }
    },
    execute: async (args, ctx) => {
      return calendarCreateEvent({
        userId: ctx.userId,
        calendarId: args.calendarId,
        summary: args.summary,
        description: args.description,
        location: args.location,
        start: args.start,
        end: args.end,
      });
    },
  },
  calendar_update_event: {
    name: "calendar_update_event",
    description: "Update an existing event in Google Calendar.",
    inputSchema: {
      eventId: { type: "string", description: "Event ID to update" },
      calendarId: { type: "string", description: "Calendar ID (default: primary)", nullable: true },
      summary: { type: "string", description: "Event summary/title", nullable: true },
      description: { type: "string", description: "Event description", nullable: true },
      location: { type: "string", description: "Event location", nullable: true },
      start: { type: "object", description: "Start time object (dateTime, timeZone)", properties: { dateTime: { type: "string" }, timeZone: { type: "string", nullable: true } }, nullable: true },
      end: { type: "object", description: "End time object (dateTime, timeZone)", properties: { dateTime: { type: "string" }, timeZone: { type: "string", nullable: true } }, nullable: true }
    },
    execute: async (args, ctx) => {
      return calendarUpdateEvent({
        userId: ctx.userId,
        eventId: args.eventId,
        calendarId: args.calendarId,
        summary: args.summary,
        description: args.description,
        location: args.location,
        start: args.start,
        end: args.end,
      });
    },
  },

  calendar_delete_event: {
    name: "calendar_delete_event",
    description: "Delete an event from Google Calendar.",
    inputSchema: {
      eventId: { type: "string", description: "Event ID to delete" },
      calendarId: { type: "string", description: "Calendar ID (default: primary)", nullable: true }
    },
    execute: async (args, ctx) => {
      return calendarDeleteEvent({
        userId: ctx.userId,
        eventId: args.eventId,
        calendarId: args.calendarId,
      });
    },
  },

  calendar_get_event: {
    name: "calendar_get_event",
    description: "Get details of a specific event from Google Calendar.",
    inputSchema: {
      eventId: { type: "string", description: "Event ID to fetch" },
      calendarId: { type: "string", description: "Calendar ID (default: primary)", nullable: true }
    },
    execute: async (args, ctx) => {
      return calendarGetEvent({
        userId: ctx.userId,
        eventId: args.eventId,
        calendarId: args.calendarId,
      });
    },
  },

  calendar_list_calendars: {
    name: "calendar_list_calendars",
    description: "List all calendars accessible by the user.",
    inputSchema: {},
    execute: async (args, ctx) => {
      return calendarListCalendars({
        userId: ctx.userId,
      });
    },
  },
  calendar_create_meet_event: {
    name: "calendar_create_meet_event",
    description: "Create a new Google Calendar event with a Google Meet link.",
    inputSchema: {
      calendarId: { type: "string", description: "Calendar ID (default: primary)", nullable: true },
      summary: { type: "string", description: "Event summary/title" },
      description: { type: "string", description: "Event description", nullable: true },
      location: { type: "string", description: "Event location", nullable: true },
      start: { type: "object", description: "Start time object (dateTime, timeZone)", properties: { dateTime: { type: "string" }, timeZone: { type: "string", nullable: true } } },
      end: { type: "object", description: "End time object (dateTime, timeZone)", properties: { dateTime: { type: "string" }, timeZone: { type: "string", nullable: true } } },
      attendees: { type: "array", items: { type: "object", properties: { email: { type: "string" } } }, description: "List of attendee emails", nullable: true }
    },
    execute: async (args, ctx) => {
      return calendarCreateMeetEvent({
        userId: ctx.userId,
        calendarId: args.calendarId,
        summary: args.summary,
        description: args.description,
        location: args.location,
        start: args.start,
        end: args.end,
        attendees: args.attendees,
      });
    },
  },
  docs_create_document: {
    name: "docs_create_document",
    description: "Create a new Google Doc document.",
    inputSchema: {
      title: { type: "string", description: "Title of the new document" }
    },
    execute: async (args, ctx) => {
      return docsCreateDocument({
        userId: ctx.userId,
        title: args.title
      });
    },
  },

  docs_get_document: {
    name: "docs_get_document",
    description: "Get a Google Doc document by ID.",
    inputSchema: {
      documentId: { type: "string", description: "ID of the document to fetch" }
    },
    execute: async (args, ctx) => {
      return docsGetDocument({
        userId: ctx.userId,
        documentId: args.documentId
      });
    },
  },
   docs_search_documents: {
    name: "docs_search_documents",
    description: "Search Google Docs documents in the user's Drive by name.",
    inputSchema: {
      query: { type: "string", description: "Search query for document name" },
      pageSize: { type: "integer", description: "Maximum number of results", nullable: true }
    },
    execute: async (args, ctx) => {
      return docsSearchDocuments({
        userId: ctx.userId,
        query: args.query,
        pageSize: args.pageSize
      });
    },
  },
  docs_update_document: {
    name: "docs_update_document",
    description: "Update a Google Doc document using batchUpdate requests.",
    inputSchema: {
      documentId: { type: "string", description: "ID of the document to update" },
      requests: {
        type: "array",
        description: "Array of Google Docs API request objects to apply",
        items: { type: "object" }
      }
    },
    execute: async (args, ctx) => {
      return docsUpdateDocument({
        userId: ctx.userId,
        documentId: args.documentId,
        requests: args.requests
      });
    },
  },

  docs_list_documents: {
    name: "docs_list_documents",
    description: "List all Google Docs documents in the user's Drive.",
    inputSchema: {
      pageSize: { type: "integer", description: "Number of documents to return (default 10)", nullable: true },
      pageToken: { type: "string", description: "Page token for pagination", nullable: true }
    },
    execute: async (args, ctx) => {
      return docsListDocuments({
        userId: ctx.userId,
        pageSize: args.pageSize,
        pageToken: args.pageToken
      });
    },
  },
   sheets_create_spreadsheet: {
    name: "sheets_create_spreadsheet",
    description: "Create a new Google Spreadsheet.",
    inputSchema: {
      title: { type: "string", description: "Title of the new spreadsheet" }
    },
    execute: async (args, ctx) => {
      return sheetsCreateSpreadsheet({
        userId: ctx.userId,
        title: args.title
      });
    },
  },

  sheets_get_spreadsheet: {
    name: "sheets_get_spreadsheet",
    description: "Get a Google Spreadsheet by ID.",
    inputSchema: {
      spreadsheetId: { type: "string", description: "ID of the spreadsheet to fetch" }
    },
    execute: async (args, ctx) => {
      return sheetsGetSpreadsheet({
        userId: ctx.userId,
        spreadsheetId: args.spreadsheetId
      });
    },
  },

  sheets_append_row: {
    name: "sheets_append_row",
    description: "Append a row to a Google Spreadsheet.",
    inputSchema: {
      spreadsheetId: { type: "string", description: "ID of the spreadsheet" },
      range: { type: "string", description: "A1 notation of the range to append to (e.g. 'Sheet1!A1')" },
      values: { type: "array", description: "2D array of values to append (rows/columns)", items: { type: "array" } }
    },
    execute: async (args, ctx) => {
      return sheetsAppendRow({
        userId: ctx.userId,
        spreadsheetId: args.spreadsheetId,
        range: args.range,
        values: args.values
      });
    },
  },
  sheets_list_spreadsheets: {
    name: "sheets_list_spreadsheets",
    description: "List all Google Sheets spreadsheets in the user's Drive.",
    inputSchema: {
      pageSize: { type: "integer", description: "Number of spreadsheets to return (default 10)", nullable: true },
      pageToken: { type: "string", description: "Page token for pagination", nullable: true }
    },
    execute: async (args, ctx) => {
      return sheetsListSpreadsheets({
        userId: ctx.userId,
        pageSize: args.pageSize,
        pageToken: args.pageToken
      });
    },
  },
  sheets_search_spreadsheets: {
    name: "sheets_search_spreadsheets",
    description: "Search Google Sheets spreadsheets in the user's Drive by name.",
    inputSchema: {
      query: { type: "string", description: "Search query for spreadsheet name" },
      pageSize: { type: "integer", description: "Maximum number of results", nullable: true }
    },
    execute: async (args, ctx) => {
      return sheetsSearchSpreadsheets({
        userId: ctx.userId,
        query: args.query,
        pageSize: args.pageSize
      });
    },
  },
  slack_post_message: {
    name: "slack_post_message",
    description: "Send a message to a Slack channel.",
    inputSchema: {
      channel: { type: "string", description: "Slack channel ID, e.g. C1234567890" },
      text: { type: "string", description: "Message text to send" }
    },
    execute: async (args, ctx) => {
      return slackPostMessage({
        userId: ctx.userId,
        channel: args.channel,
        text: args.text,
      });
    },
  },
  slack_list_channels: {
    name: "slack_list_channels",
    description: "List Slack channels available to the user.",
    inputSchema: {
      limit: { type: "integer", description: "Max channels to return (default 100)", nullable: true },
      cursor: { type: "string", description: "Pagination cursor from previous response", nullable: true }
    },
    execute: async (args, ctx) => {
      return slackListChannels({
        userId: ctx.userId,
        limit: args.limit,
        cursor: args.cursor,
      });
    },
  },
};