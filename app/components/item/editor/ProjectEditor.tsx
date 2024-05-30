import { useState } from "react";
import TextInput from "~/components/ui/TextInput";
import TextareaInput from "~/components/ui/TextareaInput";
import { ProjectEditorState } from "./editorTypes";
import { Project } from "../itemTypes";
import BorderContainer from "~/components/container/BorderContainer";
import StyledButton from "~/components/ui/StyledButton";
import CollapsibleToggle from "~/components/ui/CollapsibleToggle";
import { Form } from "@remix-run/react";

type Props = {
	existingProject?: Partial<Project>;
	showEditor: boolean;
	toggleShowEditor: () => void;
};

type HeadingProps = {
	children: React.ReactNode;
};

function EditorHeading({ children }: HeadingProps) {
	return <h2 className="font-bold text-2xl py-1">{children}</h2>;
}

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

	return (
		<Form>
			<BorderContainer>
				<div className="flex items-stretch">
					{existingProject ? (
						<EditorHeading>Editing Project</EditorHeading>
					) : (
						<CollapsibleToggle
							isOpen={showEditor}
							toggleIsOpen={toggleShowEditor}
						>
							<EditorHeading>Create New Project</EditorHeading>
						</CollapsibleToggle>
					)}
				</div>
				{showEditor && (
					<>
						<TextInput
							name="title"
							label="Title"
							placeholder="Project Title"
							value={editor.title}
							onChange={onChange}
							required
						/>
						<TextareaInput
							name="description"
							label="Description"
							placeholder="Description (Optional)"
							value={editor.description}
							onChange={onChange}
						/>
						<TextInput
							name="externalLink"
							label="External Resource"
							placeholder="External Resource URL (Optional)"
							value={editor.externalLink}
							onChange={onChange}
						/>
						<StyledButton>Submit</StyledButton>
					</>
				)}
			</BorderContainer>
		</Form>
	);
}
