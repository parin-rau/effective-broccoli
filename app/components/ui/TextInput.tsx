import StyledInput from "./StyledInput";
import { StyledInputProps } from "./inputTypes";

export default function TextInput(props: StyledInputProps) {
	return <StyledInput {...{ ...props, type: "text" }} />;
}
