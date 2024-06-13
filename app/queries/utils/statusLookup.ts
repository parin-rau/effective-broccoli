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

function formatDateValue(d: Date) {
	const [year, month, date] = [
		String(d.getFullYear()).padStart(4, "0"),
		String(d.getMonth() + 1).padStart(2, "0"),
		String(d.getDate()).padStart(2, "0"),
	];
	return `${year}-${month}-${date}`;
}

export function getTaskDue(due?: string | null): {
	styles: string;
	value: string;
	date: string;
} {
	if (!due) {
		return { styles: "", date: "", value: "" };
	}

	const currentDate = new Date();
	const dueDate = new Date(due);

	const getDateStats = (d: Date) => [
		d.getFullYear(),
		d.getMonth(),
		d.getDate(),
		d.getTime(),
	];

	const [cYear, cMonth, cDate, cTime] = getDateStats(currentDate);
	const [dYear, dMonth, dDate, dTime] = getDateStats(dueDate);

	if (cTime > dTime + 1000 * 60 * 60 * 24) {
		return {
			styles: "text-red-600 dark:text-red-500",
			date: dueDate.toLocaleDateString("en-US", {
				month: "numeric",
				day: "numeric",
			}),
			value: formatDateValue(dueDate),
		};
	} else if (cYear === dYear && cMonth === dMonth && cDate === dDate) {
		return {
			styles: "text-amber-600 dark:text-amber-500",
			date: "Today",
			value: formatDateValue(dueDate),
		};
	} else if (cYear !== dYear) {
		return {
			styles: "",
			date: dueDate.toLocaleDateString("en-US", {
				year: "2-digit",
				month: "numeric",
				day: "numeric",
			}),
			value: formatDateValue(dueDate),
		};
	} else {
		return {
			styles: "",
			date: dueDate.toLocaleDateString("en-US", {
				month: "numeric",
				day: "numeric",
			}),
			value: formatDateValue(dueDate),
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
