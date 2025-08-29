/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `RemarkReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."DailyReport" ALTER COLUMN "date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."RemarkReport" DROP COLUMN "updatedAt";
