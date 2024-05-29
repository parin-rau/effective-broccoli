import { useState } from "react";
import TextInput from "~/components/ui/TextInput";
import TextareaInput from "~/components/ui/TextareaInput";
import { ProjectEditorState } from "./editorTypes";
import { Project } from "../itemTypes";
import BorderContainer from "~/components/container/BorderContainer";
import StyledButton from "~/components/ui/StyledButton";

type Props = {
	existingProject?: Partial<Project>;
	showEditor?: boolean;
	toggleShowEditor?: () => void;
};

export default function ProjectEditor({
	existingProject,
	showEditor,
	toggleShowEditor,
}: Props) {
	const [editor, setEditor] = useState(
		new ProjectEditorState(existingProject)
	);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditor((prev) => ({ ...prev, [name]: value }));
	};

	return showEditor ? (
		<BorderContainer>
			<TextInput
				name="title"
				placeholder="Project Title"
				value={editor.title}
				onChange={onChange}
			/>
			<TextareaInput
				name="description"
				placeholder="Description"
				value={editor.description}
				onChange={onChange}
			/>
			<TextInput
				name="externalLink"
				placeholder="External Resource URL"
				value={editor.externalLink}
				onChange={onChange}
			/>
		</BorderContainer>
	) : (
		<BorderContainer>
			<StyledButton type="button" onClick={toggleShowEditor}>
				Create New Project
			</StyledButton>
		</BorderContainer>
	);
}
