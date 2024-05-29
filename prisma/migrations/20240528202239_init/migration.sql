-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "projectId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Task" (
    "taskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "externalLink" TEXT
);

-- CreateTable
CREATE TABLE "Subtask" (
    "subtaskId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Subtask_subtaskId_key" ON "Subtask"("subtaskId");
