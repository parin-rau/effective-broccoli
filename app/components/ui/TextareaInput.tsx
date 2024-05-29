import StyledInput from "./StyledInput";
import { StyledInputProps } from "./inputTypes";

export default function TextareaInput(props: StyledInputProps) {
	return <StyledInput {...{ ...props, type: "textarea" }} />;
}
