export default function ItalicText({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<span className="italic text-neutral-700 dark:text-neutral-300">
			{children}
		</span>
	);
}
