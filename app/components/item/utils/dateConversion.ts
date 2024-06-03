type TimeUnit = "minute" | "hour" | "day" | "month" | "year";

export const getUnixDiff = (date: Date, referenceDate?: Date) =>
	Math.floor(
		((referenceDate?.getTime() ?? Date.now()) - date.getTime()) / 1000
	);

const secondsPer = {
	minute: 60,
	hour: 60 * 60,
	day: 60 * 60 * 24,
	month: 60 * 60 * 24 * 30,
	year: 60 * 60 * 24 * 365,
};

export const toTimestampString = (
	date: Date | string | number,
	referenceDate?: Date
) => {
	let message: string;
	const d: Date =
		typeof date === "string" || typeof date === "number"
			? new Date(date)
			: date;
	const unixDiff = getUnixDiff(d, referenceDate);
	const getTimeMessage = (timeUnit: TimeUnit) => {
		const secondsPerUnit = secondsPer[timeUnit];
		const num = Math.floor(unixDiff / secondsPerUnit);
		const unit = num === 1 ? timeUnit : `${timeUnit}s`;
		return `${num} ${unit} ago`;
	};

	switch (true) {
		case unixDiff < 0:
			message = "Invalid timestamp";
			break;
		case unixDiff < secondsPer.minute:
			message = "Just now";
			break;
		case unixDiff < secondsPer.hour:
			message = getTimeMessage("minute");
			break;
		case unixDiff < secondsPer.day:
			message = getTimeMessage("hour");
			break;
		case unixDiff < secondsPer.month:
			message = getTimeMessage("day");
			break;
		case unixDiff < secondsPer.year:
			message = getTimeMessage("month");
			break;
		case unixDiff >= secondsPer.year:
			message = getTimeMessage("year");
			break;
		default:
			message = "Invalid timestamp";
			break;
	}

	return message;
};
