export const pathnameMatch = (currentLocation: string, toLocation: string) => {
	if (currentLocation === toLocation) {
		return true;
	} else {
		return false;
	}
};
