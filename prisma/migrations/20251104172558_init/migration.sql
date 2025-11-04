/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "hashedToken",
ADD COLUMN     "hashedRefreshToken" TEXT;
