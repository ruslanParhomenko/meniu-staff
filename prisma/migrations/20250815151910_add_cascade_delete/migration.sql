-- DropForeignKey
ALTER TABLE "public"."CashVerify" DROP CONSTRAINT "CashVerify_reportId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_reportId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tobacco" DROP CONSTRAINT "Tobacco_reportId_fkey";

-- AddForeignKey
ALTER TABLE "public"."CashVerify" ADD CONSTRAINT "CashVerify_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tobacco" ADD CONSTRAINT "Tobacco_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
