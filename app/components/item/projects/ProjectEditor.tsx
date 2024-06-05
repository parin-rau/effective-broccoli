import TextInput from "~/components/ui/TextInput";
import TextareaInput from "~/components/ui/TextareaInput";
import StyledButton from "~/components/ui/StyledButton";
import BasicContainer from "~/components/container/BasicContainer";

type Props = {
	title?: string;
	description?: string;
	externalLink?: string;
};

export default function ProjectEditor({
	title,
	description,
	externalLink,
}: Props) {
	return (
		<BasicContainer styles="gap-3">
			<TextInput
				name="title"
				label="Title"
				placeholder="Project Title"
				defaultValue={title}
				required
			/>
			<TextareaInput
				name="description"
				label="Description"
				placeholder="Description (Optional)"
				defaultValue={description}
			/>
			<TextInput
				name="externalLink"
				label="External Resource"
				placeholder="External Resource URL (Optional)"
				defaultValue={externalLink}
			/>
			<StyledButton styles="place-self-end px-4">Submit</StyledButton>
		</BasicContainer>
	);
}
