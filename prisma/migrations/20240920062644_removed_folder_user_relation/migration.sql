/*
  Warnings:

  - You are about to drop the column `userId` on the `folders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_userId_fkey";

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "userId";
