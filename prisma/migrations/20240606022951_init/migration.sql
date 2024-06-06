-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "projectId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "externalLink" TEXT,
    "timestamp" BIGINT NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("description", "externalLink", "progress", "projectId", "timestamp", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "timestamp", "title", "userId" FROM "Project";
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
    "timestamp" BIGINT NOT NULL,
    CONSTRAINT "Subtask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subtask_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("projectId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("taskId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subtask" ("description", "externalLink", "progress", "projectId", "subtaskId", "taskId", "timestamp", "title", "userId") SELECT "description", "externalLink", "progress", "projectId", "subtaskId", "taskId", "timestamp", "title", "userId" FROM "Subtask";
DROP TABLE "Subtask";
ALTER TABLE "new_Subtask" RENAME TO "Subtask";
CREATE UNIQUE INDEX "Subtask_subtaskId_key" ON "Subtask"("subtaskId");
CREATE TABLE "new_Task" (
    "taskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "due" TEXT,
    "externalLink" TEXT,
    "timestamp" BIGINT NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("projectId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("description", "due", "externalLink", "priority", "projectId", "taskId", "timestamp", "title", "userId") SELECT "description", "due", "externalLink", "priority", "projectId", "taskId", "timestamp", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
