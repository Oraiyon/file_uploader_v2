/*
  Warnings:

  - Added the required column `publicId` to the `files` table without a default value. This is not possible if the table is not empty.
  - Made the column `format` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `files` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "publicId" TEXT NOT NULL,
ALTER COLUMN "format" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL;
