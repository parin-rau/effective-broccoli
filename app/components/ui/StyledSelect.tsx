export type SelectProps = {
	name: string;
	label: string;
	options: { label: string; value: string }[];
	style?: React.CSSProperties;
};

export default function StyledSelect({
	options,
	label,
	name,
	style,
}: SelectProps) {
	return (
		<div className="flex flex-col gap-1">
			<h3 className="pl-1">{label}</h3>
			<select
				style={style}
				name={name}
				defaultValue={options[0].value}
				className="p-2 h-full border border-neutral-500 dark:border-neutral-600 rounded-md bg-neutral-100 dark:bg-neutral-900"
			>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
