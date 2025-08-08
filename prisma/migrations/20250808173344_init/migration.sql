/*
  Warnings:

  - You are about to drop the `BartenderUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MainEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BartenderUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MainEntity";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ServerUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
