import fs from "fs";
import path from "path";
import {prisma} from "../config/prisma";

const ARTIFACT_DIR = path.join(process.cwd(), "tmp", "artifacts");

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

export const createFileArtifact = async ({
  userId,
  fileName,
  mimeType,
  buffer,
  metadata,
}: {
  userId: string;
  fileName: string;
  mimeType?: string;
  buffer: Buffer;
  metadata?: any;
}) => {
  const uniqueName = `${Date.now()}-${fileName}`;
  const storagePath = path.join(ARTIFACT_DIR, uniqueName);

  fs.writeFileSync(storagePath, buffer);

  const artifact = await prisma.artifact.create({
    data: {
      userId,
      type: "file",
      name: fileName,
      mimeType,
      storagePath,
      metadata,
    },
  });

  return artifact;
};

export const getArtifactById = async (artifactId: string, userId: string) => {
  return prisma.artifact.findFirst({
    where: {
      id: artifactId,
      userId,
    },
  });
};