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

export function getItemStatus({
	completedCount,
	totalCount,
	onHold,
}: {
	completedCount: number;
	totalCount: number;
	onHold?: boolean;
}): { message: string; sortValue: number; styles: string } {
	if (completedCount === totalCount) {
		return { message: "Completed", sortValue: 2, styles: "" };
	} else if (onHold) {
		return { message: "On Hold", sortValue: -1, styles: "" };
	} else if (completedCount < totalCount) {
		return { message: "In Progress", sortValue: 1, styles: "" };
	} else if (completedCount === 0) {
		return { message: "Not Started", sortValue: 0, styles: "" };
	} else {
		return { message: "Unknown", sortValue: -2, styles: "" };
	}
}
