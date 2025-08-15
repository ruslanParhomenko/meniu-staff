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

-- AddForeignKey
ALTER TABLE "public"."CashVerify" ADD CONSTRAINT "CashVerify_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tobacco" ADD CONSTRAINT "Tobacco_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."DailyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
