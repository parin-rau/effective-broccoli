export type InputProps = {
	type: React.HTMLInputTypeAttribute;
	value: string;
	onChange: (...args: any[]) => any;
	placeholder?: string;
	name: string;
	required?: boolean;
	label?: string;
};

export type StyledInputProps = Omit<InputProps, "type">;
