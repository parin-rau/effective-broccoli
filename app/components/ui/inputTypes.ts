export type InputProps = {
	type: React.HTMLInputTypeAttribute;
	value: string;
	onChange: (...args: any[]) => any;
	placeholder?: string;
	name: string;
	required?: boolean;
};

export type SpecializedInputProps = Omit<InputProps, "type">;
