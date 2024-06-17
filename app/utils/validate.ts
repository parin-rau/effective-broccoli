export const validateSignup = async (
	username?: string,
	password?: string,
	passwordConfirm?: string
): Promise<string | null> => {
	const errors: string[] = [];

	if (!username) {
		errors.push("Username is required");
	}

	if (!password || !passwordConfirm) {
		errors.push("Password is required");
	} else if (password !== passwordConfirm) {
		errors.push("Passwords do not match");
	}

	return errors.length > 0 ? errors.join(" ") : null;
};

export const validateLogin = (
	username?: string,
	password?: string
): string | null => {
	const errors: string[] = [];

	if (!username) {
		errors.push("Username is required.");
	}

	if (!password) {
		errors.push("Password is required.");
	}

	return errors.length > 0 ? errors.join(" ") : null;
};

export const validatePassword = (
	password?: string,
	confirmPassword?: string
) => {
	const errors: string[] = [];
	if (!password || !confirmPassword) {
		errors.push("Missing required password input.");
	}

	if (password !== confirmPassword) {
		errors.push("New passwords do not match.");
	}

	return errors.length > 0 ? errors.join(" ") : null;
};
