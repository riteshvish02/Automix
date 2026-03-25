// lib/tools/gmail.tool.ts
import { google } from "googleapis";
import { ToolDefinition } from "./types";

function getGmail(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.gmail({ version: "v1", auth });
}

// ── helpers ───────────────────────────────────────────────────────────────────

// raw RFC 2822 message builder — handles text + attachments
function buildRawEmail({
  to,
  cc,
  bcc,
  subject,
  body,
  isHtml = false,
  attachments = [],
  inReplyTo,
  references,
}: {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  isHtml?: boolean;
  attachments?: { filename: string; base64: string; mimeType: string }[];
  inReplyTo?: string;
  references?: string;
}): string {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const hasAttachments = attachments.length > 0;

  const headers = [
    `To: ${to.join(", ")}`,
    cc?.length  ? `Cc: ${cc.join(", ")}`   : null,
    bcc?.length ? `Bcc: ${bcc.join(", ")}` : null,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
    inReplyTo  ? `In-Reply-To: ${inReplyTo}`   : null,
    references ? `References: ${references}`   : null,
    `MIME-Version: 1.0`,
    hasAttachments
      ? `Content-Type: multipart/mixed; boundary="${boundary}"`
      : `Content-Type: ${isHtml ? "text/html" : "text/plain"}; charset="UTF-8"`,
  ]
    .filter(Boolean)
    .join("\r\n");

  if (!hasAttachments) {
    return `${headers}\r\n\r\n${body}`;
  }

  // multipart body
  const bodyPart = [
    `--${boundary}`,
    `Content-Type: ${isHtml ? "text/html" : "text/plain"}; charset="UTF-8"`,
    `Content-Transfer-Encoding: quoted-printable`,
    ``,
    body,
  ].join("\r\n");

  const attachmentParts = attachments
    .map((a) =>
      [
        `--${boundary}`,
        `Content-Type: ${a.mimeType}; name="${a.filename}"`,
        `Content-Disposition: attachment; filename="${a.filename}"`,
        `Content-Transfer-Encoding: base64`,
        ``,
        // split base64 into 76-char lines (RFC 2045)
        a.base64.match(/.{1,76}/g)!.join("\r\n"),
      ].join("\r\n")
    )
    .join("\r\n");

  return `${headers}\r\n\r\n${bodyPart}\r\n${attachmentParts}\r\n--${boundary}--`;
}

// decode base64url gmail body
function decodeBody(data?: string | null): string {
  if (!data) return "";
  return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
}

// recursively extract parts from gmail payload
function extractParts(payload: any): {
  text: string;
  html: string;
  attachments: { filename: string; mimeType: string; attachmentId: string; size: number }[];
} {
  let text = "";
  let html = "";
  const attachments: { filename: string; mimeType: string; attachmentId: string; size: number }[] = [];

  function walk(part: any) {
    const mime = part.mimeType ?? "";

    if (mime === "text/plain" && part.body?.data) {
      text += decodeBody(part.body.data);
    } else if (mime === "text/html" && part.body?.data) {
      html += decodeBody(part.body.data);
    } else if (part.body?.attachmentId) {
      attachments.push({
        filename:     part.filename ?? "attachment",
        mimeType:     mime,
        attachmentId: part.body.attachmentId,
        size:         part.body.size ?? 0,
      });
    }

    if (part.parts) part.parts.forEach(walk);
  }

  walk(payload);
  return { text, html, attachments };
}

// pull a header value from message headers array
function header(headers: any[], name: string): string {
  return headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value ?? "";
}

// ── TOOL DEFINITIONS ──────────────────────────────────────────────────────────

