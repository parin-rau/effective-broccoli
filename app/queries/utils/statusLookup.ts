export function getTaskStatus(statusCode: number) {
	const lookup: Record<string, string> = {
		"-1": "On Hold",
		"0": "Not Started",
		"1": "In Progress",
		"2": "Completed",
	};

	if (Object.keys(lookup).includes(statusCode.toString())) {
		return lookup[statusCode];
	} else {
		return "Invalid Status";
	}
}

export function getTaskPriority(priorityCode: number) {
	const lookup: Record<string, string> = {
		"0": "Low",
		"1": "Medium",
		"2": "High",
	};

	if (Object.keys(lookup).includes(priorityCode.toString())) {
		return lookup[priorityCode];
	} else {
		return "Invalid Status";
	}
}
