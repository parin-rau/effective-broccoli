/*
  Warnings:

  - You are about to drop the column `progress` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "taskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "due" BIGINT,
    "externalLink" TEXT,
    "timestamp" BIGINT NOT NULL
);
INSERT INTO "new_Task" ("description", "externalLink", "projectId", "taskId", "timestamp", "title", "userId") SELECT "description", "externalLink", "projectId", "taskId", "timestamp", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");
PRAGMA foreign_key_check("Task");
PRAGMA foreign_keys=ON;
