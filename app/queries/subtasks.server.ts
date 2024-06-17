import { Subtask } from "@prisma/client";
import { DataResponse } from "./utils/dataResponse";
import { SubtaskCardProps } from "~/components/item/itemTypes";
import { processSubtaskData } from "./utils/dataProcessing";
import { prisma } from "prisma/prismaClient";

export async function createSubtask({
	title,
	taskId,
	projectId,
	userId,
}: {
	userId: string;
	taskId: string;
	projectId: string;
	title: string;
}): Promise<DataResponse<SubtaskCardProps>> {
	// const subtask = await prisma.$transaction([
	// 	prisma.task.findFirst({ where: { userId, taskId }, select: {projectId: true} }),
	// 	prisma.subtask.create({
	// 		data: {
	// 			title, userId, taskId, //projectId: {read: {task: {where: {taskId}}}},
	// 			subtaskId: crypto.randomUUID(),
	// 			timestamp: Date.now(),
	// 		},
	// 	}),
	// ]);
	const subtask = await prisma.subtask.create({
		data: {
			title,
			taskId,
			projectId,
			userId,
			subtaskId: crypto.randomUUID(),
			timestamp: Date.now(),
		},
	});
	if (!subtask) {
		return new DataResponse({ error: "Failed to create subtask" }, 400);
	}
	const processed = processSubtaskData(subtask);
	return new DataResponse({ data: processed }, 200);
}

export async function getSubtask({
	subtaskId,
	userId,
}: {
	subtaskId: string;
	userId: string;
}): Promise<DataResponse<SubtaskCardProps>> {
	const subtask = await prisma.subtask.findUnique({
		where: { subtaskId, userId },
	});
	if (!subtask) {
		return new DataResponse({ error: "Unable to find subtask" }, 400);
	}
	const processed = processSubtaskData(subtask);
	return new DataResponse({ data: processed }, 200);
}

export async function getSubtasksByTaskId({
	taskId,
	userId,
}: {
	taskId: string;
	userId: string;
}): Promise<DataResponse<SubtaskCardProps[]>> {
	const subtasks = await prisma.subtask.findMany({
		where: { taskId, userId },
		orderBy: { timestamp: "asc" },
	});
	const processed = subtasks.map((subtask) => processSubtaskData(subtask));
	return new DataResponse({ data: processed }, 200);
}

export async function getSubtasksByProjectId({
	projectId,
	userId,
}: {
	projectId: string;
	userId: string;
}): Promise<DataResponse<SubtaskCardProps[]>> {
	const subtasks = await prisma.subtask.findMany({
		where: { projectId, userId },
		orderBy: { timestamp: "asc" },
	});
	const processed = subtasks.map((subtask) => processSubtaskData(subtask));
	return new DataResponse({ data: processed }, 200);
}

export async function getSubtasksByUserId(
	userId: string
): Promise<DataResponse<SubtaskCardProps[]>> {
	if (!userId)
		return new DataResponse(
			{ error: "No userId received with request." },
			400
		);
	const subtasks = await prisma.subtask.findMany({
		where: { userId },
		orderBy: { timestamp: "asc" },
	});
	const processed = subtasks.map((subtask) => processSubtaskData(subtask));
	return new DataResponse({ data: processed }, 200);
}

export async function getAllSubtasks(): Promise<
	DataResponse<SubtaskCardProps[]>
> {
	const subtasks = await prisma.subtask.findMany({
		orderBy: { timestamp: "asc" },
	});
	const processed = subtasks.map((subtask) => processSubtaskData(subtask));
	return new DataResponse({ data: processed }, 200);
}

export async function updateSubtask({
	subtaskId,
	userId,
	data,
}: {
	subtaskId: string;
	userId: string;
	data: Partial<Subtask>;
}): Promise<DataResponse<SubtaskCardProps>> {
	const subtask = await prisma.subtask.update({
		where: { subtaskId, userId },
		data,
	});
	if (!subtask) {
		return new DataResponse({ error: "Unable to update subtask" }, 400);
	}
	const processed = processSubtaskData(subtask);
	return new DataResponse({ data: processed }, 200);
}

export async function deleteSubtask({
	subtaskId,
	userId,
}: {
	subtaskId: string;
	userId: string;
}): Promise<DataResponse<SubtaskCardProps>> {
	const subtask = await prisma.subtask.delete({
		where: { subtaskId, userId },
	});
	if (!subtask) {
		return new DataResponse({ error: "Failed to delete subtask" }, 400);
	}
	return new DataResponse({ message: "Successfully deleted subtask" }, 200);
}
