export default function ErrorBanner({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="p-4 flex flex-col gap-2 text-red-200 bg-red-600 dark:bg-red-700 rounded-lg">
			<h3 className="text-xl font-bold">Error</h3>
			<span className="text-lg font-semibold flex flex-col gap-1">
				{children}
			</span>
		</div>
	);
}
