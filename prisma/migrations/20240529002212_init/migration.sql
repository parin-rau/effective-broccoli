/*
  Warnings:

  - Added the required column `timestamp` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Subtask` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "taskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" INTEGER NOT NULL
);
INSERT INTO "new_Task" ("description", "externalLink", "progress", "projectId", "taskId", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "taskId", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL
);
INSERT INTO "new_User" ("password", "userId", "username") SELECT "password", "userId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_Project" (
    "projectId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" INTEGER NOT NULL
);
INSERT INTO "new_Project" ("description", "externalLink", "progress", "projectId", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "title", "userId" FROM "Project";
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
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" INTEGER NOT NULL
);
INSERT INTO "new_Subtask" ("description", "externalLink", "progress", "projectId", "subtaskId", "taskId", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "subtaskId", "taskId", "title", "userId" FROM "Subtask";
DROP TABLE "Subtask";
ALTER TABLE "new_Subtask" RENAME TO "Subtask";
CREATE UNIQUE INDEX "Subtask_subtaskId_key" ON "Subtask"("subtaskId");
PRAGMA foreign_key_check("Task");
PRAGMA foreign_key_check("User");
PRAGMA foreign_key_check("Project");
PRAGMA foreign_key_check("Subtask");
PRAGMA foreign_keys=ON;
