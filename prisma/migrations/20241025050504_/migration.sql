/*
  Warnings:

  - You are about to drop the column `created_at` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `share_Date` on the `folders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "folders" DROP COLUMN "created_at",
DROP COLUMN "share_Date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "shareDate" TIMESTAMP(3);
