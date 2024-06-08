export default function WarningBanner({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="p-4 flex flex-col gap-2 text-amber-900 dark:text-amber-200 bg-amber-500 dark:bg-amber-600 rounded-lg">
			<div className="h-8 sm:h-10 place-self-start">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6 h-full w-full"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
					/>
				</svg>
			</div>

			<span className="text-lg font-semibold flex flex-col gap-1">
				{children}
			</span>
		</div>
	);
}
