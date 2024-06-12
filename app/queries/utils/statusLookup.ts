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

export function getTaskPriority(priorityCode: number, onHold?: boolean) {
	const lookup: Record<
		string,
		{ text: string; value: number; styles: string }
	> = {
		"-1": { text: "On Hold", value: -1, styles: "bg-purple-700" },
		"0": { text: "Low", value: 0, styles: "bg-emerald-700" },
		"1": { text: "Medium", value: 1, styles: "bg-amber-700" },
		"2": { text: "High", value: 2, styles: "bg-red-700" },
	};

	if (onHold) {
		return lookup["-1"];
	} else if (Object.keys(lookup).includes(priorityCode.toString())) {
		return lookup[priorityCode];
	} else {
		return lookup["0"];
	}
}

export function getTaskDue(due?: string | null): {
	styles: string;
	date: string;
} {
	if (!due) {
		return { styles: "", date: "" };
	}

	const currentDate = new Date();
	const dueDate = new Date(due);

	const getDateStats = (d: Date) => [
		d.getFullYear(),
		d.getMonth(),
		d.getDay(),
		d.getTime(),
	];

	const [cYear, cMonth, cDay, cTime] = getDateStats(currentDate);
	const [dYear, dMonth, dDay, dTime] = getDateStats(dueDate);

	if (dTime < cTime) {
		return {
			styles: "text-red-500",
			date: dueDate.toLocaleDateString("en-US", {
				month: "numeric",
				day: "numeric",
			}),
		};
	} else if (cYear === dYear && cMonth === dMonth && cDay === dDay) {
		return { styles: "text-amber-500", date: "Today" };
	} else if (cYear !== dYear) {
		return {
			styles: "",
			date: dueDate.toLocaleDateString("en-US", {
				year: "2-digit",
				month: "numeric",
				day: "numeric",
			}),
		};
	} else {
		return {
			styles: "",
			date: dueDate.toLocaleDateString("en-US", {
				month: "numeric",
				day: "numeric",
			}),
		};
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
