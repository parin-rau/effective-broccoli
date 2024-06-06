import { PrismaClient, Task } from "@prisma/client";
import crypto from "crypto";

type CreateTask = {
	userId: string;
	projectId: string;
	title: string;
	description?: string;
	priority?: number;
	due?: string;
	externalLink?: string;
};

const prisma = new PrismaClient();

export async function createTask(formData: CreateTask) {
	const task = await prisma.task.create({
		data: {
			...formData,
			taskId: crypto.randomUUID(),
			timestamp: Date.now(),
		},
	});
}

export async function getTask(taskId: string) {}

export async function getTasksByProjectId(projectId: string) {}

export async function getTasksByUserId(userId: string) {}

export async function getAllTasks() {}

export async function updateTask(taskId: string, data: Partial<Task>) {}

export async function deleteTask(taskId: string) {}
