/*
  Warnings:

  - You are about to drop the `Hour` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[date]` on the table `BreakeList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Hour" DROP CONSTRAINT "Hour_rowId_fkey";

-- AlterTable
ALTER TABLE "public"."Row" ADD COLUMN     "h_00" CHAR(2),
ADD COLUMN     "h_01" CHAR(2),
ADD COLUMN     "h_02" CHAR(2),
ADD COLUMN     "h_03" CHAR(2),
ADD COLUMN     "h_04" CHAR(2),
ADD COLUMN     "h_05" CHAR(2),
ADD COLUMN     "h_06" CHAR(2),
ADD COLUMN     "h_07" CHAR(2),
ADD COLUMN     "h_10" CHAR(2),
ADD COLUMN     "h_11" CHAR(2),
ADD COLUMN     "h_12" CHAR(2),
ADD COLUMN     "h_13" CHAR(2),
ADD COLUMN     "h_14" CHAR(2),
ADD COLUMN     "h_15" CHAR(2),
ADD COLUMN     "h_16" CHAR(2),
ADD COLUMN     "h_17" CHAR(2),
ADD COLUMN     "h_18" CHAR(2),
ADD COLUMN     "h_19" CHAR(2),
ADD COLUMN     "h_20" CHAR(2),
ADD COLUMN     "h_21" CHAR(2),
ADD COLUMN     "h_22" CHAR(2),
ADD COLUMN     "h_23" CHAR(2),
ADD COLUMN     "h_24" CHAR(2),
ADD COLUMN     "h_9" CHAR(2);

-- DropTable
DROP TABLE "public"."Hour";

-- CreateIndex
CREATE UNIQUE INDEX "BreakeList_date_key" ON "public"."BreakeList"("date");

-- CreateIndex
CREATE INDEX "Row_scheduleId_idx" ON "public"."Row"("scheduleId");
