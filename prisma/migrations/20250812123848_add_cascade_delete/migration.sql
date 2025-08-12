-- DropForeignKey
ALTER TABLE "public"."Hour" DROP CONSTRAINT "Hour_rowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Row" DROP CONSTRAINT "Row_scheduleId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Row" ADD CONSTRAINT "Row_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."BreakeList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hour" ADD CONSTRAINT "Hour_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "public"."Row"("id") ON DELETE CASCADE ON UPDATE CASCADE;
