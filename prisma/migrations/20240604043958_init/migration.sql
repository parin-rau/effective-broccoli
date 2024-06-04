/*
  Warnings:

  - You are about to alter the column `timestamp` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `timestamp` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `timestamp` on the `Subtask` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `timestamp` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "projectId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" BIGINT NOT NULL
);
INSERT INTO "new_Project" ("description", "externalLink", "progress", "projectId", "timestamp", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "timestamp", "title", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");
CREATE TABLE "new_Task" (
    "taskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" BIGINT NOT NULL
);
INSERT INTO "new_Task" ("description", "externalLink", "progress", "projectId", "taskId", "timestamp", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "taskId", "timestamp", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");
CREATE TABLE "new_Subtask" (
    "subtaskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" BIGINT NOT NULL
);
INSERT INTO "new_Subtask" ("description", "externalLink", "progress", "projectId", "subtaskId", "taskId", "timestamp", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "subtaskId", "taskId", "timestamp", "title", "userId" FROM "Subtask";
DROP TABLE "Subtask";
ALTER TABLE "new_Subtask" RENAME TO "Subtask";
CREATE UNIQUE INDEX "Subtask_subtaskId_key" ON "Subtask"("subtaskId");
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL
);
INSERT INTO "new_User" ("password", "passwordSalt", "timestamp", "userId", "username") SELECT "password", "passwordSalt", "timestamp", "userId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check("Project");
PRAGMA foreign_key_check("Task");
PRAGMA foreign_key_check("Subtask");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
