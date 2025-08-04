/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MainEntity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stopItems" JSONB NOT NULL,
    "tobacco" JSONB NOT NULL,
    "cashChecks" JSONB NOT NULL,
    "penaltyInvoices" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "ServerUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "workingTime" TEXT NOT NULL,
    "mainEntityId" TEXT,
    CONSTRAINT "ServerUser_mainEntityId_fkey" FOREIGN KEY ("mainEntityId") REFERENCES "MainEntity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BartenderUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "workingTime" TEXT NOT NULL,
    "mainEntityId" TEXT,
    CONSTRAINT "BartenderUser_mainEntityId_fkey" FOREIGN KEY ("mainEntityId") REFERENCES "MainEntity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
