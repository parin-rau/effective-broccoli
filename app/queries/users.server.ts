import { PrismaClient, User } from "@prisma/client";
import { createHash, compareHash } from "../utils/hash";
import crypto from "crypto";
import { json } from "@remix-run/node";

const prisma = new PrismaClient();

export const userExists = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { userId: true },
	});

	const exists = Boolean(user);
	return json({ exists }, exists ? 200 : 400);
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
	return json({ userId: user.userId }, 200);
};

export const loginUser = async (username: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { userId: true, password: true, passwordSalt: true },
	});

	if (!user || !user.password || !user.passwordSalt) {
		return json(
			{
				errors: {
					username: "Incorrect username/password",
					password: "",
				},
				userId: null,
			},
			400
		);
	}

	const isPassMatch = compareHash(user.password, password, user.passwordSalt);
	return isPassMatch
		? json({ errors: null, userId: user.userId }, 200)
		: json(
				{
					errors: {
						username: "Incorrect username/password",
						password: null,
					},
					userId: null,
				},
				400
		  );
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
