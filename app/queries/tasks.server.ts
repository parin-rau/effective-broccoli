import { PrismaClient, Task } from "@prisma/client";
import { TypedResponse, json } from "@remix-run/node";
import crypto from "crypto";
import { processTaskData } from "./utils/dataProcessing";
import { ProjectCardProps, TaskCardProps } from "~/components/item/itemTypes";

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

type ResponseData<T> = {
	item?: T | null;
	items?: T[] | null;
	error?: string | null;
	message?: string | null;
};

type ResponseProps<T> = {
	data: ResponseData<T>;
	httpCode: number;
	jsonify: () => TypedResponse<ResponseData<T>>;
};

class ResponseWithData<T> implements ResponseData<T> {
	data: ResponseData<T>;
	httpCode: number;

	constructor(
		{ item, items, error, message }: ResponseData<T>,
		httpCode?: number
	) {
		this.data = {
			item: item ?? null,
			items: items ?? null,
			error: error ?? null,
			message: message ?? null,
		};
		this.httpCode = httpCode ?? 200;
	}

	jsonify() {
		return json(
			{
				...this.data,
			},
			this.httpCode
		);
	}
}

export async function createTask(formData: CreateTask) {
	const task = await prisma.task.create({
		data: {
			...formData,
			taskId: crypto.randomUUID(),
			timestamp: Date.now(),
		},
	});
	if (!task) {
		return new ResponseWithData(
			{
				error: "Failed to create task",
			},
			400
		);
	}
	const processed = processTaskData(task);
	return new ResponseWithData({ item: processed }, 200).jsonify();
}

export async function getTask({
	taskId,
	userId,
}: {
	taskId: string;
	userId: string;
}) {
	const task = await prisma.task.findUnique({
		where: { taskId, userId },
		include: { subtasks: true },
	});
	if (!task) {
		return new ResponseWithData({ error: "Task not found" }, 400);
	}
	const processed = processTaskData(task);
	return new ResponseWithData({ item: processed }, 200).jsonify();
}

export async function getTasksByProjectId({
	projectId,
	userId,
}: {
	userId: string;
	projectId: string;
}) {
	const tasks = await prisma.task.findMany({
		where: { userId, projectId },
		include: { subtasks: true },
	});
	const processed = tasks.map((task) => processTaskData(task));
	return new ResponseWithData({ items: processed }, 200).jsonify();
}

export async function getTasksByUserId(userId: string) {
	const tasks = await prisma.task.findMany({
		where: { userId },
		include: { subtasks: true },
	});
	const processed = tasks.map((task) => processTaskData(task));
	return new ResponseWithData({ items: processed }, 200).jsonify();
}

export async function getAllTasks() {
	const tasks = await prisma.task.findMany({
		include: { subtasks: true },
	});
	const processed = tasks.map((task) => processTaskData(task));
	return new ResponseWithData({ items: processed }, 200).jsonify();
}

export async function updateTask({
	taskId,
	userId,
	data,
}: {
	userId: string;
	taskId: string;
	data: Partial<Task>;
}) {
	const task = await prisma.task.update({ where: { userId, taskId }, data });
	const processed = processTaskData(task);
	return new ResponseWithData({ item: processed }, 200).jsonify();
}

export async function deleteTask({
	taskId,
	userId,
}: {
	userId: string;
	taskId: string;
}) {
	const [task, subtasks] = await prisma.$transaction([
		prisma.task.delete({ where: { taskId, userId } }),
		prisma.subtask.deleteMany({ where: { taskId, userId } }),
	]);
	if (!task) {
		return new ResponseWithData(
			{
				error: "Task not deleted",
			},
			400
		).jsonify();
	} else if (subtasks) {
		return new ResponseWithData(
			{
				message: "Task and all associated subtasks deleted",
			},
			200
		);
	} else {
		return new ResponseWithData(
			{
				message: "Task deleted",
			},
			200
		).jsonify();
	}
}
