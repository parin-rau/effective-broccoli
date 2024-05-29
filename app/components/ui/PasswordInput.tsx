import StyledInput from "./StyledInput";
import { StyledInputProps } from "./inputTypes";

export default function PasswordInput(props: StyledInputProps) {
	return <StyledInput {...{ ...props, type: "password" }} />;
}
