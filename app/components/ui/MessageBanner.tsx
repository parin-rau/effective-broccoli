export default function MessageBanner({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="p-4 flex flex-col gap-2 text-emerald-100 bg-emerald-600 dark:bg-emerald-700 rounded-lg">
			<span className="text-lg font-semibold flex flex-col gap-1">
				{children}
			</span>
		</div>
	);
}
