export default function StatusDisplay({
	message,
	styles,
}: {
	message: string;
	styles?: string;
}) {
	return (
		<span
			className={`px-3 py-2 w-fit rounded-md font-semibold ${
				styles ?? ""
			}`}
		>
			{message}
		</span>
	);
}
