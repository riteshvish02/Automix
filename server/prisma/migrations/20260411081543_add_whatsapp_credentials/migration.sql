-- CreateTable
CREATE TABLE "WhatsAppCredentials" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "authState" JSONB NOT NULL,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "connectionQR" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsAppCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppCredentials_userId_key" ON "WhatsAppCredentials"("userId");

-- CreateIndex
CREATE INDEX "WhatsAppCredentials_userId_isConnected_idx" ON "WhatsAppCredentials"("userId", "isConnected");

-- AddForeignKey
ALTER TABLE "WhatsAppCredentials" ADD CONSTRAINT "WhatsAppCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
