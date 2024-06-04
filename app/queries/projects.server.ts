import { PrismaClient, Project } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProject() {
	const project = await prisma.project.create({});

	return project;
}

export async function getProject(projectId: string) {}

export async function getProjectsByUserId(userId: string) {}

export async function getAllProjects() {}

export async function updateProject(
	projectId: string,
	data: Partial<Project>
) {}

export async function deleteProject(projectId: string) {}
