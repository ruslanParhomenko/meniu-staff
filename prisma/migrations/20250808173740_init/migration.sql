/*
  Warnings:

  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Employee" ("createdAt", "id", "name", "position") SELECT "createdAt", "id", "name", "position" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
