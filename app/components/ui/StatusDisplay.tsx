export default function StatusDisplay({
	message,
	styles,
}: {
	message: string;
	styles?: string;
}) {
	return (
		<span
			className={`px-2 py-1 w-fit rounded-md font-semibold ${
				styles ?? ""
			}`}
		>
			{message}
		</span>
	);
}
