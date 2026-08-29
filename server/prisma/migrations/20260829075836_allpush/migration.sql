/*
  Warnings:

  - You are about to drop the `WhatsAppCredentials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WhatsAppCredentials" DROP CONSTRAINT "WhatsAppCredentials_userId_fkey";

-- DropTable
DROP TABLE "WhatsAppCredentials";
