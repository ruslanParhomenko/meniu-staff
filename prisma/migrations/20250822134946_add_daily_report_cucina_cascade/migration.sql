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
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PreparedSalad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PreparedSecond" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PreparedSecond_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PreparedDessert" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PreparedDessert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cutting" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Cutting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Staff" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "portions" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
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
