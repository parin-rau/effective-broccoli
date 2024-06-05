import { PrismaClient, Project } from "@prisma/client";
import { json } from "@remix-run/node";
import crypto from "crypto";

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
	const project = await prisma.project.create({
		data: {
			userId,
			projectId: crypto.randomUUID(),
			title,
			description,
			externalLink,
			timestamp: Date.now(),
		},
	});
	return json({ projectId: project.projectId }, 201);
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

	return json({ project }, 200);
}

export async function getProjectsByUserId(userId: string) {
	const projects = await prisma.project.findMany({
		where: {
			userId,
		},
	});

	return json({ projects }, 200);
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

	return json({ project }, 200);
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
