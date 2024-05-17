type StatusCode = number;

export function getStatus(statusCode: StatusCode) {
	const lookup: Record<number, string> = {
		1: "On Hold",
		2: "Not Started",
		3: "In Progress",
		4: "Completed",
	};

	if (Object.keys(lookup).includes(statusCode.toString())) {
		return lookup[statusCode];
	} else {
		return "Invalid Status";
	}
}
