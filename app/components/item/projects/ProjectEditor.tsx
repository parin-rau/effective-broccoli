import TextInput from "~/components/ui/TextInput";
import TextareaInput from "~/components/ui/TextareaInput";
import BasicContainer from "~/components/container/BasicContainer";

type Props = {
	title?: string;
	description?: string | null;
	externalLink?: string | null;
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
				placeholder="Enter Project Title"
				defaultValue={title ?? ""}
				required
			/>
			<TextareaInput
				name="description"
				label="Description"
				placeholder="Enter Project Description (Optional)"
				defaultValue={description ?? ""}
			/>
			<TextInput
				name="externalLink"
				label="External Resource"
				placeholder="Enter External Resource URL (Optional)"
				defaultValue={externalLink ?? ""}
			/>
		</BasicContainer>
	);
}
