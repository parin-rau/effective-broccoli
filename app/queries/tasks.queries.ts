import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTask() {
	const task = await prisma.task.create({});
}

export async function getTask(taskId: string) {}

export async function getTasksByProjectId(projectId: string) {}

export async function getTasksByUserId(userId: string) {}

export async function getAllTasks() {}

export async function updateTask(taskId: string, data: Partial<Task>) {}

export async function deleteTask(taskId: string) {}
