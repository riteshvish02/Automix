import fs from "fs";
import { getGmailClient } from "../../providers/google/gmail.client";
import { getArtifactById } from "../../../services/artifact.service";
import { ErrorHandler } from "../../../utils/ErrorHandler";

interface GmailSendEmailInput {
  userId: string;
  to: string[];
  subject: string;
  body: string;
  attachmentArtifactIds?: string[];
}

function makeEmailRaw({
  to,
  subject,
  body,
  attachments = [],
}: {
  to: string[];
  subject: string;
  body: string;
  attachments?: {
    filename: string;
    mimeType: string;
    content: Buffer;
  }[];
}) {
  const boundary = "my-boundary-123456";

  let email = [
    `To: ${to.join(", ")}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    "",
    body,
    "",
  ];

  for (const attachment of attachments) {
    email.push(
      `--${boundary}`,
      `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      "",
      attachment.content.toString("base64"),
      ""
    );
  }

  email.push(`--${boundary}--`);

  return Buffer.from(email.join("\n"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export const gmailSendEmail = async ({
  userId,
  to,
  subject,
  body,
  attachmentArtifactIds = [],
}: GmailSendEmailInput) => {
  const gmail = await getGmailClient(userId);

  const attachments = [];

  for (const artifactId of attachmentArtifactIds) {
    const artifact = await getArtifactById(artifactId, userId);

    if (!artifact || !artifact.storagePath) {
      throw new ErrorHandler(`Attachment artifact not found: ${artifactId}`, 404);
    }

    const fileBuffer = fs.readFileSync(artifact.storagePath);

    attachments.push({
      filename: artifact.name || "attachment",
      mimeType: artifact.mimeType || "application/octet-stream",
      content: fileBuffer,
    });
  }

  const raw = makeEmailRaw({
    to,
    subject,
    body,
    attachments,
  });

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });

  return {
    messageId: res.data.id,
    threadId: res.data.threadId,
    status: "sent",
  };
};