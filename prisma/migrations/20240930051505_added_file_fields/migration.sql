-- AlterTable
ALTER TABLE "files" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "size" INTEGER;
