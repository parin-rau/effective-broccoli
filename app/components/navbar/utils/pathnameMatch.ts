const trimLeadingChar = (s: string) => {
	return s[0] === "/" ? s.slice(1) : s;
};

const getFirstSlug = (s: string) => {
	const split = s.split("/");
	return split[1];
};

export const pathnameMatch = (toLocation: string, pathname?: string) => {
	if (!pathname) {
		return false;
	} else if (getFirstSlug(pathname) === trimLeadingChar(toLocation)) {
		return true;
	} else {
		return false;
	}
};
