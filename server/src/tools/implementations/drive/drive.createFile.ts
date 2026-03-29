import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";

interface DriveCreateFileInput {
  userId: string;
  name: string;
  mimeType: string;
  content: Buffer | string;
  parents?: string[];
}

export const driveCreateFile = async ({ userId, name, mimeType, content, parents }: DriveCreateFileInput) => {
  const { drive } = await getGoogleDriveClient(userId);
  const fileMetadata: any = { name };
  if (parents) fileMetadata.parents = parents;
  let body: Buffer | string;
  if (typeof content === "string") {
    if (mimeType && mimeType.startsWith("text/")) {
      body = content; // send as string for text files
    } else {
      body = Buffer.from(content, 'base64'); // decode base64 for binary
    }
  } else {
    body = content;
  }
  const media = { mimeType, body };
  const res = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, name, mimeType, webViewLink"
  });
  return {
    id: res.data.id,
    name: res.data.name,
    mimeType: res.data.mimeType,
    webViewLink: res.data.webViewLink,
  };
};
