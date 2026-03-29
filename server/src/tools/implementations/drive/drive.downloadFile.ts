import { getGoogleDriveClient } from "../../providers/google/googleDrive.client";
import { createFileArtifact } from "../../../services/artifact.service";
import { ErrorHandler } from "../../../utils/ErrorHandler";

interface DriveDownloadFileInput {
  userId: string;
  fileId: string;
}

export const driveDownloadFile = async ({
  userId,
  fileId,
}: DriveDownloadFileInput) => {
  console.log("Starting driveDownloadFile with userId for riteshhhh:", userId, "and fileId:", fileId);

  let drive, auth;
  try {
    const driveResult = await getGoogleDriveClient(userId);
    drive = driveResult.drive;
    auth = driveResult.auth;
  } catch (err) {
    console.error("Failed to get Google Drive client:", err);
    throw new ErrorHandler("Google authentication failed. Please re-authenticate your Google account.", 401);
  }

  let meta;
  try {
    meta = await drive.files.get({
      fileId,
      fields: "id, name, mimeType",
    });
  } catch (err: any) {
    console.error("Failed to get file metadata:", err?.response?.data || err);
    if (err?.code === 403) {
      throw new ErrorHandler("You do not have permission to access this file. Please check file sharing and permissions.", 403);
    }
    throw new ErrorHandler("Failed to get file metadata from Google Drive.", 500);
  }

  const fileName = meta.data.name || "downloaded-file";
  const mimeType = meta.data.mimeType || "application/octet-stream";

  let response;
  let buffer;
  // Handle Google Docs export
  if (mimeType === "application/vnd.google-apps.document") {
    try {
      response = await drive.files.export(
        {
          fileId,
          mimeType: "application/pdf", // Export as PDF
        },
        {
          responseType: "arraybuffer",
        }
      );
      buffer = Buffer.from(response.data as ArrayBuffer);
    } catch (err: any) {
      console.error("Failed to export Google Doc from Drive:", err?.response?.data || err);
     
      throw new ErrorHandler("Failed to export Google Doc from Google Drive.", 500);
    }
  } else {
    // Normal file download
    try {
      response = await drive.files.get(
        {
          fileId,
          alt: "media",
        },
        {
          responseType: "arraybuffer",
        }
      );
      if (!response.data) {
        throw new ErrorHandler("Failed to download file: No data returned.", 500);
      }
      buffer = Buffer.from(response.data as ArrayBuffer);
    } catch (err: any) {
      console.error("Failed to download file from Google Drive:", err?.response?.data || err);
      
      throw new ErrorHandler("Failed to download file from Google Drive.", 500);
    }
  }

  const artifact = await createFileArtifact({
    userId,
    fileName: mimeType === "application/vnd.google-apps.document" ? `${fileName}.pdf` : fileName,
    mimeType: mimeType === "application/vnd.google-apps.document" ? "application/pdf" : mimeType,
    buffer,
    metadata: {
      source: "google_drive",
      driveFileId: fileId,
    },
  });

  return {
    artifactId: artifact.id,
    fileName: artifact.name,
    mimeType: artifact.mimeType,
  };
};