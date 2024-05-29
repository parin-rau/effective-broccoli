import StyledInput from "./StyledInput";
import { SpecializedInputProps } from "./inputTypes";

export default function TextInput(props: SpecializedInputProps) {
	return <StyledInput {...{ ...props, type: "text" }} />;
}
