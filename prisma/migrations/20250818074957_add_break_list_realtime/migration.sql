-- CreateTable
CREATE TABLE "public"."break_list_realtime" (
    "id" TEXT NOT NULL,
    "user_email" TEXT,
    "form_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "break_list_realtime_pkey" PRIMARY KEY ("id")
);
