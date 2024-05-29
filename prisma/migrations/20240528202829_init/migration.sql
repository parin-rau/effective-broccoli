/*
  Warnings:

  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Subtask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Subtask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "projectId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Project" ("progress", "projectId", "userId") SELECT "progress", "projectId", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");
CREATE TABLE "new_Subtask" (
    "subtaskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Subtask" ("description", "progress", "subtaskId", "taskId", "userId") SELECT "description", "progress", "subtaskId", "taskId", "userId" FROM "Subtask";
DROP TABLE "Subtask";
ALTER TABLE "new_Subtask" RENAME TO "Subtask";
CREATE UNIQUE INDEX "Subtask_subtaskId_key" ON "Subtask"("subtaskId");
CREATE TABLE "new_Task" (
    "taskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "externalLink" TEXT
);
INSERT INTO "new_Task" ("description", "externalLink", "progress", "taskId", "userId") SELECT "description", "externalLink", "progress", "taskId", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");
PRAGMA foreign_key_check("Project");
PRAGMA foreign_key_check("Subtask");
PRAGMA foreign_key_check("Task");
PRAGMA foreign_keys=ON;
