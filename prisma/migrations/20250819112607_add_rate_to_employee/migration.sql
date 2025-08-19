-- CreateTable
CREATE TABLE "public"."Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "rate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "Row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hour" (
    "id" SERIAL NOT NULL,
    "hour" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "rowId" INTEGER NOT NULL,

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyReport" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "public"."report_bar_realtime" (
    "id" TEXT NOT NULL,
    "user_email" TEXT,
    "form_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_bar_realtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."break_list_realtime" (
    "id" TEXT NOT NULL,
    "user_email" TEXT,
    "form_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "break_list_realtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."remarks_realtime" (
    "id" TEXT NOT NULL,
    "user_email" TEXT,
    "form_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "remarks_realtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StopListRecord" (
    "id" SERIAL NOT NULL,
    "stopList" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StopListRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemarkReport" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
    "reasonPenality" TEXT NOT NULL DEFAULT '',
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Remark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BreakeList_date_idx" ON "public"."BreakeList"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Hour_rowId_hour_key" ON "public"."Hour"("rowId", "hour");

-- CreateIndex
CREATE UNIQUE INDEX "break_list_realtime_user_email_idx" ON "public"."break_list_realtime"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "remarks_realtime_user_email_idx" ON "public"."remarks_realtime"("user_email");

-- AddForeignKey
ALTER TABLE "public"."Row" ADD CONSTRAINT "Row_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."BreakeList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hour" ADD CONSTRAINT "Hour_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "public"."Row"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CashVerify" ADD CONSTRAINT "CashVerify_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tobacco" ADD CONSTRAINT "Tobacco_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Remark" ADD CONSTRAINT "Remark_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."RemarkReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
