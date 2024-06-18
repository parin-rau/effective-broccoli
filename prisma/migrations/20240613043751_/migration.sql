/*
  Warnings:

  - You are about to drop the column `description` on the `Subtask` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subtask" (
    "subtaskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" BIGINT NOT NULL,
    CONSTRAINT "Subtask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subtask_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("projectId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("taskId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subtask" ("externalLink", "progress", "projectId", "subtaskId", "taskId", "timestamp", "title", "userId") SELECT "externalLink", "progress", "projectId", "subtaskId", "taskId", "timestamp", "title", "userId" FROM "Subtask";
DROP TABLE "Subtask";
ALTER TABLE "new_Subtask" RENAME TO "Subtask";
CREATE UNIQUE INDEX "Subtask_subtaskId_key" ON "Subtask"("subtaskId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
