type Props = {
	type: React.HTMLInputTypeAttribute;
	value: string;
	onChange: (...args: unknown[]) => unknown;
	placeholder?: string;
	name: string;
	required?: boolean;
};

export default function StyledInput(props: Props) {
	return (
		<input
			{...{
				className: "p-2 border border-neutral-500 rounded-md",
				...props,
			}}
		/>
	);
}
