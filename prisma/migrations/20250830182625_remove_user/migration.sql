/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `remarks_realtime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report_bar_realtime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report_cucina_realtime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."remarks_realtime";

-- DropTable
DROP TABLE "public"."report_bar_realtime";

-- DropTable
DROP TABLE "public"."report_cucina_realtime";

-- DropEnum
DROP TYPE "public"."Role";
