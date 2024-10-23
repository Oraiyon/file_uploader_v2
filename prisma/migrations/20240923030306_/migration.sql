/*
  Warnings:

  - You are about to drop the column `userId` on the `folders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `folders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_userId_fkey";

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "folders_name_key" ON "folders"("name");
