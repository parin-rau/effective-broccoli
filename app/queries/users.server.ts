import { User } from "@prisma/client";
import { createHash, compareHash } from "../utils/hash";
import crypto from "crypto";
import { DataResponse } from "./utils/dataResponse";
import { prisma } from "prisma/prismaClient";

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

export const deleteUser = async (
	userId: string
): Promise<DataResponse<User>> => {
	const user = await prisma.user.delete({ where: { userId } });
	return user
		? new DataResponse({ message: "User deleted" }, 204)
		: new DataResponse({ error: "Unable to delete user" }, 400);
};
