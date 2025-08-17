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

-- AddForeignKey
ALTER TABLE "public"."Remark" ADD CONSTRAINT "Remark_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."RemarkReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
