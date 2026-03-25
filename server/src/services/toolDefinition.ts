
export const gdrive = [
  {
    type: "function",
    function: {
      name: "gdrive_search_files",
      description: "Search for files in Google Drive by name or keyword",
      parameters: {
        type: "object",
        properties: {
          query:      { type: "string", description: "File name or keyword" },
          maxResults: { type: "number" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "gdrive_download_and_send_email",
      description: "Download a file from Google Drive and send it as an email attachment",
      parameters: {
        type: "object",
        properties: {
          fileId:  { type: "string", description: "Google Drive file ID from search results" },
          to:      { type: "string", description: "Recipient email address" },
          subject: { type: "string", description: "Email subject" },
          body:    { type: "string", description: "Email body text" },
        },
        required: ["fileId", "to", "subject", "body"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "gdrive_share_and_send_link",
      description: "Share a Drive file and send its link via email",
      parameters: {
        type: "object",
        properties: {
          fileId:  { type: "string" },
          to:      { type: "string" },
          subject: { type: "string" },
          body:    { type: "string" },
        },
        required: ["fileId", "to"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "gdrive_save_as_docs",
      description: "Save/copy a file to Google Docs format",
      parameters: {
        type: "object",
        properties: {
          fileId:  { type: "string", description: "Source file ID" },
          newName: { type: "string", description: "Name for the new Doc" },
        },
        required: ["fileId"],
      },
    },
  },
];