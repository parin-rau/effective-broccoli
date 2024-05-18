import { useState } from "react";

type Props = {
	isTextArea?: boolean;
	styles?: string;
	isPassword?: boolean;
};

const defaultStyles = "";

export default function FancyInput({ isTextArea, styles, isPassword }: Props) {
	const [text, setText] = useState("");
	const onChange = () => {
		setText(text);
	};

	const renderStyles = styles ?? defaultStyles;

	return isTextArea ? (
		<textarea className={renderStyles} value={text} onChange={onChange} />
	) : (
		<input
			className={renderStyles}
			value={text}
			onChange={onChange}
			type={isPassword ? "password" : "text"}
		/>
	);
}
