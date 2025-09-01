/*
  Warnings:

  - You are about to drop the column `total` on the `DailyReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."DailyReport" DROP COLUMN "total";

-- CreateTable
CREATE TABLE "public"."ProductTransfer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "ProductTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ProductTransfer" ADD CONSTRAINT "ProductTransfer_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
