import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";

interface DriveGetFileContentInput {
  userId: string;
  fileId: string;
}

export const driveGetFileContent = async ({ userId, fileId }: DriveGetFileContentInput) => {
  const { drive } = await getGoogleDriveClient(userId);
  const meta = await drive.files.get({ fileId, fields: "id, name, mimeType" });
  const mimeType = meta.data.mimeType;
  if (!mimeType || !mimeType.startsWith("text/")) {
    throw new Error("Only text files are supported for content reading.");
  }
  const res = await drive.files.get({ fileId, alt: "media" }, { responseType: "text" });
  return {
    fileId,
    fileName: meta.data.name,
    mimeType,
    content: res.data,
  };
};
