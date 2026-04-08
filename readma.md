// TOOL_REGISTRY.drive_create_file
{
  name: "drive_create_file",
  description: "Upload a file to Google Drive",
  inputSchema: {
    name: { type: "string", description: "Name of the file" },
    mimeType: { type: "string", description: "MIME type of the file" },
    content: { type: "string", description: "File content as base64 or plain text" },
    parents: {
      type: "array",
      items: { type: "string" },
      description: "Optional array of parent folder IDs"
    }
  },
  execute: async (args, ctx) => {
    let fileContent: Buffer | string = args.content;
    if (args.mimeType && !args.mimeType.startsWith("text/")) {
      try { fileContent = Buffer.from(args.content, "base64"); } catch {}
    }
    return driveCreateFile({
      userId: ctx.userId,
      name: args.name,
      mimeType: args.mimeType,
      content: fileContent,
      parents: args.parents,
    });
  }
}