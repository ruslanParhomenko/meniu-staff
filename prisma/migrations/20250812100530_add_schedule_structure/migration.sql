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

-- CreateIndex
CREATE INDEX "BreakeList_date_idx" ON "public"."BreakeList"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Hour_rowId_hour_key" ON "public"."Hour"("rowId", "hour");

-- AddForeignKey
ALTER TABLE "public"."Row" ADD CONSTRAINT "Row_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."BreakeList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hour" ADD CONSTRAINT "Hour_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "public"."Row"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
