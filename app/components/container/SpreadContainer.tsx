export default function SpreadContainer({
	children,
	styles,
}: {
	children: React.ReactNode;
	styles?: string;
}) {
	return (
		<div
			className={`p-4 w-full flex flex-row justify-between items-center ${
				styles ?? ""
			}`}
		>
			{children}
		</div>
	);
}
