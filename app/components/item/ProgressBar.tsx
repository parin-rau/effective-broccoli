type Props = {
	completed: number;
	total: number;
	progressPercent: string;
	progressDecimal: number;
	childBarStyles: React.CSSProperties;
	uom: string;
};

export default function ProgressBar({
	completed,
	total,
	progressPercent,
	childBarStyles,
	uom,
}: Props) {
	return (
		<div className="flex gap-2">
			<span>
				{progressPercent} - {completed}/{total} {uom}
			</span>
			<div>
				<div style={childBarStyles}></div>
			</div>
		</div>
	);
}
