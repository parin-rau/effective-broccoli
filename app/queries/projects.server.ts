import { PrismaClient, Project } from "@prisma/client";
import { ProjectCardProps } from "~/components/item/itemTypes";
import { json } from "@remix-run/node";
import crypto from "crypto";
import { toTimestampString } from "./utils/dateConversion";
import { getProgressStats } from "./utils/progressPercent";

const prisma = new PrismaClient();

function processProjectData(
	project: Project & {
		tasks: { subtasks: { progress: number }[] }[];
	}
): ProjectCardProps {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { userId, tasks, ...restProject } = project; // Removing userId from project

	const totalTasks = tasks.length;
	let completedTasks = 0;
	let totalSubtasks = 0;
	let completedSubtasks = 0;

	tasks.forEach((task) => {
		const totalSubtasksPerTask = task.subtasks.length;
		let completedSubtasksPerTask = 0;

		totalSubtasks += totalSubtasksPerTask;
		task.subtasks.forEach((subtask) => {
			if (subtask.progress === 2) {
				completedSubtasks += 1;
				completedSubtasksPerTask += 1;
			}
		});
		if (completedSubtasksPerTask === totalSubtasksPerTask) {
			completedTasks += 1;
		}
	});

	return {
		...restProject,
		timestamp: toTimestampString(Number(project.timestamp)),
		progress: {
			taskCompletion: {
				...getProgressStats(completedTasks, totalTasks),
			},
			subtaskCompletion: {
				...getProgressStats(completedSubtasks, totalSubtasks),
			},
		},
	};
}

export async function createProject({
	userId,
	title,
	description,
	externalLink,
}: {
	userId: string;
	title: string;
	description?: string;
	externalLink?: string;
}) {
	const { projectId } = await prisma.project.create({
		data: {
			userId,
			projectId: crypto.randomUUID(),
			title,
			description,
			externalLink,
			timestamp: Date.now(),
		},
		select: {
			projectId: true,
		},
	});
	return json({ projectId }, 201);
}

export async function getProject({
	userId,
	projectId,
}: {
	userId: string;
	projectId: string;
}) {
	// const project = await prisma.project.findUnique({
	// 	where: { projectId, userId },
	// 	include: {
	// 		_count: {
	// 			select: {
	// 				tasks: true,
	// 				subtasks: true,
	// 			},
	// 		},
	// 	},
	// });

	// const completedTaskCount = await prisma.task.count({
	// 	where: { projectId, userId, subtasks: { every: { progress: 2 } } },
	// });
	// const completedSubtaskCount = await prisma.subtask.count({
	// 	where: { projectId, userId, progress: 2 },
	// });

	// const [project, completedTaskCount, completedSubtaskCount] =
	// 	await prisma.$transaction([
	// 		prisma.project.findUnique({
	// 			where: { projectId, userId },
	// 			include: {
	// 				_count: {
	// 					select: {
	// 						tasks: true,
	// 						subtasks: true,
	// 					},
	// 				},
	// 			},
	// 		}),
	// 		prisma.task.count({
	// 			where: {
	// 				projectId,
	// 				userId,
	// 				subtasks: { every: { progress: 2 } },
	// 			},
	// 		}),
	// 		prisma.subtask.count({ where: { projectId, userId, progress: 2 } }),
	// 	]);

	const project = await prisma.project.findUnique({
		where: { projectId, userId },
		include: {
			tasks: {
				select: { subtasks: { select: { progress: true } } },
			},
		},
	});

	if (!project) {
		return json({ error: "Project not found" }, 404);
	}

	const processed = processProjectData(project);
	console.log({ project, processed });

	return json({ project: processed }, 200);
}

export async function getProjectsByUserId(userId: string) {
	const projects = await prisma.project.findMany({
		where: {
			userId,
		},
		include: {
			tasks: {
				select: { subtasks: { select: { progress: true } } },
			},
		},
	});

	const processed = projects.map((p) => processProjectData(p));
	console.log({ processed });

	return json({ projects: processed }, 200);
}

export async function getAllProjects() {
	const projects = await prisma.project.findMany({
		include: {
			tasks: {
				select: { subtasks: { select: { progress: true } } },
			},
		},
	});
	return json({ projects }, 200);
}

export async function updateProject({
	projectId,
	userId,
	data,
}: {
	projectId: string;
	userId: string;
	data: Partial<Project>;
}) {
	const project = await prisma.project.update({
		where: {
			projectId,
			userId,
		},
		include: {
			tasks: { select: { subtasks: { select: { progress: true } } } },
		},
		data,
	});
	const processed = processProjectData(project);

	return json({ project: processed }, 200);
}

export async function deleteProject({
	projectId,
	userId,
}: {
	projectId: string;
	userId: string;
}) {
	const project = await prisma.project.delete({
		where: { projectId, userId },
	});

	if (!project) {
		return json({ message: "Project not deleted" }, 400);
	}

	return json({ message: "Project deleted" }, 200);
}
