import { PrismaClient, Project } from "@prisma/client";
import { json } from "@remix-run/node";
import crypto from "crypto";
import { toTimestampString } from "./utils/dateConversion";
import { getProgressStats } from "./utils/progressPercent";

const prisma = new PrismaClient();

function processProjectData(project: Project) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { userId, ...restProject } = project; // Removing userId from project

	return {
		...restProject,
		timestamp: toTimestampString(Number(project.timestamp)),
		progress: {
			message: "Not Started",
			taskCompletion: { ...getProgressStats(0, 0) },
			subtaskCompletion: { ...getProgressStats(0, 0) },
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
	const projectId = await prisma.project.create({
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
	});
	const processed = projects.map((p) => processProjectData(p));

	return json({ projects: processed }, 200);
}

export async function getAllProjects() {
	const projects = await prisma.project.findMany({});
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
