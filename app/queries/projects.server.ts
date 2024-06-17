import { Project } from "@prisma/client";
import crypto from "crypto";
import { processProjectData } from "./utils/dataProcessing";
import { ProjectCardProps } from "~/components/item/itemTypes";
import { DataResponse } from "./utils/dataResponse";
import { prisma } from "prisma/prismaClient";

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
}): Promise<DataResponse<{ projectId?: string }>> {
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
	return new DataResponse({ data: { projectId } }, 200);
}

export async function getProject({
	userId,
	projectId,
}: {
	userId: string;
	projectId: string;
}): Promise<DataResponse<ProjectCardProps>> {
	const project = await prisma.project.findUnique({
		where: { projectId, userId },
		include: {
			tasks: {
				select: { subtasks: { select: { progress: true } } },
			},
		},
	});
	if (!project) {
		return new DataResponse({ error: "Project not found" }, 404);
	}
	const processedProject = processProjectData(project);
	return new DataResponse({ data: processedProject }, 200);
}

export async function getProjectsByUserId(
	userId: string
): Promise<DataResponse<ProjectCardProps[]>> {
	if (!userId)
		return new DataResponse(
			{ error: "No userId received with request" },
			400
		);
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
	const processedProjects = projects.map((p) => processProjectData(p));
	return new DataResponse({ data: processedProjects }, 200);
}

export async function getAllProjects(): Promise<
	DataResponse<ProjectCardProps[]>
> {
	const projects = await prisma.project.findMany({
		include: {
			tasks: {
				select: { subtasks: { select: { progress: true } } },
			},
		},
	});
	const processedProjects = projects.map((project) =>
		processProjectData(project)
	);
	return new DataResponse({ data: processedProjects }, 200);
}

export async function updateProject({
	projectId,
	userId,
	data,
}: {
	projectId: string;
	userId: string;
	data: Partial<Project>;
}): Promise<DataResponse<ProjectCardProps>> {
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
	if (!project) {
		return new DataResponse({ error: "Unable to update project" }, 400);
	}

	const processedProject = processProjectData(project);
	return new DataResponse({ data: processedProject }, 200);
}

export async function deleteProject({
	projectId,
	userId,
}: {
	projectId: string;
	userId: string;
}): Promise<DataResponse<ProjectCardProps>> {
	const [project, tasks, subtasks] = await prisma.$transaction([
		prisma.project.delete({ where: { projectId, userId } }),
		prisma.task.deleteMany({ where: { projectId, userId } }),
		prisma.subtask.deleteMany({ where: { projectId, userId } }),
	]);

	if (!project) {
		return new DataResponse({ error: "Project not deleted" }, 400);
	} else if (tasks || subtasks) {
		return new DataResponse(
			{ message: "Project and all associated tasks/subtasks deleted" },
			200
		);
	} else {
		return new DataResponse({ message: "Project deleted" }, 200);
	}
}
