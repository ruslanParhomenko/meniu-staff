-- CreateTable
CREATE TABLE "public"."ReportBarRealtime" (
    "id" TEXT NOT NULL,
    "user_email" TEXT,
    "form_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportBarRealtime_pkey" PRIMARY KEY ("id")
);
