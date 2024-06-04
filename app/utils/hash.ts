import crypto from "crypto";

export const createHash = (
	password: string,
	salt: string = crypto.randomBytes(16).toString("hex")
) => {
	//const salt = crypto.randomBytes(16).toString("hex");
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, "sha256")
		.toString("hex");
	return { hash, salt };
};

export const compareHash = (
	passwordHash: string,
	password: string,
	salt: string
): boolean => {
	const { hash } = createHash(password, salt);
	return passwordHash === hash;
};
