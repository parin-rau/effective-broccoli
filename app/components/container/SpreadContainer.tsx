export default function SpreadContainer({
	children,
	styles,
	noSmallStack,
}: {
	children: React.ReactNode;
	styles?: string;
	noSmallStack?: boolean;
}) {
	return (
		<div
			className={`p-0 sm:p-2 w-full flex gap-4 ${
				noSmallStack
					? "flex-row justify-between items-baseline"
					: "flex-col items-start"
			} sm:flex-row sm:justify-between sm:items-center ${styles ?? ""}`}
		>
			{children}
		</div>
	);
}
