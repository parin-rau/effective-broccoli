import { Task } from "@prisma/client";
import crypto from "crypto";
import { processTaskData } from "./utils/dataProcessing";
import { TaskCardProps } from "~/components/item/itemTypes";
import { DataResponse } from "./utils/dataResponse";
import { prisma } from "prisma/prismaClient";

type CreateTask = {
	userId: string;
	projectId: string;
	title: string;
	description?: string;
	priority?: number;
	due?: string;
	externalLink?: string;
	tags: string[];
};

export async function createTask(
	formData: CreateTask
): Promise<DataResponse<{ taskId?: string }>> {
	const { tags, ...restForm } = formData;
	const taskId = crypto.randomUUID();
	const task = await prisma.task.create({
		data: {
			...restForm,
			taskId,
			timestamp: Date.now(),
			tags: {
				create: tags.map((tag) => ({
					id: crypto.randomUUID(),
					taskId,
					projectId: restForm.projectId,
					content: tag,
				})),
			},
		},
	});
	if (!task) {
		return new DataResponse(
			{
				error: "Failed to create task",
			},
			400
		);
	}
	//const processed = processTaskData(task);
	return new DataResponse({ data: { taskId: task.taskId } }, 200);
}

export async function getTask({
	taskId,
	userId,
}: {
	taskId: string;
	userId: string;
}): Promise<DataResponse<TaskCardProps>> {
	const task = await prisma.task.findUnique({
		where: { taskId, userId },
		include: {
			subtasks: true,
			project: { select: { projectId: true, title: true } },
			tags: { select: { content: true } },
		},
	});
	if (!task) {
		return new DataResponse({ error: "Task not found" }, 400);
	}
	const processed = processTaskData(task);
	return new DataResponse({ data: processed }, 200);
}

export async function getTasksByProjectId({
	projectId,
	userId,
}: {
	userId: string;
	projectId: string;
}): Promise<DataResponse<TaskCardProps[]>> {
	const tasks = await prisma.task.findMany({
		where: { userId, projectId },
		include: {
			subtasks: true,
			project: { select: { projectId: true, title: true } },
			tags: { select: { content: true } },
		},
	});
	const processed = tasks.map((task) => processTaskData(task));
	return new DataResponse({ data: processed }, 200);
}

export async function getTasksByUserId(
	userId: string
): Promise<DataResponse<TaskCardProps[]>> {
	if (!userId)
		return new DataResponse(
			{ error: "No userId received with request." },
			400
		);
	const tasks = await prisma.task.findMany({
		where: { userId },
		include: {
			subtasks: true,
			project: { select: { projectId: true, title: true } },
			tags: { select: { content: true } },
		},
	});
	const processed = tasks.map((task) => processTaskData(task));
	return new DataResponse({ data: processed }, 200);
}

export async function getAllTasks(): Promise<DataResponse<TaskCardProps[]>> {
	const tasks = await prisma.task.findMany({
		include: {
			subtasks: true,
			project: { select: { projectId: true, title: true } },
			tags: { select: { content: true } },
		},
	});
	const processed = tasks.map((task) => processTaskData(task));
	return new DataResponse({ data: processed }, 200);
}

export async function updateTask({
	taskId,
	userId,
	data,
}: {
	userId: string;
	taskId: string;
	data: Partial<Task>;
	tags: string[];
}): Promise<DataResponse<TaskCardProps>> {
	const task = await prisma.task.update({
		where: { userId, taskId },
		data,
		include: {
			project: { select: { projectId: true, title: true } },
			tags: { select: { content: true } },
		},
	});
	const processed = processTaskData(task);
	return new DataResponse({ data: processed }, 200);
}

export async function deleteTask({
	taskId,
	userId,
}: {
	userId: string;
	taskId: string;
}): Promise<DataResponse<TaskCardProps>> {
	const [task, subtasks, tags] = await prisma.$transaction([
		prisma.task.delete({ where: { taskId, userId } }),
		prisma.subtask.deleteMany({ where: { taskId, userId } }),
		prisma.tag.deleteMany({ where: { taskId } }),
	]);
	if (!task) {
		return new DataResponse({ error: "Task not deleted" }, 400);
	} else if (subtasks || tags) {
		return new DataResponse(
			{ message: "Task and all related subtasks and/or tags deleted" },
			200
		);
	} else {
		return new DataResponse({ message: "Task deleted" }, 200);
	}
}
