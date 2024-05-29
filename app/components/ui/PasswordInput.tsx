import StyledInput from "./StyledInput";
import { SpecializedInputProps } from "./inputTypes";

export default function PasswordInput(props: SpecializedInputProps) {
	return <StyledInput {...{ ...props, type: "password" }} />;
}
