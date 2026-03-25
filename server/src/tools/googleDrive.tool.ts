// lib/tools/gdrive.tool.ts
import { google } from "googleapis";
import { ToolDefinition } from "./types";

function getDrive(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.drive({ version: "v3", auth });
}

const exportMap: Record<string, { mime: string; ext: string }> = {
  "application/vnd.google-apps.document":     { mime: "application/pdf",                                                                          ext: ".pdf"  },
  "application/vnd.google-apps.spreadsheet":  { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",                        ext: ".xlsx" },
  "application/vnd.google-apps.presentation": { mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",                ext: ".pptx" },
};

export const gdriveTools: ToolDefinition[] = [

  // ────────────────────────────────────────────────────────────────────────────
  // 1. SEARCH FILES
  // ────────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gdrive_search_files",
        description:
          "Search for files in the user's Google Drive by filename or keyword. " +
          "Use this first whenever the user asks to find, locate, or send a file.",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Filename or keyword — e.g. 'resume', 'Q3 report'",
            },
            max_results: {
              type: "number",
              description: "Max files to return. Default 10.",
            },
          },
          required: ["query"],
        },
      },
    },
    provider: "gdrive",
    execute: async (args, accessToken) => {
      try {
        const drive = getDrive(accessToken!);
        const res = await drive.files.list({
          q: `name contains '${args.query}' and trashed = false`,
          pageSize: args.max_results ?? 10,
          fields: "files(id, name, mimeType, modifiedTime, webViewLink, size)",
        });
        return { success: true, data: { files: res.data.files ?? [] } };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 2. GET FILE METADATA  (lightweight — no download)
  // ────────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gdrive_get_file_content",
        description:
          "Get metadata of a specific file (name, type, view link, size). " +
          "Use this when you have a file_id and need its details but NOT the actual content. " +
          "For the actual file bytes use gdrive_download_file instead.",
        parameters: {
          type: "object",
          properties: {
            file_id: {
              type: "string",
              description: "Google Drive file ID from a previous search result",
            },
          },
          required: ["file_id"],
        },
      },
    },
    provider: "gdrive",
    execute: async (args, accessToken) => {
      try {
        const drive = getDrive(accessToken!);
        const meta = await drive.files.get({
          fileId: args.file_id,
          fields: "id, name, mimeType, webViewLink, size, createdTime, modifiedTime",
        });
        return {
          success: true,
          data: {
            fileId:       meta.data.id,
            name:         meta.data.name,
            mimeType:     meta.data.mimeType,
            viewLink:     meta.data.webViewLink,
            size:         meta.data.size,
            createdTime:  meta.data.createdTime,
            modifiedTime: meta.data.modifiedTime,
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 3. DOWNLOAD FILE  (returns base64 — use this before attaching to email)
  // ────────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gdrive_download_file",
        description:
          "Download the actual binary content of a file and return it as base64. " +
          "Always use this before attaching a file to an email. " +
          "Google Docs/Sheets/Slides are automatically exported to PDF/xlsx/pptx. " +
          "The returned base64 + mimeType can be passed directly to gmail_send_email attachments.",
        parameters: {
          type: "object",
          properties: {
            file_id: {
              type: "string",
              description: "Google Drive file ID to download",
            },
          },
          required: ["file_id"],
        },
      },
    },
    provider: "gdrive",
    execute: async (args, accessToken) => {
      try {
        const drive = getDrive(accessToken!);

        // step 1 — get metadata so we know the mimeType
        const meta = await drive.files.get({
          fileId: args.file_id,
          fields: "name, mimeType",
        });
        const { name, mimeType } = meta.data;

        let fileBuffer: Buffer;
        let finalMime = mimeType ?? "application/octet-stream";
        let finalName = name ?? args.file_id;

        // step 2 — Google Workspace files need export, regular files need alt=media
        if (mimeType && exportMap[mimeType]) {
          const { mime, ext } = exportMap[mimeType];
          const res = await drive.files.export(
            { fileId: args.file_id, mimeType: mime },
            { responseType: "arraybuffer" }
          );
          fileBuffer = Buffer.from(res.data as ArrayBuffer);
          finalMime = mime;
          // append correct extension if missing
          if (!finalName.endsWith(ext)) finalName += ext;
        } else {
          const res = await drive.files.get(
            { fileId: args.file_id, alt: "media" },
            { responseType: "arraybuffer" }
          );
          fileBuffer = Buffer.from(res.data as ArrayBuffer);
        }

        return {
          success: true,
          data: {
            name:     finalName,    // use this as filename in email attachment
            mimeType: finalMime,    // use this as mimeType in email attachment
            base64:   fileBuffer.toString("base64"),  // the actual file content
            sizeBytes: fileBuffer.length,
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 4. SHARE FILE  (make publicly accessible via link)
  // ────────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gdrive_share_file",
        description:
          "Make a Google Drive file accessible to anyone with the link. " +
          "Use this when you want to share a view link instead of attaching the file.",
        parameters: {
          type: "object",
          properties: {
            file_id: {
              type: "string",
              description: "Google Drive file ID to share",
            },
            role: {
              type: "string",
              enum: ["reader", "writer", "commenter"],
              description: "Permission level. Default: reader",
            },
          },
          required: ["file_id"],
        },
      },
    },
    provider: "gdrive",
    execute: async (args, accessToken) => {
      try {
        const drive = getDrive(accessToken!);
        await drive.permissions.create({
          fileId: args.file_id,
          requestBody: {
            type: "anyone",
            role: args.role ?? "reader",
          },
        });
        const meta = await drive.files.get({
          fileId: args.file_id,
          fields: "name, webViewLink",
        });
        return {
          success: true,
          data: {
            name:     meta.data.name,
            viewLink: meta.data.webViewLink,
            // ChatGPT will put this viewLink in the email body
          },
        };
      } catch (e: any) {
        return { success: false, error: `Permission denied: ${e.message}` };
      }
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 5. COPY AS GOOGLE DOC  (PDF → editable Doc)
  // ────────────────────────────────────────────────────────────────────────────
  {
    schema: {
      type: "function",
      function: {
        name: "gdrive_copy_as_doc",
        description:
          "Convert a PDF or file into an editable Google Doc. " +
          "Use this when the user wants to edit a PDF or non-editable file.",
        parameters: {
          type: "object",
          properties: {
            file_id: {
              type: "string",
              description: "Google Drive file ID to convert",
            },
            new_name: {
              type: "string",
              description: "Name for the new Google Doc. Optional.",
            },
          },
          required: ["file_id"],
        },
      },
    },
    provider: "gdrive",
    execute: async (args, accessToken) => {
      try {
        const drive = getDrive(accessToken!);
        const res = await drive.files.copy({
          fileId: args.file_id,
          requestBody: {
            name:     args.new_name ?? "Converted Doc",
            mimeType: "application/vnd.google-apps.document",
          },
        });
        return {
          success: true,
          data: {
            newFileId: res.data.id,
            name:      res.data.name,
            viewLink:  `https://docs.google.com/document/d/${res.data.id}/edit`,
          },
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  },
];
