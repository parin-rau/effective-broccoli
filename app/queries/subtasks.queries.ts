import { PrismaClient, Subtask } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSubtask() {
	const subtask = await prisma.subtask.create({});
}

export async function getSubtask(subtaskId: string) {
	const subtask = await prisma.subtask.findUnique();
}

export async function getSubtasksByTaskId(taskId: string) {
	const subtasks = await prisma.subtask.findMany();
}

export async function getSubtasksByProjectId(projectId: string) {}

export async function getSubtasksByUserId(userId: string) {}

export async function getAllSubtasks() {}

export async function updateSubtask(
	subtaskId: string,
	data: Partial<Subtask>
) {}

export async function deleteSubtask(subtaskId: string) {}
