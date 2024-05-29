type CreateCredentialsReturn = {
	createUserSuccess: boolean;
};

type ValidateCredentialsReturn =
	| {
			validateCredentialSuccess: true;
			userId: string;
	  }
	| {
			validateCredentialSuccess: false;
			userId?: never;
	  };

// const hasher = async (data: string) => {
// 	const saltRounds = 10;
// 	return await bcrypt.hash(data, saltRounds);
// };

export const createCredentials = async (
	username?: string,
	password?: string
): CreateCredentialsReturn => {
	if (!username || !password) {
		throw Error("Invalid username/password");
	}

	return await db.createUser(username, password);
};

export const validateCredentials = async (
	username?: string,
	password?: string
): ValidateCredentialsReturn => {
	if (!username || !password) {
		throw Error("Invalid username/password");
	}

	return await db.validateUser(username, password);
};
