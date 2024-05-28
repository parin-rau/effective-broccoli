type Props = {
	type: React.HTMLInputTypeAttribute;
	value: string;
	onChange: (...args: unknown[]) => unknown;
	placeholder?: string;
};

export default function StyledInput({
	type,
	value,
	onChange,
	placeholder,
}: Props) {
	return (
		<input
			{...{
				className: "p-2 border border-neutral-500 rounded-md",
				type,
				value,
				onChange,
				placeholder,
			}}
		/>
	);
}
