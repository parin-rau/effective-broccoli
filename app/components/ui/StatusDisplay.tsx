export default function StatusDisplay({
	message,
	styles,
}: {
	message: string;
	styles?: string;
}) {
	return (
		<span className={`p-4 rounded-md font-semibold ${styles ?? ""}`}>
			{message}
		</span>
	);
}
