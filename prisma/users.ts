import { PrismaClient } from "@prisma/client";

type Action = "CREATE" | "READ" | "UPDATE" | "DELETE";

type User = {
	userId: string;
	username: string;
	password: string;
};

type UserCredentials = Omit<User, "userId">;

const prisma = new PrismaClient();

export const db = () => {
	async function main() {}

	async function createUser(data: User) {
		const user = await prisma.user.create({
			data,
		});
		console.log(user);
		return user;
	}

	async function getUser(userCredentials: UserCredentials) {
		const user = await prisma.user.findFirst({
			where: userCredentials,
		});
		console.log(user);
		return user;
	}

	async function updateUser({ userId, username, password }: User) {
		const user = await prisma.user.update({
			where: { userId },
			data: { username, password },
		});
		return user;
	}

	async function deleteUser(userId: string) {
		const user = await prisma.user.delete({
			where: {
				userId,
			},
		});
		return user;
	}

	function closeConnection() {
		main()
			.then(async () => {
				await prisma.$disconnect();
			})
			.catch(async (e) => {
				console.error(e);
				await prisma.$disconnect();
				process.exit(1);
			});
	}

	return { createUser, getUser, deleteUser };
};
