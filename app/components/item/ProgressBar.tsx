type Props = {
	completed: number;
	total: number;
	progressPercent: string;
	progressDecimal: number;
	childBarStyles: React.CSSProperties;
	uom: string;
	containerStyles?: string;
};

export default function ProgressBar({
	completed,
	total,
	progressPercent,
	childBarStyles,
	uom,
	containerStyles,
}: Props) {
	return (
		<div className={`px-2 pb-2 flex flex-col gap-2 ${containerStyles}`}>
			<span>
				{progressPercent} - {completed}/{total} {uom}
			</span>
			<div className="rounded-full border border-neutral-200 bg-neutral-200 dark:bg-neutral-700 dark:border-none">
				<div
					className={`h-full rounded-full p-1 ${childBarStyles.backgroundColor}`}
					style={childBarStyles}
				></div>
			</div>
		</div>
	);
}
