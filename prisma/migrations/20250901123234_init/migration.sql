-- CreateTable
CREATE TABLE "public"."BreakeList" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BreakeList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Row" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT,
    "scheduleId" INTEGER NOT NULL,
    "h_9" CHAR(2),
    "h_10" CHAR(2),
    "h_11" CHAR(2),
    "h_12" CHAR(2),
    "h_13" CHAR(2),
    "h_14" CHAR(2),
    "h_15" CHAR(2),
    "h_16" CHAR(2),
    "h_17" CHAR(2),
    "h_18" CHAR(2),
    "h_19" CHAR(2),
    "h_20" CHAR(2),
    "h_21" CHAR(2),
    "h_22" CHAR(2),
    "h_23" CHAR(2),
    "h_24" CHAR(2),
    "h_01" CHAR(2),
    "h_02" CHAR(2),
    "h_03" CHAR(2),
    "h_04" CHAR(2),
    "h_05" CHAR(2),
    "h_06" CHAR(2),
    "h_07" CHAR(2),
    "h_00" CHAR(2),

    CONSTRAINT "Row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyReport" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductTransfer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "ProductTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CashVerify" (
    "id" SERIAL NOT NULL,
    "hours" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "CashVerify_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tobacco" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "incoming" INTEGER,
    "outgoing" INTEGER,
    "finalStock" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Tobacco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sum" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemarkReport" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RemarkReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Remark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "dayHours" TEXT NOT NULL DEFAULT '',
    "nightHours" TEXT NOT NULL DEFAULT '',
    "reason" TEXT NOT NULL DEFAULT '',
    "penality" TEXT NOT NULL DEFAULT '',
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Remark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyReportCucina" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "DailyReportCucina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Shift" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "time" TEXT NOT NULL,
    "over" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Remain" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Remain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PreparedSalad" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "time" TEXT,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PreparedSalad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PreparedSecond" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "time" TEXT,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PreparedSecond_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PreparedDessert" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "time" TEXT,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PreparedDessert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cutting" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT,
    "weight" TEXT NOT NULL,
    "time" TEXT,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Cutting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Staff" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "time" TEXT,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Movement" (
    "id" SERIAL NOT NULL,
    "nameOutside" TEXT NOT NULL,
    "nameInside" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WriteOff" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "WriteOff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BreakeList_date_key" ON "public"."BreakeList"("date");

-- CreateIndex
CREATE INDEX "BreakeList_date_idx" ON "public"."BreakeList"("date");

-- CreateIndex
CREATE INDEX "Row_scheduleId_idx" ON "public"."Row"("scheduleId");

-- AddForeignKey
ALTER TABLE "public"."Row" ADD CONSTRAINT "Row_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."BreakeList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductTransfer" ADD CONSTRAINT "ProductTransfer_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CashVerify" ADD CONSTRAINT "CashVerify_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tobacco" ADD CONSTRAINT "Tobacco_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Remark" ADD CONSTRAINT "Remark_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."RemarkReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Shift" ADD CONSTRAINT "Shift_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Remain" ADD CONSTRAINT "Remain_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PreparedSalad" ADD CONSTRAINT "PreparedSalad_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PreparedSecond" ADD CONSTRAINT "PreparedSecond_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PreparedDessert" ADD CONSTRAINT "PreparedDessert_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cutting" ADD CONSTRAINT "Cutting_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Movement" ADD CONSTRAINT "Movement_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WriteOff" ADD CONSTRAINT "WriteOff_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReportCucina"("id") ON DELETE CASCADE ON UPDATE CASCADE;
