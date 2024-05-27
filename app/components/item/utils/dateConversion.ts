export const unixDiff = (date: Date, referenceDate?: Date) =>
	Math.floor(
		(date.getTime() - (referenceDate?.getTime() ?? Date.now())) / 1000
	);

export const toTimestampString = (
	date: Date | string,
	referenceDate?: Date
) => {
	const d: Date = typeof date === "string" ? new Date(date) : date;

	const unixDiff = Math.floor(
		(d.getTime() - (referenceDate?.getTime() ?? Date.now())) / 1000
	);
	const timeDisplay = (secondsPerUnit: number) =>
		Math.floor(unixDiff / secondsPerUnit);

	switch (true) {
		case unixDiff < 60:
			return "Just now";
		case unixDiff < 60 * 60:
			return `${timeDisplay(60)} minutes ago`;
		case unixDiff < 60 * 60 * 24:
			return `${timeDisplay(60 * 60)} hours ago`;
		case unixDiff < 60 * 60 * 24 * 30:
			return `${timeDisplay(60 * 60 * 24)} days ago`;
		case unixDiff < 60 * 60 * 24 * 365:
			return `${timeDisplay(60 * 60 * 24 * 30)} months ago`;
		default:
			return `${timeDisplay(60 * 60 * 24 * 365)} years ago`;
	}
};

export const dateConversion = (d: Date | string) => toTimestampString(d);
