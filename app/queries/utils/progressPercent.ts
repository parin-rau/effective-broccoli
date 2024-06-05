const toPercentString = (decimal: number) =>
	Math.ceil(decimal * 100).toString() + "%";

const progressDecimal = (completed: number, total: number) => {
	if (completed < 0 || total < 0) {
		return 0;
	} else if (completed > total) {
		return 1;
	} else if (completed === 0 && total === 0) {
		return 0;
	} else {
		return completed / total;
	}
};

export const progressPercent = (completed: number, total: number) =>
	toPercentString(progressDecimal(completed, total));

const colorSelection = (decimal: number) => {
	if (decimal <= 0 || decimal > 1) {
		return "bg-transparent";
	} else if (decimal < 0.3) {
		return "bg-red-500 dark:bg-red-700";
	} else if (decimal < 0.7) {
		return "bg-amber-500 dark:bg-amber-600";
	} else {
		return "bg-green-500 dark:bg-green-700";
	}
};

const childBarStyles = (
	completed: number,
	total: number
): React.CSSProperties => ({
	height: "100%",
	width: progressPercent(completed, total),
	backgroundColor: colorSelection(progressDecimal(completed, total)),
	borderRadius: "inherit",
});

export const getProgressStats = (completed: number, total: number) => {
	return {
		progressDecimal: progressDecimal(completed, total),
		progressPercent: progressPercent(completed, total),
		childBarStyles: childBarStyles(completed, total),
		completed,
		total,
	};
};
