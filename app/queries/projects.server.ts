import { PrismaClient, Project } from "@prisma/client";
//import { ProjectCardProps } from "~/components/item/itemTypes";
import { json } from "@remix-run/node";
import crypto from "crypto";
import { processProjectData } from "./utils/dataProcessing";
//import { toTimestampString } from "./utils/dateConversion";
//import { getProgressStats } from "./utils/progressPercent";

const prisma = new PrismaClient();

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
	const [project, tasks, subtasks] = await prisma.$transaction([
		prisma.project.delete({ where: { projectId, userId } }),
		prisma.task.deleteMany({ where: { projectId, userId } }),
		prisma.subtask.deleteMany({ where: { projectId, userId } }),
	]);

	if (!project) {
		return json({ message: "Project not deleted" }, 400);
	} else if (tasks || subtasks) {
		return json(
			{ message: "Project and all associated tasks/subtasks deleted" },
			200
		);
	} else {
		return json({ message: "Project deleted" }, 200);
	}
}
