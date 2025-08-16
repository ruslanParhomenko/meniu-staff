-- CreateTable
CREATE TABLE "public"."StopListRecord" (
    "id" SERIAL NOT NULL,
    "stopList" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StopListRecord_pkey" PRIMARY KEY ("id")
);
