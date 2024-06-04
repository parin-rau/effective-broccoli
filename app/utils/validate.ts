import { userExists } from "../queries/users.server";

export const validateSignup = async (
	username?: string,
	password?: string,
	passwordConfirm?: string
) => {
	const errors: { username?: string; password?: string } = {};

	if (!username) {
		errors.username = "Username is required";
	} else {
		const res = await userExists(username);
		const { exists } = await res.json();
		if (exists) {
			errors.username = "An account with this username already exists";
		}
	}

	if (!password || !passwordConfirm) {
		errors.password = "Password is required";
	} else if (password !== passwordConfirm) {
		errors.password = "Passwords do not match";
	}

	return Object.keys(errors).length ? errors : null;
};

export const validateLogin = async (username?: string, password?: string) => {
	const errors: { username?: string; password?: string } = {};

	if (!username) {
		errors.username = "Username is required";
	}

	if (!password) {
		errors.password = "Password is required";
	}

	return Object.keys(errors).length ? errors : null;
};
