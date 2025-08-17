/*
  Warnings:

  - You are about to drop the `ReportBarRealtime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."ReportBarRealtime";

-- CreateTable
CREATE TABLE "public"."report_bar_realtime" (
    "id" TEXT NOT NULL,
    "user_email" TEXT,
    "form_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_bar_realtime_pkey" PRIMARY KEY ("id")
);
