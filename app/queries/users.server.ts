import { User } from "@prisma/client";
import { createHash, compareHash } from "../utils/hash";
import crypto from "crypto";
import { DataResponse } from "./utils/dataResponse";
import { prisma } from "prisma/prismaClient.server";
import { getProgressStats } from "./utils/progressPercent";
import { toTimestampString } from "./utils/dateConversion";
import { ProjectCardProps, TaskCardProps } from "~/components/item/itemTypes";
import { processProjectData, processTaskData } from "./utils/dataProcessing";

// AUTH FUNCTIONS

export const userExists = async (
	username: string
): Promise<DataResponse<{ exists: boolean }>> => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { userId: true },
	});

	const exists = Boolean(user);
	return exists
		? new DataResponse(
				{ data: { exists }, error: "Username is not available" },
				400
		  )
		: new DataResponse({ data: { exists } }, 200);
};

export const createUser = async (
	username: string,
	password: string
): Promise<DataResponse<{ userId: string }>> => {
	const { hash: passwordHash, salt: passwordSalt } = createHash(password);
	const user = await prisma.user.create({
		data: {
			userId: crypto.randomUUID(),
			username,
			password: passwordHash,
			passwordSalt,
			timestamp: Date.now(),
		},
	});
	return new DataResponse({ data: { userId: user.userId } }, 200);
};

export const loginUser = async (
	username: string,
	password: string
): Promise<DataResponse<{ userId: string }>> => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { userId: true, password: true, passwordSalt: true },
	});

	if (!user || !user.password || !user.passwordSalt) {
		return new DataResponse({ error: "Incorrect username/password" }, 400);
	}

	const isPassMatch = compareHash(user.password, password, user.passwordSalt);
	return isPassMatch
		? new DataResponse({ data: { userId: user.userId } })
		: new DataResponse({ error: "Incorrect username/password" }, 400);
};

export const updateUser = async (
	userId: string,
	data: Partial<User>
): Promise<DataResponse<User>> => {
	const user = await prisma.user.update({
		where: {
			userId,
		},
		data,
	});
	return user
		? new DataResponse({ message: "User information updated" }, 200)
		: new DataResponse({ error: "Unable to update user information" }, 400);
};

export const changePassword = async ({
	userId,
	oldPassword,
	newPassword,
	newPasswordConfirm,
}: {
	userId: string;
	oldPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
}): Promise<DataResponse<{ success: boolean }>> => {
	if (newPassword !== newPasswordConfirm) {
		return new DataResponse(
			{ error: "Entered passwords do not match." },
			400
		);
	}
	const user = await prisma.$transaction(async (prisma) => {
		const currentUser = await prisma.user.findFirst({ where: { userId } });
		if (!currentUser) return null;
		const isPassMatch = compareHash(
			currentUser.password,
			oldPassword,
			currentUser.passwordSalt
		);
		console.log({ isPassMatch });
		if (!isPassMatch) return null;
		const { hash: passwordHash, salt: passwordSalt } =
			createHash(newPassword);
		const updatedUser = await prisma.user.update({
			where: { userId },
			data: { password: passwordHash, passwordSalt },
			select: { userId: true },
		});
		return updatedUser;
	});

	return user
		? new DataResponse(
				{
					data: { success: Boolean(user) },
					message: "Successfully updated password.",
				},
				200
		  )
		: new DataResponse({ error: "Unable to update password." }, 400);
};

export const deleteUser = async (
	userId: string
): Promise<DataResponse<User>> => {
	const tx = await prisma.$transaction(async (prisma) => {
		const user = await prisma.user.delete({ where: { userId } });
		if (!user) return { user: null, error: "Unable to delete user" };

		const projects = await prisma.project.deleteMany({ where: { userId } });
		const tasks = await prisma.task.deleteMany({ where: { userId } });
		const subtasks = await prisma.subtask.deleteMany({ where: { userId } });

		if (projects || tasks || subtasks) {
			return {
				user,
				message: "Deleted user and all associated resources.",
			};
		}
		return { user, message: "Deleted user." };
	});
	return tx.user
		? new DataResponse({ message: tx.message }, 204)
		: new DataResponse({ error: tx.error }, 400);
};

// USER DATA SUMMARY FUNCTIONS

export const getUserStats = async (
	userId: string
): Promise<
	DataResponse<{
		username: string;
		accountAge: string;
		projects: ReturnType<typeof getProgressStats>;
		tasks: ReturnType<typeof getProgressStats>;
		subtasks: ReturnType<typeof getProgressStats>;
	}>
> => {
	const tx = await prisma.$transaction(async (prisma) => {
		const user = await prisma.user.findFirst({
			where: { userId },
			select: { username: true, timestamp: true },
		});

		const projectCount = await prisma.project.count({ where: { userId } });
		const completedProjects = await prisma.project.findMany({
			where: {
				userId,
				tasks: { every: { subtasks: { every: { progress: 1 } } } },
			},
			include: { _count: { select: { subtasks: true } } },
		});
		const completedProjectCount = completedProjects.filter(
			(proj) => proj._count.subtasks > 0
		).length;

		const taskCount = await prisma.task.count({ where: { userId } });

		const completedTaskCount = await prisma.task.count({
			where: { userId, subtasks: { every: { progress: 1 } } },
		});

		const subtaskCount = await prisma.subtask.count({ where: { userId } });

		const completedSubtaskCount = await prisma.subtask.count({
			where: { userId, progress: 1 },
		});

		return {
			username: user?.username,
			accountAge:
				typeof user?.timestamp === "bigint"
					? toTimestampString(Number(user?.timestamp))
					: "a while ago",
			projectCount,
			completedProjectCount,
			taskCount,
			completedTaskCount,
			subtaskCount,
			completedSubtaskCount,
		};
	});
	if (!tx.username) {
		return new DataResponse({ error: "Unable to find user." }, 400);
	}

	const data = {
		username: tx.username,
		accountAge: tx.accountAge,
		projects: getProgressStats(tx.completedProjectCount, tx.projectCount),
		tasks: getProgressStats(tx.completedTaskCount, tx.taskCount),
		subtasks: getProgressStats(tx.completedSubtaskCount, tx.subtaskCount),
	};
	return new DataResponse({ data }, 200);
};

export const getUserHomeView = async (
	userId: string
): Promise<
	DataResponse<{ projects: ProjectCardProps[]; tasks: TaskCardProps[] }>
> => {
	const { recentProjects, recentTasks } = await prisma.$transaction(
		async (prisma) => {
			// 10 most recently created projects
			const recentProjects = await prisma.project.findMany({
				where: { userId },
				include: {
					tasks: {
						select: { subtasks: { select: { progress: true } } },
					},
				},
				take: 10,
				orderBy: { timestamp: "desc" },
			});
			// 10 most recently created tasks
			const recentTasks = await prisma.task.findMany({
				where: { userId },
				include: {
					subtasks: true,
					project: { select: { projectId: true, title: true } },
				},
				take: 10,
				orderBy: { timestamp: "desc" },
			});
			return { recentProjects, recentTasks };
		}
	);
	const data = {
		projects: recentProjects.map((p) => processProjectData(p)),
		tasks: recentTasks.map((t) => processTaskData(t)),
	};
	return new DataResponse({ data }, 200);
};
