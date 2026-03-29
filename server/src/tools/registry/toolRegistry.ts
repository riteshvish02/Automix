import { calendarCreateEvent } from "../implementations/calendar/calendar.createEvent";
  
import { calendarListEvents } from "../implementations/calendar/calendar.listEvents";
  
import { ToolDefinition } from "./toolTypes";
import { driveSearchFiles } from "../implementations/drive/drive.searchFiles";
import { driveDownloadFile } from "../implementations/drive/drive.downloadFile";
import { gmailSendEmail } from "../implementations/gmail/gmail.sendEmail";
import { driveCreateFile } from "../implementations/drive/drive.createFile";
import { driveGetFileContent } from "../implementations/drive/drive.getFileContent";
import { gmailSearchEmails } from "../implementations/gmail/gmail.searchEmails";
import { gmailReadEmail } from "../implementations/gmail/gmail.readEmail";

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
        maxResults: { type: "integer", description: "Maximum number of results", nullable: true }
      },
      execute: async (args, ctx) => {
        return gmailSearchEmails({
          userId: ctx.userId,
          query: args.query,
          maxResults: args.maxResults,
        });
      },
    },

    gmail_read_email: {
      name: "gmail_read_email",
      description: "Read the content of a specific Gmail message",
      inputSchema: {
        messageId: { type: "string", description: "ID of the Gmail message to read" }
      },
      execute: async (args, ctx) => {
        return gmailReadEmail({
          userId: ctx.userId,
          messageId: args.messageId,
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
};