export const gmailTools: ToolDefinition[] = [

  // ──────────────────────────────────────────────────────────────────────────
  // 1. SEND EMAIL
  // ──────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gmail_send_email",
        description:
          "Send an email via Gmail. Supports plain text and HTML body, " +
          "CC, BCC, and file attachments. " +
          "To attach a Google Drive file, first call gdrive_download_file to get base64, " +
          "then pass it in the attachments array here.",
        parameters: {
          type: "object",
          properties: {
            to: {
              type: "array",
              items: { type: "string" },
              description: "Recipient email addresses",
            },
            subject: { type: "string" },
            body: {
              type: "string",
              description: "Email body — plain text or HTML",
            },
            is_html: {
              type: "boolean",
              description: "Set true if body contains HTML. Default false.",
            },
            cc: {
              type: "array",
              items: { type: "string" },
              description: "CC recipients. Optional.",
            },
            bcc: {
              type: "array",
              items: { type: "string" },
              description: "BCC recipients. Optional.",
            },
            attachments: {
              type: "array",
              description:
                "Files to attach. Each item needs filename, mimeType, and base64 content. " +
                "Get base64 from gdrive_download_file.",
              items: {
                type: "object",
                properties: {
                  filename: { type: "string", description: "Filename with extension e.g. resume.pdf" },
                  mimeType: { type: "string", description: "MIME type e.g. application/pdf" },
                  base64:   { type: "string", description: "Base64 encoded file content from gdrive_download_file" },
                },
                required: ["filename", "mimeType", "base64"],
              },
            },
          },
          required: ["to", "subject", "body"],
        },
      },
    },
    provider: "gmail",
    execute: async (args, accessToken) => {
      try {
        const gmail = getGmail(accessToken!);
        const raw = buildRawEmail({
          to:          args.to,
          cc:          args.cc,
          bcc:         args.bcc,
          subject:     args.subject,
          body:        args.body,
          isHtml:      args.is_html ?? false,
          attachments: args.attachments ?? [],
        });

        const encoded = Buffer.from(raw)
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        const res = await gmail.users.messages.send({
          userId: "me",
          requestBody: { raw: encoded },
        });

        return {
          success: true,
          data: {
            messageId: res.data.id,
            threadId:  res.data.threadId,
            status:    "sent",
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. REPLY TO EMAIL
  // ──────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gmail_reply_email",
        description:
          "Reply to an existing email thread. " +
          "Use gmail_get_email first to get the messageId and threadId, then call this.",
        parameters: {
          type: "object",
          properties: {
            thread_id:   { type: "string", description: "Gmail thread ID to reply in" },
            message_id:  { type: "string", description: "The message ID you are replying to (for In-Reply-To header)" },
            to:          { type: "array", items: { type: "string" }, description: "Reply-to addresses" },
            subject:     { type: "string", description: "Subject — usually Re: <original subject>" },
            body:        { type: "string" },
            is_html:     { type: "boolean" },
            attachments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  filename: { type: "string" },
                  mimeType: { type: "string" },
                  base64:   { type: "string" },
                },
                required: ["filename", "mimeType", "base64"],
              },
            },
          },
          required: ["thread_id", "message_id", "to", "subject", "body"],
        },
      },
    },
    provider: "gmail",
    execute: async (args, accessToken) => {
      try {
        const gmail = getGmail(accessToken!);
        const raw = buildRawEmail({
          to:          args.to,
          subject:     args.subject,
          body:        args.body,
          isHtml:      args.is_html ?? false,
          attachments: args.attachments ?? [],
          inReplyTo:   args.message_id,
          references:  args.message_id,
        });

        const encoded = Buffer.from(raw)
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        const res = await gmail.users.messages.send({
          userId: "me",
          requestBody: { raw: encoded, threadId: args.thread_id },
        });

        return {
          success: true,
          data: { messageId: res.data.id, threadId: res.data.threadId, status: "replied" },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. LIST EMAILS
  // ──────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gmail_list_emails",
        description:
          "List emails from Gmail inbox. Returns message IDs and snippets. " +
          "Use gmail_get_email to read full content of a specific message.",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "Gmail search query e.g. 'is:unread', 'from:boss@company.com', " +
                "'subject:invoice', 'has:attachment'. Leave empty for recent inbox.",
            },
            max_results: {
              type: "number",
              description: "Number of emails to return. Default 10, max 50.",
            },
            page_token: {
              type: "string",
              description: "Pass nextPageToken from previous response to get next page.",
            },
          },
          required: [],
        },
      },
    },
    provider: "gmail",
    execute: async (args, accessToken) => {
      try {
        const gmail = getGmail(accessToken!);
        const res = await gmail.users.messages.list({
          userId:    "me",
          q:         args.query ?? "",
          maxResults: Math.min(args.max_results ?? 10, 50),
          pageToken: args.page_token,
        });

        const messages = res.data.messages ?? [];

        // fetch snippet + headers for each message in parallel
        const detailed = await Promise.all(
          messages.map((m) =>
            gmail.users.messages.get({
              userId: "me",
              id:     m.id!,
              format: "metadata",
              metadataHeaders: ["From", "To", "Subject", "Date"],
            })
          )
        );

        return {
          success: true,
          data: {
            emails: detailed.map((d) => ({
              messageId: d.data.id,
              threadId:  d.data.threadId,
              snippet:   d.data.snippet,
              from:      header(d.data.payload?.headers ?? [], "From"),
              to:        header(d.data.payload?.headers ?? [], "To"),
              subject:   header(d.data.payload?.headers ?? [], "Subject"),
              date:      header(d.data.payload?.headers ?? [], "Date"),
              labelIds:  d.data.labelIds,
            })),
            nextPageToken: res.data.nextPageToken ?? null,
            totalEstimate: res.data.resultSizeEstimate,
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. GET FULL EMAIL  (with body + attachment list)
  // ──────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gmail_get_email",
        description:
          "Read the full content of a specific email including body and attachment info. " +
          "To download an attachment call gmail_download_attachment with the attachmentId.",
        parameters: {
          type: "object",
          properties: {
            message_id: {
              type: "string",
              description: "Gmail message ID from gmail_list_emails",
            },
          },
          required: ["message_id"],
        },
      },
    },
    provider: "gmail",
    execute: async (args, accessToken) => {
      try {
        const gmail = getGmail(accessToken!);
        const res = await gmail.users.messages.get({
          userId: "me",
          id:     args.message_id,
          format: "full",
        });

        const headers   = res.data.payload?.headers ?? [];
        const { text, html, attachments } = extractParts(res.data.payload ?? {});

        return {
          success: true,
          data: {
            messageId:   res.data.id,
            threadId:    res.data.threadId,
            labelIds:    res.data.labelIds,
            from:        header(headers, "From"),
            to:          header(headers, "To"),
            cc:          header(headers, "Cc"),
            subject:     header(headers, "Subject"),
            date:        header(headers, "Date"),
            bodyText:    text,   // plain text version
            bodyHtml:    html,   // html version
            attachments,         // [{ filename, mimeType, attachmentId, size }]
            // pass attachmentId to gmail_download_attachment to get the file
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. DOWNLOAD ATTACHMENT  (returns base64 — same shape as gdrive_download_file)
  // ──────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gmail_download_attachment",
        description:
          "Download an attachment from a Gmail message and return it as base64. " +
          "Get the attachmentId from gmail_get_email first.",
        parameters: {
          type: "object",
          properties: {
            message_id: {
              type: "string",
              description: "Gmail message ID the attachment belongs to",
            },
            attachment_id: {
              type: "string",
              description: "attachmentId from gmail_get_email attachments array",
            },
            filename: {
              type: "string",
              description: "Original filename (pass through from gmail_get_email)",
            },
            mime_type: {
              type: "string",
              description: "MIME type (pass through from gmail_get_email)",
            },
          },
          required: ["message_id", "attachment_id", "filename", "mime_type"],
        },
      },
    },
    provider: "gmail",
    execute: async (args, accessToken) => {
      try {
        const gmail = getGmail(accessToken!);
        const res = await gmail.users.messages.attachments.get({
          userId:       "me",
          messageId:    args.message_id,
          id:           args.attachment_id,
        });

        // Gmail returns base64url — convert to standard base64
        const base64 = (res.data.data ?? "")
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        return {
          success: true,
          data: {
            filename:  args.filename,
            mimeType:  args.mime_type,
            base64,
            sizeBytes: res.data.size,
            // same shape as gdrive_download_file so agent can forward to gmail_send_email
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. SEARCH EMAILS  (dedicated — more powerful than list with query)
  // ──────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gmail_search_emails",
        description:
          "Search emails using Gmail's full search syntax. " +
          "Examples: 'from:hr@company.com has:attachment', " +
          "'subject:offer letter after:2024/01/01', 'is:unread label:important'.",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Full Gmail search query string",
            },
            max_results: {
              type: "number",
              description: "Max emails to return. Default 10.",
            },
          },
          required: ["query"],
        },
      },
    },
    provider: "gmail",
    execute: async (args, accessToken) => {
      try {
        const gmail = getGmail(accessToken!);
        const res = await gmail.users.messages.list({
          userId:     "me",
          q:          args.query,
          maxResults: Math.min(args.max_results ?? 10, 50),
        });

        const messages = res.data.messages ?? [];
        if (messages.length === 0) {
          return { success: true, data: { emails: [], total: 0 } };
        }

        const detailed = await Promise.all(
          messages.map((m) =>
            gmail.users.messages.get({
              userId: "me",
              id:     m.id!,
              format: "metadata",
              metadataHeaders: ["From", "To", "Subject", "Date"],
            })
          )
        );

        return {
          success: true,
          data: {
            emails: detailed.map((d) => ({
              messageId: d.data.id,
              threadId:  d.data.threadId,
              snippet:   d.data.snippet,
              from:      header(d.data.payload?.headers ?? [], "From"),
              to:        header(d.data.payload?.headers ?? [], "To"),
              subject:   header(d.data.payload?.headers ?? [], "Subject"),
              date:      header(d.data.payload?.headers ?? [], "Date"),
              labelIds:  d.data.labelIds,
            })),
            total: res.data.resultSizeEstimate,
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. MARK EMAIL  (read / unread / trash)
  // ──────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gmail_mark_email",
        description: "Mark an email as read, unread, or move it to trash.",
        parameters: {
          type: "object",
          properties: {
            message_id: { type: "string" },
            action: {
              type: "string",
              enum: ["read", "unread", "trash", "untrash", "star", "unstar"],
              description: "Action to perform on the email",
            },
          },
          required: ["message_id", "action"],
        },
      },
    },
    provider: "gmail",
    execute: async (args, accessToken) => {
      try {
        const gmail = getGmail(accessToken!);

        if (args.action === "trash") {
          await gmail.users.messages.trash({ userId: "me", id: args.message_id });
        } else if (args.action === "untrash") {
          await gmail.users.messages.untrash({ userId: "me", id: args.message_id });
        } else {
          const addLabels: string[]    = [];
          const removeLabels: string[] = [];

          if (args.action === "read")    removeLabels.push("UNREAD");
          if (args.action === "unread")  addLabels.push("UNREAD");
          if (args.action === "star")    addLabels.push("STARRED");
          if (args.action === "unstar")  removeLabels.push("STARRED");

          await gmail.users.messages.modify({
            userId: "me",
            id:     args.message_id,
            requestBody: { addLabelIds: addLabels, removeLabelIds: removeLabels },
          });
        }

        return { success: true, data: { messageId: args.message_id, action: args.action } };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },
];