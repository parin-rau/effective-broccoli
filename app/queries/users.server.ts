import { PrismaClient, User } from "@prisma/client";
import { createHash, compareHash } from "../utils/hash";
import crypto from "crypto";

const prisma = new PrismaClient();

export const userExists = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { userId: true },
	});

	return Boolean(user);
};

export const createUser = async (username: string, password: string) => {
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
	return { userId: user.userId };
};

export const loginUser = async (username: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { userId: true, password: true, passwordSalt: true },
	});

	if (!user || !user.password || !user.passwordSalt) {
		return {
			errors: { username: "Incorrect username/password", password: "" },
		};
	}

	const isPassMatch = compareHash(user.password, password, user.passwordSalt);
	return isPassMatch
		? { userId: user.userId }
		: { errors: { username: "Incorrect username/password", password: "" } };
};

export const updateUser = async (userId: string, data: Partial<User>) => {
	const user = await prisma.user.update({
		where: {
			userId,
		},
		data,
	});
	return user;
};

export const deleteUser = async (userId: User["userId"]) => {
	const user = await prisma.user.delete({ where: userId });
	return user;
};
